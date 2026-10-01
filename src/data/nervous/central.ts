import type { EducationalStructureBinding } from "../educationalCollection";
import { bilateral } from "./binding";

export const centralEntries: readonly EducationalStructureBinding[] = [
  bilateral("Ala del lÃ³bulo central", {
    id: "nervous.central-lobule-wing",
    name: "Ala del lÃ³bulo central",
    type: "Cerebelo",
    description: "PorciÃ³n lateral del l\u00f3bulo central del vermis cerebeloso.",
    function: "Contribuye a los circuitos cerebelosos que coordinan y ajustan el movimiento.",
    location: "RegiÃ³n anterior del cerebelo, a cada lado del vermis.",
    relationships: ["LÃ³bulo central", "Vermis cerebeloso", "Culmen"],
  }),
  // Cerebelo: el GLB representa partes, no un nodo Ãºnico llamado Â«cerebeloÂ».
  {
    originalName: "LÃ³bulo central",
    data: {
      id: "nervous.cerebellar-central-lobule", name: "LÃ³bulo central", type: "Cerebelo",
      description: "PorciÃ³n del vermis cerebeloso anterior, situada entre la lÃ­ngula y el culmen.",
      function: "Forma parte de los circuitos cerebelosos que ajustan la coordinaciÃ³n motora.",
      location: "Vermis de la regiÃ³n superior del cerebelo.",
      relationships: ["Vermis", "Culmen", "LÃ­ngula del cerebelo"],
    },
  },
  bilateral("Flocculus", {
    id: "nervous.flocculus", name: "FlÃ³culo", type: "Cerebelo",
    description: "PequeÃ±a porciÃ³n lateral del lÃ³bulo floculonodular del cerebelo.",
    function: "Participa en el control del equilibrio y de los movimientos oculares.",
    location: "Cara inferior del cerebelo, prÃ³xima al tronco encefÃ¡lico.",
    relationships: ["NÃ³dulo del vermis", "Sistema vestibular"],
  }),
  {
    originalName: "NÃ³dulo del vermis",
    data: {
      id: "nervous.cerebellar-nodulus", name: "NÃ³dulo del vermis", type: "Cerebelo",
      description: "Componente medial del lÃ³bulo floculonodular cerebeloso.",
      function: "Contribuye al procesamiento vestibular y al equilibrio.",
      location: "Parte inferior del vermis cerebeloso.",
      relationships: ["FlÃ³culos", "Cuarto ventrÃ­culo"],
    },
  },
  bilateral("PedÃºnculo cerebeloso superior", {
    id: "nervous.superior-cerebellar-peduncle", name: "PedÃºnculo cerebeloso superior", type: "VÃ­a cerebelosa",
    description: "Haz de fibras que conecta el cerebelo con el mesencÃ©falo.",
    function: "Conduce principalmente seÃ±ales de salida del cerebelo hacia circuitos motores.",
    location: "Entre el cerebelo y la parte rostral del tronco encefÃ¡lico.",
    relationships: ["Cerebelo", "MesencÃ©falo"],
  }),

  // DiencÃ©falo y vÃ­as visuales.
  bilateral("TÃ¡lamo", {
    id: "nervous.thalamus", name: "TÃ¡lamo", type: "DiencÃ©falo",
    description: "Conjunto de nÃºcleos diencefÃ¡licos situado a cada lado del tercer ventrÃ­culo.",
    function: "Integra y retransmite informaciÃ³n sensitiva y motora hacia la corteza cerebral.",
    location: "Profundo en el encÃ©falo, superior al tronco encefÃ¡lico.",
    relationships: ["Tercer ventrÃ­culo", "Corteza cerebral", "HipotÃ¡lamo"],
  }),
  {
    originalName: "HipotÃ¡lamo",
    data: {
      id: "nervous.hypothalamus", name: "HipotÃ¡lamo", type: "DiencÃ©falo",
      description: "RegiÃ³n diencefÃ¡lica inferior al tÃ¡lamo, conectada funcionalmente con la hipÃ³fisis.",
      function: "Coordina respuestas autonÃ³micas, endocrinas y mecanismos de homeostasis.",
      location: "Forma parte del suelo y las paredes inferiores del tercer ventrÃ­culo.",
      relationships: ["TÃ¡lamo", "Tercer ventrÃ­culo", "HipÃ³fisis"],
    },
  },
  bilateral("Cuerpo geniculado lateral", {
    id: "nervous.lateral-geniculate-body", name: "Cuerpo geniculado lateral", type: "NÃºcleo talÃ¡mico",
    description: "NÃºcleo visual del metatÃ¡lamo que recibe fibras del tracto Ã³ptico.",
    function: "Releva informaciÃ³n visual hacia la corteza occipital.",
    location: "RegiÃ³n posterolateral del tÃ¡lamo.",
    relationships: ["Tracto Ã³ptico", "RadiaciÃ³n Ã³ptica"],
  }),
  bilateral("Cuerpo geniculado medial", {
    id: "nervous.medial-geniculate-body", name: "Cuerpo geniculado medial", type: "NÃºcleo talÃ¡mico",
    description: "NÃºcleo auditivo del metatÃ¡lamo.",
    function: "Transmite informaciÃ³n auditiva hacia la corteza temporal.",
    location: "RegiÃ³n posterior del tÃ¡lamo, medial al cuerpo geniculado lateral.",
    relationships: ["ColÃ­culo inferior", "Corteza auditiva"],
  }),
  bilateral("Quiasma Ã³ptico", {
    id: "nervous.optic-chiasm", name: "Quiasma Ã³ptico", type: "VÃ­a visual",
    description: "RegiÃ³n donde cruzan parcialmente fibras de ambos nervios Ã³pticos.",
    function: "Redistribuye la informaciÃ³n de los hemicampos visuales hacia los tractos Ã³pticos.",
    location: "Base del encÃ©falo, anterior al hipotÃ¡lamo.",
    relationships: ["Nervios Ã³pticos", "Tractos Ã³pticos"],
  }),
  bilateral("Tracto Ã³ptico", {
    id: "nervous.optic-tract", name: "Tracto Ã³ptico", type: "VÃ­a visual",
    description: "Haz de fibras que continÃºa posterior al quiasma Ã³ptico.",
    function: "Conduce seÃ±ales visuales hacia nÃºcleos diencefÃ¡licos y mesencefÃ¡licos.",
    location: "Se extiende desde el quiasma hacia el cuerpo geniculado lateral.",
    relationships: ["Quiasma Ã³ptico", "Cuerpo geniculado lateral"],
  }),
  {
    originalName: "Tercer ventrÃ­culo",
    data: {
      id: "nervous.third-ventricle", name: "Tercer ventrÃ­culo", type: "Sistema ventricular",
      description: "Cavidad media del diencÃ©falo que contiene lÃ­quido cefalorraquÃ­deo.",
      function: "Permite la circulaciÃ³n de lÃ­quido cefalorraquÃ­deo entre los ventrÃ­culos laterales y el acueducto cerebral.",
      location: "Entre ambos tÃ¡lamos, sobre el hipotÃ¡lamo.",
      relationships: ["VentrÃ­culos laterales", "Acueducto del mesencÃ©falo"],
    },
  },

  // NÃºcleos basales.
  bilateral("NÃºcleo caudado", {
    id: "nervous.caudate-nucleus", name: "NÃºcleo caudado", type: "NÃºcleo basal",
    description: "NÃºcleo de sustancia gris que sigue el contorno del ventrÃ­culo lateral.",
    function: "Participa en circuitos de selecciÃ³n de acciones y control motor.",
    location: "Profundo en el hemisferio cerebral, junto al ventrÃ­culo lateral.",
    relationships: ["Putamen", "Globo pÃ¡lido", "VentrÃ­culo lateral"],
  }),
  bilateral("Putamen", {
    id: "nervous.putamen", name: "Putamen", type: "NÃºcleo basal",
    description: "Componente lateral del nÃºcleo lentiforme y parte del estriado.",
    function: "Interviene en circuitos motores de los nÃºcleos basales.",
    location: "Profundo en el hemisferio cerebral, lateral al globo pÃ¡lido.",
    relationships: ["NÃºcleo caudado", "Globo pÃ¡lido"],
  }),
  bilateral("Globo pÃ¡lido", {
    id: "nervous.globus-pallidus", name: "Globo pÃ¡lido", type: "NÃºcleo basal",
    description: "Componente medial del nÃºcleo lentiforme.",
    function: "Modula la salida de los circuitos de los nÃºcleos basales implicados en el movimiento.",
    location: "Medial al putamen en el telencÃ©falo profundo.",
    relationships: ["Putamen", "TÃ¡lamo"],
  }),

  // Corteza cerebral y sistema lÃ­mbico.
  bilateral("Giro precentral", {
    id: "nervous.precentral-gyrus", name: "Giro precentral", type: "Corteza cerebral",
    description: "Giro frontal situado inmediatamente anterior al surco central.",
    function: "Contiene gran parte de la corteza motora primaria para los movimientos voluntarios.",
    location: "LÃ³bulo frontal, delante del surco central.",
    relationships: ["Surco central", "Tracto corticoespinal"],
  }),
  bilateral("Giro poscentral", {
    id: "nervous.postcentral-gyrus", name: "Giro poscentral", type: "Corteza cerebral",
    description: "Giro parietal situado inmediatamente posterior al surco central.",
    function: "Aloja la corteza somatosensitiva primaria.",
    location: "LÃ³bulo parietal, detrÃ¡s del surco central.",
    relationships: ["Surco central", "TÃ¡lamo"],
  }),
  bilateral("Surco central", {
    id: "nervous.central-sulcus", name: "Surco central", type: "Surco cerebral",
    description: "Surco prominente que separa los lÃ³bulos frontal y parietal.",
    function: "Sirve de referencia anatÃ³mica entre las cortezas motora y somatosensitiva primarias.",
    location: "Cara superolateral del hemisferio cerebral.",
    relationships: ["Giro precentral", "Giro poscentral"],
  }),
  bilateral("LÃ³bulo parietal superior", {
    id: "nervous.superior-parietal-lobule", name: "LÃ³bulo parietal superior", type: "Corteza cerebral",
    description: "RegiÃ³n cortical parietal superior al surco intraparietal.",
    function: "Integra informaciÃ³n somatosensitiva y espacial.",
    location: "Parte superior y posterior del lÃ³bulo parietal.",
    relationships: ["Surco intraparietal", "Giro poscentral"],
  }),
  bilateral("Giro angular", {
    id: "nervous.angular-gyrus", name: "Giro angular", type: "Corteza de asociaciÃ³n",
    description: "Giro del lÃ³bulo parietal inferior que rodea el extremo del surco temporal superior.",
    function: "Participa en la integraciÃ³n multimodal relacionada con lenguaje, lectura y cogniciÃ³n espacial.",
    location: "RegiÃ³n temporoparietal posterior.",
    relationships: ["Giro supramarginal", "Surco temporal superior"],
  }),
  bilateral("Giro supramarginal", {
    id: "nervous.supramarginal-gyrus", name: "Giro supramarginal", type: "Corteza de asociaciÃ³n",
    description: "Giro parietal inferior que rodea el extremo de la cisura lateral.",
    function: "Contribuye a la integraciÃ³n sensitiva y a procesos del lenguaje.",
    location: "LÃ³bulo parietal inferior.",
    relationships: ["Giro angular", "Cisura lateral"],
  }),
  bilateral("Surco calcarino", {
    id: "nervous.calcarine-sulcus", name: "Surco calcarino", type: "Surco cerebral",
    description: "Surco de la cara medial del lÃ³bulo occipital.",
    function: "Delimita regiones de la corteza visual primaria en sus bordes.",
    location: "Cara medial del lÃ³bulo occipital.",
    relationships: ["CÃºneo", "Giro lingual"],
  }),
  bilateral("Giros temporales transversos", {
    id: "nervous.transverse-temporal-gyri", name: "Giros temporales transversos", type: "Corteza cerebral",
    description: "Giros situados en la superficie superior del lÃ³bulo temporal.",
    function: "Contienen la corteza auditiva primaria.",
    location: "Profundos en la cisura lateral del hemisferio.",
    relationships: ["Cuerpo geniculado medial", "LÃ³bulo temporal"],
  }),
  bilateral("Hipocampo", {
    id: "nervous.hippocampus", name: "Hipocampo", type: "Sistema lÃ­mbico",
    description: "Estructura cortical del lÃ³bulo temporal medial.",
    function: "Interviene en la formaciÃ³n y consolidaciÃ³n de memorias declarativas.",
    location: "Profundo en el lÃ³bulo temporal, junto al ventrÃ­culo lateral.",
    relationships: ["FÃ³rnix", "Cuerpo amigdaloide"],
  }),
  bilateral("Cuerpo amigdaloide", {
    id: "nervous.amygdaloid-body", name: "Cuerpo amigdaloide", type: "Sistema lÃ­mbico",
    description: "Conjunto de nÃºcleos del lÃ³bulo temporal medial.",
    function: "Participa en el procesamiento emocional y en respuestas autonÃ³micas asociadas.",
    location: "Anterior al hipocampo en el lÃ³bulo temporal.",
    relationships: ["Hipocampo", "HipotÃ¡lamo"],
  }),

  // Conexiones profundas y sistema ventricular.
  {
    originalName: "Cuerpo calloso",
    data: {
      id: "nervous.corpus-callosum", name: "Cuerpo calloso", type: "Comisura cerebral",
      description: "Gran haz de sustancia blanca que une ambos hemisferios cerebrales.",
      function: "Permite la comunicaciÃ³n entre Ã¡reas corticales de los dos hemisferios.",
      location: "Profundo en la lÃ­nea media, superior a los ventrÃ­culos laterales.",
      relationships: ["Hemisferios cerebrales", "VentrÃ­culos laterales"],
    },
  },
  bilateral("Fornix", {
    id: "nervous.fornix", name: "FÃ³rnix", type: "VÃ­a lÃ­mbica",
    description: "Haz de fibras que conecta el hipocampo con otras estructuras del sistema lÃ­mbico.",
    function: "Conduce seÃ±ales hipocampales hacia los cuerpos mamilares y otras regiones.",
    location: "Arqueado bajo el cuerpo calloso y sobre el tercer ventrÃ­culo.",
    relationships: ["Hipocampo", "Cuerpos mamilares"],
  }),
  bilateral("Sustancia blanca del telencÃ©falo", {
    id: "nervous.telencephalic-white-matter", name: "Sustancia blanca del telencÃ©falo", type: "Sustancia blanca",
    description: "Conjunto de fibras nerviosas subcorticales de los hemisferios cerebrales.",
    function: "Conecta regiones corticales entre sÃ­ y con estructuras profundas.",
    location: "Bajo la corteza cerebral de cada hemisferio.",
    relationships: ["Corteza cerebral", "Cuerpo calloso"],
  }),
  bilateral("VentrÃ­culo lateral", {
    id: "nervous.lateral-ventricle", name: "VentrÃ­culo lateral", type: "Sistema ventricular",
    description: "Cavidad con lÃ­quido cefalorraquÃ­deo dentro de cada hemisferio cerebral.",
    function: "Forma parte del sistema de circulaciÃ³n del lÃ­quido cefalorraquÃ­deo.",
    location: "Profundo en el telencÃ©falo.",
    relationships: ["Tercer ventrÃ­culo", "Plexo coroideo"],
  }),

  // Tronco encefÃ¡lico.
  bilateral("MesencÃ©falo", {
    id: "nervous.midbrain", name: "MesencÃ©falo", type: "Tronco encefÃ¡lico",
    description: "PorciÃ³n superior del tronco encefÃ¡lico, entre el diencÃ©falo y el puente.",
    function: "Contiene vÃ­as de paso y centros implicados en movimientos oculares y respuestas visuales y auditivas.",
    location: "Entre tÃ¡lamo y puente.",
    relationships: ["Puente", "ColÃ­culos", "Nervios III y IV"],
  }),
  bilateral("Puente troncoencefÃ¡lico", {
    id: "nervous.pons", name: "Puente troncoencefÃ¡lico", type: "Tronco encefÃ¡lico",
    description: "PorciÃ³n del tronco encefÃ¡lico situada entre el mesencÃ©falo y el bulbo raquÃ­deo.",
    function: "Conduce vÃ­as ascendentes y descendentes y comunica la corteza con el cerebelo.",
    location: "Anterior al cerebelo, sobre el bulbo raquÃ­deo.",
    relationships: ["MesencÃ©falo", "Bulbo raquÃ­deo", "Cerebelo"],
  }),
  bilateral("Bulbo raquÃ­deo", {
    id: "nervous.medulla-oblongata", name: "Bulbo raquÃ­deo", type: "Tronco encefÃ¡lico",
    description: "PorciÃ³n inferior del tronco encefÃ¡lico, continua con la mÃ©dula espinal.",
    function: "Aloja vÃ­as nerviosas y centros que regulan funciones cardiorrespiratorias.",
    location: "Entre el puente y la mÃ©dula espinal.",
    relationships: ["Puente", "MÃ©dula espinal", "Nervios craneales IX a XII"],
  }),
  bilateral("ColÃ­culo superior", {
    id: "nervous.superior-colliculus", name: "ColÃ­culo superior", type: "MesencÃ©falo",
    description: "Relieve dorsal del mesencÃ©falo asociado a circuitos visuales.",
    function: "Participa en la orientaciÃ³n de ojos y cabeza hacia estÃ­mulos visuales.",
    location: "Tectum mesencefÃ¡lico, superior al colÃ­culo inferior.",
    relationships: ["MesencÃ©falo", "VÃ­a visual"],
  }),
  bilateral("ColÃ­culo inferior", {
    id: "nervous.inferior-colliculus", name: "ColÃ­culo inferior", type: "MesencÃ©falo",
    description: "Relieve dorsal del mesencÃ©falo que integra informaciÃ³n auditiva.",
    function: "Releva seÃ±ales auditivas hacia el cuerpo geniculado medial.",
    location: "Tectum mesencefÃ¡lico, inferior al colÃ­culo superior.",
    relationships: ["Cuerpo geniculado medial", "VÃ­a auditiva"],
  }),

  // MÃ©dula espinal: el GLB muestra sus tejidos y vÃ­as, pero no un nodo global Â«mÃ©dula espinalÂ».
  {
    originalName: "Sustancia blanca de la mÃ©dula espinal",
    data: {
      id: "nervous.spinal-white-matter", name: "Sustancia blanca de la mÃ©dula espinal", type: "MÃ©dula espinal",
      description: "Fibras mielinizadas organizadas en cordones alrededor de la sustancia gris medular.",
      function: "Conduce informaciÃ³n sensitiva ascendente y motora descendente.",
      location: "RegiÃ³n perifÃ©rica de la mÃ©dula espinal.",
      relationships: ["Cuerno anterior", "Cuerno posterior", "Tractos espinales"],
    },
  },
  {
    originalName: "Cuerno anterior de la mÃ©dula espinal",
    data: {
      id: "nervous.spinal-anterior-horn", name: "Cuerno anterior de la mÃ©dula espinal", type: "Sustancia gris",
      description: "ProyecciÃ³n anterior de la sustancia gris medular que contiene motoneuronas somÃ¡ticas.",
      function: "EnvÃ­a seÃ±ales motoras hacia mÃºsculos esquelÃ©ticos por las raÃ­ces anteriores.",
      location: "Parte anterior de la sustancia gris medular.",
      relationships: ["RaÃ­z anterior del nervio espinal", "MÃºsculos esquelÃ©ticos"],
    },
  },
  {
    originalName: "Cuerno posterior de la mÃ©dula espinal",
    data: {
      id: "nervous.spinal-posterior-horn", name: "Cuerno posterior de la mÃ©dula espinal", type: "Sustancia gris",
      description: "ProyecciÃ³n posterior de la sustancia gris medular que recibe aferencias sensitivas.",
      function: "Procesa informaciÃ³n que llega por las raÃ­ces posteriores.",
      location: "Parte posterior de la sustancia gris medular.",
      relationships: ["RaÃ­z posterior del nervio espinal", "Tractos sensitivos"],
    },
  },
  {
    originalName: "Tracto corticoespinal lateral",
    data: {
      id: "nervous.lateral-corticospinal-tract", name: "Tracto corticoespinal lateral", type: "Tracto motor",
      description: "VÃ­a motora descendente formada principalmente por fibras cruzadas de la corteza cerebral.",
      function: "Contribuye al control voluntario fino de las extremidades.",
      location: "CordÃ³n lateral de la mÃ©dula espinal.",
      relationships: ["Corteza motora", "Cuerno anterior"],
    },
  },
  {
    originalName: "Tracto espinotalÃ¡mico lateral",
    data: {
      id: "nervous.lateral-spinothalamic-tract", name: "Tracto espinotalÃ¡mico lateral", type: "Tracto sensitivo",
      description: "VÃ­a ascendente del sistema anterolateral de la mÃ©dula espinal.",
      function: "Transporta principalmente informaciÃ³n de dolor y temperatura hacia el tÃ¡lamo.",
      location: "CordÃ³n anterolateral de la mÃ©dula espinal.",
      relationships: ["Cuerno posterior", "TÃ¡lamo"],
    },
  },
  {
    originalName: "FascÃ­culo grÃ¡cil",
    data: {
      id: "nervous.gracile-fasciculus", name: "FascÃ­culo grÃ¡cil", type: "Tracto sensitivo",
      description: "Haz medial de la columna posterior de la mÃ©dula espinal.",
      function: "Conduce tacto fino, vibraciÃ³n y propiocepciÃ³n consciente del tronco inferior y miembro inferior.",
      location: "CordÃ³n posterior medular, medial al fascÃ­culo cuneiforme.",
      relationships: ["FascÃ­culo cuneiforme", "Bulbo raquÃ­deo"],
    },
  },
  {
    originalName: "FascÃ­culo cuneiforme",
    data: {
      id: "nervous.cuneate-fasciculus", name: "FascÃ­culo cuneiforme", type: "Tracto sensitivo",
      description: "Haz lateral de la columna posterior presente en los niveles medulares superiores.",
      function: "Conduce tacto fino, vibraciÃ³n y propiocepciÃ³n consciente del tronco superior y miembro superior.",
      location: "CordÃ³n posterior cervical y torÃ¡cico superior.",
      relationships: ["FascÃ­culo grÃ¡cil", "Bulbo raquÃ­deo"],
    },
  },

  // Referencias corticales y nÃºcleos adicionales representados en el GLB.
  bilateral("Giro frontal superior", {
    id: "nervous.superior-frontal-gyrus", name: "Giro frontal superior", type: "Corteza cerebral",
    description: "Giro de la superficie superior del lÃ³bulo frontal.",
    function: "Forma parte de redes corticales implicadas en planificaciÃ³n y control de la conducta.",
    location: "LÃ³bulo frontal, superior al surco frontal superior.",
    relationships: ["Giro frontal medio", "Corteza frontal"],
  }),
  bilateral("Giro frontal medio", {
    id: "nervous.middle-frontal-gyrus", name: "Giro frontal medio", type: "Corteza cerebral",
    description: "Giro de la cara lateral del lÃ³bulo frontal.",
    function: "Participa en redes de atenciÃ³n y funciones ejecutivas.",
    location: "Entre los surcos frontales superior e inferior.",
    relationships: ["Giro frontal superior", "Surco frontal inferior"],
  }),
  bilateral("Giros occipitales superiores", {
    id: "nervous.superior-occipital-gyri", name: "Giros occipitales superiores", type: "Corteza cerebral",
    description: "Relieves corticales de la regiÃ³n superior del lÃ³bulo occipital.",
    function: "Forman parte de Ã¡reas corticales que procesan informaciÃ³n visual.",
    location: "Cara lateral superior del lÃ³bulo occipital.",
    relationships: ["Polo occipital", "Surco calcarino"],
  }),
  bilateral("Polo occipital", {
    id: "nervous.occipital-pole", name: "Polo occipital", type: "Corteza cerebral",
    description: "Extremo posterior del hemisferio cerebral.",
    function: "Sirve como referencia para localizar la regiÃ³n cortical visual.",
    location: "PorciÃ³n mÃ¡s posterior del lÃ³bulo occipital.",
    relationships: ["Surco calcarino", "Giros occipitales"],
  }),
  bilateral("Giro lingual", {
    id: "nervous.lingual-gyrus", name: "Giro lingual", type: "Corteza cerebral",
    description: "Giro de la cara inferior y medial del lÃ³bulo occipital.",
    function: "Participa en el procesamiento visual.",
    location: "Inferior al surco calcarino.",
    relationships: ["Surco calcarino", "Polo occipital"],
  }),
  bilateral("Giro temporal medio", {
    id: "nervous.middle-temporal-gyrus", name: "Giro temporal medio", type: "Corteza cerebral",
    description: "Giro de la cara lateral del lÃ³bulo temporal.",
    function: "Participa en redes de asociaciÃ³n auditiva, visual y semÃ¡ntica.",
    location: "Entre los surcos temporales superior e inferior.",
    relationships: ["Giro temporal inferior", "Surco temporal superior"],
  }),
  bilateral("Giro temporal inferior", {
    id: "nervous.inferior-temporal-gyrus", name: "Giro temporal inferior", type: "Corteza cerebral",
    description: "Giro de la regiÃ³n inferolateral del lÃ³bulo temporal.",
    function: "Contribuye al reconocimiento visual de objetos.",
    location: "Inferior al surco temporal inferior.",
    relationships: ["Giro temporal medio", "Corteza occipitotemporal"],
  }),
  bilateral("Superior temporal gyrus (Lateral part)", {
    id: "nervous.superior-temporal-gyrus-lateral", name: "Giro temporal superior (porciÃ³n lateral)", type: "Corteza cerebral",
    description: "Parte lateral del giro temporal superior representada en el modelo.",
    function: "Participa en el procesamiento cortical de informaciÃ³n auditiva.",
    location: "RegiÃ³n superior lateral del lÃ³bulo temporal.",
    relationships: ["Surco temporal superior", "Giros temporales transversos"],
  }),
  bilateral("Surco intraparietal", {
    id: "nervous.intraparietal-sulcus", name: "Surco intraparietal", type: "Surco cerebral",
    description: "Surco que divide regiones superiores e inferiores del lÃ³bulo parietal.",
    function: "Es una referencia anatÃ³mica para la organizaciÃ³n de la corteza parietal.",
    location: "Cara lateral del lÃ³bulo parietal.",
    relationships: ["LÃ³bulo parietal superior", "LÃ³bulo parietal inferior"],
  }),
  bilateral("Cuerpo mamilar", {
    id: "nervous.mammillary-body", name: "Cuerpo mamilar", type: "HipotÃ¡lamo",
    description: "PequeÃ±o nÃºcleo par de la parte posterior del hipotÃ¡lamo.",
    function: "Participa en circuitos lÃ­mbicos vinculados con la memoria.",
    location: "Cara inferior del hipotÃ¡lamo.",
    relationships: ["FÃ³rnix", "TÃ¡lamo"],
  }),
  bilateral("NÃºcleo rojo", {
    id: "nervous.red-nucleus", name: "NÃºcleo rojo", type: "NÃºcleo mesencefÃ¡lico",
    description: "NÃºcleo motor del tegmento mesencefÃ¡lico.",
    function: "Participa en circuitos motores que vinculan cerebelo y tronco encefÃ¡lico.",
    location: "Tegmento del mesencÃ©falo.",
    relationships: ["Cerebelo", "MesencÃ©falo"],
  }),
  bilateral("NÃºcleo del tracto solitario", {
    id: "nervous.solitary-nucleus", name: "NÃºcleo del tracto solitario", type: "NÃºcleo bulbar",
    description: "NÃºcleo sensitivo visceral y gustativo del bulbo raquÃ­deo.",
    function: "Recibe seÃ±ales de nervios craneales relacionadas con gusto y sensibilidad visceral.",
    location: "RegiÃ³n dorsal del bulbo raquÃ­deo.",
    relationships: ["Nervios facial, glosofarÃ­ngeo y vago", "Bulbo raquÃ­deo"],
  }),

  // Hitos adicionales del encÃ©falo y la mÃ©dula con valor docente propio.
  bilateral("Precuneus", {
    id: "nervous.precuneus", name: "PrecÃºneo", type: "Corteza cerebral",
    description: "RegiÃ³n cortical de la cara medial del lÃ³bulo parietal.",
    function: "Participa en redes de integraciÃ³n espacial y de autorreferencia.",
    location: "Entre el surco parietooccipital y el lÃ³bulo paracentral.",
    relationships: ["LÃ³bulo parietal", "Surco parietooccipital"],
  }),
  {
    originalName: "Comisura anterior",
    data: {
      id: "nervous.anterior-commissure", name: "Comisura anterior", type: "Comisura cerebral",
      description: "Haz de fibras que conecta regiones de ambos hemisferios cerebrales.",
      function: "Permite comunicaciÃ³n interhemisfÃ©rica, especialmente entre regiones temporales y olfatorias.",
      location: "LÃ­nea media, anterior a los pilares del fÃ³rnix.",
      relationships: ["Cuerpo calloso", "FÃ³rnix"],
    },
  },
  {
    originalName: "Cuarto ventrÃ­culo",
    data: {
      id: "nervous.fourth-ventricle", name: "Cuarto ventrÃ­culo", type: "Sistema ventricular",
      description: "Cavidad del sistema ventricular situada entre el tronco encefÃ¡lico y el cerebelo.",
      function: "Recibe lÃ­quido cefalorraquÃ­deo del acueducto cerebral y lo comunica con el espacio subaracnoideo.",
      location: "Posterior al puente y la porciÃ³n superior del bulbo raquÃ­deo.",
      relationships: ["Acueducto del mesencÃ©falo", "Cerebelo", "Bulbo raquÃ­deo"],
    },
  },
  {
    originalName: "Acueducto del mesencÃ©falo",
    data: {
      id: "nervous.cerebral-aqueduct", name: "Acueducto del mesencÃ©falo", type: "Sistema ventricular",
      description: "Conducto estrecho que atraviesa el mesencÃ©falo.",
      function: "Comunica el tercer ventrÃ­culo con el cuarto ventrÃ­culo para el paso de lÃ­quido cefalorraquÃ­deo.",
      location: "Interior del mesencÃ©falo.",
      relationships: ["Tercer ventrÃ­culo", "Cuarto ventrÃ­culo"],
    },
  },
  bilateral("Oliva", {
    id: "nervous.medullary-olive", name: "Oliva", type: "Bulbo raquÃ­deo",
    description: "Relieve de la cara anterolateral del bulbo asociado al complejo olivar inferior.",
    function: "Participa en circuitos que envÃ­an informaciÃ³n al cerebelo para el aprendizaje motor.",
    location: "Lateral a la pirÃ¡mide bulbar.",
    relationships: ["PirÃ¡mide del bulbo raquÃ­deo", "Cerebelo"],
  }),
  bilateral("PirÃ¡mide del bulbo raquÃ­deo", {
    id: "nervous.medullary-pyramid", name: "PirÃ¡mide del bulbo raquÃ­deo", type: "Bulbo raquÃ­deo",
    description: "Relieve anterior del bulbo formado por fibras motoras descendentes.",
    function: "Conduce fibras corticoespinales hacia la mÃ©dula espinal.",
    location: "Cara anterior del bulbo, medial a la oliva.",
    relationships: ["Tracto corticoespinal", "Oliva"],
  }),
  bilateral("NÃºcleo ambiguo", {
    id: "nervous.nucleus-ambiguus", name: "NÃºcleo ambiguo", type: "NÃºcleo bulbar",
    description: "NÃºcleo motor del bulbo vinculado con los nervios glosofarÃ­ngeo y vago.",
    function: "EnvÃ­a fibras motoras a mÃºsculos de faringe y laringe implicados en degluciÃ³n y fonaciÃ³n.",
    location: "FormaciÃ³n reticular del bulbo raquÃ­deo.",
    relationships: ["Nervio glosofarÃ­ngeo", "Nervio vago"],
  }),
  bilateral("NÃºcleos vestibulares", {
    id: "nervous.vestibular-nuclei", name: "NÃºcleos vestibulares", type: "NÃºcleos del tronco encefÃ¡lico",
    description: "Grupo de nÃºcleos que recibe informaciÃ³n del aparato vestibular.",
    function: "Integra seÃ±ales para el equilibrio, la postura y los movimientos oculares.",
    location: "UniÃ³n entre el puente y el bulbo, prÃ³xima al cuarto ventrÃ­culo.",
    relationships: ["Nervio vestibular", "Cerebelo"],
  }),
  {
    originalName: "NÃºcleo intermediolateral",
    data: {
      id: "nervous.intermediolateral-nucleus", name: "NÃºcleo intermediolateral", type: "Sustancia gris medular",
      description: "Columna de neuronas autÃ³nomas preganglionares de la mÃ©dula toracolumbar.",
      function: "Origina fibras simpÃ¡ticas que salen por las raÃ­ces anteriores.",
      location: "Cuerno lateral de la mÃ©dula espinal torÃ¡cica y lumbar superior.",
      relationships: ["RaÃ­z anterior del nervio espinal", "Tronco simpÃ¡tico"],
    },
  },
  {
    originalName: "Tracto espinocerebeloso posterior",
    data: {
      id: "nervous.posterior-spinocerebellar-tract", name: "Tracto espinocerebeloso posterior", type: "Tracto sensitivo",
      description: "VÃ­a ascendente que transporta informaciÃ³n propioceptiva hacia el cerebelo.",
      function: "Aporta informaciÃ³n inconsciente sobre posiciÃ³n y movimiento para ajustar la coordinaciÃ³n.",
      location: "CordÃ³n lateral de la mÃ©dula espinal.",
      relationships: ["MÃ©dula espinal", "Cerebelo"],
    },
  },
];

