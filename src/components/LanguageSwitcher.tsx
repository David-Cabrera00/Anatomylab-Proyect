import { useI18n, type Language } from "../i18n";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="inline-flex items-center rounded-ds-md border border-line bg-surface p-1" aria-label={t("settingsLanguageTitle")}>
      {(["es", "en"] as const).map((option: Language) => (
        <button
          key={option}
          type="button"
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
          className={`rounded-ds-sm px-3 py-1.5 text-caption font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface ${
            language === option ? "bg-accent text-white shadow-ds-raised" : "text-ink-muted hover:bg-canvas-muted hover:text-ink"
          }`}
        >
          {option === "es" ? t("languageSpanish") : t("languageEnglish")}
        </button>
      ))}
    </div>
  );
}
