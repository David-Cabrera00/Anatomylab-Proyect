import type { QuizConfig, QuizQuestion } from "./types";
import type { LocalizedText } from "../../i18n/localizedText";
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
  title: LocalizedText,
  description: LocalizedText
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
    { es: "Sistema cardiovascular - Fundamentos", en: "Cardiovascular system - Fundamentals" },
    { es: "Pon a prueba tu conocimiento del corazón, válvulas, grandes vasos y circulación sistémica/pulmonar.", en: "Test your knowledge of the heart, valves, major vessels, and systemic and pulmonary circulation." }
  ),
  createQuizConfig(
    "cardiovascular",
    "cardiovascular-advanced",
    { es: "Sistema cardiovascular - Avanzado", en: "Cardiovascular system - Advanced" },
    { es: "Coronarias, sistema de conducción, anatomía de detalle y relaciones clínicas.", en: "Coronary vessels, the conduction system, detailed anatomy, and clinical relationships." }
  ),
  createQuizConfig(
    "respiratory",
    "respiratory-basic",
    { es: "Sistema respiratorio - Vías aéreas", en: "Respiratory system - Airways" },
    { es: "Recorrido del aire: cavidad nasal, faringe, laringe, tráquea, árbol bronquial y pulmones.", en: "Follow the path of air through the nasal cavity, pharynx, larynx, trachea, bronchial tree, and lungs." }
  ),
  createQuizConfig(
    "nervous",
    "nervous-basic",
    { es: "Sistema nervioso - Organización general", en: "Nervous system - General organization" },
    { es: "Encéfalo, tronco, médula, nervios craneales, vías sensitivas/motoras y sistema límbico.", en: "Brain, brainstem, spinal cord, cranial nerves, sensory and motor pathways, and limbic system." }
  ),
  createQuizConfig(
    "skeletal",
    "skeletal-basic",
    { es: "Sistema esquelético - Ejes y extremidades", en: "Skeletal system - Axial and appendicular skeleton" },
    { es: "Cráneo, columna, caja torácica, cinturas y huesos largos; articulaciones y puntos de referencia.", en: "Skull, spine, rib cage, girdles, and long bones; joints and anatomical landmarks." }
  ),
  createQuizConfig(
    "muscular",
    "muscular-basic",
    { es: "Sistema muscular - Por regiones", en: "Muscular system - By region" },
    { es: "Músculos de cabeza/cuello, tronco, miembro superior e inferior; acciones e inervación.", en: "Muscles of the head and neck, trunk, upper and lower limbs; actions and innervation." }
  ),
  createQuizConfig(
    "digestive",
    "digestive-basic",
    { es: "Sistema digestivo - Tubo y accesorios", en: "Digestive system - Tract and accessory organs" },
    { es: "Recorrido boca-ano: esófago, estómago, intestinos, hígado, páncreas, vías biliares.", en: "Follow the digestive tract from mouth to anus: esophagus, stomach, intestines, liver, pancreas, and bile ducts." }
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
