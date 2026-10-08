import type { ReactNode } from "react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useI18n, type TranslationKey } from "../../i18n";
import type { AppView } from "../../views/types";

type AppHeaderProps = {
  currentView: AppView;
  search?: ReactNode;
};

const viewTitleKeys: Record<AppView, TranslationKey> = {
  login: "authLoginTitle",
  register: "authRegisterTitle",
  home: "navHome",
  anatomy: "navAnatomy",
  study: "navStudy",
  quiz: "navQuiz",
  progress: "navProgress",
  profile: "navProfile",
  settings: "navSettings",
};

export function AppHeader({ currentView, search }: AppHeaderProps) {
  const { t } = useI18n();

  return (
    <div className="flex h-16 items-center justify-between border-b border-line bg-surface px-6">
      <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-6">
        <div className="shrink-0">
          <h1 className="text-heading font-semibold tracking-tight text-ink">{t("appName")}</h1>
          <p className="text-caption text-ink-subtle">{t(viewTitleKeys[currentView])}</p>
        </div>
        {search}
      </div>

      <div className="ml-4 flex shrink-0 items-center gap-2 lg:gap-3">
        <LanguageSwitcher />
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-caption font-semibold text-white"
          aria-label={t("navProfile")}
          title={t("navProfile")}
        >
          DC
        </div>
      </div>
    </div>
  );
}
