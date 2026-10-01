export {
  anatomyIndex,
  findAnatomyStructuresByOriginalName,
  getAnatomyEntryById,
  getAnatomyEntryByOriginalName,
  getAnatomyEntriesByLayer,
  getAnatomyEntriesBySystem,
  getAnatomyStructureById,
  getAnatomyStructuresBySystem,
} from "./anatomyIndex";
export { createAnatomyEntry, getAnatomyModelPath } from "./createAnatomyEntry";
export type {
  AnatomyDivisionId,
  AnatomyEntryInput,
  AnatomyLaterality,
  AnatomyModelBinding,
  AnatomyModelKey,
  AnatomyStructureIndexEntry,
} from "./types";
