import { useEffect, useState } from "react";
import { FavoritesTab } from "../components/learning";
import type { AnatomySystemId } from "../config/anatomySystems";
import { systemTranslationKeys, useI18n, type TranslationKey } from "../i18n";
import { getUserInitials, type CurrentUser } from "../utils/user";
import { dbGetFavorites, dbGetPreference, dbGetQuizHistory, dbSetPreference } from "../utils/db";

type ProfileViewProps = {
  system: AnatomySystemId;
  onFocusFavorite: (anatomyId: string) => void;
  refreshKey?: number;
  user?: CurrentUser;
};

type Specialty = "general" | "physio" | "nursing" | "biomed";
type AvatarTone = "teal" | "blue" | "emerald" | "violet";

const specialties: Array<{ id: Specialty; labelKey: TranslationKey }> = [
  { id: "general", labelKey: "profileSpecialtyGeneral" },
  { id: "physio", labelKey: "profileSpecialtyPhysio" },
  { id: "nursing", labelKey: "profileSpecialtyNursing" },
  { id: "biomed", labelKey: "profileSpecialtyBiomed" },
];

const avatarTones: Array<{ id: AvatarTone; bgClass: string; hex: string }> = [
  { id: "teal", bgClass: "bg-[#176075]", hex: "#176075" },
  { id: "blue", bgClass: "bg-[#1d4ed8]", hex: "#1d4ed8" },
  { id: "emerald", bgClass: "bg-[#047857]", hex: "#047857" },
  { id: "violet", bgClass: "bg-[#6d28d9]", hex: "#6d28d9" },
];

export function ProfileView({ system, onFocusFavorite, refreshKey = 0, user }: ProfileViewProps) {
  const { t, language } = useI18n();
  const initials = getUserInitials(user?.name, user?.email);
  const displayName = user?.name || (language === "en" ? "Student" : "Estudiante");
  const displayEmail = user?.email || (language === "en" ? "Local mode" : "Modo local");

  const [specialty, setSpecialty] = useState<Specialty>(() => {
    return (localStorage.getItem("anatomylab.profile_specialty") as Specialty) || "general";
  });

  const [avatarTone, setAvatarTone] = useState<AvatarTone>(() => {
    return (localStorage.getItem("anatomylab.profile_avatar_tone") as AvatarTone) || "teal";
  });

  const [favoritesCount, setFavoritesCount] = useState<number>(0);
  const [quizzesCount, setQuizzesCount] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;
    void dbGetPreference("profile_specialty").then((stored) => {
      if (!cancelled && stored && ["general", "physio", "nursing", "biomed"].includes(stored)) {
        setSpecialty(stored as Specialty);
      }
    }).catch(() => { /* fallback remains usable */ });

    void dbGetPreference("profile_avatar_tone").then((stored) => {
      if (!cancelled && stored && ["teal", "blue", "emerald", "violet"].includes(stored)) {
        setAvatarTone(stored as AvatarTone);
      }
    }).catch(() => { /* fallback remains usable */ });

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([
      dbGetFavorites().catch(() => []),
      dbGetQuizHistory().catch(() => []),
    ]).then(([favs, quizzes]) => {
      if (!cancelled) {
        setFavoritesCount(favs.length);
        setQuizzesCount(quizzes.length);
      }
    });
    return () => { cancelled = true; };
  }, [refreshKey]);

  const handleSelectSpecialty = (next: Specialty) => {
    setSpecialty(next);
    localStorage.setItem("anatomylab.profile_specialty", next);
    void dbSetPreference("profile_specialty", next).catch(() => {});
  };

  const handleSelectTone = (next: AvatarTone) => {
    setAvatarTone(next);
    localStorage.setItem("anatomylab.profile_avatar_tone", next);
    void dbSetPreference("profile_avatar_tone", next).catch(() => {});
  };

  const currentTone = avatarTones.find((item) => item.id === avatarTone) ?? avatarTones[0];

  return (
    <section className="profile-page h-full overflow-y-auto bg-canvas px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8" aria-labelledby="profile-title">
      <div className="mx-auto max-w-5xl space-y-5 sm:space-y-6">
        
        {/* Cabecera / Hero de Identidad */}
        <header className="profile-hero rounded-ds-lg border border-line bg-surface px-5 py-5 shadow-ds-raised sm:px-8 sm:py-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${currentTone.bgClass} text-title font-bold text-white shadow-ds-raised transition-all duration-200 sm:h-20 sm:w-20 sm:text-display`}
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

        {/* Panel de Estadísticas y Personalización */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          
          {/* Card Stat 1: Favoritos */}
          <div className="flex items-center gap-4 rounded-ds-lg border border-line bg-surface p-4 shadow-ds-raised">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M5 3.5A1.5 1.5 0 0 1 6.5 2h7A1.5 1.5 0 0 1 15 3.5V17l-5-3-5 3V3.5Z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-caption font-medium text-ink-muted">{t("profileStatFavorites")}</p>
              <p className="text-title font-bold text-ink">{favoritesCount}</p>
            </div>
          </div>

          {/* Card Stat 2: Quizzes */}
          <div className="flex items-center gap-4 rounded-ds-lg border border-line bg-surface p-4 shadow-ds-raised">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <circle cx="10" cy="10" r="7.5" />
                <path d="m7 10 2 2 4-4" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-caption font-medium text-ink-muted">{t("profileStatQuizzes")}</p>
              <p className="text-title font-bold text-ink">{quizzesCount}</p>
            </div>
          </div>

          {/* Card Stat 3: Sistema Activo */}
          <div className="flex items-center gap-4 rounded-ds-lg border border-line bg-surface p-4 shadow-ds-raised">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M3 10h3l2.5-6 3 12 2.5-6h3" />
              </svg>
            </div>
            <div className="min-w-0 truncate">
              <p className="text-caption font-medium text-ink-muted">{t("profileStatSystem")}</p>
              <p className="truncate text-title font-bold text-ink">{t(systemTranslationKeys[system])}</p>
            </div>
          </div>

        </div>

        {/* Sección de Preferencias del Estudiante */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          
          {/* Área de Formación */}
          <section className="rounded-ds-lg border border-line bg-surface p-5 shadow-ds-raised" aria-labelledby="profile-specialty-title">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-accent" aria-hidden="true">
                <path d="M10 2 2 6l8 4 8-4-8-4Z" />
                <path d="m4 11 6 3 6-3" />
                <path d="m4 14 6 3 6-3" />
              </svg>
              <h2 id="profile-specialty-title" className="text-heading font-semibold text-ink">{t("profileSpecialtyTitle")}</h2>
            </div>
            <p className="mt-1 text-caption text-ink-muted">{language === "en" ? "Select your medical study focus" : "Selecciona tu enfoque de estudio"}</p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {specialties.map((item) => {
                const isActive = specialty === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSpecialty(item.id)}
                    aria-pressed={isActive}
                    className={`rounded-full border px-3.5 py-1.5 text-label font-medium transition-all duration-150 ${
                      isActive
                        ? "border-accent bg-accent text-white shadow-ds-raised"
                        : "border-line bg-surface-raised text-ink-muted hover:border-accent/40 hover:text-ink"
                    }`}
                  >
                    {t(item.labelKey)}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Color del Avatar */}
          <section className="rounded-ds-lg border border-line bg-surface p-5 shadow-ds-raised" aria-labelledby="profile-tone-title">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-accent" aria-hidden="true">
                <circle cx="10" cy="10" r="7" />
                <path d="M10 3a7 7 0 0 1 0 14V3Z" />
              </svg>
              <h2 id="profile-tone-title" className="text-heading font-semibold text-ink">{t("profileAvatarColorTitle")}</h2>
            </div>
            <p className="mt-1 text-caption text-ink-muted">{language === "en" ? "Custom identity accent tone" : "Color de identidad visual"}</p>
            
            <div className="mt-4 flex items-center gap-3">
              {avatarTones.map((item) => {
                const isSelected = avatarTone === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTone(item.id)}
                    className={`h-7 w-7 rounded-full ${item.bgClass} transition-all duration-150 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      isSelected ? "ring-2 ring-accent ring-offset-2 ring-offset-surface scale-105" : "opacity-80 hover:opacity-100"
                    }`}
                    aria-label={item.id}
                    aria-pressed={isSelected}
                  />
                );
              })}
            </div>
          </section>

        </div>

        {/* Sección de Favoritos */}
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
