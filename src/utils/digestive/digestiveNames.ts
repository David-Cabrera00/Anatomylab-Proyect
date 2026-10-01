/* ======================================================
   ANATOMYLAB AI
   SISTEMA DIGESTIVO
   NORMALIZACIÓN DE NOMBRES ANATÓMICOS

   IMPORTANTE:
   - NO se modifican los identificadores del GLB.
   - Solo se transforma el nombre visible al usuario.
====================================================== */

type Laterality =
  | "left"
  | "right"
  | null;

/* ======================================================
   NOMBRES VISIBLES

   Incluye:
   - meshes internos en inglés
   - correcciones de etiquetas españolas del GLB
====================================================== */

const translations: Record<string, string> = {
  /* ====================================================
     CAVIDAD ORAL Y GLÁNDULAS SALIVALES
  ==================================================== */

  Gingiva:
    "Encía",

  "(Accessory parotid gland)":
    "Glándula parótida accesoria",

  "Parotid duct":
    "Conducto parotídeo",

  "Submandibular duct":
    "Conducto submandibular",

  "Parotid gland":
    "Glándula parótida",

  "Sublingual gland":
    "Glándula sublingual",

  "Submandibular gland":
    "Glándula submandibular",

  Tongue:
    "Lengua",

  "Soft palate":
    "Paladar blando",

  "Uvula of palate":
    "Úvula palatina",

  /* ====================================================
     TUBO DIGESTIVO
  ==================================================== */

  Stomach:
    "Estómago",

  Oesophagus:
    "Esófago",

  Esophagus:
    "Esófago",

  Duodenum:
    "Duodeno",

  Jejunum:
    "Yeyuno",

  "Vermiform appendix":
    "Apéndice vermiforme",

  "Ascending colon":
    "Colon ascendente",

  "Descending colon":
    "Colon descendente",

  "Sigmoid colon":
    "Colon sigmoide",

  "Transverse colon":
    "Colon transverso",

  /* ====================================================
     TENIAS DEL COLON
  ==================================================== */

  "Free taenia":
    "Tenia libre",

  "Mesocolic taenia":
    "Tenia mesocólica",

  "Omental taenia":
    "Tenia omental",

  /* ====================================================
     VÍAS BILIARES
  ==================================================== */

  "Bile duct":
    "Conducto biliar",

  /* ====================================================
     FARINGE
  ==================================================== */

  Pharynx:
    "Faringe",

  "Pharynx.j":
    "Faringe",

  Laryngopharynx:
    "Porción laríngea de la faringe",

  Nasopharynx:
    "Porción nasal de la faringe",

  Oropharynx:
    "Porción oral de la faringe",

  /* ====================================================
     HÍGADO — SEGMENTOS
  ==================================================== */

  "Anterior lateral segment of liver (VI)":
    "Segmento anterior lateral derecho del hígado (VI)",

  "Left anterior lateral segment of liver (III)":
    "Segmento anterior lateral izquierdo del hígado (III)",

  "Anterior medial segment of liver (V)":
    "Segmento anterior medial derecho del hígado (V)",

  "Left medial segment of liver (IV)":
    "Segmento medial izquierdo del hígado (IV)",

  "Posterior segment of liver (I)":
    "Segmento posterior del hígado (I)",

  "Posterior lateral segment of liver (VII)":
    "Segmento posterior lateral derecho del hígado (VII)",

  "Left posterior lateral segment of liver (II)":
    "Segmento posterior lateral izquierdo del hígado (II)",

  "Posterior medial segment of liver (VIII)":
    "Segmento posterior medial derecho del hígado (VIII)",

  Liver:
    "Hígado",

  /* ====================================================
     PÁNCREAS
  ==================================================== */

  "Pancreatic duct":
    "Conducto pancreático",

  "Accessory pancreatic duct":
    "Conducto pancreático accesorio",

  Pancreas:
    "Páncreas",

  /* ====================================================
     VESÍCULA
  ==================================================== */

  Gallbladder:
    "Vesícula biliar",

  /* ====================================================
     CORRECCIONES DE NOMBRES ESPAÑOLES DEL GLB
  ==================================================== */

  "Porción laríngea de la farínge":
    "Porción laríngea de la faringe",

  "Segmento posterior de hígado (I)":
    "Segmento posterior del hígado (I)",

  "Segmento anterior medial del hígado (V)":
    "Segmento anterior medial derecho del hígado (V)",

  "Segmento anterior lateral del hígado (VI)":
    "Segmento anterior lateral derecho del hígado (VI)",

  "Segmento posterior lateral del hígado (VII)":
    "Segmento posterior lateral derecho del hígado (VII)",

  "Segmento posterior medial del hígado (VIII)":
    "Segmento posterior medial derecho del hígado (VIII)",
};

/* ======================================================
   MESHES BILATERALES

   El mismo mesh se reutiliza para izquierda y derecha.

   Three.js puede terminar exponiendo:

   Parotid gland
   Parotid gland 1

   Primera instancia  = izquierda
   Segunda instancia = derecha
====================================================== */

const bilateralNames =
  new Set([
    "(Accessory parotid gland)",
    "Parotid duct",
    "Submandibular duct",
    "Parotid gland",
    "Sublingual gland",
    "Submandibular gland",
  ]);

/* ======================================================
   NORMALIZACIÓN
====================================================== */

function normalizeSpaces(
  value: string
): string {
  return value
    .trim()
    .replace(
      /\s+/g,
      " "
    );
}

function normalizeComparison(
  value: string
): string {
  return normalizeSpaces(
    value
  )
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    );
}

/* ======================================================
   BUSCAR NOMBRE BILATERAL
====================================================== */

function findBilateralName(
  value: string
): string | null {
  const normalized =
    normalizeComparison(
      value
    );

  for (
    const name of
    bilateralNames
  ) {
    if (
      normalizeComparison(
        name
      ) === normalized
    ) {
      return name;
    }
  }

  return null;
}

/* ======================================================
   EXTRAER NOMBRE Y LATERALIDAD
====================================================== */

function extractStructureData(
  structureName: string
): {
  name: string;
  laterality: Laterality;
} {
  let name =
    normalizeSpaces(
      structureName
    );

  let laterality:
    Laterality =
    null;

  /* ====================================================
     DUPLICADOS BLENDER

     Ejemplo:
     nombre.r.001
     ->
     nombre.r
  ==================================================== */

  name =
    name.replace(
      /\.\d{3}$/i,
      ""
    );

  /* ====================================================
     MESH BILATERAL DUPLICADO POR THREE.JS

     Parotid gland 1
     ->
     Glándula parótida derecha
  ==================================================== */

  const numbered =
    name.match(
      /^(.*)\s+1$/
    );

  if (
    numbered
  ) {
    const bilateral =
      findBilateralName(
        numbered[1]
      );

    if (
      bilateral
    ) {
      return {
        name:
          bilateral,

        laterality:
          "right",
      };
    }
  }

  /* ====================================================
     PRIMER MESH DE UNA PAREJA

     Parotid gland
     ->
     Glándula parótida izquierda
  ==================================================== */

  const bilateral =
    findBilateralName(
      name
    );

  if (
    bilateral
  ) {
    return {
      name:
        bilateral,

      laterality:
        "left",
    };
  }

  /* ====================================================
     NODOS CON .l / .r

     Glándula parótida.l
     Glándula parótida.r
  ==================================================== */

  const sideMatch =
    name.match(
      /^(.*)\.(l|r)$/i
    );

  if (
    sideMatch
  ) {
    name =
      normalizeSpaces(
        sideMatch[1]
      );

    laterality =
      sideMatch[2]
        .toLowerCase() ===
      "l"
        ? "left"
        : "right";
  }

  /* ====================================================
     SUFIJOS TÉCNICOS

     Faringe.j
     etc.
  ==================================================== */

  name =
    name.replace(
      /\.(j|g|t)$/i,
      ""
    );

  /* ====================================================
     PARÉNTESIS ARTIFICIALES
  ==================================================== */

  name =
    name.replace(
      /^\((.*)\)$/,
      "$1"
    );

  /* ====================================================
     LIMPIEZA
  ==================================================== */

  name =
    name
      .replace(
        /_/g,
        " "
      )
      .replace(
        /\s+/g,
        " "
      )
      .trim();

  return {
    name,
    laterality,
  };
}

/* ======================================================
   TRADUCIR / CORREGIR
====================================================== */

function translateName(
  structureName: string
): string {
  const normalized =
    normalizeComparison(
      structureName
    );

  for (
    const [
      original,
      translated,
    ] of Object.entries(
      translations
    )
  ) {
    if (
      normalizeComparison(
        original
      ) === normalized
    ) {
      return translated;
    }
  }

  return structureName;
}

/* ======================================================
   GÉNERO
====================================================== */

function isFeminine(
  structureName: string
): boolean {
  const normalized =
    normalizeComparison(
      structureName
    );

  return (
    normalized.startsWith(
      "glandula "
    ) ||
    normalized.startsWith(
      "porcion "
    ) ||
    normalized.startsWith(
      "lengua"
    ) ||
    normalized.startsWith(
      "encia"
    ) ||
    normalized.startsWith(
      "vesicula "
    )
  );
}

/* ======================================================
   AGREGAR LATERALIDAD
====================================================== */

function addLaterality(
  structureName: string,
  laterality: Laterality
): string {
  if (
    !laterality
  ) {
    return structureName;
  }

  const feminine =
    isFeminine(
      structureName
    );

  if (
    laterality ===
    "left"
  ) {
    return `${structureName} ${
      feminine
        ? "izquierda"
        : "izquierdo"
    }`;
  }

  return `${structureName} ${
    feminine
      ? "derecha"
      : "derecho"
  }`;
}

/* ======================================================
   FUNCIÓN PRINCIPAL
====================================================== */

export function getDigestiveStructureName(
  structureName: string
): string {
  if (
    !structureName?.trim()
  ) {
    return "Estructura digestiva";
  }

  const {
    name,
    laterality,
  } =
    extractStructureData(
      structureName
    );

  let visibleName =
    translateName(
      name
    );

  if (
    !visibleName
  ) {
    return "Estructura digestiva";
  }

  visibleName =
    visibleName[0]
      .toUpperCase() +
    visibleName.slice(1);

  return addLaterality(
    visibleName,
    laterality
  );
}

/* ======================================================
   DIAGNÓSTICO

   Detecta nombres internos que podrían seguir
   apareciendo sin traducir.
====================================================== */

export function isSuspiciousDigestiveName(
  structureName: string
): boolean {
  const visibleName =
    getDigestiveStructureName(
      structureName
    );

  const suspiciousPatterns =
    [
      /\.\d{3}$/i,
      /\.(l|r)$/i,
      /_/,
      /\*/,
      /\bgland\b/i,
      /\bduct\b/i,
      /\bstomach\b/i,
      /\boesophagus\b/i,
      /\besophagus\b/i,
      /\bduodenum\b/i,
      /\bjejunum\b/i,
      /\bappendix\b/i,
      /\bcolon\b/i,
      /\btaenia\b/i,
      /\bpharynx\b/i,
      /\bliver\b/i,
      /\bpancreas\b/i,
      /\bgallbladder\b/i,
      /\btongue\b/i,
      /\bpalate\b/i,
    ];

  return suspiciousPatterns.some(
    (pattern) =>
      pattern.test(
        visibleName
      )
  );
}