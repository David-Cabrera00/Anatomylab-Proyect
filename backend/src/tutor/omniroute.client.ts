import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export type OmniRouteMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OmniRouteChatResponse = {
  error?: { code?: number | string; message?: string };
  choices?: Array<{ message?: { content?: unknown } }>;
};

export type OmniRouteErrorCode =
  | "missing_key" | "connection" | "http" | "model" | "timeout" | "invalid-json"
  | "missing-choices" | "missing-message" | "empty-content" | "unsupported-content-format" | "provider-error";

export class OmniRouteClientError extends Error {
  constructor(message: string, public readonly code: OmniRouteErrorCode) {
    super(message);
    this.name = "OmniRouteClientError";
  }
}

@Injectable()
export class OmniRouteClient {
  private readonly logger = new Logger(OmniRouteClient.name);
  private readonly apiKey: string | null;
  private readonly baseUrl: string;
  private readonly defaultModel: string;
  private readonly timeoutMs: number;

  constructor(private readonly config: ConfigService) {
    const rawKey = config.get<string>("OMNIROUTE_API_KEY")?.trim();
    this.apiKey = rawKey || null;
    this.baseUrl = this.readLocalBaseUrl(config.get<string>("OMNIROUTE_BASE_URL"));
    this.defaultModel = config.get<string>("OMNIROUTE_MODEL")?.trim() || "nvidia/nemotron-3.5-super-v1:free";
    this.timeoutMs = this.readTimeout(config.get<string>("OMNIROUTE_TIMEOUT_MS"));
  }

  async chat(messages: OmniRouteMessage[], model = this.defaultModel): Promise<string> {
    if (!this.apiKey) throw new OmniRouteClientError("OMNIROUTE_API_KEY is not configured", "missing_key");

    const selectedModel = model.trim() || this.defaultModel;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiKey}` },
        body: JSON.stringify({ model: selectedModel, messages }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        const code = response.status === 404 ? "model" : "http";
        throw new OmniRouteClientError(`OmniRoute returned HTTP ${response.status}${detail ? `: ${detail.slice(0, 160)}` : ""}`, code);
      }

      let payload: OmniRouteChatResponse;
      try { payload = (await response.json()) as OmniRouteChatResponse; }
      catch { throw new OmniRouteClientError("OmniRoute returned invalid JSON", "invalid-json"); }

      if (payload.error) {
        const detail = typeof payload.error.message === "string" ? payload.error.message.slice(0, 160) : "Unknown upstream error";
        throw new OmniRouteClientError(`OmniRoute returned an error: ${detail}`, "provider-error");
      }
      if (!Array.isArray(payload.choices) || payload.choices.length === 0) throw new OmniRouteClientError("OmniRoute response does not contain choices", "missing-choices");
      if (!payload.choices[0]?.message) throw new OmniRouteClientError("OmniRoute choice does not contain a message", "missing-message");

      const rawContent = payload.choices[0].message.content;
      let answer = "";
      if (typeof rawContent === "string") answer = rawContent.trim();
      else if (Array.isArray(rawContent)) {
        answer = rawContent
          .filter((part): part is { text: string } => typeof part === "object" && part !== null && typeof (part as { text?: unknown }).text === "string")
          .map((part) => part.text.trim()).filter(Boolean).join("\n\n");
      } else if (rawContent !== undefined && rawContent !== null) {
        throw new OmniRouteClientError("OmniRoute message content has an unsupported format", "unsupported-content-format");
      }
      if (!answer) throw new OmniRouteClientError("OmniRoute returned empty message content", "empty-content");
      return answer;
    } catch (error) {
      if (error instanceof OmniRouteClientError) throw error;
      if (error instanceof Error && error.name === "AbortError") throw new OmniRouteClientError(`OmniRoute request timed out after ${this.timeoutMs}ms`, "timeout");
      throw new OmniRouteClientError("OmniRoute is unavailable", "connection");
    } finally { clearTimeout(timeout); }
  }

  private readLocalBaseUrl(value: string | undefined): string {
    const candidate = value?.trim() || "http://127.0.0.1:20128/v1";
    try {
      const url = new URL(candidate);
      if (url.protocol !== "http:" || !["127.0.0.1", "localhost", "[::1]", "::1"].includes(url.hostname)) throw new Error("OmniRoute must remain local");
      return candidate.replace(/\/$/, "");
    } catch {
      this.logger.warn("Invalid OMNIROUTE_BASE_URL; using the local default.");
      return "http://127.0.0.1:20128/v1";
    }
  }

  private readTimeout(value: string | undefined): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed >= 1000 && parsed <= 120000 ? Math.floor(parsed) : 30000;
  }
}
