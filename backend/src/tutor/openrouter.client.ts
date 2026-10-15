import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export type OpenRouterMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OpenRouterContentPart = {
  type?: string;
  text?: string;
};

type OpenRouterChatResponse = {
  id?: string;
  model?: string;
  error?: {
    code?: number | string;
    message?: string;
  };
  choices?: Array<{
    index?: number;
    finish_reason?: string | null;
    message?: {
      role?: string;
      content?: unknown;
    };
  }>;
};

export type OpenRouterErrorCode =
  | "missing_key"
  | "connection"
  | "http"
  | "model"
  | "timeout"
  | "invalid-json"
  | "missing-choices"
  | "missing-message"
  | "empty-content"
  | "unsupported-content-format"
  | "openrouter-error-response";

export class OpenRouterClientError extends Error {
  constructor(
    message: string,
    public readonly code: OpenRouterErrorCode,
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
    const modelsList = selectedModel === "nvidia/nemotron-3-ultra-550b-a55b:free"
      ? ["nvidia/nemotron-3-ultra-550b-a55b:free", "nvidia/nemotron-3.5-lightning:free"]
      : [selectedModel];

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
          models: modelsList,
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
        throw new OpenRouterClientError("OpenRouter returned invalid JSON", "invalid-json");
      }

      if (payload.error) {
        const errorMsg = typeof payload.error.message === "string" ? payload.error.message.slice(0, 160) : "Unknown upstream error";
        const errorCode = payload.error.code ? ` (${payload.error.code})` : "";
        throw new OpenRouterClientError(
          `OpenRouter returned error${errorCode}: ${errorMsg}`,
          "openrouter-error-response",
        );
      }

      if (!Array.isArray(payload.choices) || payload.choices.length === 0) {
        throw new OpenRouterClientError("OpenRouter response does not contain choices", "missing-choices");
      }

      const firstChoice = payload.choices[0];
      if (!firstChoice || !firstChoice.message) {
        throw new OpenRouterClientError("OpenRouter choice does not contain a message", "missing-message");
      }

      const rawContent = firstChoice.message.content;
      let answer = "";

      if (typeof rawContent === "string") {
        answer = rawContent.trim();
      } else if (Array.isArray(rawContent)) {
        const textParts = rawContent
          .filter((part): part is OpenRouterContentPart => typeof part === "object" && part !== null && typeof (part as OpenRouterContentPart).text === "string")
          .map((part) => (part.text || "").trim())
          .filter(Boolean);
        answer = textParts.join("\n\n");
      } else if (rawContent !== undefined && rawContent !== null) {
        throw new OpenRouterClientError("OpenRouter message content has an unsupported format", "unsupported-content-format");
      }

      if (!answer) {
        throw new OpenRouterClientError("OpenRouter returned empty message content", "empty-content");
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
