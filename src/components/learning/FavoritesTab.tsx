import { useEffect, useState } from "react";

import { dbGetFavorites, dbRemoveFavorite, type Favorite } from "../../utils/db";
import { getAnatomyDisplayName } from "../../utils/anatomyDisplayName";
import { useI18n } from "../../i18n";
import { ErrorState, LoadingState } from "../ui";

export interface FavoritesTabProps { system: string; onFocus: (anatomyId: string) => void; refreshKey?: number; }

const formatDate = (iso: string, language: "es" | "en"): string => new Date(iso).toLocaleDateString(language === "en" ? "en-US" : "es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });

export function FavoritesTab({ system, onFocus, refreshKey = 0 }: FavoritesTabProps) {
  const { language, t } = useI18n();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setHasError(false);
    dbGetFavorites(system)
      .then((data) => { if (!cancelled) setFavorites(data); })
      .catch((error) => { console.error("Error loading favorites:", error); if (!cancelled) setHasError(true); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [refreshKey, retryKey, system]);

  async function handleRemove(favorite: Favorite) {
    try {
      await dbRemoveFavorite(favorite.system, favorite.anatomy_id);
      setFavorites((current) => current.filter((item) => item.id !== favorite.id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  }

  if (loading) return <LoadingState label={t("favoritesLoading")} />;
  if (hasError) return <ErrorState title={t("dataLoadErrorTitle")} description={t("favoritesLoadError")} retryLabel={t("commonRetry")} onRetry={() => setRetryKey((key) => key + 1)} />;
  if (favorites.length === 0) return <div className="rounded-ds-md border border-line border-l-2 border-l-accent bg-accent-soft/30 px-4 py-6 text-body text-ink-muted"><p className="font-medium text-ink">{t("favoritesEmpty")}</p><p className="mt-1 text-label leading-5">{t("favoritesEmptyHint")}</p></div>;

  return (
    <div className="max-h-[400px] space-y-2 overflow-y-auto">
      {favorites.map((favorite) => (
        <div key={favorite.id} className="group flex flex-col items-stretch gap-3 rounded-ds-md border border-line bg-surface-raised p-3 transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-ds-raised sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={() => onFocus(favorite.anatomy_id)} className="min-w-0 flex-1 text-left text-body font-medium text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-raised">{getAnatomyDisplayName(favorite.anatomy_id, language)}</button>
          <div className="flex min-w-0 items-center justify-between gap-2 sm:justify-end">
            {favorite.notes && <span className="max-w-[12rem] truncate rounded-ds-sm bg-canvas-muted px-2 py-0.5 text-caption text-ink-muted" title={favorite.notes}>{favorite.notes}</span>}
            <span className="shrink-0 text-caption text-ink-subtle">{formatDate(favorite.created_at, language)}</span>
            <button type="button" onClick={() => void handleRemove(favorite)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-ds-sm text-lg leading-none text-ink-subtle transition-colors hover:bg-error-soft hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error" title={t("favoritesRemove")} aria-label={t("favoritesRemove")}>×</button>
          </div>
        </div>
      ))}
    </div>
  );
}
