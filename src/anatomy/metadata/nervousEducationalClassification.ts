/**
 * Clasificación educativa incremental de las entradas nerviosas sin ficha.
 *
 * Este primer lote cubre estructuras centrales de alto valor didáctico. Las
 * entradas restantes todavía no se consideran geometría técnica: permanecen
 * sin revisar hasta completar los siguientes bloques.
 *
 * Los Anatomy IDs son persistentes y no dependen del orden del catálogo.
 */
export const nervousCentralBatch1Candidates = [
  { concept: "Cúneo", anatomyIds: ["nervous.model-node-0029", "nervous.model-node-0030"] },
  { concept: "Comisura hipocampal", anatomyIds: ["nervous.model-node-0025"] },
  { concept: "Comisura posterior", anatomyIds: ["nervous.model-node-0026"] },
  { concept: "Estría terminal", anatomyIds: ["nervous.model-node-0279", "nervous.model-node-0280"] },
  { concept: "Giro del cíngulo, porción posteroventral", anatomyIds: ["nervous.model-node-0015", "nervous.model-node-0016"] },
  { concept: "Giro parahipocampal", anatomyIds: ["nervous.model-node-0078", "nervous.model-node-0079"] },
  { concept: "Giro recto", anatomyIds: ["nervous.model-node-0277", "nervous.model-node-0278"] },
  { concept: "Ínsula", anatomyIds: ["nervous.model-node-0063", "nervous.model-node-0064"] },
  { concept: "Tabique pelúcido", anatomyIds: ["nervous.model-node-0276"] },
  { concept: "Núcleo accesorio del nervio oculomotor", anatomyIds: ["nervous.model-node-0138", "nervous.model-node-0139"] },
  { concept: "Núcleo coclear anterior", anatomyIds: ["nervous.model-node-0140", "nervous.model-node-0141"] },
  { concept: "Núcleo coclear posterior", anatomyIds: ["nervous.model-node-0142", "nervous.model-node-0143"] },
  { concept: "Núcleo del nervio abducens", anatomyIds: ["nervous.model-node-0144", "nervous.model-node-0145"] },
  { concept: "Núcleo del nervio hipogloso", anatomyIds: ["nervous.model-node-0148", "nervous.model-node-0149"] },
  { concept: "Núcleo del nervio oculomotor", anatomyIds: ["nervous.model-node-0150", "nervous.model-node-0151"] },
  { concept: "Núcleo del nervio troclear", anatomyIds: ["nervous.model-node-0152", "nervous.model-node-0153"] },
  { concept: "Núcleo motor del nervio facial", anatomyIds: ["nervous.model-node-0157", "nervous.model-node-0158"] },
  { concept: "Núcleo posterior del nervio vago", anatomyIds: ["nervous.model-node-0159", "nervous.model-node-0160"] },
  { concept: "Pedúnculo del flóculo", anatomyIds: ["nervous.model-node-0183", "nervous.model-node-0184"] },
] as const;

export const nervousEducationalClassificationSnapshot = {
  entriesWithoutEducationalContent: 327,
  centralEntriesWithoutEducationalContent: 155,
  peripheralEntriesWithoutEducationalContent: 162,
  senseEntriesWithoutEducationalContent: 10,
  reviewedCandidateConcepts: 19,
  reviewedCandidateEntries: 35,
  entriesPendingReview: 292,
} as const;
