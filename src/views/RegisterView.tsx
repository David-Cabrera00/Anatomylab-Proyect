import { useState, type FormEvent } from "react";

import { AuthAnatomyPreview } from "../components/layout/AuthAnatomyPreview";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Button } from "../components/ui";
import { useI18n } from "../i18n";

type RegisterViewProps = {
  onRegister: () => void;
  onLogin: () => void;
};

export function RegisterView({ onRegister, onLogin }: RegisterViewProps) {
  const { language, t } = useI18n();
  const isEnglish = language === "en";
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
    <AuthLayout
      brand={t("appName")}
      productMeta={isEnglish ? "3D ANATOMY WORKSPACE" : "ESPACIO DE ANATOMÍA 3D"}
      productTitle={isEnglish ? "Explore the human body in 3D" : "Explora el cuerpo humano en 3D"}
      productDescription={isEnglish
        ? "Understand systems, structures, and relationships through interactive models."
        : "Comprende sistemas, estructuras y relaciones mediante modelos interactivos."}
      benefits={[
        { number: "01", content: isEnglish ? "Interactive 3D models" : "Modelos 3D interactivos" },
        { number: "02", content: isEnglish ? "Guided anatomy study" : "Estudio anatómico guiado" },
        { number: "03", content: isEnglish ? "Quiz and progress tracking" : "Quiz y seguimiento de progreso" },
      ]}
      productVisual={<AuthAnatomyPreview />}
      formTitle={t("authRegisterTitle")}
      formSubtitle={isEnglish
        ? "Start studying anatomy with interactive models."
        : "Comienza a estudiar anatomía con modelos interactivos."}
      footer={
        <p className="text-center text-body text-ink-muted">
          {t("authExistingAccountPrompt")} {" "}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onLogin}
            className="min-h-0 px-0 py-0 align-baseline text-label font-semibold hover:bg-transparent hover:underline"
          >
            {t("authBackToLogin")}
          </Button>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Field id="register-name" label={t("authName")} type="text" value={name} onChange={setName} autoComplete="name" />
        <Field id="register-email" label={t("authEmail")} type="email" value={email} onChange={setEmail} autoComplete="email" />
        <Field id="register-password" label={t("authPassword")} type="password" value={password} onChange={setPassword} autoComplete="new-password" />
        <Field id="register-confirm-password" label={t("authConfirmPassword")} type="password" value={confirmation} onChange={setConfirmation} autoComplete="new-password" />

        {error && <p className="text-body text-error" role="alert">{error}</p>}

        <Button type="submit" variant="primary" size="lg" className="w-full">
          {t("authRegisterButton")}
        </Button>
      </form>
    </AuthLayout>
  );
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
}) {
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
