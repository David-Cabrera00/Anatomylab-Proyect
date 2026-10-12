import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PrismaService } from "../prisma/prisma.service";
import { TutorQuestionDto } from "./tutor.dto";

@Injectable()
export class TutorService {
  constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}

  async ask(userId: string, input: TutorQuestionDto) {
    await this.prisma.tutorMessage.create({ data: { userId, system: input.system, anatomyId: input.anatomyId, role: "user", content: input.question } });

    const provider = this.config.get<string>("AI_PROVIDER");
    const answer = provider
      ? "El proveedor de IA está configurado; aquí se conectará el adaptador seguro del servidor."
      : "El tutor remoto todavía está en modo de preparación. La pregunta y su anatomyId quedaron registrados correctamente.";

    await this.prisma.tutorMessage.create({ data: { userId, system: input.system, anatomyId: input.anatomyId, role: "assistant", content: answer } });
    return { answer, system: input.system, anatomyId: input.anatomyId, provider: provider ?? "local" };
  }
}
