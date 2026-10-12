import { FavoritesTab } from "../components/learning";
import type { AnatomySystemId } from "../config/anatomySystems";
import { useI18n } from "../i18n";

type ProfileViewProps = {
  system: AnatomySystemId;
  onFocusFavorite: (anatomyId: string) => void;
  refreshKey?: number;
};

export function ProfileView({ system, onFocusFavorite, refreshKey = 0 }: ProfileViewProps) {
  const { t } = useI18n();

  return (
    <section className="profile-page h-full overflow-y-auto bg-canvas px-6 py-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-5xl">
        <header className="profile-hero border border-line bg-surface px-6 py-6 shadow-ds-raised sm:px-8">
          <p className="text-label font-semibold uppercase tracking-[0.16em] text-accent">{t("profileEyebrow")}</p>
          <h1 className="mt-3 text-display font-semibold tracking-tight text-ink">{t("profileTitle")}</h1>
          <p className="mt-2 max-w-2xl text-body leading-6 text-ink-muted">{t("profileIntro")}</p>
        </header>

        <section className="profile-card mt-6 border border-line bg-surface p-5 shadow-ds-raised sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
            <div>
              <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">01</p>
              <h2 className="mt-2 text-title font-semibold tracking-tight text-ink">{t("profileFavoritesTitle")}</h2>
            </div>
            <p className="text-label text-ink-muted">{t("profileActiveSystem")}: {system}</p>
          </div>
          <div className="mt-4">
            <FavoritesTab system={system} onFocus={onFocusFavorite} refreshKey={refreshKey} />
          </div>
        </section>
      </div>
    </section>
  );
}
