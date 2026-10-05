import type { QuizConfig, QuizQuestion } from "./types";
import { cardiovascularQuizQuestions } from "./cardiovascularQuestions";
import { respiratoryQuizQuestions } from "./respiratoryQuestions";
import { nervousQuizQuestions } from "./nervousQuestions";
import { skeletalQuizQuestions } from "./skeletalQuestions";
import { muscularQuizQuestions } from "./muscularQuestions";
import { digestiveQuizQuestions } from "./digestiveQuestions";

const questionsBySystem = {
  cardiovascular: cardiovascularQuizQuestions,
  respiratory: respiratoryQuizQuestions,
  nervous: nervousQuizQuestions,
  skeletal: skeletalQuizQuestions,
  muscular: muscularQuizQuestions,
  digestive: digestiveQuizQuestions,
} as const;

function createQuizConfig(
  system: keyof typeof questionsBySystem,
  id: string,
  title: string,
  description: string
): QuizConfig {
  return {
    id,
    system,
    title,
    description,
    questionPool: questionsBySystem[system],
    questionsPerSession: 10,
    passingScore: 70,
    timeLimitSeconds: 300,
  };
}

export const quizConfigs: QuizConfig[] = [
  createQuizConfig(
    "cardiovascular",
    "cardiovascular-basic",
    "Sistema cardiovascular - Fundamentos",
    "Pon a prueba tu conocimiento del corazón, válvulas, grandes vasos y circulación sistémica/pulmonar."
  ),
  createQuizConfig(
    "cardiovascular",
    "cardiovascular-advanced",
    "Sistema cardiovascular - Avanzado",
    "Coronarias, sistema de conducción, anatomía de detalle y relaciones clínicas."
  ),
  createQuizConfig(
    "respiratory",
    "respiratory-basic",
    "Sistema respiratorio - Vías aéreas",
    "Recorrido del aire: cavidad nasal, faringe, laringe, tráquea, árbol bronquial y pulmones."
  ),
  createQuizConfig(
    "nervous",
    "nervous-basic",
    "Sistema nervioso - Organización general",
    "Encéfalo, tronco, médula, nervios craneales, vías sensitivas/motoras y sistema límbico."
  ),
  createQuizConfig(
    "skeletal",
    "skeletal-basic",
    "Sistema esquelético - Ejes y extremidades",
    "Cráneo, columna, caja torácica, cinturas y huesos largos; articulaciones y puntos de referencia."
  ),
  createQuizConfig(
    "muscular",
    "muscular-basic",
    "Sistema muscular - Por regiones",
    "Músculos de cabeza/cuello, tronco, miembro superior e inferior; acciones e inervación."
  ),
  createQuizConfig(
    "digestive",
    "digestive-basic",
    "Sistema digestivo - Tubo y accesorios",
    "Recorrido boca-ano: esófago, estómago, intestinos, hígado, páncreas, vías biliares."
  ),
];

export function getQuizConfig(id: string): QuizConfig | undefined {
  return quizConfigs.find((c) => c.id === id);
}

export function getQuizConfigsBySystem(system: keyof typeof questionsBySystem): QuizConfig[] {
  return quizConfigs.filter((c) => c.system === system);
}

export function getAllQuizQuestions(system: keyof typeof questionsBySystem): QuizQuestion[] {
  return questionsBySystem[system];
}

export function getRandomQuizQuestions(
  system: keyof typeof questionsBySystem,
  count: number,
  excludeIds: string[] = []
): QuizQuestion[] {
  const pool = questionsBySystem[system].filter((q) => !excludeIds.includes(q.id));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}