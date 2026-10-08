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
    <section className="h-full overflow-y-auto bg-canvas px-6 py-6 lg:px-10 lg:py-8">
      <div className="mx-auto flex min-h-full max-w-5xl items-start justify-center">
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
