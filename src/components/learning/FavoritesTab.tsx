import { useEffect, useState } from "react";

import { dbGetFavorites, dbRemoveFavorite, type Favorite } from "../../utils/db";
import { getAnatomyDisplayName } from "../../utils/anatomyDisplayName";
import { useI18n } from "../../i18n";

export interface FavoritesTabProps { system: string; onFocus: (anatomyId: string) => void; refreshKey?: number; }

const formatDate = (iso: string, language: "es" | "en"): string => new Date(iso).toLocaleDateString(language === "en" ? "en-US" : "es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });

export function FavoritesTab({ system, onFocus, refreshKey = 0 }: FavoritesTabProps) {
  const { language, t } = useI18n();
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

  if (loading) return <div className="flex items-center justify-center py-8 text-body text-ink-muted">{t("favoritesLoading")}</div>;
  if (favorites.length === 0) return <div className="border-l-2 border-accent bg-accent-soft/30 px-4 py-6 text-body text-ink-muted"><p className="font-medium text-ink">{t("favoritesEmpty")}</p><p className="mt-1 text-label">{t("favoritesEmptyHint")}</p></div>;

  return (
    <div className="max-h-[400px] space-y-2 overflow-y-auto">
      {favorites.map((favorite) => (
        <div key={favorite.id} className="group flex items-center justify-between gap-3 border border-line bg-surface-raised p-3 transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-ds-raised">
          <button onClick={() => onFocus(favorite.anatomy_id)} className="min-w-0 flex-1 text-left text-body font-medium text-ink transition-colors hover:text-accent">{getAnatomyDisplayName(favorite.anatomy_id, language)}</button>
          <div className="flex items-center gap-1">
            {favorite.notes && <span className="rounded-ds-sm bg-canvas-muted px-2 py-0.5 text-caption text-ink-muted">{favorite.notes}</span>}
            <span className="text-caption text-ink-subtle">{formatDate(favorite.created_at, language)}</span>
            <button onClick={() => void handleRemove(favorite)} className="text-ink-subtle transition-colors hover:text-error" title={t("favoritesRemove")}>×</button>
          </div>
        </div>
      ))}
    </div>
  );
}
