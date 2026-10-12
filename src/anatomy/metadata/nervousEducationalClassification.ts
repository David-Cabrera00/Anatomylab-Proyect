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

export const nervousPeripheralBatch3Candidates = [
  { concept: "Tronco superior del plexo braquial", educationalId: "nervous.superior-brachial-plexus-trunk", anatomyIds: ["nervous.model-node-0324", "nervous.model-node-0325"] },
  { concept: "Tronco medio del plexo braquial", educationalId: "nervous.middle-brachial-plexus-trunk", anatomyIds: ["nervous.model-node-0322", "nervous.model-node-0323"] },
  { concept: "Tronco inferior del plexo braquial", educationalId: "nervous.inferior-brachial-plexus-trunk", anatomyIds: ["nervous.model-node-0320", "nervous.model-node-0321"] },
] as const;

export const nervousPeripheralBatch4Candidates = [
  { concept: "Nervio iliohipogástrico", educationalId: "nervous.iliohypogastric-nerve", anatomyIds: ["nervous.model-node-0116", "nervous.model-node-0117"] },
  { concept: "Nervio interóseo anterior del antebrazo", educationalId: "nervous.anterior-interosseous-nerve", anatomyIds: ["nervous.model-node-0118", "nervous.model-node-0119"] },
  { concept: "Nervio interóseo posterior del antebrazo", educationalId: "nervous.posterior-interosseous-nerve", anatomyIds: ["nervous.model-node-0120", "nervous.model-node-0121"] },
  { concept: "Nervio mental", educationalId: "nervous.mental-nerve", anatomyIds: ["nervous.model-node-0122", "nervous.model-node-0123"] },
  { concept: "Nervio pectoral lateral", educationalId: "nervous.lateral-pectoral-nerve", anatomyIds: ["nervous.model-node-0124", "nervous.model-node-0125"] },
  { concept: "Nervio pectoral medial", educationalId: "nervous.medial-pectoral-nerve", anatomyIds: ["nervous.model-node-0126", "nervous.model-node-0127"] },
  { concept: "Nervio subclavio", educationalId: "nervous.subclavian-nerve", anatomyIds: ["nervous.model-node-0128", "nervous.model-node-0129"] },
  { concept: "Nervio subescapular inferior", educationalId: "nervous.inferior-subscapular-nerve", anatomyIds: ["nervous.model-node-0130", "nervous.model-node-0131"] },
  { concept: "Nervio subescapular superior", educationalId: "nervous.superior-subscapular-nerve", anatomyIds: ["nervous.model-node-0132", "nervous.model-node-0133"] },
  { concept: "Nervio toracodorsal", educationalId: "nervous.thoracodorsal-nerve", anatomyIds: ["nervous.model-node-0134", "nervous.model-node-0135"] },
  { concept: "Nervio vestibular", educationalId: "nervous.vestibular-nerve", anatomyIds: ["nervous.model-node-0136", "nervous.model-node-0137"] },
  { concept: "Raíz anterior del nervio cutáneo femoral posterior", educationalId: "nervous.anterior-root-posterior-femoral-cutaneous-nerve", anatomyIds: ["nervous.model-node-0264", "nervous.model-node-0265"] },
  { concept: "Raíz motora del nervio trigémino", educationalId: "nervous.motor-root-trigeminal-nerve", anatomyIds: ["nervous.model-node-0266", "nervous.model-node-0267"] },
  { concept: "Raíz posterior del nervio cutáneo femoral posterior", educationalId: "nervous.posterior-root-posterior-femoral-cutaneous-nerve", anatomyIds: ["nervous.model-node-0268", "nervous.model-node-0269"] },
  { concept: "Raíz sensorial del nervio trigémino", educationalId: "nervous.sensory-root-trigeminal-nerve", anatomyIds: ["nervous.model-node-0270", "nervous.model-node-0271"] },
  { concept: "Rama anterior del nervio cutáneo antebraquial medial", educationalId: "nervous.anterior-branch-medial-antebrachial-cutaneous-nerve", anatomyIds: ["nervous.model-node-0194", "nervous.model-node-0195"] },
  { concept: "Rama anterior del nervio obturador", educationalId: "nervous.anterior-obturator-nerve-branch", anatomyIds: ["nervous.model-node-0196", "nervous.model-node-0197"] },
  { concept: "Rama comunicante del nervio mediano con el nervio ulnar", educationalId: "nervous.median-ulnar-communicating-branch", anatomyIds: ["nervous.model-node-0003", "nervous.model-node-0004"] },
  { concept: "Rama dorsal del nervio ulnar", educationalId: "nervous.dorsal-ulnar-nerve-branch", anatomyIds: ["nervous.model-node-0198", "nervous.model-node-0199"] },
  { concept: "Rama femoral del nervio genitofemoral", educationalId: "nervous.femoral-genitofemoral-branch", anatomyIds: ["nervous.model-node-0200", "nervous.model-node-0201"] },
] as const;

export const nervousPeripheralBatch5Candidates = [
  { concept: "Rama genital del nervio genitofemoral", educationalId: "nervous.genital-genitofemoral-branch", anatomyIds: ["nervous.model-node-0202", "nervous.model-node-0203"] },
  { concept: "Rama infrapatelar del nervio safeno", educationalId: "nervous.infrapatellar-saphenous-branch", anatomyIds: ["nervous.model-node-0204", "nervous.model-node-0205"] },
  { concept: "Rama meníngea del nervio maxilar", educationalId: "nervous.meningeal-maxillary-branch", anatomyIds: ["nervous.model-node-0206", "nervous.model-node-0207"] },
  { concept: "Rama palmar del nervio mediano", educationalId: "nervous.palmar-median-branch", anatomyIds: ["nervous.model-node-0208", "nervous.model-node-0209"] },
  { concept: "Rama palmar del nervio ulnar", educationalId: "nervous.palmar-ulnar-branch", anatomyIds: ["nervous.model-node-0210", "nervous.model-node-0211"] },
  { concept: "Rama posterior del nervio cutáneo antebraquial medial", educationalId: "nervous.posterior-branch-medial-antebrachial-cutaneous-nerve", anatomyIds: ["nervous.model-node-0212", "nervous.model-node-0213"] },
  { concept: "Rama posterior del nervio obturador", educationalId: "nervous.posterior-obturator-nerve-branch", anatomyIds: ["nervous.model-node-0214", "nervous.model-node-0215"] },
  { concept: "Rama profunda del nervio radial", educationalId: "nervous.deep-radial-nerve-branch", anatomyIds: ["nervous.model-node-0216", "nervous.model-node-0217"] },
  { concept: "Rama profunda del nervio ulnar", educationalId: "nervous.deep-ulnar-nerve-branch", anatomyIds: ["nervous.model-node-0218", "nervous.model-node-0219"] },
  { concept: "Rama superficial del nervio radial", educationalId: "nervous.superficial-radial-nerve-branch", anatomyIds: ["nervous.model-node-0220", "nervous.model-node-0221"] },
  { concept: "Rama superficial del nervio ulnar", educationalId: "nervous.superficial-ulnar-nerve-branch", anatomyIds: ["nervous.model-node-0222", "nervous.model-node-0223"] },
  { concept: "Rama sural comunicante del nervio fibular común", educationalId: "nervous.communicating-sural-branch-common-fibular", anatomyIds: ["nervous.model-node-0224", "nervous.model-node-0225"] },
  { concept: "Ramas cutáneas anteriores del nervio femoral", educationalId: "nervous.anterior-cutaneous-femoral-branches", anatomyIds: ["nervous.model-node-0226", "nervous.model-node-0227"] },
  { concept: "Ramas cutáneas crurales mediales del nervio safeno", educationalId: "nervous.medial-crural-cutaneous-saphenous-branches", anatomyIds: ["nervous.model-node-0228", "nervous.model-node-0229"] },
  { concept: "Ramas digitales dorsales del nervio fibular profundo", educationalId: "nervous.dorsal-digital-deep-fibular-branches", anatomyIds: ["nervous.model-node-0230", "nervous.model-node-0231"] },
  { concept: "Ramas digitales dorsales del nervio fibular superficial", educationalId: "nervous.dorsal-digital-superficial-fibular-branches", anatomyIds: ["nervous.model-node-0232", "nervous.model-node-0233"] },
  { concept: "Ramas digitales dorsales del nervio radial", educationalId: "nervous.dorsal-digital-radial-branches", anatomyIds: ["nervous.model-node-0234", "nervous.model-node-0235"] },
  { concept: "Ramas digitales dorsales del nervio ulnar", educationalId: "nervous.dorsal-digital-ulnar-branches", anatomyIds: ["nervous.model-node-0236", "nervous.model-node-0237"] },
  { concept: "Ramas digitales palmares comunes del nervio mediano", educationalId: "nervous.common-palmar-digital-median-branches", anatomyIds: ["nervous.model-node-0238", "nervous.model-node-0239"] },
  { concept: "Ramas digitales palmares comunes del nervio ulnar", educationalId: "nervous.common-palmar-digital-ulnar-branches", anatomyIds: ["nervous.model-node-0240", "nervous.model-node-0241"] },
] as const;

export const nervousCentralBatch13Candidates = [
  { concept: "Canal central", educationalId: "nervous.central-canal", anatomyIds: ["nervous.model-node-0011", "nervous.model-node-0012"] },
  { concept: "Tracto posterolateral", educationalId: "nervous.posterolateral-tract", anatomyIds: ["nervous.model-node-0310"] },
  { concept: "Tracto reticuloespinal lateral", educationalId: "nervous.lateral-reticulospinal-tract", anatomyIds: ["nervous.model-node-0311"] },
  { concept: "Tracto reticuloespinal medial", educationalId: "nervous.medial-reticulospinal-tract", anatomyIds: ["nervous.model-node-0312"] },
] as const;

export const nervousPeripheralBatch6Candidates = [
  { concept: "Nervio coclear", educationalId: "nervous.cochlear-nerve", anatomyIds: ["nervous.model-node-0086", "nervous.model-node-0087"] },
  { concept: "Ramas digitales palmares propias del nervio mediano", educationalId: "nervous.proper-palmar-digital-median-branches", anatomyIds: ["nervous.model-node-0242", "nervous.model-node-0243"] },
  { concept: "Ramas digitales palmares propias del nervio ulnar", educationalId: "nervous.proper-palmar-digital-ulnar-branches", anatomyIds: ["nervous.model-node-0244", "nervous.model-node-0245"] },
  { concept: "Ramas digitales plantares comunes del nervio plantar lateral", educationalId: "nervous.common-plantar-digital-lateral-branches", anatomyIds: ["nervous.model-node-0246", "nervous.model-node-0247"] },
  { concept: "Ramas digitales plantares comunes del nervio plantar medial", educationalId: "nervous.common-plantar-digital-medial-branches", anatomyIds: ["nervous.model-node-0248", "nervous.model-node-0249"] },
  { concept: "Ramas digitales plantares propias del nervio plantar lateral", educationalId: "nervous.proper-plantar-digital-lateral-branches", anatomyIds: ["nervous.model-node-0250", "nervous.model-node-0251"] },
  { concept: "Ramas digitales plantares propias del nervio plantar medial", educationalId: "nervous.proper-plantar-digital-medial-branches", anatomyIds: ["nervous.model-node-0252", "nervous.model-node-0253"] },
  { concept: "Ramas musculares del nervio axilar", educationalId: "nervous.muscular-axillary-branches", anatomyIds: ["nervous.model-node-0254", "nervous.model-node-0255"] },
  { concept: "Ramas musculares del nervio fibular profundo", educationalId: "nervous.muscular-deep-fibular-branches", anatomyIds: ["nervous.model-node-0256", "nervous.model-node-0257"] },
  { concept: "Ramas musculares del nervio mediano", educationalId: "nervous.muscular-median-branches", anatomyIds: ["nervous.model-node-0258", "nervous.model-node-0259"] },
  { concept: "Ramas musculares del nervio radial", educationalId: "nervous.muscular-radial-branches", anatomyIds: ["nervous.model-node-0260", "nervous.model-node-0261"] },
  { concept: "Ramas musculares del nervio ulnar", educationalId: "nervous.muscular-ulnar-branches", anatomyIds: ["nervous.model-node-0262", "nervous.model-node-0263"] },
] as const;

export const nervousSenseBatch1Candidates = [
  { concept: "Ampolla del canalículo lagrimal", educationalId: "nervous.lacrimal-canaliculus-ampulla", anatomyIds: ["nervous.model-node-0005", "nervous.model-node-0006"] },
  { concept: "Canalículo lagrimal", educationalId: "nervous.lacrimal-canaliculus", anatomyIds: ["nervous.model-node-0013", "nervous.model-node-0014"] },
  { concept: "Ligamento suspensorio del globo ocular", educationalId: "nervous.suspensory-ligament-eyeball", anatomyIds: ["nervous.model-node-0073", "nervous.model-node-0074"] },
  { concept: "Segmento anterior del globo ocular", educationalId: "nervous.anterior-eyeball-segment", anatomyIds: ["nervous.model-node-0272", "nervous.model-node-0273"] },
  { concept: "Segmento posterior del globo ocular", educationalId: "nervous.posterior-eyeball-segment", anatomyIds: ["nervous.model-node-0274", "nervous.model-node-0275"] },
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

export const nervousCentralBatch9Candidates = [
  { concept: "Surco subparietal", educationalId: "nervous.subparietal-sulcus", anatomyIds: ["nervous.model-node-0301", "nervous.model-node-0302"] },
  { concept: "Surco temporal inferior", educationalId: "nervous.inferior-temporal-sulcus", anatomyIds: ["nervous.model-node-0303", "nervous.model-node-0304"] },
  { concept: "Surco temporal superior", educationalId: "nervous.superior-temporal-sulcus", anatomyIds: ["nervous.model-node-0305", "nervous.model-node-0306"] },
  { concept: "Surco precentral, porción superior", educationalId: "nervous.superior-precentral-sulcus", anatomyIds: ["nervous.model-node-0189", "nervous.model-node-0190"] },
  { concept: "Surco precentral, porción inferior", educationalId: "nervous.inferior-precentral-sulcus", anatomyIds: ["nervous.model-node-0191", "nervous.model-node-0192"] },
] as const;

export const nervousCentralBatch10Candidates = [
  { concept: "Base del pedúnculo", educationalId: "nervous.crus-of-cerebral-peduncle", anatomyIds: ["nervous.model-node-0009", "nervous.model-node-0010"] },
  { concept: "Fosa interpeduncular", educationalId: "nervous.interpeduncular-fossa", anatomyIds: ["nervous.model-node-0053", "nervous.model-node-0054"] },
  { concept: "Giro y surco del cíngulo, porción dorsal posterior", educationalId: "nervous.posterior-dorsal-cingulate-gyrus", anatomyIds: ["nervous.model-node-0021", "nervous.model-node-0022"] },
  { concept: "Núcleo del nervio accesorio", educationalId: "nervous.accessory-nerve-nucleus", anatomyIds: ["nervous.model-node-0146", "nervous.model-node-0147"] },
  { concept: "Núcleo lentiforme", educationalId: "nervous.lentiform-nucleus", anatomyIds: ["nervous.model-node-0155", "nervous.model-node-0156"] },
] as const;

export const nervousCentralBatch11Candidates = [
  { concept: "Dura espinal", educationalId: "nervous.spinal-dura-mater", anatomyIds: ["nervous.model-node-0047"] },
  { concept: "Estrías talámicas medulares", educationalId: "nervous.medullary-thalamic-striae", anatomyIds: ["nervous.model-node-0048", "nervous.model-node-0049"] },
  { concept: "Fascículo anterior propio", educationalId: "nervous.anterior-proprius-fasciculus", anatomyIds: ["nervous.model-node-0050"] },
  { concept: "Fascículo lateral propio", educationalId: "nervous.lateral-proprius-fasciculus", anatomyIds: ["nervous.model-node-0051"] },
  { concept: "Fascículo posterior propio", educationalId: "nervous.posterior-proprius-fasciculus", anatomyIds: ["nervous.model-node-0052"] },
  { concept: "Núcleo propio", educationalId: "nervous.proprius-nucleus", anatomyIds: ["nervous.model-node-0161"] },
  { concept: "Núcleo salival inferior", educationalId: "nervous.inferior-salivatory-nucleus", anatomyIds: ["nervous.model-node-0162", "nervous.model-node-0163"] },
  { concept: "Núcleo salival superior", educationalId: "nervous.superior-salivatory-nucleus", anatomyIds: ["nervous.model-node-0164", "nervous.model-node-0165"] },
  { concept: "Parte opercular del giro frontal inferior", educationalId: "nervous.opercular-part-inferior-frontal-gyrus", anatomyIds: ["nervous.model-node-0179", "nervous.model-node-0180"] },
  { concept: "Proceso reticular espinal", educationalId: "nervous.spinal-reticular-process", anatomyIds: ["nervous.model-node-0193"] },
] as const;

export const nervousCentralBatch12Candidates = [
  { concept: "Rama anterior horizontal de la cisura lateral", educationalId: "nervous.horizontal-anterior-lateral-fissure-branch", anatomyIds: ["nervous.model-node-0065", "nervous.model-node-0066"] },
  { concept: "Rama anterior vertical de la cisura lateral", educationalId: "nervous.vertical-anterior-lateral-fissure-branch", anatomyIds: ["nervous.model-node-0067", "nervous.model-node-0068"] },
  { concept: "Rama posterior de la cisura lateral", educationalId: "nervous.posterior-lateral-fissure-branch", anatomyIds: ["nervous.model-node-0069", "nervous.model-node-0070"] },
  { concept: "Surco colateral transversal posterior", educationalId: "nervous.posterior-transverse-collateral-sulcus", anatomyIds: ["nervous.model-node-0001", "nervous.model-node-0002"] },
  { concept: "Surco del cíngulo, porción marginal", educationalId: "nervous.marginal-cingulate-sulcus", anatomyIds: ["nervous.model-node-0023", "nervous.model-node-0024"] },
  { concept: "Surco occipital anterior", educationalId: "nervous.anterior-occipital-sulcus", anatomyIds: ["nervous.model-node-0007", "nervous.model-node-0008"] },
  { concept: "Surco semilunar", educationalId: "nervous.lunate-sulcus", anatomyIds: ["nervous.model-node-0075", "nervous.model-node-0076"] },
  { concept: "Surcos orbitarios en H", educationalId: "nervous.h-shaped-orbital-sulci", anatomyIds: ["nervous.model-node-0173", "nervous.model-node-0174"] },
  { concept: "Surcos orbitarios laterales", educationalId: "nervous.lateral-orbital-sulci", anatomyIds: ["nervous.model-node-0175", "nervous.model-node-0176"] },
  { concept: "Sustancia intermedia lateral", educationalId: "nervous.lateral-intermediate-substance", anatomyIds: ["nervous.model-node-0307"] },
] as const;

export const nervousPeripheralBatch1Candidates = [
  { concept: "Cuerda del tímpano", educationalId: "nervous.chorda-tympani", anatomyIds: ["nervous.model-node-0027", "nervous.model-node-0028"] },
  { concept: "División anterior del nervio mandibular", educationalId: "nervous.anterior-mandibular-division", anatomyIds: ["nervous.model-node-0031", "nervous.model-node-0032"] },
  { concept: "División posterior del nervio mandibular", educationalId: "nervous.posterior-mandibular-division", anatomyIds: ["nervous.model-node-0039", "nervous.model-node-0040"] },
  { concept: "Nervio al músculo milohioideo", educationalId: "nervous.mylohyoid-nerve", anatomyIds: ["nervous.model-node-0080", "nervous.model-node-0081"] },
  { concept: "Nervio alveolar inferior", educationalId: "nervous.inferior-alveolar-nerve", anatomyIds: ["nervous.model-node-0082", "nervous.model-node-0083"] },
  { concept: "Nervio bucal", educationalId: "nervous.buccal-nerve", anatomyIds: ["nervous.model-node-0084", "nervous.model-node-0085"] },
  { concept: "Nervio cutáneo antebraquial lateral", educationalId: "nervous.lateral-antebrachial-cutaneous-nerve", anatomyIds: ["nervous.model-node-0088", "nervous.model-node-0089"] },
  { concept: "Nervio cutáneo antebraquial medial", educationalId: "nervous.medial-antebrachial-cutaneous-nerve", anatomyIds: ["nervous.model-node-0090", "nervous.model-node-0091"] },
  { concept: "Nervio cutáneo antebraquial posterior", educationalId: "nervous.posterior-antebrachial-cutaneous-nerve", anatomyIds: ["nervous.model-node-0092", "nervous.model-node-0093"] },
  { concept: "Nervio cutáneo braquial lateral inferior", educationalId: "nervous.inferior-lateral-brachial-cutaneous-nerve", anatomyIds: ["nervous.model-node-0094", "nervous.model-node-0095"] },
  { concept: "Nervio cutáneo braquial lateroposterior", educationalId: "nervous.posterolateral-brachial-cutaneous-nerve", anatomyIds: ["nervous.model-node-0096", "nervous.model-node-0097"] },
  { concept: "Nervio cutáneo braquial medial", educationalId: "nervous.medial-brachial-cutaneous-nerve", anatomyIds: ["nervous.model-node-0098", "nervous.model-node-0099"] },
  { concept: "Nervio cutáneo dorsal intermedio del pie", educationalId: "nervous.intermediate-dorsal-cutaneous-nerve", anatomyIds: ["nervous.model-node-0100", "nervous.model-node-0101"] },
  { concept: "Nervio cutáneo dorsal medial del pie", educationalId: "nervous.medial-dorsal-cutaneous-nerve", anatomyIds: ["nervous.model-node-0102", "nervous.model-node-0103"] },
  { concept: "Nervio cutáneo femoral posterior", educationalId: "nervous.posterior-femoral-cutaneous-nerve", anatomyIds: ["nervous.model-node-0104", "nervous.model-node-0105"] },
  { concept: "Nervio cutáneo sural medial", educationalId: "nervous.medial-sural-cutaneous-nerve", anatomyIds: ["nervous.model-node-0106", "nervous.model-node-0107"] },
  { concept: "Nervio del músculo cuadrado femoral", educationalId: "nervous.quadratus-femoris-nerve", anatomyIds: ["nervous.model-node-0108", "nervous.model-node-0109"] },
  { concept: "Nervio del músculo piriforme", educationalId: "nervous.piriformis-nerve", anatomyIds: ["nervous.model-node-0110", "nervous.model-node-0111"] },
  { concept: "Nervio escapular dorsal", educationalId: "nervous.dorsal-scapular-nerve", anatomyIds: ["nervous.model-node-0112", "nervous.model-node-0113"] },
  { concept: "Nervio ilio-inguinal", educationalId: "nervous.ilioinguinal-nerve", anatomyIds: ["nervous.model-node-0114", "nervous.model-node-0115"] },
] as const;

export const nervousEducationalClassificationSnapshot = {
  entriesWithoutEducationalContent: 0,
  centralEntriesWithoutEducationalContent: 0,
  peripheralEntriesWithoutEducationalContent: 0,
  senseEntriesWithoutEducationalContent: 0,
  completedConcepts: 176,
  completedEntries: 327,
  entriesPendingReview: 0,
} as const;
