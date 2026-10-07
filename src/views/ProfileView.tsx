export function ProfileView() {
  return <PlaceholderView title="Perfil" description="La vista de perfil se incorporará en una tarea posterior." />;
}

function PlaceholderView({ title, description }: { title: string; description: string }) {
  return (
    <section className="flex h-full items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-3 text-slate-600">{description}</p>
      </div>
    </section>
  );
}
