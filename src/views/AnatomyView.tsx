import type { ReactNode } from "react";

type AnatomyViewProps = {
  children: ReactNode;
};

export function AnatomyView({ children }: AnatomyViewProps) {
  return <div className="flex h-full min-h-0 flex-col overflow-hidden">{children}</div>;
}
