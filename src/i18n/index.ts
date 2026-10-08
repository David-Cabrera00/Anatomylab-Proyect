import { createContext, createElement, useContext, useMemo, useState, type ReactNode } from "react";

import { en } from "./en";
import { es } from "./es";
export { getLocalizedText } from "./localizedText";
export type { LocalizedLanguage, LocalizedText, LocalizableText } from "./localizedText";

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

export const systemFullNameTranslationKeys: Record<string, TranslationKey> = {
  cardiovascular: "systemFullCardiovascular",
  respiratory: "systemFullRespiratory",
  nervous: "systemFullNervous",
  skeletal: "systemFullSkeletal",
  muscular: "systemFullMuscular",
  digestive: "systemFullDigestive",
};

export const anatomyLayerTranslationKeys: Record<string, TranslationKey> = {
  general: "anatomyGeneral",
  heart: "anatomyHeart",
  arteries: "anatomyArteries",
  veins: "anatomyVeins",
  lungs: "anatomyLungs",
  airways: "anatomyAirways",
  "upper-airway": "anatomyUpperAirway",
  "nervous-central": "anatomyCentral",
  "nervous-peripheral": "anatomyPeripheral",
  "nervous-sense": "anatomySenses",
  "skeletal-axial": "anatomyAxial",
  "skeletal-appendicular": "anatomyAppendicular",
  "muscular-head-neck": "anatomyHeadNeck",
  "muscular-trunk": "anatomyTrunk",
  "muscular-upper-limb": "anatomyUpperLimb",
  "muscular-lower-limb": "anatomyLowerLimb",
  "digestive-tract": "anatomyDigestiveTract",
  "digestive-accessory": "anatomyDigestiveAccessory",
  complete: "anatomyComplete",
};

export const systemDescriptionTranslationKeys: Record<string, TranslationKey> = {
  cardiovascular: "systemDescriptionCardiovascular",
  respiratory: "systemDescriptionRespiratory",
  nervous: "systemDescriptionNervous",
  skeletal: "systemDescriptionSkeletal",
  muscular: "systemDescriptionMuscular",
  digestive: "systemDescriptionDigestive",
};

export const anatomyLegendTranslationKeys: Record<string, TranslationKey> = {
  "cardiovascular.0": "anatomyHeart",
  "cardiovascular.1": "anatomyArteries",
  "cardiovascular.2": "anatomyVeins",
  "respiratory.0": "anatomyLungs",
  "respiratory.1": "anatomyAirways",
  "respiratory.2": "anatomyUpperAirway",
  "nervous.0": "anatomyCentral",
  "nervous.1": "anatomyPeripheral",
  "nervous.2": "anatomySenses",
  "skeletal.0": "anatomyAxial",
  "skeletal.1": "anatomyAppendicular",
  "muscular.0": "anatomyHeadNeck",
  "muscular.1": "anatomyTrunk",
  "muscular.2": "anatomyUpperLimb",
  "muscular.3": "anatomyLowerLimb",
  "digestive.0": "anatomyDigestiveTract",
  "digestive.1": "anatomyDigestiveAccessory",
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
