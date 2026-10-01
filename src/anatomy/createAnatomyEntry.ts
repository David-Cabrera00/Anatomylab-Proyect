import { anatomySystems } from "../config/anatomySystems";
import { getSystemStructureName } from "../utils/systemNames";
import type {
  AnatomyEntryInput,
  AnatomyStructureIndexEntry,
} from "./types";

/** Valida una entrada sin generar su ID a partir de nombres cambiantes. */
export function createAnatomyEntry(
  input: AnatomyEntryInput
): AnatomyStructureIndexEntry {
  const system = anatomySystems[input.system];
  if (!system) {
    throw new Error(`Sistema anatómico desconocido: ${String(input.system)}`);
  }

  if (
    !/^[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)+$/.test(input.id) ||
    !input.id.startsWith(`${input.system}.`)
  ) {
    throw new Error(`ID anatómico inválido: ${input.id}`);
  }

  if (!input.modelPath.trim() || !input.originalName.trim()) {
    throw new Error(`Falta modelo o nombre original para ${input.id}`);
  }

  const displayName =
    input.displayName ??
    getSystemStructureName(input.system, input.originalName);
  if (!displayName.trim()) {
    throw new Error(`Nombre visible vacío para ${input.id}`);
  }

  if (
    input.layer &&
    ((["general", "complete"] as readonly string[]).includes(input.layer) ||
      !system.layers.some((layer) => layer.id === input.layer))
  ) {
    throw new Error(`División inválida para ${input.id}: ${input.layer}`);
  }

  if (
    input.laterality !== undefined &&
    input.laterality !== null &&
    input.laterality !== "left" &&
    input.laterality !== "right" &&
    input.laterality !== "midline"
  ) {
    throw new Error(`Lateralidad inválida para ${input.id}`);
  }

  const suffix = input.originalName.match(/\.(l|r)$/i)?.[1]?.toLowerCase();
  if (
    suffix &&
    input.laterality !== (suffix === "l" ? "left" : "right")
  ) {
    throw new Error(`Lateralidad incompatible con el GLB para ${input.id}`);
  }

  if (input.subregion && !input.region) {
    throw new Error(`Subregión sin región para ${input.id}`);
  }

  if (
    !Array.isArray(input.keywords) ||
    input.keywords.some((keyword) => !keyword.trim())
  ) {
    throw new Error(`Palabras clave inválidas para ${input.id}`);
  }

  return Object.freeze({
    ...input,
    displayName,
    keywords: Object.freeze([...input.keywords]),
  });
}
