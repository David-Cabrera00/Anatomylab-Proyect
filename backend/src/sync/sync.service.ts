import { ForbiddenException, Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { SyncDto } from "./sync.dto";

@Injectable()
export class SyncService {
  constructor(private readonly prisma: PrismaService) {}

  async syncUser(userId: string, input: SyncDto) {
    return this.prisma.$transaction(async (tx) => {
      const quizIds = input.quizSessions.map((item) => item.id);
      const studyIds = input.studySessions.map((item) => item.id);
      const [existingQuizSessions, existingStudySessions] = await Promise.all([
        quizIds.length ? tx.quizSession.findMany({ where: { id: { in: quizIds } }, select: { id: true, userId: true } }) : [],
        studyIds.length ? tx.studySession.findMany({ where: { id: { in: studyIds } }, select: { id: true, userId: true } }) : [],
      ]);

      if (existingQuizSessions.some((item) => item.userId !== userId) || existingStudySessions.some((item) => item.userId !== userId)) {
        throw new ForbiddenException("No puedes modificar datos de otro usuario.");
      }

      await Promise.all([
      ...input.progress.map((item) => tx.studyProgress.upsert({
        where: { userId_system_anatomyId: { userId, system: item.system, anatomyId: item.anatomyId } },
        create: { userId, system: item.system, anatomyId: item.anatomyId, score: item.score, timeSpentMs: item.timeSpentMs ?? 0 },
        update: { score: item.score, timeSpentMs: item.timeSpentMs ?? 0, lastStudiedAt: new Date() },
      })),
      ...input.favorites.map((item) => tx.favorite.upsert({
        where: { userId_system_anatomyId: { userId, system: item.system, anatomyId: item.anatomyId } },
        create: { userId, system: item.system, anatomyId: item.anatomyId, notes: item.notes },
        update: { notes: item.notes },
      })),
      ...input.quizSessions.map((item) => tx.quizSession.upsert({
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
      ...input.studySessions.map((item) => tx.studySession.upsert({
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
      ...input.preferences.map((item) => tx.userPreference.upsert({
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
    });
  }
}
