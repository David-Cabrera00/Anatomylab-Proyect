import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useEffect, useState } from "react";
import { dbClearLearningData, dbGetPreference, dbSetPreference } from "../utils/db";
import { useI18n, type Theme } from "../i18n";

type SettingsViewProps = {
  onLogout: () => void;
  backendConnected: boolean;
  syncStatus: "idle" | "syncing" | "synced" | "error";
  onSync: () => Promise<void>;
};

export function SettingsView({ onLogout, backendConnected, syncStatus, onSync }: SettingsViewProps) {
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
    <section className="h-full overflow-y-auto bg-canvas px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8" aria-labelledby="settings-title">
      <div className="mx-auto max-w-3xl space-y-4">
        <header className="card-stagger-enter border-b border-line pb-5 sm:pb-6">
          <p className="text-label font-semibold uppercase tracking-[0.16em] text-accent">{t("settingsEyebrow")}</p>
          <h1 id="settings-title" className="mt-3 text-display font-semibold tracking-tight text-ink sm:mt-4">{t("settingsTitle")}</h1>
          <p className="mt-3 max-w-2xl text-body leading-7 text-ink-muted">{t("settingsIntro")}</p>
        </header>

        <section className="settings-card card-stagger-enter rounded-ds-lg border border-line bg-surface p-4 shadow-ds-raised transition-all duration-200 hover:border-line-strong sm:p-6" style={{ animationDelay: "60ms" }} aria-labelledby="language-setting-title">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <h2 id="language-setting-title" className="text-title font-semibold text-ink">{t("settingsLanguageTitle")}</h2>
              <p className="mt-2 text-body text-ink-muted">{t("settingsLanguageDescription")}</p>
            </div>
            <LanguageSwitcher />
          </div>
        </section>

        <section className="settings-card card-stagger-enter rounded-ds-lg border border-line bg-surface p-4 shadow-ds-raised transition-all duration-200 hover:border-line-strong sm:p-6" style={{ animationDelay: "110ms" }} aria-labelledby="study-setting-title">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <h2 id="study-setting-title" className="text-title font-semibold text-ink">{t("settingsStudyTitle")}</h2>
              <p className="mt-2 text-body text-ink-muted">{t("settingsStudyDescription")}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={showExplanations}
              onClick={() => handleExplanationsChange(!showExplanations)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                showExplanations ? "bg-accent" : "bg-line"
              }`}
            >
              <span className="sr-only">{t("settingsStudyExplanations")}</span>
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  showExplanations ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </section>

        <section className="settings-card card-stagger-enter rounded-ds-lg border border-line bg-surface p-4 shadow-ds-raised transition-all duration-200 hover:border-line-strong sm:p-6" style={{ animationDelay: "160ms" }} aria-labelledby="theme-setting-title">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <h2 id="theme-setting-title" className="text-title font-semibold text-ink">{t("settingsThemeTitle")}</h2>
              <p className="mt-2 text-body text-ink-muted">{t("settingsThemeDescription")}</p>
            </div>
            <div className="inline-flex self-start rounded-ds-md border border-line bg-canvas-muted p-1 sm:self-auto" role="group" aria-label={t("settingsThemeTitle")}>
              {(["light", "dark"] as const).map((option: Theme) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={theme === option}
                  onClick={() => setTheme(option)}
                  className={`min-h-10 rounded-ds-sm px-4 py-2 text-label font-semibold transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
                    theme === option ? "bg-surface text-ink shadow-ds-raised scale-102" : "text-ink-muted hover:bg-surface/60 hover:text-ink"
                  }`}
                >
                  {option === "light" ? t("settingsThemeLight") : t("settingsThemeDark")}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="settings-card card-stagger-enter rounded-ds-lg border border-line bg-surface p-4 shadow-ds-raised transition-all duration-200 hover:border-line-strong sm:p-6" style={{ animationDelay: "210ms" }} aria-labelledby="sync-setting-title">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <h2 id="sync-setting-title" className="text-title font-semibold text-ink">{t("settingsSyncTitle")}</h2>
              <p className="mt-2 max-w-xl text-body text-ink-muted">
                {backendConnected ? t("settingsSyncConnected") : t("settingsSyncLocal")}
              </p>
              {syncStatus === "synced" && <p className="mt-3 text-label font-medium text-success animate-scale-check" role="status" aria-live="polite">{t("settingsSyncDone")}</p>}
              {syncStatus === "error" && <p className="mt-3 text-label font-medium text-error" role="alert">{t("settingsSyncError")}</p>}
            </div>
            <button
              type="button"
              disabled={!backendConnected || syncStatus === "syncing"}
              onClick={() => void onSync()}
              className="group flex min-h-10 items-center gap-2 rounded-ds-sm border border-line px-4 py-2 text-label font-semibold text-ink transition-all duration-150 hover:border-accent hover:bg-accent-soft active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50"
            >
              {syncStatus === "syncing" && (
                <svg className="h-4 w-4 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {syncStatus === "syncing" ? t("settingsSyncing") : t("settingsSyncButton")}
            </button>
          </div>
        </section>

        <section className="settings-card card-stagger-enter rounded-ds-lg border border-line bg-surface p-4 shadow-ds-raised transition-all duration-200 hover:border-line-strong sm:p-6" style={{ animationDelay: "260ms" }} aria-labelledby="data-setting-title">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <h2 id="data-setting-title" className="text-title font-semibold text-ink">{t("settingsDataTitle")}</h2>
              <p className="mt-2 max-w-xl text-body text-ink-muted">{t("settingsDataDescription")}</p>
              {clearStatus === "cleared" && <p className="mt-3 text-label font-medium text-success animate-scale-check" role="status" aria-live="polite">{t("settingsDataCleared")}</p>}
              {clearStatus === "error" && <p className="mt-3 text-label font-medium text-error" role="alert">{t("settingsDataError")}</p>}
            </div>
            <button type="button" onClick={handleClearLearningData} className="min-h-10 rounded-ds-sm border border-error px-4 py-2 text-label font-semibold text-error transition-all duration-150 hover:bg-error-soft active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
              {t("settingsDataClear")}
            </button>
          </div>
        </section>

        <section className="settings-card card-stagger-enter rounded-ds-lg border border-line bg-surface p-4 shadow-ds-raised transition-all duration-200 hover:border-line-strong sm:p-6" style={{ animationDelay: "310ms" }} aria-labelledby="account-setting-title">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <h2 id="account-setting-title" className="text-title font-semibold text-ink">{t("settingsAccountTitle")}</h2>
              <p className="mt-2 text-body text-ink-muted">{t("settingsAccountDescription")}</p>
            </div>
            <button type="button" onClick={onLogout} className="min-h-10 rounded-ds-sm border border-line px-4 py-2 text-label font-semibold text-ink transition-all duration-150 hover:border-accent hover:bg-accent-soft active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
              {t("settingsLogout")}
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
