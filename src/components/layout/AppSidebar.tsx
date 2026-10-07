import type { ReactNode } from "react";
import type { AnatomySystemId } from "../../config/anatomySystems";
import type { AppView } from "../../views/types";

type AppSidebarProps = {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  systems: readonly { id: AnatomySystemId; label: string }[];
  activeSystem: AnatomySystemId;
  onSystemChange: (system: AnatomySystemId) => void;
  learningContent?: ReactNode;
};

const navigationItems: Array<{ id: AppView; label: string }> = [
  { id: "home", label: "Inicio" },
  { id: "anatomy", label: "Anatom\u00eda" },
  { id: "study", label: "Estudio" },
  { id: "quiz", label: "Quiz" },
  { id: "progress", label: "Progreso" },
  { id: "profile", label: "Perfil" },
  { id: "settings", label: "Configuraci\u00f3n" },
];

export function AppSidebar({ currentView, onNavigate, systems, activeSystem, onSystemChange, learningContent }: AppSidebarProps) {
  return (
    <nav className="space-y-6 p-4" aria-label="Navegaci\u00f3n principal">
      <div className="space-y-1">
        {navigationItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => onNavigate(item.id)}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="border-t border-slate-200 pt-5">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Sistemas anat\u00f3micos
        </p>
        <div className="space-y-1">
          {systems.map((system) => {
            const isActive = currentView === "anatomy" && activeSystem === system.id;
            return (
              <button
                key={system.id}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  onNavigate("anatomy");
                  onSystemChange(system.id);
                }}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                  isActive ? "bg-slate-100 font-semibold text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {system.label}
              </button>
            );
          })}
        </div>
      </div>

      {learningContent}
    </nav>
  );
}
