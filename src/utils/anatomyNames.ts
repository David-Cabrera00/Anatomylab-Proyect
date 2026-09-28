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
  if (name.includes("?")) {
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

  const name =
    structureName.toLowerCase();

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

  const lower =
    structureName.toLowerCase();

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
          structureName.slice(
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
          structureName.slice(
            0,
            -1
          ),

        side: "right",
      };
    }
  }

  return {
    name: structureName,
    side: null,
  };
}

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

function translateGeneric(
  structureName: string
) {
  const normalized =
    normalizeStructureName(
      structureName
    );

  const cleaned =
    normalized.name
      .replace(/\./g, "_")
      .replace(/__+/g, "_");

  const originalTokens =
    cleaned
      .split("_")
      .filter(Boolean);

  /*
   * También detectamos Left/Right
   * escritos como palabra.
   */
  let side =
    normalized.side;

  const tokens =
    originalTokens.filter(
      (token) => {
        const lower =
          token.toLowerCase();

        if (
          lower === "left"
        ) {
          side = "left";

          return false;
        }

        if (
          lower === "right"
        ) {
          side = "right";

          return false;
        }

        return true;
      }
    );

  if (tokens.length === 0) {
    return structureName;
  }

  const lastToken =
    tokens[
      tokens.length - 1
    ].toLowerCase();

  /* =========================
     ARTERIA
  ========================= */

  if (
    lastToken === "artery"
  ) {
    const descriptors =
      tokens.slice(0, -1);

    const translated =
      descriptors.map(
        translateWord
      );

    const lateral =
      sideText(
        side,
        "feminine",
        false
      );

    return capitalize(
      [
        "arteria",
        ...translated,
        lateral,
      ]
        .filter(Boolean)
        .join(" ")
    );
  }

  /* =========================
     ARTERIAS
  ========================= */

  if (
    lastToken ===
    "arteries"
  ) {
    const descriptors =
      tokens.slice(0, -1);

    const translated =
      descriptors.map(
        translateWord
      );

    const lateral =
      sideText(
        side,
        "feminine",
        true
      );

    return capitalize(
      [
        "arterias",
        ...translated,
        lateral,
      ]
        .filter(Boolean)
        .join(" ")
    );
  }

  /* =========================
     VENA
  ========================= */

  if (
    lastToken === "vein"
  ) {
    const descriptors =
      tokens.slice(0, -1);

    const translated =
      descriptors.map(
        translateWord
      );

    const lateral =
      sideText(
        side,
        "feminine",
        false
      );

    return capitalize(
      [
        "vena",
        ...translated,
        lateral,
      ]
        .filter(Boolean)
        .join(" ")
    );
  }

  /* =========================
     VENAS
  ========================= */

  if (
    lastToken === "veins"
  ) {
    const descriptors =
      tokens.slice(0, -1);

    const translated =
      descriptors.map(
        translateWord
      );

    const lateral =
      sideText(
        side,
        "feminine",
        true
      );

    return capitalize(
      [
        "venas",
        ...translated,
        lateral,
      ]
        .filter(Boolean)
        .join(" ")
    );
  }

  /* =========================
     TRONCO
  ========================= */

  if (
    lastToken === "trunk"
  ) {
    const translated =
      tokens
        .slice(0, -1)
        .map(translateWord);

    const lateral =
      sideText(
        side,
        "masculine"
      );

    return capitalize(
      [
        "tronco",
        ...translated,
        lateral,
      ]
        .filter(Boolean)
        .join(" ")
    );
  }

  /* =========================
     ARCO
  ========================= */

  if (
    lastToken === "arch"
  ) {
    const translated =
      tokens
        .slice(0, -1)
        .map(translateWord);

    const lateral =
      sideText(
        side,
        "masculine"
      );

    return capitalize(
      [
        "arco",
        ...translated,
        lateral,
      ]
        .filter(Boolean)
        .join(" ")
    );
  }

  /* =========================
     RAMA
  ========================= */

  if (
    lastToken === "branch"
  ) {
    const translated =
      tokens
        .slice(0, -1)
        .map(translateWord);

    const lateral =
      sideText(
        side,
        "feminine"
      );

    return capitalize(
      [
        "rama",
        ...translated,
        lateral,
      ]
        .filter(Boolean)
        .join(" ")
    );
  }

  /* =========================
     RAMAS
  ========================= */

  if (
    lastToken === "branches"
  ) {
    const translated =
      tokens
        .slice(0, -1)
        .map(translateWord);

    const lateral =
      sideText(
        side,
        "feminine",
        true
      );

    return capitalize(
      [
        "ramas",
        ...translated,
        lateral,
      ]
        .filter(Boolean)
        .join(" ")
    );
  }

  /* =========================
     TRADUCCIÓN GENERAL
  ========================= */

  const translated =
    tokens.map(
      translateWord
    );

  const lateral =
    sideText(
      side,
      "masculine"
    );

  if (lateral) {
    translated.push(
      lateral
    );
  }

  return capitalize(
    translated.join(" ")
  );
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
  const exact =
    exactTranslations[
      structureName
    ];

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

  if (
    exactTranslations[
      structureName
    ]
  ) {
    return [];
  }

  const normalized =
    normalizeStructureName(
      structureName
    );

  const cleanName =
    normalized.name
      .replace(/\./g, "_")
      .replace(/__+/g, "_");

  const structureWords =
    cleanName
      .split("_")
      .map((word) =>
        word.toLowerCase()
      )
      .filter(Boolean);

  const ignoredWords = [
    "left",
    "right",
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