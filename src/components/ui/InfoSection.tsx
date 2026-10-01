import type { ReactNode } from "react";

type InfoSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

/** Secciones ligeras para información extensa, sin tarjetas anidadas. */
export function InfoSection({
  title,
  children,
  className = "",
}: InfoSectionProps) {
  return (
    <section className={className}>
      <h3 className="text-label font-semibold text-ink">{title}</h3>
      <div className="mt-2 text-body leading-6 text-ink-muted">{children}</div>
    </section>
  );
}
