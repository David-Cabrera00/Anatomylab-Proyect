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

export type AnatomyStructureIndexEntry = Readonly<{
  /** ID propio de AnatomyLab; se asigna explícitamente y nunca se deriva del GLB. */
  id: string;
  system: AnatomySystemId;
  /** Ruta del modelo en anatomySystems; distingue la vista general de modelos de detalle. */
  modelPath: string;
  /** Nombre exacto del nodo glTF, disponible como anatomyOriginalName. */
  originalName: string;
  /** Dato técnico opcional; nunca se usa como clave del índice. */
  threeName?: string;
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
