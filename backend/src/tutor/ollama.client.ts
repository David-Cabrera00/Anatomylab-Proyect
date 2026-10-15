import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export type OllamaMessage = {
  role: "system" | "user";
  content: string;
};

type OllamaChatResponse = {
  message?: {
    content?: unknown;
  };
};

export class OllamaClientError extends Error {
  constructor(message: string, public readonly code: "connection" | "http" | "model" | "invalid" | "timeout") {
    super(message);
    this.name = "OllamaClientError";
  }
}

@Injectable()
export class OllamaClient {
  private readonly logger = new Logger(OllamaClient.name);
  private readonly baseUrl: string;
  private readonly defaultModel: string;
  private readonly timeoutMs: number;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = this.readLocalBaseUrl(config.get<string>("OLLAMA_BASE_URL"));
    this.defaultModel = config.get<string>("OLLAMA_MODEL")?.trim() || "llama3:latest";
    this.timeoutMs = this.readTimeout(config.get<string>("OLLAMA_TIMEOUT_MS"));
  }

  async chat(messages: OllamaMessage[], model = this.defaultModel): Promise<string> {
    const selectedModel = model.trim() || this.defaultModel;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: selectedModel, stream: false, messages }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        const code = response.status === 404 ? "model" : "http";
        throw new OllamaClientError(`Ollama returned HTTP ${response.status}${detail ? `: ${detail.slice(0, 160)}` : ""}`, code);
      }

      let payload: OllamaChatResponse;
      try {
        payload = (await response.json()) as OllamaChatResponse;
      } catch {
        throw new OllamaClientError("Ollama returned invalid JSON", "invalid");
      }

      const answer = typeof payload.message?.content === "string" ? payload.message.content.trim() : "";
      if (!answer) throw new OllamaClientError("Ollama returned an empty answer", "invalid");
      return answer;
    } catch (error) {
      if (error instanceof OllamaClientError) throw error;
      if (error instanceof Error && error.name === "AbortError") {
        throw new OllamaClientError(`Ollama request timed out after ${this.timeoutMs}ms`, "timeout");
      }
      throw new OllamaClientError("Ollama is unavailable", "connection");
    } finally {
      clearTimeout(timeout);
    }
  }

  private readLocalBaseUrl(value: string | undefined): string {
    const candidate = value?.trim() || "http://127.0.0.1:11434";
    try {
      const url = new URL(candidate);
      if (url.protocol !== "http:" || !["127.0.0.1", "localhost", "[::1]", "::1"].includes(url.hostname)) {
        throw new Error("Ollama must remain local");
      }
      return candidate.replace(/\/$/, "");
    } catch {
      this.logger.warn("Invalid OLLAMA_BASE_URL; using the local default.");
      return "http://127.0.0.1:11434";
    }
  }

  private readTimeout(value: string | undefined): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed >= 1000 && parsed <= 120000 ? Math.floor(parsed) : 30000;
  }
}
