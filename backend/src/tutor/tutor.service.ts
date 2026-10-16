import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PrismaService } from "../prisma/prisma.service";
import { OmniRouteClient, OmniRouteClientError, type OmniRouteMessage } from "./omniroute.client";
import { OpenRouterClient, OpenRouterClientError, type OpenRouterMessage } from "./openrouter.client";
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
    private readonly omniRoute: OmniRouteClient,
    private readonly openRouter: OpenRouterClient,
  ) {}

  async ask(userId: string, input: TutorQuestionDto) {
    await this.prisma.tutorMessage.create({ data: { userId, system: input.system, anatomyId: input.anatomyId, role: "user", content: input.question } });

    const provider = this.config.get<string>("AI_PROVIDER")?.trim().toLowerCase();
    const context = this.buildContext(input);
    const messages = context ? this.buildMessages(context, input.question) : null;

    if (provider === "omniroute" && messages) {
      try {
        const answer = await this.omniRoute.chat(messages);
        return { answer, system: input.system, anatomyId: input.anatomyId, provider: "omniroute" };
      } catch (error) {
        this.logOmniRouteFailure(error);
      }
      try {
        const answer = await this.openRouter.chat(messages);
        return { answer, system: input.system, anatomyId: input.anatomyId, provider: "openrouter" };
      } catch (error) {
        this.logOpenRouterFailure(error);
      }
    } else if (provider === "openrouter" && messages) {
      try {
        const answer = await this.openRouter.chat(messages);
        return { answer, system: input.system, anatomyId: input.anatomyId, provider: "openrouter" };
      } catch (error) {
        this.logOpenRouterFailure(error);
      }
    } else if ((provider === "omniroute" || provider === "openrouter") && !messages) {
      this.logger.warn("Remote tutor request skipped because validated anatomy context is missing.");
    }

    return {
      answer: "No fue posible conectar con el tutor remoto. Puedes continuar estudiando con la ficha anatómica seleccionada.",
      system: input.system,
      anatomyId: input.anatomyId,
      provider: "local",
    };
  }

  private buildMessages(context: string, question: string): Array<OmniRouteMessage | OpenRouterMessage> {
    return [
      { role: "system", content: systemPrompt },
      { role: "user", content: `${context}\n\nPregunta del estudiante: ${question.trim()}` },
    ];
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

  private logOmniRouteFailure(error: unknown): void {
    if (error instanceof OmniRouteClientError) {
      this.logger.warn(`OmniRoute request failed (${error.code}). Falling back to OpenRouter.`);
      return;
    }
    this.logger.warn("OmniRoute request failed unexpectedly. Falling back to OpenRouter.");
  }

  private logOpenRouterFailure(error: unknown): void {
    if (error instanceof OpenRouterClientError) {
      this.logger.warn(`OpenRouter request failed (${error.code}). Falling back to local tutor.`);
      return;
    }
    this.logger.warn("OpenRouter request failed unexpectedly. Falling back to local tutor.");
  }
}
