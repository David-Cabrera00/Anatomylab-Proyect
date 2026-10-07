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
    <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex min-w-0 items-center gap-6">
        <div className="shrink-0">
          <h1 className="text-xl font-semibold tracking-tight">{t("appName")}</h1>
          <p className="text-xs text-slate-500">{t(viewTitleKeys[currentView])}</p>
        </div>
        {search}
      </div>

      <div className="ml-4 flex shrink-0 items-center gap-3">
        <LanguageSwitcher />
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          DC
        </div>
      </div>
    </div>
  );
}
