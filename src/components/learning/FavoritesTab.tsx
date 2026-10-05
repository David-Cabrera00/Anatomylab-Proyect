import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export interface FavoritesTabProps {
  system: string;
  onFocus: (anatomyId: string) => void;
}

interface Favorite {
  id: string;
  system: string;
  anatomy_id: string;
  created_at: string;
  notes: string | null;
}

const formatDate = (iso: string): string => {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export function FavoritesTab({ system, onFocus }: FavoritesTabProps) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, [system]);

  async function loadFavorites() {
    setLoading(true);
    try {
      const data = await invoke("db_get_favorites", { system });
      setFavorites(data as Favorite[]);
    } catch (e) {
      console.error("Error loading favorites:", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(fav: Favorite) {
    await invoke("db_remove_favorite", { system: fav.system, anatomyId: fav.anatomy_id });
    setFavorites((prev) => prev.filter((f) => f.id !== fav.id));
  }

  async function handleFocus(fav: Favorite) {
    onFocus(fav.anatomy_id);
  }

  const formatDate = (iso: string): string => {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-slate-500 text-sm">
        Cargando favoritos...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 text-sm">
        No hay favoritos guardados.<br />
        <span className="text-xs">Selecciona una estructura y guárdala como favorita.</span>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto">
      {favorites.map((fav) => (
        <div
          key={fav.id}
          className="rounded-lg border border-slate-200 bg-white p-3 flex items-center justify-between gap-2"
        >
          <button
            onClick={() => handleFocus(fav)}
            className="flex-1 text-left text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            {fav.anatomy_id}
          </button>
          <div className="flex items-center gap-1">
            {fav.notes && (
              <span className="text-xs text-slate-500 px-2 py-0.5 bg-slate-50 rounded">
                {fav.notes}
              </span>
            )}
            <span className="text-xs text-slate-400">{formatDate(fav.created_at)}</span>
            <button
              onClick={() => handleRemove(fav)}
              className="text-slate-400 hover:text-red-500"
              title="Eliminar favorito"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}