/* ======================================================
   ANATOMYLAB AI
   NOMBRES DEL SISTEMA RESPIRATORIO
====================================================== */

/* ======================================================
   TRADUCCIONES EXACTAS

   Estas tienen prioridad sobre cualquier limpieza
   automática.
====================================================== */

const exactTranslations: Record<string, string> = {
  "Bronquio segmentario basal ant. del pulmón derecho (BVIII)":
    "Bronquio segmentario basal anterior del pulmón derecho (BVIII)",

  "Medial basal segmental bronchus of right lung (BVII)":
    "Bronquio segmentario basal medial del pulmón derecho (BVII)",

  "Lateral basal segmental bronchus of left lung (BIX)":
    "Bronquio segmentario basal lateral del pulmón izquierdo (BIX)",

  "Bronquio segm. apicoposterior-pulmón izquierdo (BI + BII)":
    "Bronquio segmentario apicoposterior del pulmón izquierdo (BI + BII)",

  "Bronquio segm. lingular sup. del pulmón izquierdo (BIV)":
    "Bronquio segmentario lingular superior del pulmón izquierdo (BIV)",

  "Bronquio segmentario lingular inf. del pulmón izquierdo (BV)":
    "Bronquio segmentario lingular inferior del pulmón izquierdo (BV)",

  /* =========================
     ESTRUCTURAS PRINCIPALES
  ========================= */

  "Left_lung":
    "Pulmón izquierdo",

  "Right_lung":
    "Pulmón derecho",

  "Trachea":
    "Tráquea",

  "Larynx":
    "Laringe",

  "Pharynx":
    "Faringe",

  "Left_main_bronchus":
    "Bronquio principal izquierdo",

  "Right_main_bronchus":
    "Bronquio principal derecho",

  "Left_primary_bronchus":
    "Bronquio principal izquierdo",

  "Right_primary_bronchus":
    "Bronquio principal derecho",

  /* =========================
     PULMÓN DERECHO
  ========================= */

  "Bronquio_segmentario_basal_ant_del_pulmón_derecho_(BVIII)":
    "Bronquio segmentario basal anterior del pulmón derecho (BVIII)",

  "Bronquio_segmentario_basal_lateral_del_pulmón_derecho_(BIX)":
    "Bronquio segmentario basal lateral del pulmón derecho (BIX)",

  "Bronquio_segmentario_basal_posterior_del_pulmón_derecho_(BX)":
    "Bronquio segmentario basal posterior del pulmón derecho (BX)",

  "Bronquio_segmentario_superior_del_pulmón_derecho_(BVI)":
    "Bronquio segmentario superior del pulmón derecho (BVI)",

  "Medial_basal_segmental_bronchus_of_right_lung_(BVII)":
    "Bronquio segmentario basal medial del pulmón derecho (BVII)",

  "Bronquio_segmentario_lateral_del_pulmón_derecho_(BIV)":
    "Bronquio segmentario lateral del pulmón derecho (BIV)",

  "Bronquio_segmentario_medial_del_pulmón_derecho_(BV)":
    "Bronquio segmentario medial del pulmón derecho (BV)",

  "Bronquio_segmentario_anterior_del_pulmón_derecho_(BIII)":
    "Bronquio segmentario anterior del pulmón derecho (BIII)",

  "Bronquio_segmentario_apical_del_pulmón_derecho_(BI)":
    "Bronquio segmentario apical del pulmón derecho (BI)",

  "Bronquio_segmentario_posterior_del_pulmón_derecho_(BII)":
    "Bronquio segmentario posterior del pulmón derecho (BII)",

  /* =========================
     PULMÓN IZQUIERDO
  ========================= */

  "(Bronquio_segmentario_basal_anteromedial-pulmón_izquierdo)":
    "Bronquio segmentario basal anteromedial del pulmón izquierdo",

  "Bronquio_segmentario_basal_anterior-pulmón_izquierdo_(BVIII)":
    "Bronquio segmentario basal anterior del pulmón izquierdo (BVIII)",

  "Bronquio_segmentario_basal_medial_del_pulmón_izquierdo_(BVII)":
    "Bronquio segmentario basal medial del pulmón izquierdo (BVII)",

  "Bronquio_segmentario_basal_posterior-pulmón_izquierdo_(BX)":
    "Bronquio segmentario basal posterior del pulmón izquierdo (BX)",

  "Bronquio_segmentario_superior_del_pulmón_izquierdo_(BVI)":
    "Bronquio segmentario superior del pulmón izquierdo (BVI)",

  "Lateral_basal_segmental_bronchus_of_left_lung_(BIX)":
    "Bronquio segmentario basal lateral del pulmón izquierdo (BIX)",

  "Bronquio_segmentario_anterior_del_pulmón_izquierdo_(BIII)":
    "Bronquio segmentario anterior del pulmón izquierdo (BIII)",

  "Bronquio_segmentario_lingular_inf_del_pulmón_izquierdo_(BV)":
    "Bronquio segmentario lingular inferior del pulmón izquierdo (BV)",
};

/* ======================================================
   DICCIONARIO INGLÉS -> ESPAÑOL
====================================================== */

const englishWords: Record<string, string> = {
  left: "izquierdo",
  right: "derecho",

  lung: "pulmón",
  lungs: "pulmones",

  lobe: "lóbulo",
  lobes: "lóbulos",

  upper: "superior",
  lower: "inferior",
  middle: "medio",

  trachea: "tráquea",

  bronchus: "bronquio",
  bronchi: "bronquios",

  main: "principal",
  primary: "principal",

  respiratory: "respiratorio",

  airway: "vía respiratoria",

  nasal: "nasal",

  nose: "nariz",

  cavity: "cavidad",

  sinus: "seno",
  sinuses: "senos",

  paranasal: "paranasal",

  larynx: "laringe",

  pharynx: "faringe",

  segment: "segmento",
  segments: "segmentos",

  segmental: "segmentario",

  anterior: "anterior",
  posterior: "posterior",

  lateral: "lateral",
  medial: "medial",

  superior: "superior",
  inferior: "inferior",

  apical: "apical",

  basal: "basal",

  lingular: "lingular",

  lingula: "língula",

  fissure: "fisura",

  oblique: "oblicua",

  horizontal: "horizontal",

  cardiac: "cardíaca",

  notch: "incisura",

  apex: "ápice",

  base: "base",

  hilum: "hilio",

  root: "raíz",

  pleura: "pleura",

  visceral: "visceral",

  of: "del",

  the: "",
};

/* ======================================================
   QUITAR SUFIJOS TÉCNICOS
====================================================== */

function removeTechnicalSuffixes(
  structureName: string
) {
  let name =
    structureName.trim();

  /*
   * Z-Anatomy:
   *
   * .j = geometría
   * .t = texto
   * .g = grupo
   */
  name = name.replace(
    /\.(j|t|g)$/i,
    ""
  );

  /*
   * Blender:
   *
   * Nombre.001
   * Nombre.002
   */
  name = name.replace(
    /\.\d{3}$/i,
    ""
  );

  return name;
}

/* ======================================================
   TRADUCIR PALABRAS INGLESAS
====================================================== */

function translateEnglishWords(
  text: string
) {
  const tokens = text
    .replace(/_/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const translated =
    tokens.map((token) => {
      /*
       * Limpiamos el token solamente
       * para buscarlo en el diccionario.
       *
       * El token original se conserva si
       * no encontramos traducción.
       */
      const cleanToken =
        token
          .replace(
            /^[^a-zA-Z]+/,
            ""
          )
          .replace(
            /[^a-zA-Z]+$/,
            ""
          )
          .toLowerCase();

      const replacement =
        englishWords[
          cleanToken
        ];

      if (
        replacement ===
        undefined
      ) {
        return token;
      }

      return replacement;
    });

  return translated
    .filter(Boolean)
    .join(" ");
}

/* ======================================================
   ORTOGRAFÍA ESPAÑOLA
====================================================== */

function normalizeSpanishAnatomy(
  text: string
) {
  let result = text;

  /* Pulmón */

  result = result.replace(
    /\bPulmon\b/g,
    "Pulmón"
  );

  result = result.replace(
    /\bpulmon\b/g,
    "pulmón"
  );

  result = result.replace(
    /\bPulmones\b/g,
    "Pulmones"
  );

  result = result.replace(
    /\bpulmones\b/g,
    "pulmones"
  );

  /* Lóbulo */

  result = result.replace(
    /\bLobulo\b/g,
    "Lóbulo"
  );

  result = result.replace(
    /\blobulo\b/g,
    "lóbulo"
  );

  result = result.replace(
    /\bLobulos\b/g,
    "Lóbulos"
  );

  result = result.replace(
    /\blobulos\b/g,
    "lóbulos"
  );

  /* Tráquea */

  result = result.replace(
    /\bTraquea\b/g,
    "Tráquea"
  );

  result = result.replace(
    /\btraquea\b/g,
    "tráquea"
  );

  /* Língula */

  result = result.replace(
    /\bLingula\b/g,
    "Língula"
  );

  result = result.replace(
    /\blingula\b/g,
    "língula"
  );

  /* Abreviaturas */

  result = result.replace(
    /\bant\b/gi,
    "anterior"
  );

  result = result.replace(
    /\binf\b/gi,
    "inferior"
  );

  result = result.replace(
    /\bsup\b/gi,
    "superior"
  );

  result = result.replace(
    /\bpost\b/gi,
    "posterior"
  );

  return result;
}

/* ======================================================
   CORREGIR ORDEN GRAMATICAL

   El modelo puede venir originalmente en inglés:

   Upper lobe of left lung

   Una traducción palabra por palabra daría:

   Superior lóbulo del izquierdo pulmón

   Aquí lo convertimos correctamente a:

   Lóbulo superior del pulmón izquierdo
====================================================== */

function normalizeSpanishWordOrder(
  text: string
) {
  let result = text;

  /* ====================================================
     IZQUIERDO PULMÓN / DERECHO PULMÓN
  ==================================================== */

  result = result.replace(
    /\bizquierdo pulmón\b/gi,
    "pulmón izquierdo"
  );

  result = result.replace(
    /\bderecho pulmón\b/gi,
    "pulmón derecho"
  );

  result = result.replace(
    /\bizquierdos pulmones\b/gi,
    "pulmones izquierdos"
  );

  result = result.replace(
    /\bderechos pulmones\b/gi,
    "pulmones derechos"
  );

  /* ====================================================
     LÓBULOS

     Superior lóbulo del pulmón izquierdo
     ->
     Lóbulo superior del pulmón izquierdo
  ==================================================== */

  result = result.replace(
    /\bsuperior lóbulo del pulmón izquierdo\b/gi,
    "lóbulo superior del pulmón izquierdo"
  );

  result = result.replace(
    /\binferior lóbulo del pulmón izquierdo\b/gi,
    "lóbulo inferior del pulmón izquierdo"
  );

  result = result.replace(
    /\bsuperior lóbulo del pulmón derecho\b/gi,
    "lóbulo superior del pulmón derecho"
  );

  result = result.replace(
    /\binferior lóbulo del pulmón derecho\b/gi,
    "lóbulo inferior del pulmón derecho"
  );

  result = result.replace(
    /\bmedio lóbulo del pulmón derecho\b/gi,
    "lóbulo medio del pulmón derecho"
  );

  /* ====================================================
     TAMBIÉN SOPORTAR LA FORMA ANTERIOR

     Superior lóbulo del izquierdo pulmón
  ==================================================== */

  result = result.replace(
    /\bsuperior lóbulo del izquierdo pulmón\b/gi,
    "lóbulo superior del pulmón izquierdo"
  );

  result = result.replace(
    /\binferior lóbulo del izquierdo pulmón\b/gi,
    "lóbulo inferior del pulmón izquierdo"
  );

  result = result.replace(
    /\bsuperior lóbulo del derecho pulmón\b/gi,
    "lóbulo superior del pulmón derecho"
  );

  result = result.replace(
    /\binferior lóbulo del derecho pulmón\b/gi,
    "lóbulo inferior del pulmón derecho"
  );

  result = result.replace(
    /\bmedio lóbulo del derecho pulmón\b/gi,
    "lóbulo medio del pulmón derecho"
  );

  /* ====================================================
     SEGMENTOS

     Anterior segmento del pulmón izquierdo
     ->
     Segmento anterior del pulmón izquierdo
  ==================================================== */

  const segmentAdjectives =
    "(anterior|posterior|superior|inferior|apical|basal|lateral|medial|lingular)";

  result = result.replace(
    new RegExp(
      `\\b${segmentAdjectives} segmento del pulmón izquierdo\\b`,
      "gi"
    ),
    (
      _match,
      adjective: string
    ) =>
      `segmento ${adjective.toLowerCase()} del pulmón izquierdo`
  );

  result = result.replace(
    new RegExp(
      `\\b${segmentAdjectives} segmento del pulmón derecho\\b`,
      "gi"
    ),
    (
      _match,
      adjective: string
    ) =>
      `segmento ${adjective.toLowerCase()} del pulmón derecho`
  );

  /* ====================================================
     BRONQUIOS

     Principal bronquio izquierdo
     ->
     Bronquio principal izquierdo
  ==================================================== */

  result = result.replace(
    /\bprincipal bronquio izquierdo\b/gi,
    "bronquio principal izquierdo"
  );

  result = result.replace(
    /\bprincipal bronquio derecho\b/gi,
    "bronquio principal derecho"
  );

  return result;
}

/* ======================================================
   LIMPIAR NÚMEROS DE DUPLICADOS

   Ejemplo interno:

   Upper_lobe_of_left_lung_2

   El mesh sigue llamándose así internamente.

   Pero el estudiante verá:

   Lóbulo superior del pulmón izquierdo
====================================================== */

function removeDisplayDuplicateNumber(
  text: string
) {
  let result = text.trim();

  /*
   * Solo eliminamos números sueltos AL FINAL
   * cuando el nombre corresponde a una
   * estructura pulmonar/lobar.

   * NO tocamos códigos como:
   *
   * (BI)
   * (BII)
   * (BVIII)
   * (SIII)
   */
  if (
    /\b(pulmón|lóbulo|pulmones|lóbulos)\b/i.test(
      result
    )
  ) {
    result = result.replace(
      /\s+\d+$/,
      ""
    );
  }

  return result.trim();
}

/* ======================================================
   NORMALIZAR FORMATO
====================================================== */

function normalizeFormatting(
  text: string
) {
  let result = text;

  /*
   * anterior-pulmón izquierdo
   *
   * ->
   *
   * anterior del pulmón izquierdo
   */
  result = result.replace(
    /-pulmón/gi,
    " del pulmón"
  );

  /*
   * Evitar espacio antes de
   * signos de puntuación.
   */
  result = result.replace(
    /\s+([,.;:)])/g,
    "$1"
  );

  /*
   * Añadir espacio después de coma.
   */
  result = result.replace(
    /,(?!\s)/g,
    ", "
  );

  /*
   * Espacios duplicados.
   */
  result = result.replace(
    /\s+/g,
    " "
  );

  /*
   * Caso:
   *
   * (Bronquio segmentario...)
   *
   * Quitamos los paréntesis externos.
   *
   * No afecta:
   *
   * (BI)
   * (BII)
   * (BVIII)
   */
  if (
    result.startsWith("(") &&
    result.endsWith(")") &&
    !/\([A-Z0-9+]+\)$/.test(
      result
    )
  ) {
    result = result.slice(
      1,
      -1
    );
  }

  return result.trim();
}

/* ======================================================
   CAPITALIZAR PRIMERA LETRA
====================================================== */

function capitalizeSentence(
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

/* ======================================================
   LIMPIEZA COMPLETA
====================================================== */

function cleanRespiratoryName(
  structureName: string
) {
  let name =
    removeTechnicalSuffixes(
      structureName
    );

  /*
   * Guiones bajos -> espacios.
   */
  name = name.replace(
    /_/g,
    " "
  );

  /*
   * Inglés -> español.
   */
  name =
    translateEnglishWords(
      name
    );

  /*
   * Tildes y abreviaturas.
   */
  name =
    normalizeSpanishAnatomy(
      name
    );

  /*
   * Formato general.
   */
  name =
    normalizeFormatting(
      name
    );

  /*
   * Orden gramatical español.
   */
  name =
    normalizeSpanishWordOrder(
      name
    );

  /*
   * Eliminamos numeración generada
   * para duplicados SOLO del texto
   * mostrado.
   */
  name =
    removeDisplayDuplicateNumber(
      name
    );

  /*
   * Un último pase de formato.
   */
  name =
    normalizeFormatting(
      name
    );

  return name.trim();
}

/* ======================================================
   FUNCIÓN PRINCIPAL
====================================================== */

export function getRespiratoryStructureName(
  structureName: string
) {
  /*
   * Primero buscamos una
   * traducción exacta.
   */
  const exact =
    exactTranslations[
      structureName
    ];

  if (exact) {
    return exact;
  }

  const side = structureName.match(/\.(l|r)$/i)?.[1]?.toLowerCase();
  const baseName = side ? structureName.slice(0, -2) : structureName;

  /*
   * Si no existe traducción exacta,
   * usamos el normalizador.
   */
  const clean =
    exactTranslations[baseName] ?? cleanRespiratoryName(baseName);

  if (!clean) {
    return "Estructura respiratoria";
  }

  const visibleName = capitalizeSentence(clean);
  if (!side || /\b(?:izquierd[oa]s?|derech[oa]s?)$/i.test(visibleName)) {
    return visibleName;
  }

  const feminine = /^(?:arteria|vena|glándula|vía|porción|faringe|laringe|tráquea)\b/i.test(visibleName);
  const suffix = side === "l"
    ? feminine ? "izquierda" : "izquierdo"
    : feminine ? "derecha" : "derecho";
  return `${visibleName} ${suffix}`;
}

/* ======================================================
   DETECTOR DE NOMBRES SOSPECHOSOS
====================================================== */

export function isSuspiciousRespiratoryName(
  structureName: string
) {
  const translated =
    getRespiratoryStructureName(
      structureName
    );

  /* ====================================================
     PALABRAS INGLESAS
  ==================================================== */

  const englishPatterns: RegExp[] = [
    /\bleft\b/i,
    /\bright\b/i,

    /\blung\b/i,
    /\blungs\b/i,

    /\blobe\b/i,
    /\blobes\b/i,

    /\btrachea\b/i,

    /\bbronchus\b/i,
    /\bbronchi\b/i,

    /\blarynx\b/i,

    /\bpharynx\b/i,

    /\bsegment\b/i,
    /\bsegmental\b/i,

    /\bupper\b/i,
    /\blower\b/i,
    /\bmiddle\b/i,

    /\bfissure\b/i,

    /\boblique\b/i,

    /\bairway\b/i,

    /\bmain\b/i,
    /\bprimary\b/i,

    /\brespiratory\b/i,

    /\bnose\b/i,

    /\bcavity\b/i,

    /\bsinus\b/i,
    /\bsinuses\b/i,

    /\bhilum\b/i,

    /\bnotch\b/i,
  ];

  if (
    englishPatterns.some(
      (pattern) =>
        pattern.test(
          translated
        )
    )
  ) {
    return true;
  }

  /* ====================================================
     ABREVIATURAS INDESEADAS
  ==================================================== */

  const abbreviationPatterns:
    RegExp[] = [
    /\bant\b/i,
    /\binf\b/i,
    /\bsup\b/i,
    /\bpost\b/i,
  ];

  if (
    abbreviationPatterns.some(
      (pattern) =>
        pattern.test(
          translated
        )
    )
  ) {
    return true;
  }

  /* ====================================================
     ORDEN GRAMATICAL INCORRECTO
  ==================================================== */

  const badGrammarPatterns:
    RegExp[] = [
    /\bizquierdo pulmón\b/i,
    /\bderecho pulmón\b/i,

    /\bsuperior lóbulo\b/i,
    /\binferior lóbulo\b/i,
    /\bmedio lóbulo\b/i,

    /\bprincipal bronquio\b/i,
  ];

  if (
    badGrammarPatterns.some(
      (pattern) =>
        pattern.test(
          translated
        )
    )
  ) {
    return true;
  }

  /* ====================================================
     NÚMERO DE DUPLICADO VISIBLE

     Pulmón izquierdo 2
     Lóbulo superior... 3
  ==================================================== */

  if (
    /\b(pulmón|lóbulo|pulmones|lóbulos)\b.*\s\d+$/i.test(
      translated
    )
  ) {
    return true;
  }

  /* ====================================================
     RESIDUOS Z-ANATOMY
  ==================================================== */

  if (
    /\.(j|t|g)$/i.test(
      translated
    )
  ) {
    return true;
  }

  /* ====================================================
     RESIDUOS BLENDER
  ==================================================== */

  if (
    /\.\d{3}$/i.test(
      translated
    )
  ) {
    return true;
  }

  /* ====================================================
     GUIONES BAJOS
  ==================================================== */

  if (
    translated.includes("_")
  ) {
    return true;
  }

  /* ====================================================
     FORMATO ANTIGUO
  ==================================================== */

  if (
    /-pulmón/i.test(
      translated
    )
  ) {
    return true;
  }

  return false;
}
