const exactTranslations: Record<string, string> = {
  // Corazón
  Left_atrium: "Aurícula izquierda",
  Right_atrium: "Aurícula derecha",

  Left_ventricle: "Ventrículo izquierdo",
  Right_ventricle: "Ventrículo derecho",

  Pulmonary_trunk: "Tronco pulmonar",

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

  // Grandes vasos
  Ascending_aorta: "Aorta ascendente",
  Descending_aorta: "Aorta descendente",
  Aortic_arch: "Arco aórtico",

  Superior_vena_cava: "Vena cava superior",
  Inferior_vena_cava: "Vena cava inferior",

  // Circulación pulmonar
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

  // Cabeza
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
};

const words: Record<string, string> = {
  anterior: "anterior",
  posterior: "posterior",

  superior: "superior",
  inferior: "inferior",

  internal: "interna",
  external: "externa",

  superficial: "superficial",
  deep: "profunda",

  ascending: "ascendente",
  descending: "descendente",

  common: "común",

  communicating: "comunicante",

  pulmonary: "pulmonar",
  coronary: "coronaria",

  carotid: "carótida",
  femoral: "femoral",
  iliac: "ilíaca",
  brachial: "braquial",
  radial: "radial",
  ulnar: "ulnar",
  axillary: "axilar",
  subclavian: "subclavia",
  renal: "renal",
  hepatic: "hepática",
  splenic: "esplénica",
  gastric: "gástrica",
  mesenteric: "mesentérica",
  cerebral: "cerebral",
  vertebral: "vertebral",
  basilar: "basilar",
  facial: "facial",
  temporal: "temporal",
  occipital: "occipital",

  artery: "arteria",
  arterial: "arterial",

  vein: "vena",
  venous: "venoso",

  vena: "vena",
  cava: "cava",

  aorta: "aorta",
  aortic: "aórtico",

  sinus: "seno",
  plexus: "plexo",

  trunk: "tronco",
  branch: "rama",

  heart: "corazón",

  atrium: "aurícula",
  ventricle: "ventrículo",

  valve: "válvula",
  leaflet: "valva",

  papillary: "papilar",
  muscle: "músculo",

  left: "izquierda",
  right: "derecha",

  middle: "media",
  medial: "medial",
  lateral: "lateral",

  thoracic: "torácica",
  abdominal: "abdominal",

  arch: "arco",

  great: "mayor",
  small: "menor",

  of: "de",
  the: "la",
};

function capitalize(text: string) {
  if (!text) return text;

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );
}

function translateGeneric(
  structureName: string
) {
  const cleanName = structureName
    .replace(/\./g, "_")
    .replace(/__+/g, "_");

  const originalWords =
    cleanName.split("_");

  /*
   * Detectamos derecha/izquierda.
   *
   * Muchos nombres vienen como:
   * Right_femoral_artery
   */
  let side: string | null = null;

  const filteredWords =
    originalWords.filter(
      (word) => {
        const lower =
          word.toLowerCase();

        if (lower === "right") {
          side = "derecha";
          return false;
        }

        if (lower === "left") {
          side = "izquierda";
          return false;
        }

        return true;
      }
    );

  /*
   * Arterias
   */
  if (
    filteredWords
      .at(-1)
      ?.toLowerCase() ===
    "artery"
  ) {
    const descriptors =
      filteredWords.slice(0, -1);

    const translated =
      descriptors.map(
        (word) =>
          words[
            word.toLowerCase()
          ] ?? word
      );

    const result = [
      "Arteria",
      ...translated,
      side,
    ]
      .filter(Boolean)
      .join(" ");

    return capitalize(result);
  }

  /*
   * Venas
   */
  if (
    filteredWords
      .at(-1)
      ?.toLowerCase() ===
    "vein"
  ) {
    const descriptors =
      filteredWords.slice(0, -1);

    const translated =
      descriptors.map(
        (word) =>
          words[
            word.toLowerCase()
          ] ?? word
      );

    const result = [
      "Vena",
      ...translated,
      side,
    ]
      .filter(Boolean)
      .join(" ");

    return capitalize(result);
  }

  /*
   * Traducción genérica para
   * cualquier otro nombre.
   */
  const translated =
    filteredWords.map(
      (word) =>
        words[
          word.toLowerCase()
        ] ?? word
    );

  if (side) {
    translated.push(side);
  }

  return capitalize(
    translated.join(" ")
  );
}

export function getSpanishStructureName(
  structureName: string
) {
  /*
   * Primero buscamos una traducción
   * anatómica exacta.
   */
  const exact =
    exactTranslations[
      structureName
    ];

  if (exact) {
    return exact;
  }

  /*
   * Si no existe, intentamos
   * traducir automáticamente.
   */
  return translateGeneric(
    structureName
  );
}