import type {
  AnatomyLayerId,
  AnatomySystemId,
} from "../config/anatomySystems";

// general y complete son modos de vista, no divisiones anatómicas.
export type AnatomyDivisionId = Exclude<
  AnatomyLayerId,
  "general" | "complete"
>;

export type AnatomyLaterality = "left" | "right" | "midline" | null;

/** Clave lógica; la ruta física se obtiene de anatomySystems. */
export type AnatomyModelKey = "overview" | "heart-detail";

export type AnatomyModelBinding = Readonly<{
  modelKey: AnatomyModelKey;
  /** Nombre exacto del nodo glTF, disponible como anatomyOriginalName. */
  originalName: string;
  /** Dato técnico opcional; nunca se usa como clave del índice. */
  threeName?: string;
}>;

export type AnatomyStructureIndexEntry = Readonly<{
  /** ID propio de AnatomyLab; se asigna explícitamente y nunca se deriva del GLB. */
  id: string;
  system: AnatomySystemId;
  /** Una estructura puede estar presente en varias variantes del modelo. */
  modelBindings: readonly AnatomyModelBinding[];
  displayName: string;
  layer?: AnatomyDivisionId;
  region?: string;
  subregion?: string;
  laterality?: AnatomyLaterality;
  structureType?: string;
  keywords: readonly string[];
  /** Clave del contenido existente, independiente del ID estable del índice. */
  educationalId?: string;
}>;

export type AnatomyEntryInput = Omit<
  AnatomyStructureIndexEntry,
  "displayName"
> & {
  displayName?: string;
};
