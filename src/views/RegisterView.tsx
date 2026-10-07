import { useState, type FormEvent, type ReactNode } from "react";

type RegisterViewProps = {
  onRegister: () => void;
  onLogin: () => void;
};

export function RegisterView({ onRegister, onLogin }: RegisterViewProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password || !confirmation) {
      setError("Completa todos los campos.");
      return;
    }
    if (password !== confirmation) {
      setError("Las contrase\u00f1as no coinciden.");
      return;
    }
    setError("");
    onRegister();
  };

  return (
    <AuthLayout eyebrow="AnatomyLab" title="Crear cuenta">
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Field label="Nombre" type="text" value={name} onChange={setName} />
        <Field label="Correo" type="email" value={email} onChange={setEmail} />
        <Field label="Contrase\u00f1a" type="password" value={password} onChange={setPassword} />
        <Field label="Confirmar contrase\u00f1a" type="password" value={confirmation} onChange={setConfirmation} />

        <div className="flex justify-end">
          <button type="button" className="text-sm text-slate-500 hover:text-slate-900">
            ES / EN
          </button>
        </div>

        {error && <p className="text-sm text-rose-600" role="alert">{error}</p>}

        <button type="submit" className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
          Crear cuenta
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        ¿Ya tienes una cuenta?{" "}
        <button type="button" onClick={onLogin} className="font-semibold text-slate-900 hover:underline">
          Volver a iniciar sesi\u00f3n
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
