import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useI18n, type Theme } from "../i18n";

export function SettingsView() {
  const { theme, setTheme, t } = useI18n();

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
