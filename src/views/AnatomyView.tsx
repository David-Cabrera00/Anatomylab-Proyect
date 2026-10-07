import type { ReactNode } from "react";

type AnatomyViewProps = {
  children: ReactNode;
};

export function AnatomyView({ children }: AnatomyViewProps) {
  return <div className="h-full min-h-0">{children}</div>;
}
