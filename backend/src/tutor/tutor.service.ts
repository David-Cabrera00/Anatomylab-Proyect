import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PrismaService } from "../prisma/prisma.service";
import { OllamaClient, OllamaClientError, type OllamaMessage } from "./ollama.client";
import { TutorQuestionDto } from "./tutor.dto";

const systemPrompt = [
  "Eres el tutor educativo de anatomía de AnatomyLab.",
  "Responde únicamente usando el contexto anatómico validado proporcionado.",
  "No inventes estructuras, funciones, ubicaciones ni datos que no estén en el contexto.",
  "Si el contexto no permite responder, dilo claramente.",
  "No emitas diagnósticos médicos ni sustituyas el consejo de un profesional de la salud.",
  "Responde de forma clara, breve y educativa en el idioma de la pregunta.",
].join(" ");

@Injectable()
export class TutorService {
  private readonly logger = new Logger(TutorService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly ollama: OllamaClient,
  ) {}

  async ask(userId: string, input: TutorQuestionDto) {
    await this.prisma.tutorMessage.create({ data: { userId, system: input.system, anatomyId: input.anatomyId, role: "user", content: input.question } });

    const provider = this.config.get<string>("AI_PROVIDER")?.trim().toLowerCase();
    if (provider === "ollama") {
      const context = this.buildContext(input);
      if (context) {
        try {
          const messages: OllamaMessage[] = [
            { role: "system", content: systemPrompt },
            { role: "user", content: `${context}\n\nPregunta del estudiante: ${input.question.trim()}` },
          ];
          const answer = await this.ollama.chat(messages);
          return { answer, system: input.system, anatomyId: input.anatomyId, provider: "ollama" };
        } catch (error) {
          this.logOllamaFailure(error);
        }
      } else {
        this.logger.warn("Ollama tutor request skipped because validated anatomy context is missing.");
      }

      return {
        answer: "No fue posible conectar con el tutor local. Puedes continuar estudiando con la ficha anatómica seleccionada.",
        system: input.system,
        anatomyId: input.anatomyId,
        provider: "ollama-fallback",
      };
    }

    return {
      answer: "El tutor remoto todavía está en modo de preparación. La pregunta y su anatomyId quedaron registrados correctamente.",
      system: input.system,
      anatomyId: input.anatomyId,
      provider: provider || "local",
    };
  }

  private buildContext(input: TutorQuestionDto): string | null {
    const structureName = input.structureName?.trim();
    const description = input.description?.trim();
    if (!structureName || !description) return null;

    const lines = [
      `Sistema anatómico: ${input.system}`,
      `Estructura: ${structureName}`,
      `Anatomy ID: ${input.anatomyId}`,
      `Descripción educativa: ${description}`,
    ];
    if (input.function?.trim()) lines.push(`Función: ${input.function.trim()}`);
    if (input.location?.trim()) lines.push(`Ubicación: ${input.location.trim()}`);
    if (input.relationships?.trim()) lines.push(`Relaciones: ${input.relationships.trim()}`);
    return lines.join("\n");
  }

  private logOllamaFailure(error: unknown): void {
    if (error instanceof OllamaClientError) {
      this.logger.warn(`Ollama request failed (${error.code}).`);
      return;
    }
    this.logger.warn("Ollama request failed unexpectedly.");
  }
}
