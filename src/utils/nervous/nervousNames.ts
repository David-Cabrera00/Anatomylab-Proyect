/* ======================================================
   ANATOMYLAB AI
   SISTEMA NERVIOSO
   NORMALIZACIÓN Y TRADUCCIÓN DE NOMBRES
====================================================== */

/* ======================================================
   TRADUCCIONES EXACTAS
====================================================== */

const NERVOUS_EXACT_TRANSLATIONS: Record<
  string,
  string
> = {
  /* ====================================================
     CORTEZA CEREBRAL
  ==================================================== */

  "Anterior occipital sulcus*":
    "Surco occipital anterior",

  "Cingulate gyrus (Posteroventral part*)":
    "Giro del cíngulo (porción posteroventral)",

  "Cingulate gyrus and sulcus (Middle anterior part)":
    "Giro y surco del cíngulo (porción media anterior)",

  "Cingulate gyrus and sulcus (Middle posterior part)":
    "Giro y surco del cíngulo (porción media posterior)",

  "Cingulate gyrus and sulcus (Posterior dorsal part)":
    "Giro y surco del cíngulo (porción dorsal posterior)",

  "Cingulate sulcus (Marginal part*)":
    "Surco del cíngulo (porción marginal)",

  "Inferior occipital gyrus and sulcus*":
    "Giro y surco occipitales inferiores",

  "Insula (Subcentral gyrus and ant. and post. sulci*)":
    "Ínsula (giro subcentral y surcos anterior y posterior)",

  "Lateral occipital gyrus (Middle occipital gyrus*)":
    "Giro occipital lateral (giro occipital medio)",

  "Lunate sulcus":
    "Surco semilunar",

  "Medial occipitotemporal gyrus (Parahippocampal*)":
    "Giro occipitotemporal medial (parahipocampal)",

  "Occipitotemporal sulcus (Lateral part*)":
    "Surco occipitotemporal (porción lateral)",

  "Orbital gyri (Frontomarginal gyrus and sulcus*)":
    "Giros orbitarios (giro y surco frontomarginales)",

  "Orbital part of inferior frontal gyrus":
    "Parte orbitaria del giro frontal inferior",

  "Orbital sulci (H-shaped orbital sulci*)":
    "Surcos orbitarios (surco orbitario en H)",

  "Orbital sulci (Lateral Orbital sulcus*)":
    "Surcos orbitarios (surco orbitario lateral)",

  "Paracentral gyrus and sulcus*":
    "Giro y surco paracentrales",

  "Posterior transverse collateral sulcus":
    "Surco colateral transversal posterior",

  "Precentral sulcus (Superior part)*":
    "Surco precentral (porción superior)",

  "Precentral sulcus (inferior part)*":
    "Surco precentral (porción inferior)",

  "Straight gyrus (Gyrus rectus)":
    "Giro recto",

  "Sulcus interm_prim-Jensen":
    "Surco intermedio de Jensen",

  "Superior temporal gyrus (Lateral part)":
    "Giro temporal superior (porción lateral)",

  "Transverse frontopolar gyrus and sulcus*":
    "Giro y surco frontopolares transversos",

  /* ====================================================
     CISURA LATERAL
  ==================================================== */

  "Lat_Fis-ant-Horizont":
    "Rama anterior horizontal de la cisura lateral",

  "Lat_Fis-ant-Vertical":
    "Rama anterior vertical de la cisura lateral",

  "Lat_Fis-post":
    "Rama posterior de la cisura lateral",

  /* ====================================================
     LATÍN / INGLÉS
  ==================================================== */

  "Ampulla del canalículo lacrimal":
    "Ampolla del canalículo lagrimal",

  "Ciliary body-curve":
    "Cuerpo ciliar",

  Cuneus:
    "Cúneo",

  Flocculus:
    "Flóculo",

  Fornix:
    "Fórnix",

  Precuneus:
    "Precúneo",

  "Septum pellucidum":
    "Tabique pelúcido",

  "Stria terminalis":
    "Estría terminal",

  /* ====================================================
     CORRECCIONES
  ==================================================== */

  "Cuerpo vitreo":
    "Cuerpo vítreo",

  "Tienda del cerebello":
    "Tienda del cerebelo",
};

/* ======================================================
   TIPOS
====================================================== */

type Laterality =
  | "left"
  | "right"
  | null;

/* ======================================================
   NORMALIZACIÓN GENERAL
====================================================== */

function normalizeLookupKey(
  value: string
): string {
  return value
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeForComparison(
  value: string
): string {
  return normalizeLookupKey(
    value
  ).toLocaleLowerCase("es");
}

/* ======================================================
   NOMBRES REALES DEL GLB QUE TERMINAN NATURALMENTE
   EN L O R Y NO REPRESENTAN LATERALIDAD.

   IMPORTANTE:

   No podemos simplemente hacer:

   nombre termina en l -> izquierdo
   nombre termina en r -> derecho

   porque romperíamos nombres como:

   Canal central
   Comisura posterior
   Nervio coclear
   Tracto espinotalámico lateral

   Esta lista protege los nombres reales no laterales
   encontrados en nervous_overview.glb.
====================================================== */

const UNSIDED_NAMES_ENDING_IN_L_OR_R =
  new Set(
    [
      "Lóbulo central",

      "Comisura posterior",
      "Comisura anterior",
      "Comisura hipocampal",

      "Dura espinal",

      "Canal central",

      "Tracto espinotalámico anterior",
      "Tracto espinotalámico lateral",

      "Tracto spinotectal",

      "Tracto corticoespinal anterior",

      "Tracto reticuloespinal medial",

      "Tracto tectoespinal",

      "Tracto vestibuloespinal lateral",
      "Tracto vestibuloespinal medial",

      "Tracto corticoespinal lateral",

      "Tracto espinocerebeloso anterior",
      "Tracto espinocerebeloso posterior",

      "Tracto reticuloespinal lateral",

      "Tracto rubroespinal",

      "Fascículo grácil",

      "Sustancia blanca de la médula espinal",

      "Tracto posterolateral",

      "Cuerno anterior de la médula espinal",
      "Cuerno posterior de la médula espinal",

      "Proceso reticular espinal",

      "Núcleo intermediolateral",
      "Núcleo intermediomedial",

      "Sustancia intermedia lateral",

      "Nervio coclear",

      "Ramas digitales plantares comunes del nervio plantar medial",

      "Eje externo del globo ocular",
    ].map(
      normalizeForComparison
    )
  );

/* ======================================================
   EXTRAER LATERALIDAD

   SOPORTA:

   Nervio pudendo.l
   Nervio pudendo.r

   Y TAMBIÉN LOS NOMBRES QUE RECIBE THREE.JS:

   Nervio pudendol
   Nervio pudendor

   Glándula lagrimall
   Glándula lagrimalr

   Nervios intercostalesl
   Nervios intercostalesr
====================================================== */

function extractLaterality(
  originalName: string
): {
  name: string;
  laterality: Laterality;
} {
  let name =
    originalName.trim();

  let laterality:
    Laterality =
    null;

  /* ====================================================
     QUITAR DUPLICADO BLENDER

     estructura.l.001
     ->
     estructura.l
  ==================================================== */

  name =
    name.replace(
      /\.\d{3}$/i,
      ""
    );

  /* ====================================================
     CASO 1
     FORMATO ORIGINAL DEL GLB:

     estructura.l
     estructura.r
  ==================================================== */

  const dottedSide =
    name.match(
      /\.(l|r)$/i
    );

  if (dottedSide) {
    laterality =
      dottedSide[1]
        .toLowerCase() ===
      "l"
        ? "left"
        : "right";

    name =
      name.slice(
        0,
        -2
      );
  }

  /* ====================================================
     CASO 2
     FORMATO RECIBIDO POR EL VISOR:

     estructura + l
     estructura + r

     Ejemplos:

     Nervio pudendol
     Nervio pectoral lateralr
     Glándula lagrimall

     Solo lo hacemos si el nombre completo NO pertenece
     a las excepciones reales del GLB.
  ==================================================== */

  else {
    const normalizedFullName =
      normalizeForComparison(
        name
      );

    const finalCharacter =
      name
        .slice(-1)
        .toLowerCase();

    const mayBeSide =
      finalCharacter === "l" ||
      finalCharacter === "r";

    const isProtectedName =
      UNSIDED_NAMES_ENDING_IN_L_OR_R.has(
        normalizedFullName
      );

    if (
      mayBeSide &&
      !isProtectedName
    ) {
      laterality =
        finalCharacter ===
        "l"
          ? "left"
          : "right";

      name =
        name
          .slice(0, -1)
          .trim();
    }
  }

  /* ====================================================
     SUFIJOS TÉCNICOS
  ==================================================== */

  name =
    name.replace(
      /\.(j|g|t)$/i,
      ""
    );

  return {
    name:
      normalizeLookupKey(
        name
      ),

    laterality,
  };
}

/* ======================================================
   NORMALIZAR PALABRA
====================================================== */

function normalizeWord(
  value: string
): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    );
}

/* ======================================================
   GÉNERO / NÚMERO
====================================================== */

const FEMININE_SINGULAR =
  new Set([
    "ala",
    "amigdala",
    "ampolla",
    "base",
    "camara",
    "coclea",
    "cornea",
    "cuerda",
    "division",
    "esclera",
    "estria",
    "fosa",
    "glandula",
    "insula",
    "lente",
    "membrana",
    "oliva",
    "parte",
    "piramide",
    "rama",
    "raiz",
    "retina",
    "sustancia",
    "tienda",
    "uvula",
  ]);

const FEMININE_PLURAL =
  new Set([
    "divisiones",
    "estrias",
    "fibras",
    "glandulas",
    "ramas",
    "raices",
  ]);

const MASCULINE_PLURAL =
  new Set([
    "ganglios",
    "giros",
    "lobulos",
    "meridianos",
    "nervios",
    "nucleos",
    "pedunculos",
    "segmentos",
    "surcos",
    "tractos",
  ]);

/* ======================================================
   AGREGAR IZQUIERDO / DERECHO
====================================================== */

function addLaterality(
  structureName: string,
  laterality: Laterality
): string {
  if (!laterality) {
    return structureName;
  }

  const firstWord =
    normalizeWord(
      structureName
        .trim()
        .split(/\s+/)[0]
        .replace(
          /^[([]+/,
          ""
        )
    );

  let suffix: string;

  /* ====================================================
     FEMENINO SINGULAR
  ==================================================== */

  if (
    FEMININE_SINGULAR.has(
      firstWord
    )
  ) {
    suffix =
      laterality ===
      "left"
        ? "izquierda"
        : "derecha";
  }

  /* ====================================================
     FEMENINO PLURAL
  ==================================================== */

  else if (
    FEMININE_PLURAL.has(
      firstWord
    )
  ) {
    suffix =
      laterality ===
      "left"
        ? "izquierdas"
        : "derechas";
  }

  /* ====================================================
     MASCULINO PLURAL
  ==================================================== */

  else if (
    MASCULINE_PLURAL.has(
      firstWord
    )
  ) {
    suffix =
      laterality ===
      "left"
        ? "izquierdos"
        : "derechos";
  }

  /* ====================================================
     MASCULINO SINGULAR
  ==================================================== */

  else {
    suffix =
      laterality ===
      "left"
        ? "izquierdo"
        : "derecho";
  }

  return `${structureName} ${suffix}`;
}

/* ======================================================
   CORRECCIONES GENERALES
====================================================== */

function applyGeneralCorrections(
  value: string
): string {
  let name =
    value;

  /* ====================================================
     ERROR PRESENTE EN EL MODELO
  ==================================================== */

  name =
    name.replace(
      /fibularo superficial/gi,
      "fibular superficial"
    );

  /* ====================================================
     ASTERISCOS
  ==================================================== */

  name =
    name.replace(
      /\*/g,
      ""
    );

  /* ====================================================
     UNDERSCORES
  ==================================================== */

  name =
    name.replace(
      /_/g,
      " "
    );

  /* ====================================================
     ESPACIOS DUPLICADOS
  ==================================================== */

  name =
    name.replace(
      /\s+/g,
      " "
    );

  name =
    name.trim();

  /* ====================================================
     PARÉNTESIS EXTERNOS INNECESARIOS
  ==================================================== */

  if (
    name.startsWith("(") &&
    name.endsWith(")")
  ) {
    name =
      name
        .slice(1, -1)
        .trim();
  }

  return name;
}

/* ======================================================
   FUNCIÓN PRINCIPAL
====================================================== */

export function getNervousStructureName(
  structureName: string
): string {
  if (
    !structureName ||
    !structureName.trim()
  ) {
    return "Estructura nerviosa";
  }

  const {
    name: rawBaseName,
    laterality,
  } =
    extractLaterality(
      structureName
    );

  const lookupName =
    normalizeLookupKey(
      rawBaseName
    );

  const translatedName =
    NERVOUS_EXACT_TRANSLATIONS[
      lookupName
    ] ??
    lookupName;

  const cleanName =
    applyGeneralCorrections(
      translatedName
    );

  if (!cleanName) {
    return "Estructura nerviosa";
  }

  return addLaterality(
    cleanName,
    laterality
  );
}

/* ======================================================
   DIAGNÓSTICO
====================================================== */

export function isSuspiciousNervousName(
  structureName: string
): boolean {
  const visibleName =
    getNervousStructureName(
      structureName
    );

  const suspiciousPatterns =
    [
      /\.\d{3}$/i,

      /_/,

      /\*/,

      /\bgyrus\b/i,
      /\bgyri\b/i,

      /\bsulcus\b/i,
      /\bsulci\b/i,

      /\bciliary\b/i,

      /\bflocculus\b/i,

      /\bfornix\b/i,

      /\bprecuneus\b/i,

      /\bcuneus\b/i,

      /\bseptum\b/i,

      /\bstria\b/i,

      /\bampulla\b/i,

      /\bcurve\b/i,

      /\blat[_ ]fis\b/i,
    ];

  return suspiciousPatterns.some(
    (pattern) =>
      pattern.test(
        visibleName
      )
  );
}