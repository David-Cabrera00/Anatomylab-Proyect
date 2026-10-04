import { useRef, useEffect, useCallback, useState, useMemo } from "react";
import { anatomySystems, type AnatomySystemId } from "../config/anatomySystems";
import { Badge } from "../components/ui";
import { searchAnatomy, getSearchEntriesBySystem } from "../search/anatomySearchIndex";
import type { SearchEntry } from "../search/anatomySearchIndex";

interface SearchBarProps {
  onSelect: (entry: { anatomyId: string; displayName: string; system: AnatomySystemId }) => void;
  currentSystem?: AnatomySystemId;
  className?: string;
}

export function SearchBar({ onSelect, currentSystem, className = "" }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        close();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, close]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close]);

  const handleFocus = useCallback(() => {
    open();
  }, [open]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (i + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => (i - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < items.length) {
        const selected = items[highlightedIndex];
        onSelect({ anatomyId: selected.anatomyId, displayName: selected.displayName, system: selected.system });
        close();
      }
    } else if (e.key === "Escape") {
      close();
    }
  }, [items, highlightedIndex, onSelect, close]);

  const handleSelect = useCallback((entry: SearchEntry) => {
    onSelect({ anatomyId: entry.anatomyId, displayName: entry.displayName, system: entry.system });
    close();
  }, [onSelect, close]);

  const showDropdown = isOpen && (query.trim() || systemSuggestions.length > 0);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        <label htmlFor="anatomy-search" className="sr-only">
          Buscar estructura anatómica
        </label>
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            id="anatomy-search"
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setHighlightedIndex(-1); }}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={currentSystem ? `Buscar en ${anatomySystems[currentSystem]?.label}...` : "Buscar estructura..."}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setHighlightedIndex(-1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Limpiar búsqueda"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg divide-y divide-slate-100"
          role="listbox"
        >
          {items.length === 0 && query.trim() && (
            <div className="p-4 text-center text-slate-500 text-sm">
              No se encontraron estructuras para "{query}"
            </div>
          )}

          {items.length === 0 && !query.trim() && currentSystem && (
            <div className="p-4 text-center text-slate-500 text-sm">
              Escribe para buscar en {anatomySystems[currentSystem]?.label}
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
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 truncate">{entry.displayName}</p>
<div className="flex flex-wrap items-center gap-1.5 mt-1">
  <Badge variant="info" className="text-xs">{anatomySystems[entry.system as AnatomySystemId]?.label}</Badge>
  <Badge variant="neutral" className="text-xs">{entry.layer}</Badge>
  {entry.laterality && (
    <Badge variant="info" className="text-xs">
      {entry.laterality === "left" ? "Izq" : entry.laterality === "right" ? "Der" : "Med"}
    </Badge>
  )}
  {entry.hasEducationalCard && (
    <Badge variant="success" className="text-xs">Ficha</Badge>
  )}
</div>
                  {entry.region && (
                    <p className="mt-1 text-xs text-slate-500 truncate">{entry.region}</p>
                  )}
                </div>
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-slate-400 bg-slate-100 rounded">Enter</kbd>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}