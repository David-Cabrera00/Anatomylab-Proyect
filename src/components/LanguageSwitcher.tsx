import { useI18n, type Language } from "../i18n";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5" aria-label="Language">
      {(["es", "en"] as const).map((option: Language) => (
        <button
          key={option}
          type="button"
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
            language === option ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          {option === "es" ? t("languageSpanish") : t("languageEnglish")}
        </button>
      ))}
    </div>
  );
}
