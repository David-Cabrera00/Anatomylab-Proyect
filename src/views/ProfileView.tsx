import { FavoritesTab } from "../components/learning";
import type { AnatomySystemId } from "../config/anatomySystems";

type ProfileViewProps = {
  system: AnatomySystemId;
  onFocusFavorite: (anatomyId: string) => void;
  refreshKey?: number;
};

export function ProfileView({ system, onFocusFavorite, refreshKey = 0 }: ProfileViewProps) {
  return (
    <section className="h-full overflow-y-auto bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Perfil</h1>
        <p className="mt-1 text-sm text-slate-500">Tus estructuras anatómicas guardadas.</p>

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">Favoritos</h2>
          <p className="mt-1 text-sm text-slate-500">Sistema activo: {system}</p>
          <div className="mt-4">
            <FavoritesTab
              system={system}
              onFocus={onFocusFavorite}
              refreshKey={refreshKey}
            />
          </div>
        </section>
      </div>
    </section>
  );
}
