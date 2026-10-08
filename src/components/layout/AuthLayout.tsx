import type { ReactNode } from "react";

import { LanguageSwitcher } from "../LanguageSwitcher";

type AuthLayoutProps = {
  brand: ReactNode;
  productTitle: ReactNode;
  productDescription: ReactNode;
  benefits: readonly { number: string; content: ReactNode }[];
  productVisual?: ReactNode;
  formTitle: ReactNode;
  formSubtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

/**
 * Composición compartida para acceso y registro.
 * Mantiene el contenido de autenticación fuera del shell principal.
 */
export function AuthLayout({
  brand,
  productTitle,
  productDescription,
  benefits,
  productVisual,
  formTitle,
  formSubtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen overflow-y-auto bg-canvas">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <section className="flex min-h-[560px] min-w-0 flex-col justify-center border-b border-line px-6 py-12 sm:px-10 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-16 lg:py-16 xl:px-24">
          <div className="mx-auto grid w-full max-w-4xl items-center gap-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(17rem,1.15fr)] xl:gap-10">
            <div className="min-w-0">
              <p className="text-caption font-semibold uppercase tracking-[0.18em] text-accent">{brand}</p>
              <h1 className="mt-5 max-w-lg text-display font-semibold tracking-tight text-ink">{productTitle}</h1>
              <p className="mt-5 max-w-lg text-body leading-7 text-ink-muted">{productDescription}</p>

              <div className="mt-10 max-w-md border-l border-accent/40 pl-5">
                <div className="space-y-5">
                  {benefits.map((benefit) => (
                    <div key={benefit.number} className="grid grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-3">
                      <span className="text-caption font-semibold tracking-[0.12em] text-accent">{benefit.number}</span>
                      <span className="text-body text-ink-muted">{benefit.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {productVisual ? <div className="hidden min-w-0 sm:block">{productVisual}</div> : null}
          </div>
        </section>

        <section className="flex min-w-0 items-center bg-surface px-6 py-12 sm:px-10 lg:px-16 lg:py-16 xl:px-20">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-title font-semibold tracking-tight text-ink">{formTitle}</h2>
                  {formSubtitle ? <p className="mt-2 text-body leading-6 text-ink-muted">{formSubtitle}</p> : null}
                </div>
                <LanguageSwitcher />
              </div>
            </div>

            {children}
            {footer ? <div className="mt-6 border-t border-line pt-5">{footer}</div> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
