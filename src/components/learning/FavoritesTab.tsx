import { useEffect, useState } from "react";

import { dbGetFavorites, dbRemoveFavorite, type Favorite } from "../../utils/db";

export interface FavoritesTabProps { system: string; onFocus: (anatomyId: string) => void; refreshKey?: number; }

const formatDate = (iso: string): string => new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });

export function FavoritesTab({ system, onFocus, refreshKey = 0 }: FavoritesTabProps) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    dbGetFavorites(system)
      .then((data) => { if (!cancelled) setFavorites(data); })
      .catch((error) => console.error("Error loading favorites:", error))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [refreshKey, system]);

  async function handleRemove(favorite: Favorite) {
    try {
      await dbRemoveFavorite(favorite.system, favorite.anatomy_id);
      setFavorites((current) => current.filter((item) => item.id !== favorite.id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  }

  if (loading) return <div className="flex items-center justify-center py-8 text-sm text-slate-500">Cargando favoritos...</div>;
  if (favorites.length === 0) return <div className="py-8 text-center text-sm text-slate-500">No hay favoritos guardados.<br /><span className="text-xs">Selecciona una estructura y guárdala como favorita.</span></div>;

  return (
    <div className="max-h-[400px] space-y-2 overflow-y-auto">
      {favorites.map((favorite) => (
        <div key={favorite.id} className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white p-3">
          <button onClick={() => onFocus(favorite.anatomy_id)} className="flex-1 text-left text-sm font-medium text-slate-700 hover:text-slate-900">{favorite.anatomy_id}</button>
          <div className="flex items-center gap-1">
            {favorite.notes && <span className="rounded bg-slate-50 px-2 py-0.5 text-xs text-slate-500">{favorite.notes}</span>}
            <span className="text-xs text-slate-400">{formatDate(favorite.created_at)}</span>
            <button onClick={() => void handleRemove(favorite)} className="text-slate-400 hover:text-red-500" title="Eliminar favorito">×</button>
          </div>
        </div>
      ))}
    </div>
  );
}
