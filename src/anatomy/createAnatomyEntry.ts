import {
  anatomySystems,
  type AnatomySystemId,
} from "../config/anatomySystems";
import { getSystemStructureName } from "../utils/systemNames";
import type {
  AnatomyEntryInput,
  AnatomyModelKey,
  AnatomyStructureIndexEntry,
} from "./types";

/** Traduce una clave lógica a la ruta actual, sin incluir la ruta en el ID. */
export function getAnatomyModelPath(
  system: AnatomySystemId,
  modelKey: AnatomyModelKey
): string | null {
  const config = anatomySystems[system];
  if (!config) return null;

  if (modelKey === "overview") return config.modelPath;
  if (modelKey === "heart-detail" && system === "cardiovascular") {
    return config.detailModels?.heart ?? null;
  }
  return null;
}

function normalizeKeyword(keyword: string): string {
  return keyword
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

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

  if (!Array.isArray(input.modelBindings) || !input.modelBindings.length) {
    throw new Error(`Faltan referencias al modelo para ${input.id}`);
  }

  const bindingKeys = new Set<string>();
  for (const binding of input.modelBindings) {
    if (!getAnatomyModelPath(input.system, binding.modelKey)) {
      throw new Error(`Variante de modelo inválida para ${input.id}: ${binding.modelKey}`);
    }
    if (!binding.originalName.trim()) {
      throw new Error(`Nombre original vacío para ${input.id}`);
    }
    if (binding.threeName !== undefined && !binding.threeName.trim()) {
      throw new Error(`Nombre técnico vacío para ${input.id}`);
    }

    const key = JSON.stringify([binding.modelKey, binding.originalName]);
    if (bindingKeys.has(key)) {
      throw new Error(`Referencia al modelo duplicada para ${input.id}`);
    }
    bindingKeys.add(key);

    const suffix = binding.originalName.match(/\.(l|r)$/i)?.[1]?.toLowerCase();
    if (
      suffix &&
      input.laterality !== (suffix === "l" ? "left" : "right")
    ) {
      throw new Error(`Lateralidad incompatible con el GLB para ${input.id}`);
    }
  }

  const displayName =
    input.displayName ??
    getSystemStructureName(input.system, input.modelBindings[0].originalName);
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

  if (input.region !== undefined && !input.region.trim()) {
    throw new Error(`Región vacía para ${input.id}`);
  }
  if (input.subregion !== undefined) {
    if (!input.subregion.trim()) {
      throw new Error(`Subregión vacía para ${input.id}`);
    }
    if (!input.region) {
      throw new Error(`Subregión sin región para ${input.id}`);
    }
  }
  if (input.structureType !== undefined && !input.structureType.trim()) {
    throw new Error(`Tipo de estructura vacío para ${input.id}`);
  }
  if (input.educationalId !== undefined && !input.educationalId.trim()) {
    throw new Error(`ID educativo vacío para ${input.id}`);
  }

  if (!Array.isArray(input.keywords)) {
    throw new Error(`Palabras clave inválidas para ${input.id}`);
  }
  const normalizedKeywords = input.keywords.map(normalizeKeyword);
  if (
    normalizedKeywords.some((keyword) => !keyword) ||
    new Set(normalizedKeywords).size !== normalizedKeywords.length
  ) {
    throw new Error(`Palabras clave vacías o duplicadas para ${input.id}`);
  }

  return Object.freeze({
    ...input,
    displayName,
    modelBindings: Object.freeze(
      input.modelBindings.map((binding) => Object.freeze({ ...binding }))
    ),
    keywords: Object.freeze([...input.keywords]),
  });
}
