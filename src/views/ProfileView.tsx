import { FavoritesTab } from "../components/learning";
import type { AnatomySystemId } from "../config/anatomySystems";
import { systemTranslationKeys, useI18n } from "../i18n";
import { getUserInitials, type CurrentUser } from "../utils/user";

type ProfileViewProps = {
  system: AnatomySystemId;
  onFocusFavorite: (anatomyId: string) => void;
  refreshKey?: number;
  user?: CurrentUser;
};

export function ProfileView({ system, onFocusFavorite, refreshKey = 0, user }: ProfileViewProps) {
  const { t, language } = useI18n();
  const initials = getUserInitials(user?.name, user?.email);
  const displayName = user?.name || (language === "en" ? "Student" : "Estudiante");
  const displayEmail = user?.email || (language === "en" ? "Local mode" : "Modo local");

  return (
    <section className="profile-page h-full overflow-y-auto bg-canvas px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8" aria-labelledby="profile-title">
      <div className="mx-auto max-w-5xl space-y-5 sm:space-y-6">
        <header className="profile-hero rounded-ds-lg border border-line bg-surface px-5 py-5 shadow-ds-raised sm:px-8 sm:py-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-title font-bold text-white shadow-ds-raised sm:h-20 sm:w-20 sm:text-display"
                aria-label={displayName}
                role="img"
              >
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-label font-semibold uppercase tracking-[0.16em] text-accent">{t("profileEyebrow")}</p>
                <h1 id="profile-title" className="mt-1 truncate text-heading font-semibold tracking-tight text-ink sm:text-display">{displayName}</h1>
                <p className="truncate text-body text-ink-muted">{displayEmail}</p>
              </div>
            </div>

            <div className="sm:shrink-0">
              {user?.isLocal ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-raised px-3 py-1.5 text-caption font-medium text-ink-muted">
                  <span className="h-2 w-2 rounded-full bg-ink-subtle" />
                  {t("settingsSyncLocal")}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success-soft/30 px-3 py-1.5 text-caption font-medium text-success">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  {t("settingsSyncConnected")}
                </span>
              )}
            </div>
          </div>
        </header>

        <section className="profile-card rounded-ds-lg border border-line bg-surface p-4 shadow-ds-raised sm:p-6" aria-labelledby="profile-favorites-title">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
            <div>
              <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">01</p>
              <h2 id="profile-favorites-title" className="mt-2 text-title font-semibold tracking-tight text-ink">{t("profileFavoritesTitle")}</h2>
            </div>
            <p className="text-label text-ink-muted">{t("profileActiveSystem")}: <span className="font-medium text-ink">{t(systemTranslationKeys[system])}</span></p>
          </div>
          <div className="mt-4">
            <FavoritesTab system={system} onFocus={onFocusFavorite} refreshKey={refreshKey} />
          </div>
        </section>
      </div>
    </section>
  );
}
