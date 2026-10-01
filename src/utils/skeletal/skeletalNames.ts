/* ======================================================
   ANATOMYLAB AI
   SISTEMA ESQUELÉTICO
   NORMALIZACIÓN Y TRADUCCIÓN DE NOMBRES

   Este archivo procesa nombres provenientes de:

   - Nodos anatómicos en español.
   - Meshes internos del GLB en inglés.
   - Sufijos de lateralidad .l / .r.
   - Duplicados generados por Blender.
====================================================== */

/* ======================================================
   TIPOS
====================================================== */

type Laterality =
  | "left"
  | "right"
  | null;

/* ======================================================
   TRADUCCIONES EXACTAS DE LOS MESHES DEL GLB
====================================================== */

const SKELETAL_EXACT_TRANSLATIONS: Record<
  string,
  string
> = {
  /* ====================================================
     MIEMBRO SUPERIOR
  ==================================================== */

  Humerus:
    "Húmero",

  Radius:
    "Radio",

  Ulna:
    "Cúbito",

  Clavicle:
    "Clavícula",

  Scapula:
    "Escápula",

  /* ====================================================
     CARPO
  ==================================================== */

  "Capitate bone":
    "Hueso grande",

  "Scaphoid bone":
    "Hueso escafoides",

  "Hamate bone":
    "Hueso ganchoso",

  "Lunate bone":
    "Hueso semilunar",

  "Pisiform bone":
    "Hueso pisiforme",

  "Trapezium bone":
    "Hueso trapecio",

  "Trapezoid bone":
    "Hueso trapezoide",

  "Triquetrum bone":
    "Hueso piramidal",

  /* ====================================================
     METACARPIANOS
  ==================================================== */

  "First metacarpal bone":
    "Primer hueso metacarpiano",

  "Second metacarpal bone":
    "Segundo hueso metacarpiano",

  "Third metacarpal bone":
    "Tercer hueso metacarpiano",

  "Fourth metacarpal bone":
    "Cuarto hueso metacarpiano",

  "Fifth metacarpal bone":
    "Quinto hueso metacarpiano",

  /* ====================================================
     FALANGES DE LA MANO
  ==================================================== */

  "Distal phalanx of first finger of hand":
    "Falange distal del primer dedo de la mano",

  "Distal phalanx of second finger of hand":
    "Falange distal del segundo dedo de la mano",

  "Distal phalanx of third finger of hand":
    "Falange distal del tercer dedo de la mano",

  "Distal phalanx of fourth finger of hand":
    "Falange distal del cuarto dedo de la mano",

  "Distal phalanx of fifth finger of hand":
    "Falange distal del quinto dedo de la mano",

  "Middle phalanx of second finger of hand":
    "Falange media del segundo dedo de la mano",

  "Middle phalanx of third finger of hand":
    "Falange media del tercer dedo de la mano",

  "Middle phalanx of fourth finger of hand":
    "Falange media del cuarto dedo de la mano",

  "Middle phalanx of fifth finger of hand":
    "Falange media del quinto dedo de la mano",

  "Proximal phalanx of first finger of hand":
    "Falange proximal del primer dedo de la mano",

  "Proximal phalanx of second finger of hand":
    "Falange proximal del segundo dedo de la mano",

  "Proximal phalanx of third finger of hand":
    "Falange proximal del tercer dedo de la mano",

  "Proximal phalanx of fourth finger of hand":
    "Falange proximal del cuarto dedo de la mano",

  "Proximal phalanx of fifth finger of hand":
    "Falange proximal del quinto dedo de la mano",

  /* ====================================================
     CARTÍLAGOS
  ==================================================== */

  "Arytenoid cartilage":
    "Cartílago aritenoides",

  "Corniculate cartilage":
    "Cartílago corniculado",

  "Cricoid cartilage":
    "Cartílago cricoides",

  "Thyroid cartilage":
    "Cartílago tiroides",

  "Major alar cartilage":
    "Cartílago alar mayor",

  "Nasal septal cartilage":
    "Cartílago del tabique nasal",

  "Lateral process of nasal septal cartilage":
    "Proceso lateral del cartílago del tabique nasal",

  /* ====================================================
     COLUMNA VERTEBRAL
  ==================================================== */

  Coccyx:
    "Cóccix",

  Sacrum:
    "Sacro",

  "Atlas (C1)":
    "Atlas (C1)",

  "Axis (C2)":
    "Axis (C2)",

  "Vertebra C3":
    "Vértebra cervical C3",

  "Vertebra C4":
    "Vértebra cervical C4",

  "Vertebra C5":
    "Vértebra cervical C5",

  "Vertebra C6":
    "Vértebra cervical C6",

  "Vertebra C7":
    "Vértebra cervical C7",

  "Vertebra T1":
    "Vértebra torácica T1",

  "Vertebra T2":
    "Vértebra torácica T2",

  "Vertebra T3":
    "Vértebra torácica T3",

  "Vertebra T4":
    "Vértebra torácica T4",

  "Vertebra T5":
    "Vértebra torácica T5",

  "Vertebra T6":
    "Vértebra torácica T6",

  "Vertebra T7":
    "Vértebra torácica T7",

  "Vertebra T8":
    "Vértebra torácica T8",

  "Vertebra T9":
    "Vértebra torácica T9",

  "Vertebra T10":
    "Vértebra torácica T10",

  "Vertebra T11":
    "Vértebra torácica T11",

  "Vertebra T12":
    "Vértebra torácica T12",

  "Vertebra L1":
    "Vértebra lumbar L1",

  "Vertebra L2":
    "Vértebra lumbar L2",

  "Vertebra L3":
    "Vértebra lumbar L3",

  "Vertebra L4":
    "Vértebra lumbar L4",

  "Vertebra L5":
    "Vértebra lumbar L5",

  /* ====================================================
     CRÁNEO
  ==================================================== */

  "Inferior nasal concha bone":
    "Cornete nasal inferior",

  "Zygomatic bone":
    "Hueso cigomático",

  "Sinus of sphenoid bone":
    "Seno esfenoidal",

  "Sphenoid bone":
    "Hueso esfenoides",

  "Anterior cells of ethmoid bone":
    "Celdillas etmoidales anteriores",

  "Middle cells of ethmoid bone":
    "Celdillas etmoidales medias",

  "Posterior cells of ethmoid bone":
    "Celdillas etmoidales posteriores",

  "Ethmoid bone":
    "Hueso etmoides",

  "Sinus of frontal bone":
    "Seno frontal",

  "Frontal bone":
    "Hueso frontal",

  "Lacrimal bone":
    "Hueso lagrimal",

  Maxilla:
    "Maxilar",

  "Nasal bone":
    "Hueso nasal",

  "Occipital bone":
    "Hueso occipital",

  "Palatine bone":
    "Hueso palatino",

  "Parietal bone":
    "Hueso parietal",

  "Temporal bone":
    "Hueso temporal",

  Vomer:
    "Vómer",

  Mandible:
    "Mandíbula",

  "Hyoid bone":
    "Hueso hioides",

  /* ====================================================
     DIENTES
  ==================================================== */

  "Lower canine":
    "Canino inferior",

  "Upper canine":
    "Canino superior",

  "Lower lateral incisor":
    "Incisivo lateral inferior",

  "Lower medial incisor":
    "Incisivo central inferior",

  "Upper lateral incisor":
    "Incisivo lateral superior",

  "Upper medial incisor":
    "Incisivo central superior",

  "Lower first molar tooth":
    "Primer molar inferior",

  "Upper first molar tooth":
    "Primer molar superior",

  "Lower second molar tooth":
    "Segundo molar inferior",

  "Upper second molar tooth":
    "Segundo molar superior",

  "Lower first premolar":
    "Primer premolar inferior",

  "Upper first premolar":
    "Primer premolar superior",

  "Lower second premolar":
    "Segundo premolar inferior",

  "Upper second premolar":
    "Segundo premolar superior",

  /* ====================================================
     CAJA TORÁCICA
  ==================================================== */

  "First rib":
    "Primera costilla",

  "Second rib":
    "Segunda costilla",

  "Third rib":
    "Tercera costilla",

  "Fourth rib":
    "Cuarta costilla",

  "Fifth rib":
    "Quinta costilla",

  "Sixth rib":
    "Sexta costilla",

  "Seventh rib":
    "Séptima costilla",

  "Eighth rib":
    "Octava costilla",

  "Ninth rib":
    "Novena costilla",

  "Tenth rib":
    "Décima costilla",

  "Eleventh rib":
    "Undécima costilla",

  "Twelfth rib":
    "Duodécima costilla",

  "Costal cartilage of first rib":
    "Cartílago costal de la primera costilla",

  "Costal cartilage of second rib":
    "Cartílago costal de la segunda costilla",

  "Costal cartilage of third rib":
    "Cartílago costal de la tercera costilla",

  "Costal cartilage of fourth rib":
    "Cartílago costal de la cuarta costilla",

  "Costal cartilage of fifth rib":
    "Cartílago costal de la quinta costilla",

  "Costal cartilage of sixth rib":
    "Cartílago costal de la sexta costilla",

  "Costal cartilage of seventh rib":
    "Cartílago costal de la séptima costilla",

  "Costal cartilage of eighth rib":
    "Cartílago costal de la octava costilla",

  "Costal cartilage of ninth rib":
    "Cartílago costal de la novena costilla",

  "Costal cartilage of tenth rib":
    "Cartílago costal de la décima costilla",

  "Body of sternum":
    "Cuerpo del esternón",

  "Manubrium of sternum":
    "Manubrio del esternón",

  "Xiphoid process":
    "Apófisis xifoides",

  /* ====================================================
     HUESECILLOS DEL OÍDO
  ==================================================== */

  Stapes:
    "Estribo",

  Incus:
    "Yunque",

  Malleus:
    "Martillo",

  /* ====================================================
     MIEMBRO INFERIOR
  ==================================================== */

  Fibula:
    "Fíbula",

  Femur:
    "Fémur",

  Tibia:
    "Tibia",

  Patella:
    "Rótula",

  "Hip bone":
    "Hueso coxal",

  /* ====================================================
     TARSO
  ==================================================== */

  Calcaneus:
    "Calcáneo",

  "Cuboid bone":
    "Hueso cuboides",

  "Intermediate cuneiform bone":
    "Hueso cuneiforme intermedio",

  "Lateral cuneiform bone":
    "Hueso cuneiforme lateral",

  "Medial cuneiform bone":
    "Hueso cuneiforme medial",

  "Navicular bone":
    "Hueso navicular",

  Talus:
    "Astrágalo",

  /* ====================================================
     METATARSIANOS
  ==================================================== */

  "First metatarsal bone":
    "Primer hueso metatarsiano",

  "Second metatarsal bone":
    "Segundo hueso metatarsiano",

  "Third metatarsal bone":
    "Tercer hueso metatarsiano",

  "Fourth metatarsal bone":
    "Cuarto hueso metatarsiano",

  "Fifth metatarsal bone":
    "Quinto hueso metatarsiano",

  "Sesamoid bones of foot":
    "Huesos sesamoideos del pie",

  /* ====================================================
     FALANGES DEL PIE
  ==================================================== */

  "Distal phalanx of first finger of foot":
    "Falange distal del primer dedo del pie",

  "Distal phalanx of second finger of foot":
    "Falange distal del segundo dedo del pie",

  "Distal phalanx of third finger of foot":
    "Falange distal del tercer dedo del pie",

  "Distal phalanx of fourth finger of foot":
    "Falange distal del cuarto dedo del pie",

  "Distal phalanx of fifth finger of foot":
    "Falange distal del quinto dedo del pie",

  "Middle phalanx of second finger of foot":
    "Falange media del segundo dedo del pie",

  "Middle phalanx of third finger of foot":
    "Falange media del tercer dedo del pie",

  "Middle phalanx of fourth finger of foot":
    "Falange media del cuarto dedo del pie",

  "Middle phalanx of fifth finger of foot":
    "Falange media del quinto dedo del pie",

  "Proximal phalanx of first finger of foot":
    "Falange proximal del primer dedo del pie",

  "Proximal phalanx of second finger of foot":
    "Falange proximal del segundo dedo del pie",

  "Proximal phalanx of third finger of foot":
    "Falange proximal del tercer dedo del pie",

  "Proximal phalanx of fourth finger of foot":
    "Falange proximal del cuarto dedo del pie",

  "Proximal phalanx of fifth finger of foot":
    "Falange proximal del quinto dedo del pie",

  /* ====================================================
     NOMBRES ESPAÑOLES QUE TAMBIÉN VIENEN DEL GLB
  ==================================================== */

  "Hueso Fémur":
    "Fémur",

  "Hueso Talo":
    "Astrágalo",

  Patela:
    "Rótula",

  Estapedio:
    "Estribo",

  "Hueso capitado":
    "Hueso grande",

  "Hueso hamatal":
    "Hueso ganchoso",

  "Hueso lunado":
    "Hueso semilunar",

  "Hueso triquetral":
    "Hueso piramidal",

  "Células óseas etmoidales etmoidales anteriores":
    "Celdillas etmoidales anteriores",

  "Células óseas etmoidales etmoidales medias":
    "Celdillas etmoidales medias",

  "Células óseas etmoidales etmoidales posteriores":
    "Celdillas etmoidales posteriores",
};

/* ======================================================
   NORMALIZAR TEXTO
====================================================== */

function normalizeLookupKey(
  value: string
): string {
  return value
    .trim()
    .replace(
      /\s+/g,
      " "
    );
}

/* ======================================================
   EXTRAER LATERALIDAD

   IMPORTANTE:

   Aquí NO interpretamos una simple "l" o "r" pegada
   al final de cualquier palabra.

   Por eso:

   Femur
   NO se convierte en:
   Femu derecho

   Solamente interpretamos lateralidad cuando existe:

   .l
   .r
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
     DUPLICADOS DE BLENDER

     estructura.r.001
     ->
     estructura.r
  ==================================================== */

  name =
    name.replace(
      /\.\d{3}$/i,
      ""
    );

  /* ====================================================
     .l = LEFT
     .r = RIGHT
  ==================================================== */

  const sideMatch =
    name.match(
      /\.(l|r)$/i
    );

  if (
    sideMatch
  ) {
    laterality =
      sideMatch[1]
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
   NORMALIZAR PALABRAS
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
   GÉNERO Y NÚMERO
====================================================== */

const FEMININE_SINGULAR =
  new Set([
    "clavicula",
    "costilla",
    "escapula",
    "falange",
    "fibula",
    "mandibula",
    "rotula",
    "tibia",
    "vertebra",
  ]);

const FEMININE_PLURAL =
  new Set([
    "celdillas",
    "costillas",
    "falanges",
  ]);

const MASCULINE_PLURAL =
  new Set([
    "cartilagos",
    "dientes",
    "huesos",
  ]);

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

  const firstWord =
    normalizeWord(
      structureName
        .trim()
        .split(/\s+/)[0]
    );

  let suffix: string;

  /* FEMENINO SINGULAR */

  if (
    FEMININE_SINGULAR.has(
      firstWord
    ) || firstWord.endsWith('a')
  ) {
    suffix =
      laterality ===
      "left"
        ? "izquierda"
        : "derecha";
  }

  /* FEMENINO PLURAL */

  else if (
    FEMININE_PLURAL.has(
      firstWord
    ) || firstWord.endsWith('as')
  ) {
    suffix =
      laterality ===
      "left"
        ? "izquierdas"
        : "derechas";
  }

  /* MASCULINO PLURAL */

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

  /* MASCULINO SINGULAR */

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
   LIMPIEZA GENERAL
====================================================== */

function applyGeneralCorrections(
  originalName: string
): string {
  let name =
    originalName;

  /* Underscores */

  name =
    name.replace(
      /_/g,
      " "
    );

  /* Asteriscos */

  name =
    name.replace(
      /\*/g,
      ""
    );

  /* Espacios */

  name =
    name.replace(
      /\s+/g,
      " "
    );

  name =
    name.trim();

  return name;
}

/* ======================================================
   OBTENER NOMBRE TRADUCIDO
====================================================== */

function translateBaseName(
  originalName: string
): string {
  const cleanName =
    applyGeneralCorrections(
      normalizeLookupKey(
        originalName
      )
    );

  const exact =
    SKELETAL_EXACT_TRANSLATIONS[
      cleanName
    ];

  if (
    exact
  ) {
    return exact;
  }

  return cleanName;
}

/* ======================================================
   FUNCIÓN PRINCIPAL
====================================================== */

export function getSkeletalStructureName(
  structureName: string
): string {
  if (
    !structureName ||
    !structureName.trim()
  ) {
    return "Estructura esquelética";
  }

  const {
    name,
    laterality,
  } =
    extractLaterality(
      structureName
    );

  const translatedName =
    translateBaseName(
      name
    );

  if (
    !translatedName
  ) {
    return "Estructura esquelética";
  }

  return addLaterality(
    translatedName,
    laterality
  );
}

/* ======================================================
   DIAGNÓSTICO

   Busca señales de que todavía quedó un nombre interno
   del GLB sin traducir.
====================================================== */

export function isSuspiciousSkeletalName(
  structureName: string
): boolean {
  const visibleName =
    getSkeletalStructureName(
      structureName
    );

  const suspiciousPatterns =
    [
      /\.\d{3}$/i,

      /\.(l|r)$/i,

      /_/,

      /\*/,

      /\bbone\b/i,

      /\bphalanx\b/i,

      /\bfinger\b/i,

      /\bhand\b/i,

      /\bfoot\b/i,

      /\bvertebra\b/i,

      /\brib\b/i,

      /\bcartilage\b/i,

      /\bfemur\b/i,

      /\bhumerus\b/i,

      /\bradius\b/i,

      /\bscapula\b/i,

      /\bclavicle\b/i,

      /\bzygoma/i,

      /\bincus\b/i,

      /\bmalleus\b/i,

      /\bstapes\b/i,

      /\bpatella\b/i,

      /\bmandible\b/i,

      /\bmaxilla\b/i,

      /\btalus\b/i,

      /\bcalcaneus\b/i,
    ];

  return suspiciousPatterns.some(
    (pattern) =>
      pattern.test(
        visibleName
      )
  );
}
