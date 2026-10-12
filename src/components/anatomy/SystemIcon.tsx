import type { AnatomySystemId } from "../../config/anatomySystems";

export function SystemIcon({ system, color, className = "h-full w-full" }: { system: AnatomySystemId; color: string; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color }} aria-hidden="true">
      {system === "cardiovascular" && <><path d="M16 27S5 20.5 5 12.5A5.5 5.5 0 0 1 16 10a5.5 5.5 0 0 1 11 2.5C27 20.5 16 27 16 27Z" /><path d="M10 15h4l2-4 2 8 2-4h3" /></>}
      {system === "respiratory" && <><path d="M16 7v18M16 12c-2-3-6-4-8-1-2.5 3.5-3 9.5-1 12 1.5 2 5 1 7-1M16 12c2-3 6-4 8-1 2.5 3.5 3 9.5 1 12-1.5 2-5 1-7-1" /><path d="M16 7V4" /></>}
      {system === "nervous" && <><circle cx="16" cy="12" r="7" /><path d="M12 19c-2 2-2 5 0 7M20 19c2 2 2 5 0 7M9 10c-2-1-4 0-4 2s2 3 4 3M23 10c2-1 4 0 4 2s-2 3-4 3M16 19v8" /></>}
      {system === "skeletal" && <><path d="M12 5a2.5 2.5 0 1 0-3.5 3.5l5 5-5 5A2.5 2.5 0 1 0 12 22l4-4 4 4a2.5 2.5 0 1 0 3.5-3.5l-5-5 5-5A2.5 2.5 0 1 0 20 5l-4 4-4-4Z" /><path d="M16 9v9" /></>}
      {system === "muscular" && <><path d="M10 6c2 2 2 5 0 8s-2 7 2 11M22 6c-2 2-2 5 0 8s2 7-2 11M10 6h12M8 13h16M10 25h12" /></>}
      {system === "digestive" && <><path d="M11 5v6c0 2 1 3 3 3h4c2 0 3 1 3 3v3c0 4-2 6-5 6s-5-2-5-6v-3c0-2-1-3-3-3H6" /><path d="M11 5a2 2 0 1 0-4 0v2M21 5a2 2 0 1 0-4 0v2" /></>}
    </svg>
  );
}
