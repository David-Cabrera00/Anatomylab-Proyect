import type { ReactNode } from "react";

import { LanguageSwitcher } from "../LanguageSwitcher";

type AuthLayoutProps = {
  brand: ReactNode;
  productMeta?: ReactNode;
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
  productMeta,
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
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.55fr)_minmax(22rem,1fr)]">
        <section className="flex min-h-[620px] min-w-0 flex-col border-b border-line bg-[#b8cbd2] px-6 py-8 sm:px-10 sm:py-10 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-12 lg:py-10 xl:px-16">
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
            <div className="flex items-center justify-between gap-5">
              <p className="text-caption font-semibold uppercase tracking-[0.18em] text-accent">{brand}</p>
              {productMeta ? <p className="hidden text-caption font-medium uppercase tracking-[0.16em] text-ink-subtle sm:block">{productMeta}</p> : null}
            </div>

            <div className="grid flex-1 items-center gap-8 py-10 md:grid-cols-[minmax(0,0.9fr)_minmax(18rem,1.1fr)] md:gap-10 lg:gap-12 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
              <div className="min-w-0">
                {productMeta ? <p className="mb-4 text-caption font-semibold uppercase tracking-[0.16em] text-accent sm:hidden">{productMeta}</p> : null}
                <h1 className="max-w-xl text-display font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-[2.45rem] sm:leading-[1.08]">{productTitle}</h1>
                <p className="mt-5 max-w-lg text-body leading-7 text-ink-muted">{productDescription}</p>

                <div className="mt-8 border-l border-accent/50 pl-5">
                  <div className="space-y-3.5">
                    {benefits.map((benefit) => (
                      <div key={benefit.number} className="grid grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-3">
                        <span className="text-caption font-semibold tracking-[0.12em] text-accent">{benefit.number}</span>
                        <span className="text-body text-ink">{benefit.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {productVisual ? <div className="relative hidden min-w-0 md:block">{productVisual}</div> : null}
            </div>
          </div>
        </section>

        <section className="flex min-w-0 items-center bg-surface px-6 py-12 sm:px-10 lg:px-12 lg:py-16 xl:px-16">
          <div className="mx-auto w-full max-w-[26rem]">
            <div className="mb-9">
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
