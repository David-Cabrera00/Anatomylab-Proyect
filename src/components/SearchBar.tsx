import { useRef, useEffect, useCallback, useState, useMemo, type KeyboardEvent as ReactKeyboardEvent } from "react";

import { type AnatomySystemId } from "../config/anatomySystems";
import { systemTranslationKeys, useI18n } from "../i18n";
import { Badge } from "../components/ui";
import { searchAnatomy, getSearchEntriesBySystem } from "../search/anatomySearchIndex";
import type { SearchEntry } from "../search/anatomySearchIndex";

interface SearchBarProps {
  onSelect: (entry: Pick<SearchEntry, "anatomyId" | "system">, context: { query: string; resultsCount: number }) => void;
  currentSystem?: AnatomySystemId;
  className?: string;
}

export function SearchBar({ onSelect, currentSystem, className = "" }: SearchBarProps) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchAnatomy(query, { limit: 50 });
  }, [query]);

  const systemSuggestions = useMemo(() => {
    if (!currentSystem || query.trim()) return [];
    return getSearchEntriesBySystem(currentSystem).slice(0, 20);
  }, [currentSystem, query]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setHighlightedIndex(-1);
  }, []);

  const items = query.trim() ? results : systemSuggestions;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) close();
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, close]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close]);

  const handleKeyDown = useCallback((event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (!items.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((index) => (index + 1) % items.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((index) => (index - 1 + items.length) % items.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const selected = items[highlightedIndex >= 0 ? highlightedIndex : 0];
      onSelect({ anatomyId: selected.anatomyId, system: selected.system }, { query: query.trim(), resultsCount: items.length });
      close();
    } else if (event.key === "Escape") {
      close();
    }
  }, [items, highlightedIndex, onSelect, close, query]);

  const handleSelect = useCallback((entry: SearchEntry) => {
    onSelect({ anatomyId: entry.anatomyId, system: entry.system }, { query: query.trim(), resultsCount: items.length });
    close();
  }, [onSelect, close, query, items.length]);

  const showDropdown = isOpen && (!!query.trim() || systemSuggestions.length > 0);

  return (
    <div ref={containerRef} className={`relative min-w-0 ${className}`}>
      <label htmlFor="anatomy-search" className="sr-only">{t("searchLabel")}</label>
      <div className="relative">
        <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          id="anatomy-search"
          type="search"
          value={query}
          onChange={(event) => { setQuery(event.target.value); setHighlightedIndex(-1); }}
          onFocus={open}
          onKeyDown={handleKeyDown}
          placeholder={t("searchPlaceholder")}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="anatomy-search-results"
          aria-autocomplete="list"
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-500"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(""); setHighlightedIndex(-1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label={t("searchClear")}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </div>

      {showDropdown && (
        <div id="anatomy-search-results" className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 divide-y divide-slate-100 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg" role="listbox">
          {items.length === 0 && query.trim() && (
            <div className="p-4 text-center text-sm text-slate-500">{t("searchNoResults")} &quot;{query}&quot;</div>
          )}
          {items.length === 0 && !query.trim() && currentSystem && (
            <div className="p-4 text-center text-sm text-slate-500">
              {t("searchTypeToSearch")} {t(systemTranslationKeys[currentSystem])}
            </div>
          )}
          {items.map((entry: SearchEntry, index: number) => (
            <button
              key={entry.anatomyId}
              type="button"
              role="option"
              aria-selected={index === highlightedIndex}
              onClick={() => handleSelect(entry)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`w-full px-4 py-3 text-left text-sm transition-colors ${index === highlightedIndex ? "bg-slate-50" : "hover:bg-slate-50"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-900">{entry.displayName}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <Badge variant="info" className="text-xs">{t(systemTranslationKeys[entry.system])}</Badge>
                    <Badge variant="neutral" className="text-xs">{entry.layer}</Badge>
                    {entry.laterality && <Badge variant="info" className="text-xs">{entry.laterality === "left" ? "Izq" : entry.laterality === "right" ? "Der" : "Med"}</Badge>}
                    {entry.hasEducationalCard && <Badge variant="success" className="text-xs">Ficha</Badge>}
                  </div>
                  {entry.region && <p className="mt-1 truncate text-xs text-slate-500">{entry.region}</p>}
                </div>
                <kbd className="hidden items-center rounded bg-slate-100 px-2 py-1 text-xs text-slate-400 sm:inline-flex">Enter</kbd>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
