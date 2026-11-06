import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PrismaService } from "../prisma/prisma.service";
import { OmniRouteClient, OmniRouteClientError, type OmniRouteMessage } from "./omniroute.client";
import { OpenRouterClient, OpenRouterClientError, type OpenRouterMessage } from "./openrouter.client";
import { TutorQuestionDto, type TutorLanguage } from "./tutor.dto";

function buildLocalizedSystemPrompt(language: TutorLanguage): string {
  return language === "en"
    ? [
        "You are an expert human anatomy professor and clinical tutor at AnatomyLab.",
        "Respond strictly in English.",
        "Answer the student's question directly with high anatomical precision, educational clarity, and clinical perspective.",
        "Structure explanations naturally: anatomical definition, biomechanical action/function, and key clinical relevance.",
        "Never use meta-language: do not mention 'validated context', 'provided information', or 'as an AI tutor'.",
        "Do not present menu options, bulleted lists of what you can do, or robotic introductory formulas.",
        "Do not use emojis. Maintain an academic, professional, and engaging medical tone.",
        "Do not issue medical diagnoses or prescriptive clinical treatments.",
      ].join(" ")
    : [
        "Eres un profesor universitario y tutor clínico experto de anatomía humana en AnatomyLab.",
        "Responde estrictamente en español.",
        "Responde directamente a la consulta del estudiante con alta precisión anatómica, claridad pedagógica y perspectiva clínica.",
        "Estructura las explicaciones de forma natural: definición anatómica, acción/función biomecánica y relevancia clínica práctica.",
        "Está terminantemente prohibido el meta-lenguaje: no digas 'según el contexto que me diste', 'información validada', ni 'como tutor puedo ayudarte a'.",
        "No muestres listas ni menús de lo que sabes hacer ni fórmulas robóticas de presentación.",
        "No uses emojis. Mantén un tono médico-académico, sobrio, claro y directo.",
        "No emitas diagnósticos médicos personalizados ni prescripciones terapéuticas.",
      ].join(" ");
}

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
    const messages = context ? this.buildMessages(context, input.question, input.language) : null;

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

    if (input.language === "en") {
      return {
        answer: "The remote tutor could not be reached. You can continue studying with the selected anatomy card.",
        system: input.system,
        anatomyId: input.anatomyId,
        provider: "local",
      };
    }

    return {
      answer: "No fue posible conectar con el tutor remoto. Puedes continuar estudiando con la ficha anatómica seleccionada.",
      system: input.system,
      anatomyId: input.anatomyId,
      provider: "local",
    };
  }

  private buildMessages(context: string, question: string, language: TutorLanguage): Array<OmniRouteMessage | OpenRouterMessage> {
    return [
      { role: "system", content: buildLocalizedSystemPrompt(language) },
      {
        role: "user",
        content: language === "en"
          ? `${context}\n\nStudent question: ${question.trim()}`
          : `${context}\n\nPregunta del estudiante: ${question.trim()}`,
      },
    ];
  }

  private buildContext(input: TutorQuestionDto): string | null {
    const structureName = input.structureName?.trim();
    const description = input.description?.trim();
    if (!structureName || !description) return null;

    if (input.language === "en") {
      const lines = [
        `Anatomical system: ${input.system}`,
        `Structure: ${structureName}`,
        `Anatomy ID: ${input.anatomyId}`,
        `Educational description: ${description}`,
      ];
      if (input.function?.trim()) lines.push(`Function: ${input.function.trim()}`);
      if (input.location?.trim()) lines.push(`Location: ${input.location.trim()}`);
      if (input.relationships?.trim()) lines.push(`Relationships: ${input.relationships.trim()}`);
      return lines.join("\n");
    }

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
