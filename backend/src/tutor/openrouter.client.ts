import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export type OpenRouterMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OpenRouterChatResponse = {
  choices?: Array<{
    message?: {
      content?: unknown;
    };
  }>;
};

export class OpenRouterClientError extends Error {
  constructor(
    message: string,
    public readonly code: "missing_key" | "connection" | "http" | "model" | "invalid" | "timeout",
  ) {
    super(message);
    this.name = "OpenRouterClientError";
  }
}

@Injectable()
export class OpenRouterClient {
  private readonly logger = new Logger(OpenRouterClient.name);
  private readonly apiKey: string | null;
  private readonly baseUrl: string;
  private readonly defaultModel: string;
  private readonly timeoutMs: number;

  constructor(private readonly config: ConfigService) {
    const rawKey = config.get<string>("OPENROUTER_API_KEY")?.trim();
    this.apiKey = rawKey || null;
    this.baseUrl = this.readBaseUrl(config.get<string>("OPENROUTER_BASE_URL"));
    const configuredModel = config.get<string>("OPENROUTER_MODEL")?.trim() || "nvidia/nemotron-3-ultra:free";
    this.defaultModel = configuredModel === "nvidia/nemotron-3-ultra:free"
      ? "nvidia/nemotron-3-ultra-550b-a55b:free"
      : configuredModel;
    this.timeoutMs = this.readTimeout(config.get<string>("OPENROUTER_TIMEOUT_MS"));
  }

  async chat(messages: OpenRouterMessage[], model = this.defaultModel): Promise<string> {
    if (!this.apiKey) {
      throw new OpenRouterClientError("OPENROUTER_API_KEY is not configured", "missing_key");
    }

    const selectedModel = model.trim() || this.defaultModel;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
          "HTTP-Referer": "https://anatomylab.local",
          "X-Title": "AnatomyLab AI",
        },
        body: JSON.stringify({
          model: selectedModel,
          messages,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        const code = response.status === 404 ? "model" : "http";
        throw new OpenRouterClientError(
          `OpenRouter returned HTTP ${response.status}${detail ? `: ${detail.slice(0, 160)}` : ""}`,
          code,
        );
      }

      let payload: OpenRouterChatResponse;
      try {
        payload = (await response.json()) as OpenRouterChatResponse;
      } catch {
        throw new OpenRouterClientError("OpenRouter returned invalid JSON", "invalid");
      }

      const content = payload.choices?.[0]?.message?.content;
      const answer = typeof content === "string" ? content.trim() : "";
      if (!answer) {
        throw new OpenRouterClientError("OpenRouter returned an empty answer", "invalid");
      }

      return answer;
    } catch (error) {
      if (error instanceof OpenRouterClientError) throw error;
      if (error instanceof Error && error.name === "AbortError") {
        throw new OpenRouterClientError(`OpenRouter request timed out after ${this.timeoutMs}ms`, "timeout");
      }
      throw new OpenRouterClientError("OpenRouter is unavailable", "connection");
    } finally {
      clearTimeout(timeout);
    }
  }

  private readBaseUrl(value: string | undefined): string {
    const candidate = value?.trim() || "https://openrouter.ai/api/v1";
    try {
      const url = new URL(candidate);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("Invalid protocol");
      }
      return candidate.replace(/\/$/, "");
    } catch {
      this.logger.warn("Invalid OPENROUTER_BASE_URL; using the default.");
      return "https://openrouter.ai/api/v1";
    }
  }

  private readTimeout(value: string | undefined): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed >= 1000 && parsed <= 120000 ? Math.floor(parsed) : 30000;
  }
}
