import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useEffect, useState } from "react";
import { dbClearLearningData, dbGetPreference, dbSetPreference } from "../utils/db";
import { useI18n, type Theme } from "../i18n";

export function SettingsView() {
  const { theme, setTheme, t } = useI18n();
  const [showExplanations, setShowExplanations] = useState(true);
  const [clearStatus, setClearStatus] = useState<"idle" | "cleared" | "error">("idle");

  useEffect(() => {
    void dbGetPreference("study.showExplanations")
      .then((stored) => { if (stored !== null) setShowExplanations(stored !== "false"); })
      .catch(() => { /* Default remains enabled. */ });
  }, []);

  const handleExplanationsChange = (enabled: boolean) => {
    setShowExplanations(enabled);
    void dbSetPreference("study.showExplanations", String(enabled)).catch(() => {
      // Keep the in-memory setting when SQLite is unavailable.
    });
  };

  const handleClearLearningData = () => {
    if (!window.confirm(t("settingsDataConfirm"))) return;
    setClearStatus("idle");
    void dbClearLearningData()
      .then(() => setClearStatus("cleared"))
      .catch(() => setClearStatus("error"));
  };

  return (
    <section className="h-full overflow-y-auto bg-canvas px-6 py-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-3xl">
        <header className="border-b border-line pb-6">
          <p className="text-label font-semibold uppercase tracking-[0.16em] text-accent">{t("settingsEyebrow")}</p>
          <h1 className="mt-4 text-display font-semibold tracking-tight text-ink">{t("settingsTitle")}</h1>
          <p className="mt-3 max-w-2xl text-body leading-7 text-ink-muted">{t("settingsIntro")}</p>
        </header>

        <section className="mt-8 border border-line bg-surface p-6 shadow-ds-raised" aria-labelledby="language-setting-title">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h2 id="language-setting-title" className="text-title font-semibold text-ink">{t("settingsLanguageTitle")}</h2>
              <p className="mt-2 text-body text-ink-muted">{t("settingsLanguageDescription")}</p>
            </div>
            <LanguageSwitcher />
          </div>
        </section>

        <section className="mt-5 border border-line bg-surface p-6 shadow-ds-raised" aria-labelledby="study-setting-title">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h2 id="study-setting-title" className="text-title font-semibold text-ink">{t("settingsStudyTitle")}</h2>
              <p className="mt-2 text-body text-ink-muted">{t("settingsStudyDescription")}</p>
            </div>
            <label className="inline-flex cursor-pointer items-center gap-3 text-label font-semibold text-ink">
              <input
                type="checkbox"
                checked={showExplanations}
                onChange={(event) => handleExplanationsChange(event.target.checked)}
                className="h-4 w-4 accent-[var(--color-accent)]"
              />
              {t("settingsStudyExplanations")}
            </label>
          </div>
        </section>

        <section className="mt-5 border border-line bg-surface p-6 shadow-ds-raised" aria-labelledby="data-setting-title">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h2 id="data-setting-title" className="text-title font-semibold text-ink">{t("settingsDataTitle")}</h2>
              <p className="mt-2 max-w-xl text-body text-ink-muted">{t("settingsDataDescription")}</p>
              {clearStatus === "cleared" && <p className="mt-3 text-label font-medium text-success">{t("settingsDataCleared")}</p>}
              {clearStatus === "error" && <p className="mt-3 text-label font-medium text-error">{t("settingsDataError")}</p>}
            </div>
            <button type="button" onClick={handleClearLearningData} className="border border-error px-3 py-2 text-label font-semibold text-error transition-colors hover:bg-error-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error">
              {t("settingsDataClear")}
            </button>
          </div>
        </section>

        <section className="mt-5 border border-line bg-surface p-6 shadow-ds-raised" aria-labelledby="theme-setting-title">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h2 id="theme-setting-title" className="text-title font-semibold text-ink">{t("settingsThemeTitle")}</h2>
              <p className="mt-2 text-body text-ink-muted">{t("settingsThemeDescription")}</p>
            </div>
            <div className="inline-flex rounded-ds-md border border-line bg-canvas-muted p-1" role="group" aria-label={t("settingsThemeTitle")}>
              {(["light", "dark"] as const).map((option: Theme) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={theme === option}
                  onClick={() => setTheme(option)}
                  className={`rounded-ds-sm px-3 py-2 text-label font-semibold transition-colors ${theme === option ? "bg-surface text-ink shadow-ds-raised" : "text-ink-muted hover:text-ink"}`}
                >
                  {option === "light" ? t("settingsThemeLight") : t("settingsThemeDark")}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
