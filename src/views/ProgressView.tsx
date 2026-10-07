import { ProgressTab } from "../components/learning";
import type { AnatomySystemId } from "../config/anatomySystems";

export function ProgressView({ system }: { system: AnatomySystemId }) {
  return (
    <section className="h-full overflow-y-auto bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <ProgressTab system={system} />
      </div>
    </section>
  );
}
