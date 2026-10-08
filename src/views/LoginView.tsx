import { useState, type FormEvent } from "react";

import { Button } from "../components/ui";
import { AuthLayout } from "../components/layout/AuthLayout";
import { AuthAnatomyPreview } from "../components/layout/AuthAnatomyPreview";
import { useI18n } from "../i18n";

type LoginViewProps = {
  onLogin: () => void;
  onRegister: () => void;
};

export function LoginView({ onLogin, onRegister }: LoginViewProps) {
  const { language, t } = useI18n();
  const isEnglish = language === "en";
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
    <AuthLayout
      brand={t("appName")}
      productMeta={isEnglish ? "3D ANATOMY WORKSPACE" : "ESPACIO DE ANATOMÍA 3D"}
      productTitle={isEnglish ? "Explore the human body in 3D" : "Explora el cuerpo humano en 3D"}
      productDescription={isEnglish
        ? "Understand systems, structures, and relationships through interactive models."
        : "Comprende sistemas, estructuras y relaciones mediante modelos interactivos."}
      benefits={[
        { number: "01", content: isEnglish ? "Interactive 3D models" : "Modelos 3D interactivos" },
        { number: "02", content: isEnglish ? "Guided anatomy study" : "Estudio anat\u00f3mico guiado" },
        { number: "03", content: isEnglish ? "Quiz and progress tracking" : "Quiz y seguimiento de progreso" },
      ]}
      productVisual={<AuthAnatomyPreview />}
      formTitle={isEnglish ? "Welcome back" : "Bienvenido de nuevo"}
      formSubtitle={t("homeIntro")}
      footer={
        <p className="text-center text-body text-ink-muted">
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
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <Field id="login-email" label={t("authEmail")} type="email" value={email} onChange={setEmail} autoComplete="email" />
        <Field id="login-password" label={t("authPassword")} type="password" value={password} onChange={setPassword} autoComplete="current-password" />

        <label className="flex flex-wrap items-center gap-2 text-body text-ink-muted">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-line accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          {t("authRemember")}
        </label>

        {error && <p className="text-body text-error" role="alert">{error}</p>}

        <Button type="submit" variant="primary" size="lg" className="w-full">
          {t("authLoginButton")}
        </Button>
      </form>
    </AuthLayout>
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
