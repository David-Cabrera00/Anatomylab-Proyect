import { useI18n } from "../i18n";

export function ThemeToggle() {
  const { theme, setTheme, t } = useI18n();
  const isDark = theme === "dark";
  const label = isDark ? t("themeToggleToLight") : t("themeToggleToDark");

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="group relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink-muted shadow-ds-raised transition-all duration-300 ease-out hover:scale-105 hover:border-accent/40 hover:bg-canvas-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95"
      aria-label={label}
      title={label}
    >
      <div className="relative flex h-4 w-4 items-center justify-center">
        {/* Icono de luna para tema oscuro */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out motion-reduce:transition-none ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-50 opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isDark}
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M17.29 13.09A8 8 0 0 1 6.91 2.71 8.01 8.01 0 1 0 17.29 13.09Z" />
          </svg>
        </span>

        {/* Icono de sol para tema claro */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out motion-reduce:transition-none ${
            !isDark
              ? "rotate-0 scale-100 opacity-100 group-hover:rotate-45"
              : "rotate-90 scale-50 opacity-0 pointer-events-none"
          }`}
          aria-hidden={isDark}
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="10" cy="10" r="3.75" />
            <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.34 4.34l1.42 1.42M14.24 14.24l1.42 1.42M4.34 15.66l1.42-1.42M14.24 5.76l1.42-1.42" />
          </svg>
        </span>
      </div>
    </button>
  );
}

