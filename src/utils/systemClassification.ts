import type {
  AnatomySystemId,
} from "../config/anatomySystems";

/* ======================================================
   ANATOMYLAB AI
   CLASIFICACIÓN DE ESTRUCTURAS
====================================================== */

export type SystemCategory =
  /* Cardiovascular */
  | "heart"
  | "artery"
  | "vein"

  /* Respiratorio */
  | "lung"
  | "airway"
  | "upper-airway"

  /* Nervioso */
  | "nervous-central"
  | "nervous-peripheral"

  /* Esquelético */
  | "skeletal-axial"
  | "skeletal-appendicular"

  /* Muscular */
  | "muscular-head-neck"
  | "muscular-trunk"
  | "muscular-upper-limb"
  | "muscular-lower-limb"

  /* Digestivo */
  | "digestive-tract"
  | "digestive-accessory"

  | "other";

/* ======================================================
   NORMALIZAR NOMBRE
====================================================== */

export function normalizeStructureName(
  value: string
) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[_\-.]/g,
      " "
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}

/* ======================================================
   AYUDA
====================================================== */

function containsAny(
  name: string,
  words: string[]
) {
  return words.some(
    (word) =>
      name.includes(
        word
      )
  );
}

/* ======================================================
   RESPIRATORIO
====================================================== */

export function getRespiratoryCategory(
  structureName: string
): SystemCategory {
  const name =
    normalizeStructureName(
      structureName
    );

  /* VÍA AÉREA SUPERIOR */

  if (
    containsAny(
      name,
      [
        "nariz",
        "nose",
        "nasal",
        "paranasal",
        "seno",
        "sinus",
        "laringe",
        "larynx",
        "epiglot",
        "faringe",
        "pharynx",
      ]
    )
  ) {
    return "upper-airway";
  }

  /* PULMONES */

  if (
    containsAny(
      name,
      [
        "pulmon",
        "lung",
        "lobulo",
        "lobe",
        "segmento",
        "segment",
        "lingula",
        "incisura",
        "fisura",
        "fissure",
      ]
    )
  ) {
    return "lung";
  }

  /* VÍAS RESPIRATORIAS */

  if (
    containsAny(
      name,
      [
        "traquea",
        "trachea",
        "traqueobronquial",
        "tracheobronchial",
        "bronqu",
        "bronch",
        "airway",
      ]
    )
  ) {
    return "airway";
  }

  return "other";
}

/* ======================================================
   NERVIOSO
====================================================== */

export function getNervousCategory(
  structureName: string
): SystemCategory {
  const name =
    normalizeStructureName(
      structureName
    );

  /* ====================================================
     SISTEMA NERVIOSO CENTRAL
  ==================================================== */

  if (
    containsAny(
      name,
      [
        "sistema nervioso central",
        "central nervous system",

        "encefalo",
        "encephalon",

        "brain",
        "cerebro",
        "cerebrum",

        "cerebelo",
        "cerebellum",

        "tronco encefalico",
        "brainstem",
        "brain stem",

        "mesencefalo",
        "midbrain",

        "puente",
        "pons",

        "bulbo raquideo",
        "medulla oblongata",

        "diencefalo",
        "diencephalon",

        "talamo",
        "thalamus",

        "hipotalamo",
        "hypothalamus",

        "telencefalo",
        "telencephalon",

        "cortex",
        "corteza",

        "hemisferio",
        "hemisphere",

        "medula espinal",
        "spinal cord",

        "white matter",
        "gray matter",
        "grey matter",

        "sustancia blanca",
        "sustancia gris",

        "ventriculo cerebral",
        "cerebral ventricle",

        "basal nuclei",
        "basal ganglia",
        "nucleos basales",

        "hipocampo",
        "hippocampus",

        "amigdala",
        "amygdala",

        "cuerpo calloso",
        "corpus callosum",
      ]
    )
  ) {
    return "nervous-central";
  }

  /* ====================================================
     SISTEMA NERVIOSO PERIFÉRICO
  ==================================================== */

  if (
    containsAny(
      name,
      [
        "sistema nervioso periferico",
        "peripheral nervous system",

        "nervio",
        "nerve",

        "plexo",
        "plexus",

        "ganglio",
        "ganglion",

        "ramo",
        "ramus",

        "root",
        "raiz",

        "simpatico",
        "sympathetic",

        "parasimpatico",
        "parasympathetic",

        "vagus",
        "vago",

        "sciatic",
        "ciatico",

        "median nerve",
        "nervio mediano",

        "ulnar nerve",
        "nervio ulnar",
        "nervio cubital",

        "radial nerve",
        "nervio radial",

        "femoral nerve",
        "nervio femoral",

        "tibial nerve",
        "nervio tibial",

        "fibular nerve",
        "peroneal nerve",

        "cranial nerve",
        "nervio craneal",

        "spinal nerve",
        "nervio espinal",
      ]
    )
  ) {
    return "nervous-peripheral";
  }

  /*
   * Pendiente de revisión individual.
   */
  return "other";
}

/* ======================================================
   ESQUELÉTICO
====================================================== */

export function getSkeletalCategory(
  structureName: string
): SystemCategory {
  const name =
    normalizeStructureName(
      structureName
    );

  /* ====================================================
     AXIAL
  ==================================================== */

  if (
    containsAny(
      name,
      [
        "skull",
        "cranium",
        "craneo",

        "frontal",
        "parietal",
        "occipital",
        "temporal",

        "sphenoid",
        "esfenoides",

        "ethmoid",
        "etmoides",

        "maxilla",
        "maxilar",

        "mandible",
        "mandibula",

        "zygomatic",
        "cigomatico",

        "nasal bone",
        "hueso nasal",

        "lacrimal",
        "lagrimal",

        "vomer",

        "palatine",
        "palatino",

        "hyoid",
        "hioides",

        "vertebra",
        "vertebral",

        "atlas",
        "axis",

        "sacrum",
        "sacro",

        "coccyx",
        "coccix",

        "rib",
        "costilla",

        "sternum",
        "esternon",
      ]
    )
  ) {
    return "skeletal-axial";
  }

  /* ====================================================
     APENDICULAR
  ==================================================== */

  if (
    containsAny(
      name,
      [
        "clavicle",
        "clavicula",

        "scapula",
        "escapula",

        "humerus",
        "humero",

        "radius",
        "radio",

        "ulna",
        "cubito",

        "carpal",
        "carpo",

        "metacarp",
        "metacarpiano",

        "hip bone",
        "coxal",

        "ilium",
        "ilion",

        "ischium",
        "isquion",

        "pubis",

        "femur",

        "patella",
        "rotula",

        "tibia",

        "fibula",
        "perone",

        "tarsal",
        "tarso",

        "talus",
        "astragalo",

        "calcaneus",
        "calcaneo",

        "metatars",
        "metatarsiano",

        "phalange",
        "falange",
      ]
    )
  ) {
    return "skeletal-appendicular";
  }

  return "other";
}

/* ======================================================
   MUSCULAR

   IMPORTANTE:

   Esta función SOLO clasifica cuando el nombre
   nos permite hacerlo con seguridad.

   Si no reconoce el músculo devuelve "other".

   AnatomyViewer utilizará entonces la posición
   real del mesh para decidir región corporal.
====================================================== */

export function getMuscularCategory(
  structureName: string
): SystemCategory {
  const name =
    normalizeStructureName(
      structureName
    );

  /* ====================================================
     CABEZA Y CUELLO
  ==================================================== */

  if (
    containsAny(
      name,
      [
        /* Español / inglés */

        "frontalis",
        "frontal",

        "occipitalis",
        "occipital",

        "temporalis",

        "masseter",
        "masetero",

        "orbicularis oculi",
        "orbicular de los ojos",

        "orbicularis oris",
        "orbicular de la boca",

        "buccinator",
        "buccinador",

        "zygomaticus",
        "cigomatico",

        "platysma",
        "platisma",

        "sternocleidomastoid",
        "esternocleidomastoideo",

        "scalene",
        "escaleno",

        "splenius capitis",
        "splenius cervicis",

        "esplenio",

        "digastric",
        "digastrico",

        "mylohyoid",
        "milohioideo",

        "geniohyoid",
        "genihioideo",

        "stylohyoid",
        "estilohioideo",

        "omohyoid",
        "omohioideo",

        "sternohyoid",
        "esternohioideo",

        "thyrohyoid",
        "tirohioideo",

        "sternothyroid",
        "esternotiroideo",

        /* Términos latinos frecuentes */

        "capitis",
        "cervicis",
        "faciei",
        "mastoid",
        "hyoid",
      ]
    )
  ) {
    return "muscular-head-neck";
  }

  /* ====================================================
     MIEMBROS SUPERIORES
  ==================================================== */

  if (
    containsAny(
      name,
      [
        "deltoid",
        "deltoides",

        "supraspinatus",
        "supraespinoso",

        "infraspinatus",
        "infraespinoso",

        "teres minor",
        "redondo menor",

        "teres major",
        "redondo mayor",

        "subscapularis",
        "subescapular",

        "biceps brachii",
        "biceps braquial",

        "triceps brachii",
        "triceps braquial",

        "brachialis",
        "braquial",

        "brachioradialis",
        "braquiorradial",

        "pronator",
        "pronador",

        "supinator",
        "supinador",

        "flexor carpi",
        "extensor carpi",

        "flexor del carpo",
        "extensor del carpo",

        "palmaris",

        "thenar",
        "tenar",

        "hypothenar",
        "hipotenar",

        "pollicis",
        "pulgar",

        "manus",
        "mano",

        "brachii",

        "antebrach",
        "forearm",

        "carpi",

        "abductor digiti minimi manus",

        "interossei manus",
      ]
    )
  ) {
    return "muscular-upper-limb";
  }

  /* ====================================================
     MIEMBROS INFERIORES
  ==================================================== */

  if (
    containsAny(
      name,
      [
        "gluteus",
        "gluteo",

        "piriformis",
        "piriforme",

        "iliopsoas",

        "psoas",

        "iliacus",
        "iliaco",

        "tensor fasciae latae",

        "sartorius",
        "sartorio",

        "rectus femoris",
        "recto femoral",

        "vastus",
        "vasto",

        "quadriceps",
        "cuadriceps",

        "biceps femoris",
        "biceps femoral",

        "semitendinosus",
        "semitendinoso",

        "semimembranosus",
        "semimembranoso",

        "adductor longus",
        "adductor brevis",
        "adductor magnus",

        "aductor largo",
        "aductor corto",
        "aductor mayor",

        "gracilis",

        "pectineus",
        "pectineo",

        "gastrocnemius",
        "gastrocnemio",

        "soleus",
        "soleo",

        "plantaris",

        "popliteus",
        "popliteo",

        "tibialis",
        "tibial",

        "fibularis",

        "peroneus",
        "peroneo",

        "hallucis",

        "pedis",
        "pie",

        "femoris",

        "cruris",

        "thigh",
        "muslo",

        "calf",
        "pantorrilla",

        "interossei pedis",

        "abductor hallucis",

        "adductor hallucis",
      ]
    )
  ) {
    return "muscular-lower-limb";
  }

  /* ====================================================
     TRONCO
  ==================================================== */

  if (
    containsAny(
      name,
      [
        "trapezius",
        "trapecio",

        "latissimus",
        "dorsal ancho",

        "pectoralis",
        "pectoral",

        "serratus",
        "serrato",

        "intercostal",

        "diaphragm",
        "diafragma",

        "rectus abdominis",
        "recto abdominal",

        "external oblique",
        "oblicuo externo",

        "internal oblique",
        "oblicuo interno",

        "transversus abdominis",
        "transverso del abdomen",

        "erector spinae",

        "multifidus",
        "multifido",

        "quadratus lumborum",
        "cuadrado lumbar",

        "rotatores",

        "semispinalis",

        "interspinales",

        "intertransversarii",

        "levator costarum",

        "thorac",
        "abdomin",
        "lumbar",
        "dorsi",
        "spinae",
      ]
    )
  ) {
    return "muscular-trunk";
  }

  /*
   * IMPORTANTE:
   *
   * Antes devolvíamos muscular-trunk.
   *
   * Eso provocaba que casi todo el modelo
   * terminara en Tronco.
   *
   * Ahora dejamos que AnatomyViewer utilice
   * la posición 3D como respaldo.
   */
  return "other";
}

/* ======================================================
   DIGESTIVO
====================================================== */

export function getDigestiveCategory(
  structureName: string
): SystemCategory {
  const name =
    normalizeStructureName(
      structureName
    );

  /* ====================================================
     TUBO DIGESTIVO
  ==================================================== */

  if (
    containsAny(
      name,
      [
        "oral cavity",
        "cavidad oral",

        "mouth",
        "boca",

        "pharynx",
        "faringe",

        "esophagus",
        "oesophagus",
        "esofago",

        "stomach",
        "estomago",

        "duodenum",
        "duodeno",

        "jejunum",
        "yeyuno",

        "ileum",
        "ileon",

        "small intestine",
        "intestino delgado",

        "large intestine",
        "intestino grueso",

        "cecum",
        "ciego",

        "appendix",
        "apendice",

        "colon",

        "rectum",
        "recto",

        "anal canal",
        "canal anal",

        "anus",
      ]
    )
  ) {
    return "digestive-tract";
  }

  /* ====================================================
     ÓRGANOS ACCESORIOS
  ==================================================== */

  if (
    containsAny(
      name,
      [
        "liver",
        "higado",

        "gallbladder",
        "vesicula biliar",

        "pancreas",

        "bile duct",
        "conducto biliar",

        "common bile duct",
        "coledoco",

        "hepatic duct",
        "conducto hepatico",

        "cystic duct",
        "conducto cistico",

        "pancreatic duct",
        "conducto pancreatico",

        "parotid",
        "parotida",

        "submandibular",

        "sublingual",

        "salivary",
        "salival",

        "tongue",
        "lengua",
      ]
    )
  ) {
    return "digestive-accessory";
  }

  return "other";
}

/* ======================================================
   CLASIFICACIÓN GENERAL
====================================================== */

export function getSystemCategory(
  system: AnatomySystemId,
  structureName: string
): SystemCategory {
  if (
    system ===
    "respiratory"
  ) {
    return getRespiratoryCategory(
      structureName
    );
  }

  if (
    system ===
    "nervous"
  ) {
    return getNervousCategory(
      structureName
    );
  }

  if (
    system ===
    "skeletal"
  ) {
    return getSkeletalCategory(
      structureName
    );
  }

  if (
    system ===
    "muscular"
  ) {
    return getMuscularCategory(
      structureName
    );
  }

  if (
    system ===
    "digestive"
  ) {
    return getDigestiveCategory(
      structureName
    );
  }

  return "other";
}