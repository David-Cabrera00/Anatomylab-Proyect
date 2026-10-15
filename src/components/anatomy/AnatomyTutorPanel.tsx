import { useEffect, useRef, useState } from "react";

import type { AnatomySystemId } from "../../config/anatomySystems";
import type { AnatomyStructureData } from "../../data/anatomyStructureData";
import { getLocalizedText, systemTranslationKeys, useI18n } from "../../i18n";
import { createLocalAnatomyTutor, type AnatomyTutorMessage } from "../../services/anatomyTutor";
import { backendAskTutor } from "../../utils/backendApi";
import { SystemIcon } from "./SystemIcon";

type AnatomyTutorPanelProps = {
  system: AnatomySystemId;
  anatomyId: string;
  structureName: string;
  data: AnatomyStructureData | null;
  backendToken: string | null;
  systemColor: string;
  onClose: () => void;
};

export function AnatomyTutorPanel({ system, anatomyId, structureName, data, backendToken, systemColor, onClose }: AnatomyTutorPanelProps) {
  const { language, t } = useI18n();
  const description = data ? getLocalizedText(data.description, language) : t("anatomyTutorNoCard");
  const functionText = data?.function ? getLocalizedText(data.function, language) : null;
  const locationText = data?.location ? getLocalizedText(data.location, language) : null;
  const localizedStructureName = data ? getLocalizedText(data.name, language) : structureName;
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<AnatomyTutorMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"ollama" | "fallback" | null>(null);
  const requestIdRef = useRef(0);
  const tutor = createLocalAnatomyTutor(
    (value) => value ? getLocalizedText(value, language) : null,
    {
      noFunction: t("anatomyTutorNoFunction"),
      noLocation: t("anatomyTutorNoLocation"),
      functionHint: t("anatomyTutorFunctionHint"),
    },
    language,
  );

  useEffect(() => {
    requestIdRef.current += 1;
    setQuestion("");
    setMessages([]);
    setIsLoading(false);
    setMode(null);
  }, [anatomyId, system, language]);

  const submitQuestion = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    const requestId = ++requestIdRef.current;
    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setQuestion("");
    setIsLoading(true);

    let answer: string;
    let responseMode: "ollama" | "fallback" = "fallback";
    const localizedRelationships = data?.relationships?.map((relationship) => getLocalizedText(relationship, language)).join("; ");

    if (backendToken && data && description.trim()) {
      try {
        const response = await backendAskTutor(backendToken, {
          system,
          anatomyId,
          question: trimmed,
          structureName: localizedStructureName,
          description,
          function: functionText ?? undefined,
          location: locationText ?? undefined,
          relationships: localizedRelationships || undefined,
        });
        if (response.provider === "ollama") {
          answer = response.answer;
          responseMode = "ollama";
        } else {
          answer = await tutor.answer(trimmed, { system, anatomyId, structureName: localizedStructureName, data });
        }
      } catch {
        answer = await tutor.answer(trimmed, { system, anatomyId, structureName: localizedStructureName, data });
      }
    } else {
      answer = await tutor.answer(trimmed, { system, anatomyId, structureName: localizedStructureName, data });
    }

    if (requestId !== requestIdRef.current) return;
    setIsLoading(false);
    setMode(responseMode);
    setMessages((current) => [...current, { role: "assistant", text: answer }]);
  };

  return (
    <aside className="anatomy-tutor-panel absolute inset-y-0 right-0 z-40 flex w-full max-w-[390px] flex-col border-l border-line bg-surface shadow-ds-modal" aria-label={t("anatomyTutorTitle")}>
      <header className="border-b border-line px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-ds-md bg-accent-soft" style={{ color: systemColor }}>
              <SystemIcon system={system} color={systemColor} className="h-6 w-6" />
            </span>
            <div>
              <p className="text-caption font-semibold uppercase tracking-[0.14em] text-accent">{t("anatomyTutorEyebrow")}</p>
              <h2 className="mt-1 text-heading font-semibold text-ink">{t("anatomyTutorTitle")}</h2>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-ds-sm text-ink-muted transition-colors hover:bg-canvas-muted hover:text-ink" aria-label={t("anatomyTutorClose")}>×</button>
        </div>
        <div className="mt-5 border-l-2 pl-3" style={{ borderColor: systemColor }}>
          <p className="text-caption uppercase tracking-[0.12em] text-ink-subtle">{t(systemTranslationKeys[system])}</p>
            <p className="mt-1 text-title font-semibold tracking-tight text-ink">{localizedStructureName}</p>
        </div>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
        <div className="rounded-ds-md border border-accent/30 bg-accent-soft/35 px-4 py-4">
          <p className="text-caption font-semibold uppercase tracking-[0.12em] text-accent">{t("anatomyTutorContext")}</p>
          <p className="mt-2 text-body leading-6 text-ink-muted">{t("anatomyTutorContextDescription")}</p>
        </div>

        <section>
          <p className="text-caption font-semibold uppercase tracking-[0.12em] text-ink-subtle">{t("anatomyTutorSummary")}</p>
          <p className="mt-2 text-body leading-6 text-ink">{description}</p>
        </section>

        {functionText || locationText ? (
          <section className="grid gap-3 sm:grid-cols-2">
            {functionText && <div className="border-t border-line pt-3"><p className="text-caption uppercase tracking-[0.1em] text-ink-subtle">{t("anatomyFunction")}</p><p className="mt-1 text-label leading-5 text-ink-muted">{functionText}</p></div>}
            {locationText && <div className="border-t border-line pt-3"><p className="text-caption uppercase tracking-[0.1em] text-ink-subtle">{t("anatomyLocation")}</p><p className="mt-1 text-label leading-5 text-ink-muted">{locationText}</p></div>}
          </section>
        ) : null}

        <section className="space-y-3 border-t border-line pt-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-caption font-semibold uppercase tracking-[0.12em] text-ink-subtle">{t("anatomyTutorAskTitle")}</p>
            {messages.length > 0 && <button type="button" onClick={() => setMessages([])} className="text-caption text-accent transition-colors hover:text-ink">{t("anatomyTutorClear")}</button>}
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={isLoading} onClick={() => void submitQuestion(t("anatomyTutorPromptFunction"))} className="rounded-full border border-line px-3 py-1.5 text-caption text-ink-muted transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent disabled:cursor-not-allowed disabled:opacity-50">{t("anatomyTutorPromptFunction")}</button>
            <button type="button" disabled={isLoading} onClick={() => void submitQuestion(t("anatomyTutorPromptLocation"))} className="rounded-full border border-line px-3 py-1.5 text-caption text-ink-muted transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent disabled:cursor-not-allowed disabled:opacity-50">{t("anatomyTutorPromptLocation")}</button>
          </div>
          {isLoading && <p className="rounded-ds-md border border-line bg-surface-raised px-3 py-2 text-caption text-ink-muted" role="status" aria-live="polite">{t("anatomyTutorLoading")}</p>}
          {messages.length > 0 && (
            <div className="space-y-2">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-6 rounded-ds-md bg-accent px-3 py-2 text-label text-white" : "mr-6 rounded-ds-md border border-line bg-surface-raised px-3 py-2 text-label leading-5 text-ink"}>
                  {message.text}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <footer className="border-t border-line bg-surface-raised px-5 py-4">
        <form onSubmit={(event) => { event.preventDefault(); void submitQuestion(question); }} className="flex items-center gap-2">
          <input value={question} disabled={isLoading} onChange={(event) => setQuestion(event.target.value)} placeholder={t("anatomyTutorPlaceholder")} className="min-w-0 flex-1 rounded-ds-sm border border-line bg-surface px-3 py-2 text-label text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60" />
          <button type="submit" disabled={isLoading || !question.trim()} className="rounded-ds-sm bg-accent px-3 py-2 text-label font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40">{t("anatomyTutorSend")}</button>
        </form>
        <p className="mt-2 text-caption leading-5 text-ink-subtle">{isLoading ? t("anatomyTutorLoading") : mode === "ollama" ? t("anatomyTutorRemoteMode") : mode === "fallback" ? t("anatomyTutorFallbackMode") : t("anatomyTutorLocalMode")}</p>
      </footer>
    </aside>
  );
}
