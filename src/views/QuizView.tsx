import { QuizPanel } from "../components/quiz/QuizPanel";
import type { AnatomySystemId } from "../config/anatomySystems";
import type { QuizState } from "../data/quiz/types";

type QuizViewProps = {
  activeSystem: AnatomySystemId;
  quizState: QuizState;
  onStateChange: (state: QuizState) => void;
  onClose: () => void;
};

export function QuizView({ activeSystem, quizState, onStateChange, onClose }: QuizViewProps) {
  return (
    <section className="h-full overflow-y-auto bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto flex min-h-full max-w-3xl items-start justify-center">
        <div className="w-full">
          <QuizPanel
            activeSystem={activeSystem}
            quizState={quizState}
            onStateChange={onStateChange}
            onClose={onClose}
          />
        </div>
      </div>
    </section>
  );
}
