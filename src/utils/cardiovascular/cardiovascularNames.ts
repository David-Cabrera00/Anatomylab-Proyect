export type StructureCategory =
  | "heart"
  | "artery"
  | "vein"
  | "other";

/* ======================================================
   TRADUCCIONES EXACTAS
   ======================================================

   Aquí ponemos estructuras cuya traducción necesita
   un orden anatómico específico.

   Si existe aquí, AnatomyLab utiliza esta traducción
   antes de intentar traducir palabra por palabra.
====================================================== */

const exactTranslations: Record<
  string,
  string
> = {
  /* =========================
     CORAZÓN
  ========================= */

  Left_atrium:
    "Aurícula izquierda",

  Right_atrium:
    "Aurícula derecha",

  Left_ventricle:
    "Ventrículo izquierdo",

  Right_ventricle:
    "Ventrículo derecho",

  Pulmonary_trunk:
    "Tronco pulmonar",

  Inferior_papillary_muscle_of_left_ventricle:
    "Músculo papilar inferior del ventrículo izquierdo",

  Anterior_papillary_muscle_of_right_ventricle:
    "Músculo papilar anterior del ventrículo derecho",

  Inferior_papillary_muscle_of_right_ventricle:
    "Músculo papilar inferior del ventrículo derecho",

  Septal_papillary_muscle_of_right_ventricle:
    "Músculo papilar septal del ventrículo derecho",

  Inferior_leaflet_of_right_atrioventricular_valve:
    "Valva inferior de la válvula auriculoventricular derecha",

  Posterior_leaflet_of_left_atrioventricular_valve:
    "Valva posterior de la válvula auriculoventricular izquierda",

  Septal_leaflet_of_right_atrioventricular_valve:
    "Valva septal de la válvula auriculoventricular derecha",

  Left_coronary_leaflet:
    "Valva coronaria izquierda",

  Right_coronary_leaflet:
    "Valva coronaria derecha",

  Non_coronary_leaflet:
    "Valva no coronaria",

  Anterior_semilunar_leaflet_of_pulmonary_valve:
    "Valva semilunar anterior de la válvula pulmonar",

  Left_semilunar_leaflet_of_pulmonary_valve:
    "Valva semilunar izquierda de la válvula pulmonar",

  Right_semilunar_leaflet_of_pulmonary_valve:
    "Valva semilunar derecha de la válvula pulmonar",

  /* =========================
     GRANDES VASOS
  ========================= */

  Ascending_aorta:
    "Aorta ascendente",

  Descending_aorta:
    "Aorta descendente",

  Aortic_arch:
    "Arco aórtico",

  Superior_vena_cava:
    "Vena cava superior",

  Inferior_vena_cava:
    "Vena cava inferior",

  Brachiocephalic_trunk:
    "Tronco braquiocefálico",

  Coeliac_trunk:
    "Tronco celíaco",

  /* =========================
     CIRCULACIÓN PULMONAR
  ========================= */

  Right_pulmonary_artery:
    "Arteria pulmonar derecha",

  Left_pulmonary_artery:
    "Arteria pulmonar izquierda",

  Right_superior_pulmonary_vein:
    "Vena pulmonar superior derecha",

  Right_inferior_pulmonary_vein:
    "Vena pulmonar inferior derecha",

  Left_superior_pulmonary_vein:
    "Vena pulmonar superior izquierda",

  Left_inferior_pulmonary_vein:
    "Vena pulmonar inferior izquierda",

  /* =========================
     CABEZA
  ========================= */

  Anterior_communicating_artery:
    "Arteria comunicante anterior",

  Posterior_communicating_artery:
    "Arteria comunicante posterior",

  Basilar_venous_plexus:
    "Plexo venoso basilar",

  Cavernous_sinusl:
    "Seno cavernoso izquierdo",

  Cavernous_sinusr:
    "Seno cavernoso derecho",

  /* =========================
     ARTERIAS ABDOMINALES
  ========================= */

  Sigmoid_arteries:
    "Arterias sigmoideas",

  Intrarenal_arteries_of_left_kidney:
    "Arterias intrarrenales del riñón izquierdo",

  Intrarenal_arteries_of_right_kidney:
    "Arterias intrarrenales del riñón derecho",

  Lumbar_arteriesl:
    "Arterias lumbares izquierdas",

  Lumbar_arteriesr:
    "Arterias lumbares derechas",

  Posterior_intercostal_arteriesl:
    "Arterias intercostales posteriores izquierdas",

  Posterior_intercostal_arteriesr:
    "Arterias intercostales posteriores derechas",

  Superior_phrenic_arteries:
    "Arterias frénicas superiores",

  /* =========================
     MIEMBRO INFERIOR IZQUIERDO
  ========================= */

  Perforating_femoral_arteriesl:
    "Arterias femorales perforantes izquierdas",

  Dorsal_metatarsal_arteriesl:
    "Arterias metatarsianas dorsales izquierdas",

  Dorsal_digital_arteries_of_footl:
    "Arterias digitales dorsales del pie izquierdo",

  Patellar_anastomosisl:
    "Anastomosis rotuliana izquierda",

  Plantar_archl:
    "Arco plantar izquierdo",

  Plantar_metatarsal_arteriesl:
    "Arterias metatarsianas plantares izquierdas",

  Common_plantar_digital_arteriesl:
    "Arterias digitales plantares comunes izquierdas",

  Proper_plantar_digital_arteriesl:
    "Arterias digitales plantares propias izquierdas",

  Perforating_branches_of_plantar_metatarsal_arteriesl:
    "Ramas perforantes de las arterias metatarsianas plantares izquierdas",

  /* =========================
     MIEMBRO INFERIOR DERECHO
  ========================= */

  Perforating_femoral_arteriesr:
    "Arterias femorales perforantes derechas",

  Dorsal_metatarsal_arteriesr:
    "Arterias metatarsianas dorsales derechas",

  Dorsal_digital_arteries_of_footr:
    "Arterias digitales dorsales del pie derecho",

  Patellar_anastomosisr:
    "Anastomosis rotuliana derecha",

  Plantar_archr:
    "Arco plantar derecho",

  Plantar_metatarsal_arteriesr:
    "Arterias metatarsianas plantares derechas",

  Common_plantar_digital_arteriesr:
    "Arterias digitales plantares comunes derechas",

  Proper_plantar_digital_arteriesr:
    "Arterias digitales plantares propias derechas",

  Perforating_branches_of_plantar_metatarsal_arteriesr:
    "Ramas perforantes de las arterias metatarsianas plantares derechas",

  /* =========================
     CEREBRO IZQUIERDO
  ========================= */

  Distal_lateral_striate_branchesl:
    "Ramas estriadas laterales distales izquierdas",

  Anterior_temporal_branchl:
    "Rama temporal anterior izquierda",

  Posterior_temporal_branchl:
    "Rama temporal posterior izquierda",

  "Temporo-occipital_branchl":
    "Rama temporo-occipital izquierda",

  Branch_to_angular_gyrusl:
    "Rama hacia el giro angular izquierdo",

  Proximal_lateral_striate_branchesl:
    "Ramas estriadas laterales proximales izquierdas",

  Long_posterior_ciliary_arteriesl:
    "Arterias ciliares posteriores largas izquierdas",

  Short_posterior_ciliary_arteriesl:
    "Arterias ciliares posteriores cortas izquierdas",

  /* =========================
     CEREBRO DERECHO
  ========================= */

  Distal_lateral_striate_branchesr:
    "Ramas estriadas laterales distales derechas",

  Anterior_temporal_branchr:
    "Rama temporal anterior derecha",

  Posterior_temporal_branchr:
    "Rama temporal posterior derecha",

  "Temporo-occipital_branchr":
    "Rama temporo-occipital derecha",

  Branch_to_angular_gyrusr:
    "Rama hacia el giro angular derecho",

  Proximal_lateral_striate_branchesr:
    "Ramas estriadas laterales proximales derechas",

  Long_posterior_ciliary_arteriesr:
    "Arterias ciliares posteriores largas derechas",

  Short_posterior_ciliary_arteriesr:
    "Arterias ciliares posteriores cortas derechas",

  /* =========================
     MANO IZQUIERDA
  ========================= */

  Deep_palmar_archl:
    "Arco palmar profundo izquierdo",

  Palmar_metacarpal_arteriesl:
    "Arterias metacarpianas palmares izquierdas",

  Dorsal_carpal_anastomosisl:
    "Anastomosis carpiana dorsal izquierda",

  Dorsal_metacarpal_arteriesl:
    "Arterias metacarpianas dorsales izquierdas",

  Dorsal_digital_arteries_of_handl:
    "Arterias digitales dorsales de la mano izquierda",

  Superficial_palmar_archl:
    "Arco palmar superficial izquierdo",

  Common_palmar_digital_arteriesl:
    "Arterias digitales palmares comunes izquierdas",

  Proper_palmar_digital_arteriesl:
    "Arterias digitales palmares propias izquierdas",

  Costocervical_trunkl:
    "Tronco costocervical izquierdo",

  Thyrocervical_trunkl:
    "Tronco tirocervical izquierdo",

  /* =========================
     MANO DERECHA
  ========================= */

  Deep_palmar_archr:
    "Arco palmar profundo derecho",

  Palmar_metacarpal_arteriesr:
    "Arterias metacarpianas palmares derechas",

  Dorsal_carpal_anastomosisr:
    "Anastomosis carpiana dorsal derecha",

  Dorsal_metacarpal_arteriesr:
    "Arterias metacarpianas dorsales derechas",

  Dorsal_digital_arteries_of_handr:
    "Arterias digitales dorsales de la mano derecha",

  Superficial_palmar_archr:
    "Arco palmar superficial derecho",

  Common_palmar_digital_arteriesr:
    "Arterias digitales palmares comunes derechas",

  Proper_palmar_digital_arteriesr:
    "Arterias digitales palmares propias derechas",

  Costocervical_trunkr:
    "Tronco costocervical derecho",

  Thyrocervical_trunkr:
    "Tronco tirocervical derecho",
};

/* ======================================================
   DICCIONARIO GENERAL
====================================================== */

const words: Record<
  string,
  string
> = {
  /* Posición */

  anterior: "anterior",
  posterior: "posterior",

  superior: "superior",
  inferior: "inferior",

  medial: "medial",
  lateral: "lateral",

  proximal: "proximal",
  distal: "distal",

  superficial: "superficial",
  deep: "profundo",

  internal: "interno",
  external: "externo",

  ascending: "ascendente",
  descending: "descendente",

  middle: "medio",

  left: "izquierdo",
  right: "derecho",

  /* Vasos */

  artery: "arteria",
  arteries: "arterias",

  arterial: "arterial",

  vein: "vena",
  veins: "venas",

  venous: "venoso",

  vena: "vena",
  cava: "cava",

  aorta: "aorta",
  aortic: "aórtico",

  trunk: "tronco",

  branch: "rama",
  branches: "ramas",

  arch: "arco",

  sinus: "seno",

  plexus: "plexo",

  anastomosis:
    "anastomosis",

  /* Cardiovascular */

  pulmonary: "pulmonar",

  coronary: "coronario",

  carotid: "carótida",

  subclavian:
    "subclavio",

  femoral: "femoral",

  iliac: "ilíaco",

  brachial: "braquial",

  radial: "radial",

  ulnar: "ulnar",

  axillary: "axilar",

  renal: "renal",

  hepatic: "hepático",

  splenic: "esplénico",

  gastric: "gástrico",

  mesenteric:
    "mesentérico",

  cerebral: "cerebral",

  vertebral: "vertebral",

  basilar: "basilar",

  facial: "facial",

  temporal: "temporal",

  occipital: "occipital",

  /* Corazón */

  heart: "corazón",

  atrium: "aurícula",

  ventricle:
    "ventrículo",

  valve: "válvula",

  leaflet: "valva",

  papillary: "papilar",

  muscle: "músculo",

  interatrial:
    "interauricular",

  interventricular:
    "interventricular",

  semilunar: "semilunar",

  septal: "septal",

  /* Otras estructuras */

  coeliac: "celíaco",

  sigmoid: "sigmoideo",

  intrarenal:
    "intrarrenal",

  kidney: "riñón",

  lumbar: "lumbar",

  intercostal:
    "intercostal",

  phrenic: "frénico",

  perforating:
    "perforante",

  dorsal: "dorsal",

  digital: "digital",

  metatarsal:
    "metatarsiano",

  metacarpal:
    "metacarpiano",

  plantar: "plantar",

  palmar: "palmar",

  carpal: "carpiano",

  patellar: "rotuliano",

  common: "común",

  proper: "propio",

  striate: "estriado",

  ciliary: "ciliar",

  angular: "angular",

  gyrus: "giro",

  costocervical:
    "costocervical",

  thyrocervical:
    "tirocervical",

  brachiocephalic:
    "braquiocefálico",

  thoracic: "torácico",

  abdominal: "abdominal",

  great: "mayor",

  small: "menor",

  long: "largo",

  short: "corto",

  foot: "pie",

  hand: "mano",

  /* Conectores */

  of: "de",

  the: "la",

  to: "hacia",

  // Vocabulario presente en los dos GLB cardiovasculares.
  lung: "pulmón", segmental: "segmentaria", basal: "basal",
  apical: "apical", lingular: "lingular", lobar: "lobar",
  bifurcation: "bifurcación", gastroduodenal: "gastroduodenal",
  anorectal: "anorrectal", suprarenal: "suprarrenal",
  appendicular: "apendicular", colic: "cólica", ileocolic: "ileocólica",
  ileal: "ileal", pancreaticoduodenal: "pancreatoduodenal",
  marginal: "marginal", spinal: "espinal", cord: "médula",
  circle: "círculo", epigastric: "epigástrica", gluteal: "glútea",
  penis: "pene", pudendal: "pudenda", division: "división",
  iliacus: "ilíaca", iliolumbar: "iliolumbar", sacral: "sacra",
  obturator: "obturatriz", subcostal: "subcostal",
  circumflex: "circunfleja", genicular: "genicular",
  calcaneal: "calcánea", fibular: "fibular", tibial: "tibial",
  tarsal: "tarsiana", arcuate: "arqueada", dorsalis: "dorsal",
  pedis: "pie", popliteal: "poplítea", pharyngeal: "faríngea",
  labial: "labial", submental: "submentoniana", palatine: "palatina",
  greater: "mayor", pterygoid: "pterigoideo", canal: "conducto",
  buccal: "bucal", mental: "mentoniana", mylohyoid: "milohioidea",
  alveolar: "alveolar", meningeal: "meníngea",
  "infra-orbital": "infraorbitaria", nasal: "nasal",
  sphenopalatine: "esfenopalatina", frontal: "frontal",
  transverse: "transverso", parietal: "parietal", precentral: "precentral",
  postcentral: "poscentral", "temporo-occipital": "temporooccipital",
  frontobasal: "frontobasal", prefrontal: "prefrontal",
  insular: "insular", ethmoidal: "etmoidal", retinal: "retiniana",
  lacrimal: "lagrimal", "supra-orbital": "supraorbitaria",
  supratrochlear: "supratroclear", ophthalmic: "oftálmica",
  collateral: "colateral", humeral: "humeral", median: "mediana",
  interosseous: "interósea", recurrent: "recurrente",
  thoraco: "toraco", acromial: "acromial",
  "thoraco-acromial": "toracoacromial", scapular: "escapular",
  thoracodorsal: "toracodorsal", subscapular: "subescapular",
  pectoral: "pectoral", cervical: "cervical", first: "primera",
  second: "segunda", supreme: "suprema", musculophrenic: "musculofrénica",
  thyroid: "tiroidea", suprascapular: "supraescapular",
  cerebellar: "cerebelosa", pontine: "pontina",
  orbitofrontal: "orbitofrontal", callosomarginal: "callosomarginal",
  pericallosal: "pericallosa", "parieto-occipital": "parietooccipital",
  systemic: "sistémica", cardiac: "cardíaca", sulcus: "surco",
  surface: "superficie", apex: "vértice", base: "base",
  border: "borde", notch: "escotadura", root: "raíz",
  valvular: "valvular", complex: "complejo", atrioventricular: "auriculoventricular",
  cranial: "craneales", dural: "durales", sinuses: "senos",
  intercavernous: "intercavernoso", cavernous: "cavernoso",
  sagittal: "sagital", petrosal: "petroso", confluence: "confluencia",
  straight: "recto", orbital: "orbital", intercapitular: "intercapitulares",
  saphenous: "safena", network: "red", portal: "porta",
  "gastro-omental": "gastroomental", lingual: "lingual",
  retromandibular: "retromandibular", jugular: "yugular",
  antebrachial: "antebraquial", cubital: "cubital", basilic: "basílica",
  cephalic: "cefálica", auricular: "auricular", azygos: "ácigos",
  "hemi-azygos": "hemiácigos", union: "unión", part: "porción",
  segment: "segmento", accessory: "accesoria", non: "no",
  communicating: "comunicante", apicoposterior: "apicoposterior",
  inferolateral: "inferolateral", superiorly: "superiormente",
  testicular: "testicular", maxillary: "maxilar", central: "central",
  septum: "tabique", "non-coronary": "no coronaria",
};

/* ======================================================
   NOMBRES INVÁLIDOS
====================================================== */

export function isInvalidStructureName(
  structureName: string
) {
  const name =
    structureName.trim();

  if (!name) {
    return true;
  }

  /*
   * Z-Anatomy contiene algunos
   * objetos con nombres como:
   *
   * ?xl
   * ?xr
   * ????????
   */
  if (name.includes("?") || /^take[ _]+a[ _]+picture$/i.test(name)) {
    return true;
  }

  return false;
}

/* ======================================================
   CLASIFICACIÓN
====================================================== */

export function getStructureCategory(
  structureName: string
): StructureCategory {
  if (
    isInvalidStructureName(
      structureName
    )
  ) {
    return "other";
  }

  const name = normalizeStructureName(structureName).name
    .replace(/\s+/g, "_")
    .toLowerCase();

  /* CORAZÓN */

  if (
    name.includes("heart") ||
    name.includes("atrium") ||
    name.includes("ventricle") ||
    name.includes("valve") ||
    name.includes("leaflet") ||
    name.includes("papillary") ||
    name.includes("interatrial") ||
    name.includes("interventricular")
  ) {
    return "heart";
  }

  /* VENAS */

  if (
    name.includes("vein") ||
    name.includes("veins") ||
    name.includes("venous") ||
    name.includes("vena") ||
    name.includes("cava") ||
    name.includes("sinus")
  ) {
    return "vein";
  }

  /* ARTERIAS */

  if (
    name.includes("artery") ||
    name.includes("arteries") ||
    name.includes("arterial") ||
    name.includes("aorta") ||
    name.includes("aortic") ||
    name.includes(
      "pulmonary_trunk"
    ) ||
    name.includes(
      "brachiocephalic_trunk"
    ) ||
    name.includes(
      "coeliac_trunk"
    ) ||
    name.includes(
      "costocervical_trunk"
    ) ||
    name.includes(
      "thyrocervical_trunk"
    ) ||
    name.includes(
      "palmar_arch"
    ) ||
    name.includes(
      "plantar_arch"
    ) ||
    name.includes(
      "anastomosis"
    ) ||
    name.includes(
      "striate_branches"
    ) ||
    name.includes(
      "temporal_branch"
    ) ||
    name.includes(
      "occipital_branch"
    ) ||
    name.includes(
      "angular_gyrus"
    ) ||
    name.includes(
      "ciliary"
    )
  ) {
    return "artery";
  }

  return "other";
}

/* ======================================================
   NORMALIZACIÓN IZQUIERDA / DERECHA

   Z-Anatomy usa nombres como:

   Lumbar_arteriesl
   Lumbar_arteriesr

   donde:

   l = left
   r = right
====================================================== */

type Side =
  | "left"
  | "right"
  | null;

function normalizeStructureName(
  structureName: string
): {
  name: string;
  side: Side;
} {
  // Los nombres originales usan espacios y .l/.r; Three.js usa _ y a veces
  // incorpora la lateralidad a la última palabra. Conservarla antes de limpiar.
  let name = structureName.trim().replace(/\.\d{3}$/i, "");
  const originalSide = name.match(/\.([lr])$/i)?.[1]?.toLowerCase();
  if (originalSide) name = name.slice(0, -2);
  name = name.replace(/\.(?:j|g|t)$/i, "").replace(/\.+$/, "");
  name = name.replace(/^\((.*)\)$/, "$1");
  name = name.replace(/_/g, " ").replace(/\.{2,}/g, " ").replace(/\s+/g, " ").trim();

  if (originalSide) {
    return { name, side: originalSide === "l" ? "left" : "right" };
  }

  /*
   * Términos donde sabemos que la
   * última l/r representa lateralidad.
   */
  const lateralEndings = [
    "artery",
    "arteries",

    "vein",
    "veins",

    "branch",
    "branches",

    "arch",

    "anastomosis",

    "trunk",

    "sinus",

    "plexus",

    "gyrus",

    "atrium",

    "ventricle",

    "kidney",

    "hand",

    "foot",
  ];

  const lower = name.toLowerCase();

  for (
    const ending of
    lateralEndings
  ) {
    if (
      lower.endsWith(
        `${ending}l`
      )
    ) {
      return {
        name:
          name.slice(
            0,
            -1
          ),

        side: "left",
      };
    }

    if (
      lower.endsWith(
        `${ending}r`
      )
    ) {
      return {
        name:
          name.slice(
            0,
            -1
          ),

        side: "right",
      };
    }
  }

  return {
    name,
    side: null,
  };
}

function canonicalKey(structureName: string): string {
  const { name, side } = normalizeStructureName(structureName);
  return `${name.replace(/-/g, " ").toLocaleLowerCase("es")}\u0000${side ?? ""}`;
}

const canonicalExactTranslations = new Map(
  Object.entries(exactTranslations).map(([name, translation]) => [
    canonicalKey(name),
    translation,
  ])
);

/* ======================================================
   UTILIDADES
====================================================== */

function capitalize(
  text: string
) {
  if (!text) {
    return text;
  }

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );
}

function translateWord(
  word: string
) {
  return (
    words[word.toLowerCase()] ??
    word
  );
}

function sideText(
  side: Side,
  gender:
    | "masculine"
    | "feminine",
  plural = false
) {
  if (!side) {
    return null;
  }

  if (side === "left") {
    if (plural) {
      return gender ===
        "feminine"
        ? "izquierdas"
        : "izquierdos";
    }

    return gender ===
      "feminine"
      ? "izquierda"
      : "izquierdo";
  }

  if (plural) {
    return gender ===
      "feminine"
      ? "derechas"
      : "derechos";
  }

  return gender ===
    "feminine"
    ? "derecha"
    : "derecho";
}

/* ======================================================
   TRADUCTOR GENÉRICO
====================================================== */

const positionalWords = new Set([
  "anterior", "posterior", "superior", "inferior", "medial", "lateral",
  "proximal", "distal", "superficial", "deep", "internal", "external",
  "middle", "common", "proper", "ascending", "descending", "great",
  "small", "long", "short", "left", "right", "dorsal", "palmar",
  "plantar", "basal", "apical", "median",
]);

const feminineHeads = new Set([
  "artery", "arteries", "vein", "veins", "branch", "branches", "aorta",
  "vena", "valve", "leaflet", "atrium", "surface", "base", "root",
  "division", "bifurcation", "confluence", "union", "network", "anastomosis",
]);

const pluralHeads = new Set(["arteries", "veins", "branches", "sinuses"]);

function phraseHead(phrase: string): string {
  const tokens = phrase.toLowerCase().match(/[a-z]+/g) ?? [];
  return tokens[tokens.length - 1] ?? "";
}

function spanishArticle(phrase: string): string {
  const head = phraseHead(phrase.replace(/\s*\([^)]*\)$/, ""));
  const feminine = feminineHeads.has(head);
  if (pluralHeads.has(head)) return feminine ? "de las" : "de los";
  return feminine ? "de la" : "del";
}

function translateModifiers(modifiers: string[], feminine: boolean, plural: boolean): string[] {
  return modifiers.map((word) => {
    const translated = translateWord(word);
    const lower = word.toLowerCase();
    if (lower === "left" || lower === "right") return "";
    if (plural && /(?:al|ar|or|il|ún|án)$/.test(translated)) {
      return `${translated.replace(/ún$/, "un")}es`;
    }
    if (!positionalWords.has(word.toLowerCase())) {
      // Los adjetivos anatómicos también concuerdan con arteria, vena, etc.
      if (feminine && /o$/.test(translated) && !/^(no|toraco)$/.test(translated)) {
        return `${translated.slice(0, -1)}a${plural ? "s" : ""}`;
      }
      return plural && /[ao]$/.test(translated) ? `${translated}s` : translated;
    }
    if (lower === "great" && feminine) return plural ? "magnas" : "magna";
    if (feminine && /o$/.test(translated)) return `${translated.slice(0, -1)}a${plural ? "s" : ""}`;
    return plural && /[ao]$/.test(translated) ? `${translated}s` : translated;
  }).filter(Boolean);
}

function translateSimplePhrase(phrase: string): string {
  const tokens = phrase.trim().replace(/[()]/g, "").split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return "";

  const final = tokens[tokens.length - 1].toLowerCase();
  const hasVenaCava = tokens.length >= 2 &&
    tokens[tokens.length - 2].toLowerCase() === "vena" && final === "cava";
  const head = hasVenaCava ? "vena cava" : translateWord(final);
  const descriptors = tokens.slice(0, hasVenaCava ? -2 : -1);
  const feminine = hasVenaCava || feminineHeads.has(final);
  const plural = pluralHeads.has(final);
  const directional = descriptors.find((word) => /^(left|right)$/i.test(word));
  const anatomical = descriptors.filter((word) => !positionalWords.has(word.toLowerCase()));
  const positional = descriptors.filter((word) => positionalWords.has(word.toLowerCase()));
  const adjectives = translateModifiers([...anatomical, ...positional], feminine, plural);
  const direction = directional
    ? sideText(directional.toLowerCase() as Exclude<Side, null>, feminine ? "feminine" : "masculine", plural)
    : null;
  return [head, ...adjectives, direction].filter(Boolean).join(" ");
}

function translatePhrase(phrase: string): string {
  const parenthetical = phrase.match(/^(.+?)\s*\(([^()]*)\)$/);
  if (parenthetical) {
    const [, base, detail] = parenthetical;
    const part = detail.match(/^(thoracic|abdominal) part$/i);
    const translatedDetail = part
      ? `porción ${part[1].toLowerCase() === "thoracic" ? "torácica" : "abdominal"}`
      : /^M\d+$/i.test(detail.trim())
        ? `segmento ${detail.trim().toUpperCase()}`
      : /^\/?\/?posterior\s*'*$/i.test(detail.trim())
        ? "posterior"
        : translatePhrase(detail.replace(/-/g, " "));
    return `${translatePhrase(base)} (${translatedDetail})`;
  }

  const relation = phrase.match(/^(.+?)\s+(of|to)\s+(.+)$/i);
  if (relation) {
    const [, subject, preposition, object] = relation;
    const connector = preposition.toLowerCase() === "to" ? "hacia el" : spanishArticle(object);
    return `${translatePhrase(subject)} ${connector} ${translatePhrase(object)}`;
  }

  return translateSimplePhrase(phrase);
}

function translateGeneric(structureName: string): string {
  const { name, side } = normalizeStructureName(structureName);
  const base = translatePhrase(name);
  if (!side) return capitalize(base);

  // Un marcador .l/.r y una palabra Left/Right expresan la misma lateralidad.
  const explicitSide = /\b(left|right)\b/i.test(name);
  if (explicitSide) return capitalize(base);

  const head = phraseHead(name.split(/\s+of\s+/i)[0].replace(/\s*\([^)]*\)$/, ""));
  const suffix = sideText(
    side,
    feminineHeads.has(head) ? "feminine" : "masculine",
    pluralHeads.has(head)
  );
  const relation = name.match(/^(.+?)\s+(of|to)\s+(.+)$/i);
  if (relation) {
    const [, subject, preposition, object] = relation;
    const connector = preposition.toLowerCase() === "to" ? "hacia el" : spanishArticle(object);
    return capitalize(`${translatePhrase(subject)} ${suffix} ${connector} ${translatePhrase(object)}`);
  }
  const parenthetical = base.match(/^(.*?)\s*(\([^()]*\))$/);
  if (parenthetical) return capitalize(`${parenthetical[1]} ${suffix} ${parenthetical[2]}`);
  return capitalize(`${base} ${suffix}`);
}

/* ======================================================
   FUNCIÓN PRINCIPAL
====================================================== */

export function getSpanishStructureName(
  structureName: string
) {
  /*
   * Nunca mostramos basura del modelo.
   */
  if (
    isInvalidStructureName(
      structureName
    )
  ) {
    return "Estructura sin identificar";
  }

  /*
   * Primero buscamos traducción exacta.
   */
  const exact = canonicalExactTranslations.get(canonicalKey(structureName));

  if (exact) {
    return exact;
  }

  /*
   * Si no existe traducción exacta,
   * utilizamos el traductor automático.
   */
  return translateGeneric(
    structureName
  );
}

/* ======================================================
   DETECTOR DE PALABRAS SIN TRADUCIR

   Lo podemos seguir utilizando
   mientras perfeccionamos los 676 meshes.
====================================================== */

export function getUnknownAnatomyWords(
  structureName: string
) {
  if (
    isInvalidStructureName(
      structureName
    )
  ) {
    return [];
  }

  if (canonicalExactTranslations.has(canonicalKey(structureName))) {
    return [];
  }

  const normalized =
    normalizeStructureName(
      structureName
    );

  const structureWords = normalized.name.toLowerCase()
    .match(/[a-z]+(?:-[a-z]+)*/g) ?? [];

  const ignoredWords = [
    "left",
    "right",
    "m", // códigos M1/M2/M3 de los segmentos cerebrales
  ];

  const unknownWords =
    structureWords.filter(
      (word) => {
        if (
          ignoredWords.includes(
            word
          )
        ) {
          return false;
        }

        if (
          words[word]
        ) {
          return false;
        }

        /*
         * Ignorar números.
         */
        if (
          /^\d+$/.test(word)
        ) {
          return false;
        }

        return true;
      }
    );

  return [
    ...new Set(
      unknownWords
    ),
  ];
}
