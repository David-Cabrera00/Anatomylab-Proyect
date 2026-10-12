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

export const nervousPeripheralBatch2Candidates = [
  { concept: "División anterior del tronco superior", educationalId: "nervous.superior-trunk-anterior-division", anatomyIds: ["nervous.model-node-0037", "nervous.model-node-0038"] },
  { concept: "División anterior del tronco medio", educationalId: "nervous.middle-trunk-anterior-division", anatomyIds: ["nervous.model-node-0035", "nervous.model-node-0036"] },
  { concept: "División anterior del tronco inferior", educationalId: "nervous.inferior-trunk-anterior-division", anatomyIds: ["nervous.model-node-0033", "nervous.model-node-0034"] },
  { concept: "División posterior del tronco superior", educationalId: "nervous.superior-trunk-posterior-division", anatomyIds: ["nervous.model-node-0045", "nervous.model-node-0046"] },
  { concept: "División posterior del tronco medio", educationalId: "nervous.middle-trunk-posterior-division", anatomyIds: ["nervous.model-node-0043", "nervous.model-node-0044"] },
  { concept: "División posterior del tronco inferior", educationalId: "nervous.inferior-trunk-posterior-division", anatomyIds: ["nervous.model-node-0041", "nervous.model-node-0042"] },
] as const;

export const nervousCentralBatch3Candidates = [
  { concept: "Amígdala del cerebelo", educationalId: "nervous.cerebellar-amygdala", anatomyIds: ["nervous.cerebellar-amygdala.left", "nervous.cerebellar-amygdala.right"] },
  { concept: "Giro y surco del cíngulo, porción media anterior", educationalId: "nervous.middle-anterior-cingulate-gyrus", anatomyIds: ["nervous.model-node-0017", "nervous.model-node-0018"] },
  { concept: "Giro y surco del cíngulo, porción media posterior", educationalId: "nervous.middle-posterior-cingulate-gyrus", anatomyIds: ["nervous.model-node-0019", "nervous.model-node-0020"] },
  { concept: "Giro y surco paracentrales", educationalId: "nervous.paracentral-gyrus-and-sulcus", anatomyIds: ["nervous.model-node-0177", "nervous.model-node-0178"] },
  { concept: "Giros orbitarios frontomarginales", educationalId: "nervous.frontomarginal-orbital-gyri", anatomyIds: ["nervous.model-node-0169", "nervous.model-node-0170"] },
] as const;

export const nervousCentralBatch4Candidates = [
  { concept: "Habénula", educationalId: "nervous.habenula", anatomyIds: ["nervous.model-node-0059"] },
  { concept: "Hoz del cerebro", educationalId: "nervous.falx-cerebri", anatomyIds: ["nervous.model-node-0060"] },
  { concept: "Materia gris del bulbo raquídeo", educationalId: "nervous.medullary-gray-matter", anatomyIds: ["nervous.model-node-0077"] },
  { concept: "Núcleo intermediomedial", educationalId: "nervous.intermediomedial-nucleus", anatomyIds: ["nervous.model-node-0154"] },
  { concept: "Núcleos septales", educationalId: "nervous.septal-nuclei", anatomyIds: ["nervous.model-node-0166"] },
] as const;

export const nervousCentralBatch5Candidates = [
  { concept: "Giro occipitotemporal lateral", educationalId: "nervous.lateral-occipitotemporal-gyrus", anatomyIds: ["nervous.model-node-0055", "nervous.model-node-0056"] },
  { concept: "Giros orbitales", educationalId: "nervous.orbital-gyri", anatomyIds: ["nervous.model-node-0057", "nervous.model-node-0058"] },
  { concept: "Giro y surco occipitales inferiores", educationalId: "nervous.inferior-occipital-gyrus-and-sulcus", anatomyIds: ["nervous.model-node-0061", "nervous.model-node-0062"] },
  { concept: "Giro occipital lateral", educationalId: "nervous.lateral-occipital-gyrus", anatomyIds: ["nervous.model-node-0071", "nervous.model-node-0072"] },
  { concept: "Surco occipitotemporal, porción lateral", educationalId: "nervous.lateral-occipitotemporal-sulcus", anatomyIds: ["nervous.model-node-0167", "nervous.model-node-0168"] },
] as const;

export const nervousCentralBatch6Candidates = [
  { concept: "Giro y surco frontopolares transversos", educationalId: "nervous.transverse-frontopolar-gyrus-and-sulcus", anatomyIds: ["nervous.model-node-0318", "nervous.model-node-0319"] },
  { concept: "Parte orbitaria del giro frontal inferior", educationalId: "nervous.orbital-part-inferior-frontal-gyrus", anatomyIds: ["nervous.model-node-0171", "nervous.model-node-0172"] },
  { concept: "Parte triangular del giro frontal inferior", educationalId: "nervous.triangular-part-inferior-frontal-gyrus", anatomyIds: ["nervous.model-node-0181", "nervous.model-node-0182"] },
  { concept: "Plano temporal", educationalId: "nervous.planum-temporale", anatomyIds: ["nervous.model-node-0185", "nervous.model-node-0186"] },
  { concept: "Polo temporal", educationalId: "nervous.temporal-pole", anatomyIds: ["nervous.model-node-0187", "nervous.model-node-0188"] },
] as const;

export const nervousCentralBatch7Candidates = [
  { concept: "Surco intermedio de Jensen", educationalId: "nervous.jensen-intermediate-sulcus", anatomyIds: ["nervous.model-node-0281", "nervous.model-node-0282"] },
  { concept: "Surco circular de la ínsula", educationalId: "nervous.circular-insular-sulcus", anatomyIds: ["nervous.model-node-0283", "nervous.model-node-0284"] },
  { concept: "Surco colateral", educationalId: "nervous.collateral-sulcus", anatomyIds: ["nervous.model-node-0285", "nervous.model-node-0286"] },
  { concept: "Surco frontal inferior", educationalId: "nervous.inferior-frontal-sulcus", anatomyIds: ["nervous.model-node-0287", "nervous.model-node-0288"] },
  { concept: "Surco frontal superior", educationalId: "nervous.superior-frontal-sulcus", anatomyIds: ["nervous.model-node-0289", "nervous.model-node-0290"] },
] as const;

export const nervousCentralBatch8Candidates = [
  { concept: "Surco occipital transversal", educationalId: "nervous.transverse-occipital-sulcus", anatomyIds: ["nervous.model-node-0291", "nervous.model-node-0292"] },
  { concept: "Surco olfatorio", educationalId: "nervous.olfactory-sulcus", anatomyIds: ["nervous.model-node-0293", "nervous.model-node-0294"] },
  { concept: "Surco paracentral", educationalId: "nervous.paracentral-sulcus", anatomyIds: ["nervous.model-node-0295", "nervous.model-node-0296"] },
  { concept: "Surco parieto-occipital", educationalId: "nervous.parieto-occipital-sulcus", anatomyIds: ["nervous.model-node-0297", "nervous.model-node-0298"] },
  { concept: "Surco poscentral", educationalId: "nervous.postcentral-sulcus", anatomyIds: ["nervous.model-node-0299", "nervous.model-node-0300"] },
] as const;

export const nervousEducationalClassificationSnapshot = {
  entriesWithoutEducationalContent: 212,
  centralEntriesWithoutEducationalContent: 58,
  peripheralEntriesWithoutEducationalContent: 144,
  senseEntriesWithoutEducationalContent: 10,
  completedConcepts: 65,
  completedEntries: 115,
  entriesPendingReview: 212,
} as const;
