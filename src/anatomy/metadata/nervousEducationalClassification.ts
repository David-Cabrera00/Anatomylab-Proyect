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
  { concept: "Cúneo", educationalId: "nervous.cuneus", anatomyIds: ["nervous.model-node-0029", "nervous.model-node-0030"] },
  { concept: "Comisura hipocampal", educationalId: "nervous.hippocampal-commissure", anatomyIds: ["nervous.model-node-0025"] },
  { concept: "Comisura posterior", educationalId: "nervous.posterior-commissure", anatomyIds: ["nervous.model-node-0026"] },
  { concept: "Estría terminal", educationalId: "nervous.stria-terminalis", anatomyIds: ["nervous.model-node-0279", "nervous.model-node-0280"] },
  { concept: "Giro del cíngulo, porción posteroventral", educationalId: "nervous.posteroventral-cingulate-gyrus", anatomyIds: ["nervous.model-node-0015", "nervous.model-node-0016"] },
  { concept: "Giro parahipocampal", educationalId: "nervous.parahippocampal-gyrus", anatomyIds: ["nervous.model-node-0078", "nervous.model-node-0079"] },
  { concept: "Giro recto", educationalId: "nervous.gyrus-rectus", anatomyIds: ["nervous.model-node-0277", "nervous.model-node-0278"] },
  { concept: "Ínsula", educationalId: "nervous.insula", anatomyIds: ["nervous.model-node-0063", "nervous.model-node-0064"] },
  { concept: "Tabique pelúcido", educationalId: "nervous.septum-pellucidum", anatomyIds: ["nervous.model-node-0276"] },
  { concept: "Núcleo accesorio del nervio oculomotor", educationalId: "nervous.accessory-oculomotor-nucleus", anatomyIds: ["nervous.model-node-0138", "nervous.model-node-0139"] },
  { concept: "Núcleo coclear anterior", educationalId: "nervous.anterior-cochlear-nucleus", anatomyIds: ["nervous.model-node-0140", "nervous.model-node-0141"] },
  { concept: "Núcleo coclear posterior", educationalId: "nervous.posterior-cochlear-nucleus", anatomyIds: ["nervous.model-node-0142", "nervous.model-node-0143"] },
  { concept: "Núcleo del nervio abducens", educationalId: "nervous.abducens-nucleus", anatomyIds: ["nervous.model-node-0144", "nervous.model-node-0145"] },
  { concept: "Núcleo del nervio hipogloso", educationalId: "nervous.hypoglossal-nucleus", anatomyIds: ["nervous.model-node-0148", "nervous.model-node-0149"] },
  { concept: "Núcleo del nervio oculomotor", educationalId: "nervous.oculomotor-nucleus", anatomyIds: ["nervous.model-node-0150", "nervous.model-node-0151"] },
  { concept: "Núcleo del nervio troclear", educationalId: "nervous.trochlear-nucleus", anatomyIds: ["nervous.model-node-0152", "nervous.model-node-0153"] },
  { concept: "Núcleo motor del nervio facial", educationalId: "nervous.facial-motor-nucleus", anatomyIds: ["nervous.model-node-0157", "nervous.model-node-0158"] },
  { concept: "Núcleo posterior del nervio vago", educationalId: "nervous.dorsal-motor-nucleus-vagus", anatomyIds: ["nervous.model-node-0159", "nervous.model-node-0160"] },
  { concept: "Pedúnculo del flóculo", educationalId: "nervous.floccular-peduncle", anatomyIds: ["nervous.model-node-0183", "nervous.model-node-0184"] },
] as const;

export const nervousCentralBatch2Candidates = [
  { concept: "Tracto corticoespinal anterior", educationalId: "nervous.anterior-corticospinal-tract", anatomyIds: ["nervous.model-node-0308"] },
  { concept: "Tracto espinotalámico anterior", educationalId: "nervous.anterior-spinothalamic-tract", anatomyIds: ["nervous.model-node-0309"] },
  { concept: "Tracto rubroespinal", educationalId: "nervous.rubrospinal-tract", anatomyIds: ["nervous.model-node-0313"] },
  { concept: "Tracto espinotectal", educationalId: "nervous.spinotectal-tract", anatomyIds: ["nervous.model-node-0314"] },
  { concept: "Tracto tectoespinal", educationalId: "nervous.tectospinal-tract", anatomyIds: ["nervous.model-node-0315"] },
  { concept: "Tracto vestibuloespinal lateral", educationalId: "nervous.lateral-vestibulospinal-tract", anatomyIds: ["nervous.model-node-0316"] },
  { concept: "Tracto vestibuloespinal medial", educationalId: "nervous.medial-vestibulospinal-tract", anatomyIds: ["nervous.model-node-0317"] },
] as const;

export const nervousPeripheralBatch1Candidates = [
  { concept: "Tronco superior del plexo braquial", educationalId: "nervous.superior-brachial-plexus-trunk", anatomyIds: ["nervous.model-node-0324", "nervous.model-node-0325"] },
  { concept: "Tronco medio del plexo braquial", educationalId: "nervous.middle-brachial-plexus-trunk", anatomyIds: ["nervous.model-node-0322", "nervous.model-node-0323"] },
  { concept: "Tronco inferior del plexo braquial", educationalId: "nervous.inferior-brachial-plexus-trunk", anatomyIds: ["nervous.model-node-0320", "nervous.model-node-0321"] },
] as const;

export const nervousEducationalClassificationSnapshot = {
  entriesWithoutEducationalContent: 279,
  centralEntriesWithoutEducationalContent: 113,
  peripheralEntriesWithoutEducationalContent: 156,
  senseEntriesWithoutEducationalContent: 10,
  completedConcepts: 29,
  completedEntries: 48,
  entriesPendingReview: 279,
} as const;
