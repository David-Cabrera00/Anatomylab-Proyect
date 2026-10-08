export type LocalizedLanguage = "es" | "en";

export type LocalizedText = {
  es: string;
  en?: string;
};

export type LocalizableText = string | LocalizedText;

export function getLocalizedText(value: LocalizableText, language: LocalizedLanguage): string {
  if (typeof value === "string") return value;
  return value[language] || value.es;
}
