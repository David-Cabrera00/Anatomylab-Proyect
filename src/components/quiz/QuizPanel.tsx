import { useCallback, useState } from "react";

import { Button, Card } from "../ui";
import type { QuizState } from "../../data/quiz/types";
import type { AnatomySystemId } from "../../config/anatomySystems";
import { getQuizConfig, getQuizConfigsBySystem } from "../../data/quiz";
import { createQuizSession, answerQuestion, finishQuizSession, formatTime } from "../../utils/quiz/quizUtils";
import { dbSaveQuizSession } from "../../utils/db";

interface QuizPanelProps {
  activeSystem: AnatomySystemId;
  quizState: QuizState;
  onStateChange: (state: QuizState) => void;
  onClose: () => void;
}

export function QuizPanel({ activeSystem, quizState, onStateChange, onClose }: QuizPanelProps) {
  const [configs] = useState(() => getQuizConfigsBySystem(activeSystem));
  const [persistenceError, setPersistenceError] = useState<string | null>(null);

  const handleStartQuiz = useCallback((configId: string) => {
    const session = createQuizSession(configId);
    if (!session) return;
    const config = getQuizConfig(configId)!;
    onStateChange({ status: "active", session, config });
  }, [onStateChange]);

  if (quizState.status === "idle") {
    return (
      <Card className="w-full">
        <div className="p-4 space-y-3">
          <h3 className="text-sm font-semibold">Quiz anatómico - {activeSystem}</h3>
          <p className="text-xs text-slate-500">
            Selecciona un quiz para comenzar. Cada sesión tiene 10 preguntas aleatorias.
          </p>
          <div className="space-y-2">
            {configs.map((config) => (
              <Button
                key={config.id}
                variant="ghost"
                className="w-full justify-start text-left gap-3"
                onClick={() => handleStartQuiz(config.id)}
              >
                <div>
                  <p className="font-medium text-sm">{config.title}</p>
                  <p className="text-xs text-slate-500">{config.description}</p>
                </div>
              </Button>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="w-full">
            Cerrar
          </Button>
        </div>
      </Card>
    );
  }

  if (quizState.status === "active") {
    const { session, config } = quizState;
    const question = config.questionPool.find((q) => q.id === session.questionIds[session.currentIndex]);
    const progress = ((session.currentIndex) / config.questionsPerSession) * 100;

    if (!question) {
      return null;
    }

    const handleAnswer = (selectedIndex: number) => {
      const timeMs = Date.now() - session.startedAt;
      const updatedSession = answerQuestion(session, config, selectedIndex, timeMs);

      if (updatedSession.currentIndex >= config.questionsPerSession) {
        const completedSession = finishQuizSession(updatedSession);
        const correctCount = Object.values(completedSession.answers).filter((answer) => answer.correct).length;
        const completedAt = completedSession.completedAt ?? Date.now();
        setPersistenceError(null);
        void dbSaveQuizSession({
          system: completedSession.system,
          configId: config.id,
          score: Math.round((correctCount / completedSession.questionIds.length) * 100),
          totalQuestions: completedSession.questionIds.length,
          correctCount,
          startedAt: new Date(completedSession.startedAt).toISOString(),
          completedAt: new Date(completedAt).toISOString(),
          timeSpentMs: completedAt - completedSession.startedAt,
          answers: completedSession.questionIds.flatMap((questionId) => {
            const completedQuestion = config.questionPool.find((item) => item.id === questionId);
            const answer = completedSession.answers[questionId];
            return completedQuestion && answer ? [{
              questionId,
              anatomyId: completedQuestion.anatomyId,
              selectedIndex: answer.selectedIndex,
              correctIndex: completedQuestion.correctIndex,
              isCorrect: answer.correct,
              timeMs: answer.timeMs,
            }] : [];
          }),
        }).catch((error) => {
          console.error("Error saving quiz session:", error);
          setPersistenceError("No se pudo guardar esta sesión en el historial.");
        });
        onStateChange({ status: "reviewing", session: completedSession, config });
      } else {
        onStateChange({ status: "active", session: updatedSession, config });
      }
    };

    return (
      <Card className="w-full max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Pregunta {session.currentIndex + 1} de {config.questionsPerSession}</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 capitalize">{question.difficulty}</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-slate-900 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-base font-medium mb-4">{question.prompt}</p>
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => handleAnswer(index)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (quizState.status === "reviewing") {
    const { session, config } = quizState;
    const correctCount = Object.values(session.answers).filter((a) => a.correct).length;
    const score = Math.round((correctCount / config.questionsPerSession) * 100);
    const passed = score >= config.passingScore;
    const totalTime = session.completedAt ? session.completedAt - session.startedAt : 0;

    return (
      <Card className="w-full max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">
              {passed ? "¡Aprobado!" : "No aprobado"} - {score}%
            </h3>
            <p className="text-xs text-slate-500">
              {correctCount} de {config.questionsPerSession} correctas · {formatTime(totalTime)}
            </p>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {persistenceError && <p className="rounded-lg bg-red-50 p-3 text-xs text-red-700">{persistenceError}</p>}
          {session.questionIds.map((qId, index) => {
            const question = config.questionPool.find((q) => q.id === qId);
            const answer = session.answers[qId];
            if (!question || !answer) return null;

            const isCorrect = answer.correct;
            return (
              <div key={qId} className="rounded-lg border p-3" style={{ borderColor: isCorrect ? "#10b981" : "#ef4444" }}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-medium text-slate-500">Pregunta {index + 1}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                    {isCorrect ? "Correcta" : "Incorrecta"}
                  </span>
                </div>
                <p className="text-sm font-medium mb-2">{question.prompt}</p>
                <div className="space-y-1 text-xs">
                  {question.options.map((opt, i) => (
                    <div key={i} className={`flex items-center gap-2 ${i === answer.selectedIndex ? "font-medium" : ""}`}>
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] ${i === question.correctIndex ? "border-emerald-500 bg-emerald-50 text-emerald-600" : i === answer.selectedIndex ? "border-red-500 bg-red-50 text-red-600" : "border-slate-300"}`}>
                        {i === question.correctIndex || i === answer.selectedIndex ? "✓" : ""}
                      </span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-600 bg-slate-50 p-2 rounded">{question.explanation}</p>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-200 flex gap-2">
          <Button variant="ghost" className="flex-1" onClick={onClose}>
            Volver
          </Button>
          <Button onClick={() => {
            const newSession = createQuizSession(config.id);
            if (newSession) onStateChange({ status: "active", session: newSession, config });
          }}>
            Reintentar
          </Button>
        </div>
      </Card>
    );
  }

  return null;
}
