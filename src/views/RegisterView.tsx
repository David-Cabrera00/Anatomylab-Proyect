import { useState, type FormEvent, type ReactNode } from "react";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useI18n } from "../i18n";

type RegisterViewProps = {
  onRegister: () => void;
  onLogin: () => void;
};

export function RegisterView({ onRegister, onLogin }: RegisterViewProps) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password || !confirmation) {
      setError(t("authRequiredRegister"));
      return;
    }
    if (password !== confirmation) {
      setError(t("authPasswordsMismatch"));
      return;
    }
    setError("");
    onRegister();
  };

  return (
    <AuthLayout eyebrow={t("appName")} title={t("authRegisterTitle")}>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Field label={t("authName")} type="text" value={name} onChange={setName} />
        <Field label={t("authEmail")} type="email" value={email} onChange={setEmail} />
        <Field label={t("authPassword")} type="password" value={password} onChange={setPassword} />
        <Field label={t("authConfirmPassword")} type="password" value={confirmation} onChange={setConfirmation} />

        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>

        {error && <p className="text-sm text-rose-600" role="alert">{error}</p>}

        <button type="submit" className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
          {t("authRegisterButton")}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        {t("authExistingAccountPrompt")} {" "}
        <button type="button" onClick={onLogin} className="font-semibold text-slate-900 hover:underline">
          {t("authBackToLogin")}
        </button>
      </p>
    </AuthLayout>
  );
}

function AuthLayout({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
        <div className="mt-8">{children}</div>
      </section>
    </main>
  );
}

function Field({ label, type, value, onChange }: { label: string; type: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
      />
    </label>
  );
}
