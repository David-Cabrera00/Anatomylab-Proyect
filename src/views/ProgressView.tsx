import { HistoryTab, ProgressTab } from "../components/learning";
import type { AnatomySystemId } from "../config/anatomySystems";

export function ProgressView({ system }: { system: AnatomySystemId }) {
  return (
    <section className="h-full overflow-y-auto bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <section>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Progreso</h1>
          <p className="mt-1 text-sm text-slate-500">Rendimiento y maestría del sistema activo.</p>
          <div className="mt-6">
            <ProgressTab system={system} />
          </div>
        </section>

        <section className="mt-8 border-t border-slate-200 pt-8">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">Historial de quiz</h2>
          <p className="mt-1 text-sm text-slate-500">Sesiones recientes del sistema activo.</p>
          <div className="mt-4">
            <HistoryTab system={system} />
          </div>
        </section>
      </div>
    </section>
  );
}
