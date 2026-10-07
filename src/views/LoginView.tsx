import { useState, type FormEvent } from "react";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Button } from "../components/ui";
import { useI18n } from "../i18n";

type LoginViewProps = {
  onLogin: () => void;
  onRegister: () => void;
};

export function LoginView({ onLogin, onRegister }: LoginViewProps) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError(t("authRequiredLogin"));
      return;
    }
    setError("");
    onLogin();
  };

  return (
    <main className="min-h-screen overflow-y-auto bg-canvas">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <section className="relative flex min-h-[560px] flex-col justify-center overflow-hidden px-6 py-12 sm:px-10 lg:min-h-screen lg:px-16 lg:py-16 xl:px-24">
          <div className="relative z-10 max-w-xl">
            <p className="text-caption font-semibold uppercase tracking-[0.18em] text-accent">
              {t("appName")}
            </p>
            <h1 className="mt-5 max-w-lg text-display font-semibold tracking-tight text-ink">
              Explora el cuerpo humano en 3D
            </h1>
            <p className="mt-5 max-w-lg text-body leading-7 text-ink-muted">
              Aprendizaje con modelos interactivos, guías y progreso.
            </p>

            <div className="mt-8 space-y-3">
              {[t("homeOpenAnatomy"), t("homeContinue"), t("homeGeneralProgress")].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 text-label text-ink-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 sm:-right-12 lg:right-8 xl:right-16" aria-hidden="true">
            <div className="absolute inset-0 rounded-full border border-accent/10" />
            <div className="absolute inset-10 rounded-full border border-accent/15" />
            <div className="absolute inset-20 rounded-full border border-accent/20 bg-accent-soft/40" />
            <div className="absolute left-1/2 top-1/2 h-36 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 bg-surface/80" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/70" />
            <div className="absolute left-1/2 top-1/2 h-64 w-px -translate-x-1/2 -translate-y-1/2 bg-accent/15" />
            <div className="absolute left-1/2 top-1/2 h-px w-64 -translate-x-1/2 -translate-y-1/2 bg-accent/15" />
          </div>
        </section>

        <section className="flex items-center border-t border-line bg-surface px-6 py-12 sm:px-10 lg:border-l lg:border-t-0 lg:px-16 lg:py-16 xl:px-20">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-title font-semibold tracking-tight text-ink">Bienvenido de nuevo</h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <Field id="login-email" label={t("authEmail")} type="email" value={email} onChange={setEmail} autoComplete="email" />
              <Field id="login-password" label={t("authPassword")} type="password" value={password} onChange={setPassword} autoComplete="current-password" />

              <div className="flex flex-wrap items-center justify-between gap-4 text-body">
                <label className="flex items-center gap-2 text-ink-muted">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-line accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  />
                  {t("authRemember")}
                </label>
                <LanguageSwitcher />
              </div>

              {error && <p className="text-body text-error" role="alert">{error}</p>}

              <Button type="submit" variant="primary" size="lg" className="w-full">
                {t("authLoginButton")}
              </Button>
            </form>

            <p className="mt-6 text-center text-body text-ink-muted">
              {t("authCreateAccountPrompt")} {" "}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onRegister}
                className="min-h-0 px-0 py-0 align-baseline text-label font-semibold hover:bg-transparent hover:underline"
              >
                {t("authRegisterButton")}
              </Button>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ id, label, type, value, onChange, autoComplete }: { id: string; label: string; type: string; value: string; onChange: (value: string) => void; autoComplete: string }) {
  return (
    <label htmlFor={id} className="block text-label font-medium text-ink-muted">
      {label}
      <input
        id={id}
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        className="mt-2 min-h-10 w-full rounded-ds-sm border border-line bg-surface px-3 py-2.5 text-body text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}
