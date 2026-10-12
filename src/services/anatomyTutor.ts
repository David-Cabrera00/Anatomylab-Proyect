import type { AnatomySystemId } from "../config/anatomySystems";
import type { AnatomyStructureData } from "../data/anatomyStructureData";

export type AnatomyTutorContext = {
  system: AnatomySystemId;
  structureName: string;
  anatomyId?: string;
  data: AnatomyStructureData | null;
};

export type AnatomyTutorMessage = {
  role: "user" | "assistant";
  text: string;
};

export type AnatomyTutorAnswerLabels = {
  noFunction: string;
  noLocation: string;
  functionHint: string;
};

export type AnatomyTutorProvider = {
  answer: (question: string, context: AnatomyTutorContext) => Promise<string>;
};

export function createLocalAnatomyTutor(
  getText: (value: AnatomyStructureData["description"] | undefined) => string | null,
  labels: AnatomyTutorAnswerLabels,
  language: "es" | "en",
): AnatomyTutorProvider {
  return {
    async answer(question, context) {
      const normalized = question.toLocaleLowerCase(language === "es" ? "es-ES" : "en-US");
      const description = getText(context.data?.description) ?? "";
      const functionText = getText(context.data?.function);
      const locationText = getText(context.data?.location);

      if (normalized.includes(language === "es" ? "función" : "function")) {
        return functionText ?? labels.noFunction;
      }
      if (
        normalized.includes(language === "es" ? "localiza" : "located") ||
        normalized.includes(language === "es" ? "dónde" : "where")
      ) {
        return locationText ?? labels.noLocation;
      }
      if (
        normalized.includes(language === "es" ? "qué es" : "what is") ||
        normalized.includes("describe")
      ) {
        return description;
      }
      return `${description}${functionText ? ` ${labels.functionHint} ${functionText}` : ""}`;
    },
  };
}
