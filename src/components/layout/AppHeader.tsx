import type { ReactNode } from "react";
import type { AppView } from "../../views/types";

type AppHeaderProps = {
  currentView: AppView;
  search?: ReactNode;
};

const viewTitles: Record<AppView, string> = {
  home: "Inicio",
  anatomy: "Anatom\u00eda",
  study: "Estudio",
  quiz: "Quiz",
  progress: "Progreso",
  profile: "Perfil",
  settings: "Configuraci\u00f3n",
};

export function AppHeader({ currentView, search }: AppHeaderProps) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex min-w-0 items-center gap-6">
        <div className="shrink-0">
          <h1 className="text-xl font-semibold tracking-tight">AnatomyLab AI</h1>
          <p className="text-xs text-slate-500">{viewTitles[currentView]}</p>
        </div>
        {search}
      </div>

      <div className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
        DC
      </div>
    </div>
  );
}
