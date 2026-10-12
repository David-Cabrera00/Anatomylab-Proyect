import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { SyncDto } from "./sync.dto";

@Injectable()
export class SyncService {
  constructor(private readonly prisma: PrismaService) {}

  async syncUser(userId: string, input: SyncDto) {
    await this.prisma.$transaction([
      ...input.progress.map((item) => this.prisma.studyProgress.upsert({
        where: { userId_system_anatomyId: { userId, system: item.system, anatomyId: item.anatomyId } },
        create: { userId, system: item.system, anatomyId: item.anatomyId, score: item.score, timeSpentMs: item.timeSpentMs ?? 0 },
        update: { score: item.score, timeSpentMs: item.timeSpentMs ?? 0, lastStudiedAt: new Date() },
      })),
      ...input.favorites.map((item) => this.prisma.favorite.upsert({
        where: { userId_system_anatomyId: { userId, system: item.system, anatomyId: item.anatomyId } },
        create: { userId, system: item.system, anatomyId: item.anatomyId, notes: item.notes },
        update: { notes: item.notes },
      })),
      ...input.quizSessions.map((item) => this.prisma.quizSession.upsert({
        where: { id: item.id },
        create: {
          id: item.id,
          userId,
          system: item.system,
          configId: item.configId,
          score: item.score,
          correctCount: item.correctCount,
          totalQuestions: item.totalQuestions,
          timeSpentMs: item.timeSpentMs,
          startedAt: new Date(item.startedAt),
          completedAt: new Date(item.completedAt),
          answers: { create: item.answers },
        },
        update: {
          system: item.system,
          configId: item.configId,
          score: item.score,
          correctCount: item.correctCount,
          totalQuestions: item.totalQuestions,
          timeSpentMs: item.timeSpentMs,
          startedAt: new Date(item.startedAt),
          completedAt: new Date(item.completedAt),
          answers: {
            deleteMany: {},
            create: item.answers,
          },
        },
      })),
      ...input.studySessions.map((item) => this.prisma.studySession.upsert({
        where: { id: item.id },
        create: {
          id: item.id,
          userId,
          system: item.system,
          stepsDone: item.stepsDone,
          startedAt: new Date(item.startedAt),
          completedAt: item.completedAt ? new Date(item.completedAt) : null,
        },
        update: {
          system: item.system,
          stepsDone: item.stepsDone,
          startedAt: new Date(item.startedAt),
          completedAt: item.completedAt ? new Date(item.completedAt) : null,
        },
      })),
      ...input.preferences.map((item) => this.prisma.userPreference.upsert({
        where: { userId_key: { userId, key: item.key } },
        create: { userId, key: item.key, value: item.value },
        update: { value: item.value },
      })),
    ]);

    return {
      synced: true,
      progress: input.progress.length,
      favorites: input.favorites.length,
      quizSessions: input.quizSessions.length,
      studySessions: input.studySessions.length,
      preferences: input.preferences.length,
    };
  }
}
