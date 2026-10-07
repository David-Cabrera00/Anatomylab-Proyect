import { createContext, createElement, useContext, useMemo, useState, type ReactNode } from "react";

import { en } from "./en";
import { es } from "./es";

export type Language = "es" | "en";
export type TranslationKey = keyof typeof es;

export const systemTranslationKeys: Record<string, TranslationKey> = {
  cardiovascular: "systemCardiovascular",
  respiratory: "systemRespiratory",
  nervous: "systemNervous",
  skeletal: "systemSkeletal",
  muscular: "systemMuscular",
  digestive: "systemDigestive",
};

const LANGUAGE_STORAGE_KEY = "anatomylab.language";

const dictionaries = { es, en } as const;

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "es";

  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored === "en" ? "en" : "es";
  } catch {
    return "es";
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // The UI remains usable if localStorage is unavailable.
    }
  };

  const value = useMemo<I18nContextValue>(() => ({
    language,
    setLanguage,
    t: (key) => dictionaries[language][key],
  }), [language]);

  return createElement(I18nContext.Provider, { value }, children);
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
