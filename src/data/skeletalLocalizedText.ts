import type { LocalizedText } from "../i18n/localizedText";

type SkeletalField = "name" | "type" | "description" | "function" | "location" | "relationship";

const terms: readonly [string, string][] = [
  ["hueso frontal", "frontal bone"], ["hueso parietal", "parietal bone"], ["hueso temporal", "temporal bone"],
  ["hueso occipital", "occipital bone"], ["hueso esfenoide", "sphenoid bone"], ["hueso etmoides", "ethmoid bone"],
  ["hueso maxilar", "maxilla"], ["hueso cigomático", "zygomatic bone"], ["hueso nasal", "nasal bone"],
  ["hueso lagrimal", "lacrimal bone"], ["hueso palatino", "palatine bone"], ["hueso hioides", "hyoid bone"],
  ["hueso sacro", "sacrum"], ["hueso coxal", "hip bone"], ["hueso escafoides", "scaphoid"],
  ["hueso semilunar", "lunate"], ["hueso piramidal", "triquetrum"], ["hueso pisiforme", "pisiform"],
  ["hueso trapecio", "trapezium"], ["hueso trapezoide", "trapezoid"], ["hueso grande", "capitate"],
  ["hueso ganchoso", "hamate"], ["hueso navicular", "navicular"], ["hueso cuboide", "cuboid"],
  ["hueso cuneiforme medial", "medial cuneiform"], ["hueso cuneiforme intermedio", "intermediate cuneiform"],
  ["hueso cuneiforme lateral", "lateral cuneiform"], ["hueso", "bone"], ["huesos", "bones"],
  ["mandíbula", "mandible"], ["vómer", "vomer"], ["concha nasal inferior", "inferior nasal concha"],
  ["martillo", "malleus"], ["yunque", "incus"], ["estribo", "stapes"], ["atlas", "atlas"], ["axis", "axis"],
  ["vértebras cervicales", "cervical vertebrae"], ["vértebras torácicas", "thoracic vertebrae"],
  ["vértebras lumbares", "lumbar vertebrae"], ["vértebra", "vertebra"], ["vértebras", "vertebrae"],
  ["costilla", "rib"], ["costillas", "ribs"], ["cartílagos costales", "costal cartilages"], ["cartílago", "cartilage"],
  ["esternón", "sternum"], ["clavícula", "clavicle"], ["escápula", "scapula"], ["húmero", "humerus"],
  ["radio", "radius"], ["cúbito", "ulna"], ["fémur", "femur"], ["rótula", "patella"], ["tibia", "tibia"],
  ["fíbula", "fibula"], ["astrágalo", "talus"], ["calcáneo", "calcaneus"], ["metacarpianos", "metacarpals"],
  ["metatarsianos", "metatarsals"], ["falanges proximales", "proximal phalanges"], ["falanges medias", "middle phalanges"],
  ["falanges distales", "distal phalanges"], ["falanges", "phalanges"], ["dientes incisivos", "incisor teeth"],
  ["dientes caninos", "canine teeth"], ["dientes premolares", "premolar teeth"], ["dientes molares", "molar teeth"],
  ["hueso plano", "flat bone"], ["hueso largo", "long bone"], ["hueso irregular", "irregular bone"],
  ["hueso del cráneo", "cranial bone"], ["hueso de la cara", "facial bone"], ["hueso del carpo", "carpal bone"],
  ["hueso del tarso", "tarsal bone"], ["hueso sesamoideo", "sesamoid bone"], ["costilla atípica", "atypical rib"],
  ["costillas atípicas", "atypical ribs"], ["vértebra cervical", "cervical vertebra"], ["dientes anteriores", "anterior teeth"],
  ["dientes posteriores", "posterior teeth"], ["huesos largos", "long bones"], ["huesos sesamoideos", "sesamoid bones"],
  ["cráneo", "skull"], ["cara", "face"], ["órbita", "orbit"], ["órbitas", "orbits"], ["cavidad nasal", "nasal cavity"],
  ["paladar", "palate"], ["oído medio", "middle ear"], ["cuello", "neck"], ["columna", "spine"], ["tórax", "thorax"],
  ["caja torácica", "thoracic cage"], ["pelvis", "pelvis"], ["muslo", "thigh"], ["pierna", "leg"], ["antebrazo", "forearm"],
  ["brazo", "arm"], ["mano", "hand"], ["pie", "foot"], ["rodilla", "knee"], ["tobillo", "ankle"], ["cadera", "hip"],
  ["pared", "wall"], ["región", "region"], ["porción", "portion"], ["parte", "part"], ["superior", "superior"],
  ["inferior", "inferior"], ["anterior", "anterior"], ["posterior", "posterior"], ["lateral", "lateral"], ["medial", "medial"],
  ["central", "central"], ["impar", "unpaired"], ["par", "paired"], ["pequeño", "small"], ["pequeña", "small"],
  ["grande", "large"], ["delgado", "thin"], ["curvo", "curved"], ["triangular", "triangular"], ["plano", "flat"],
  ["forma", "shape"], ["sostiene", "supports"], ["sostienen", "support"], ["protege", "protects"], ["protegen", "protect"],
  ["contribuye", "contributes"], ["contribuyen", "contribute"], ["forma", "forms"], ["formado", "formed"], ["formada", "formed"],
  ["transmite", "transmits"], ["transmiten", "transmit"], ["permite", "allows"], ["participa", "participates"],
  ["proporciona", "provides"], ["proporcionan", "provide"], ["recibe", "receives"], ["actúa", "acts"], ["mantiene", "maintains"],
  ["estabiliza", "stabilizes"], ["aloja", "houses"], ["separa", "separates"], ["articula", "articulates"], ["articulaciones", "joints"],
  ["inserción", "attachment"], ["inserciones", "attachments"], ["músculos", "muscles"], ["músculo", "muscle"],
  ["ligamentos", "ligaments"], ["tendones", "tendons"], ["órganos", "organs"], ["vísceras", "viscera"],
  ["cavidades", "cavities"], ["cavidad", "cavity"], ["superficie", "surface"], ["superficies", "surfaces"],
  ["línea media", "midline"], ["entre", "between"], ["desde", "from"], ["hacia", "toward"], ["dentro de", "within"],
  ["sobre", "over"], ["bajo", "under"], ["junto a", "next to"], ["del", "of the"], ["al", "to the"], ["de", "of"],
  ["en", "in"], ["con", "with"], ["y", "and"], ["o", "or"], ["el", "the"], ["la", "the"], ["los", "the"], ["las", "the"],
  ["un", "a"], ["una", "a"], ["que", "that"], ["su", "its"], ["sus", "its"], ["primera", "first"], ["segunda", "second"],
  ["décima", "tenth"], ["dos", "two"], ["tres", "three"], ["cinco", "five"], ["numerosos", "numerous"],
];

const extraTerms: readonly [string, string][] = [
  ["huesos parietales", "parietal bones"], ["huesos temporales", "temporal bones"], ["huesos nasales", "nasal bones"],
  ["manubrio del esternón", "manubrium of the sternum"], ["manubrio", "manubrium"], ["clavículas", "clavicles"], ["mediastino", "mediastinum"],
  ["sínfisis púbica", "pubic symphysis"], ["acetábulo", "acetabulum"], ["maléolo lateral", "lateral malleolus"], ["ligamento patelar", "patellar ligament"],
  ["flexor ulnar del carpo", "flexor carpi ulnaris"], ["escafoides y semilunar", "scaphoid and lunate"], ["fila proximal del carpo", "proximal carpal row"],
  ["fila distal del carpo", "distal carpal row"], ["fila proximal", "proximal row"], ["fila distal", "distal row"], ["lado radial", "radial side"], ["lado ulnar", "ulnar side"],
  ["articulación temporomandibular", "temporomandibular joint"], ["articulación radiocarpiana", "radiocarpal joint"], ["articulación tarsometatarsiana", "tarsometatarsal joint"],
  ["articulación metatarsofalángica", "metatarsophalangeal joint"], ["foramen magno", "foramen magnum"], ["encéfalo", "brain"], ["médula espinal", "spinal cord"],
  ["médula", "spinal cord"], ["hipófisis", "pituitary gland"], ["silla turca", "sella turcica"], ["apófisis odontoides", "odontoid process"], ["apófisis", "process"],
  ["forámenes transversos", "transverse foramina"], ["raíces nerviosas sacras", "sacral nerve roots"], ["paredes superolaterales", "superolateral walls"], ["pared posterior", "posterior wall"],
  ["paredes lateral y anterior", "lateral and anterior walls"], ["pared lateral", "lateral wall"], ["techo nasal", "nasal roof"], ["tabique nasal", "nasal septum"], ["tabique", "septum"],
  ["base craneal", "cranial base"], ["base del cráneo", "base of the skull"], ["parte posterior", "posterior part"], ["gran parte", "much of the"], ["porción posteroinferior", "posteroinferior portion"],
  ["cavidades nasales", "nasal cavities"], ["cavidad oral", "oral cavity"], ["cavidad nasal", "nasal cavity"], ["cavidad craneal", "cranial cavity"], ["órganos auditivos", "auditory organs"],
  ["cadena auditiva", "auditory chain"], ["huesecillo", "ossicle"], ["huesecillos", "ossicles"], ["cuerpo vertebral", "vertebral body"], ["cuerpos grandes", "large bodies"], ["cuerpos pequeños", "small bodies"],
  ["soportar carga", "bear load"], ["transmite el peso", "transmits the weight"], ["transmite fuerzas", "transmits forces"], ["proporciona inserción", "provides attachment"], ["músculos temporales", "temporalis muscles"],
  ["más pequeño", "smallest"], ["pequeños", "small"], ["pequeñas", "small"], ["mayor", "largest"], ["situado", "located"], ["situada", "located"], ["asociado", "associated"], ["asociada", "associated"], ["sobresale", "projects"], ["se articula", "articulates"],
  ["separan", "separate"], ["permite la oposición", "allows opposition"], ["ayuda a estabilizar", "helps stabilize"], ["incluidos habitualmente en", "usually included in"], ["antepié", "forefoot"], ["retropié", "hindfoot"], ["muñeca", "wrist"], ["pulgar", "thumb"], ["dedos", "fingers or toes"], ["primer metatarsiano", "first metatarsal"], ["segundo metacarpiano", "second metacarpal"],
  ["primer", "first"], ["segundo", "second"], ["tercer", "third"], ["cuarto", "fourth"], ["cada", "each"], ["derecha", "right"], ["izquierda", "left"], ["cabeza", "head"], ["cuerpo", "body"], ["peso", "weight"], ["fuerzas", "forces"], ["fuerza", "force"], ["masticación", "mastication"], ["articulación", "joint"], ["continuidad", "continuity"],
  ["hueso esfenoides", "sphenoid bone"], ["huesos esfenoides", "sphenoid bones"], ["hueso frontal", "frontal bone"], ["hueso temporal", "temporal bone"], ["hueso occipital", "occipital bone"], ["hueso parietal", "parietal bone"], ["carpo", "carpus"], ["sacro", "sacrum"],
  ["hueso nasal", "nasal bone"], ["hueso maxilar", "maxilla"], ["hueso cigomático", "zygomatic bone"], ["hueso hioides", "hyoid bone"], ["hueso sacro", "sacrum"], ["hueso coxal", "hip bone"],
  ["huesos temporales", "temporal bones"], ["huesos parietales", "parietal bones"], ["huesos nasales", "nasal bones"], ["huesos occipitales", "occipital bones"], ["huesos frontales", "frontal bones"],
  ["superolaterales", "superolateral"], ["temporales", "temporal muscles"], ["auditivos", "auditory"], ["estructuras", "structures"], ["oído", "ear"], ["craneal", "cranial"], ["craneales", "cranial"], ["turca", "turcica"], ["nasales", "nasal"], ["nasal", "nasal"], ["oral", "oral"], ["duro", "hard"], ["parcialmente", "partially"], ["independiente", "independent"], ["cada", "each"], ["posteroinferior", "posteroinferior"], ["derecha e izquierda", "right and left"], ["gran parte", "much of the"], ["techo", "roof"], ["paredes", "walls"], ["centro", "center"], ["posterior a", "posterior to"], ["entre", "between"], ["asociado a", "associated with"], ["situado entre", "located between"], ["por la", "through the"], ["por el", "through the"], ["hacia la", "toward the"], ["a fascia", "to fascia"], [" a la ", " to the "], [" a los ", " to the "], [" a las ", " to the "], [" por ", " through "], [" se ", " "],
];

const names: Readonly<Record<string, string>> = {
  "skeletal.frontal-bone": "Frontal bone", "skeletal.parietal-bone": "Parietal bone", "skeletal.temporal-bone": "Temporal bone",
  "skeletal.occipital-bone": "Occipital bone", "skeletal.sphenoid-bone": "Sphenoid bone", "skeletal.ethmoid-bone": "Ethmoid bone",
  "skeletal.maxilla": "Maxilla", "skeletal.mandible": "Mandible", "skeletal.zygomatic-bone": "Zygomatic bone",
  "skeletal.nasal-bone": "Nasal bone", "skeletal.lacrimal-bone": "Lacrimal bone", "skeletal.palatine-bone": "Palatine bone",
  "skeletal.inferior-nasal-concha": "Inferior nasal concha", "skeletal.vomer": "Vomer", "skeletal.malleus": "Malleus",
  "skeletal.incus": "Incus", "skeletal.stapes": "Stapes", "skeletal.hyoid-bone": "Hyoid bone", "skeletal.atlas": "Atlas (C1)",
  "skeletal.axis": "Axis (C2)", "skeletal.cervical-vertebrae-c3-c7": "Cervical vertebrae C3–C7", "skeletal.thoracic-vertebrae": "Thoracic vertebrae",
  "skeletal.lumbar-vertebrae": "Lumbar vertebrae", "skeletal.sacrum": "Sacrum", "skeletal.coccyx": "Coccyx",
  "skeletal.first-rib": "First rib", "skeletal.ribs-2-10": "Second to tenth ribs", "skeletal.floating-ribs": "Floating ribs",
  "skeletal.costal-cartilages": "Costal cartilages", "skeletal.sternum": "Sternum", "skeletal.incisor-teeth": "Incisor teeth",
  "skeletal.canine-teeth": "Canine teeth", "skeletal.premolar-teeth": "Premolar teeth", "skeletal.molar-teeth": "Molar teeth",
  "skeletal.clavicle": "Clavicle", "skeletal.scapula": "Scapula", "skeletal.humerus": "Humerus", "skeletal.radius": "Radius",
  "skeletal.ulna": "Ulna", "skeletal.scaphoid": "Scaphoid", "skeletal.lunate": "Lunate", "skeletal.triquetrum": "Triquetrum",
  "skeletal.pisiform": "Pisiform", "skeletal.trapezium": "Trapezium", "skeletal.trapezoid": "Trapezoid", "skeletal.capitate": "Capitate",
  "skeletal.hamate": "Hamate", "skeletal.metacarpals": "Metacarpals", "skeletal.hand-proximal-phalanges": "Proximal phalanges of the hand",
  "skeletal.hand-middle-phalanges": "Middle phalanges of the hand", "skeletal.hand-distal-phalanges": "Distal phalanges of the hand",
  "skeletal.hip-bone": "Hip bone", "skeletal.femur": "Femur", "skeletal.patella": "Patella", "skeletal.tibia": "Tibia",
  "skeletal.fibula": "Fibula", "skeletal.talus": "Talus", "skeletal.calcaneus": "Calcaneus", "skeletal.navicular": "Navicular",
  "skeletal.cuboid": "Cuboid", "skeletal.medial-cuneiform": "Medial cuneiform", "skeletal.intermediate-cuneiform": "Intermediate cuneiform",
  "skeletal.lateral-cuneiform": "Lateral cuneiform", "skeletal.metatarsals": "Metatarsals", "skeletal.foot-proximal-phalanges": "Proximal phalanges of the foot",
  "skeletal.foot-middle-phalanges": "Middle phalanges of the foot", "skeletal.foot-distal-phalanges": "Distal phalanges of the foot",
  "skeletal.foot-sesamoids": "Sesamoid bones of the foot",
};

const curated: Readonly<Record<string, Readonly<Partial<Record<Exclude<SkeletalField, "name" | "relationship">, string>>>>> = {
  "skeletal.frontal-bone": { type: "Flat bone of the skull", description: "Unpaired bone forming the forehead and much of the roof of the orbits.", function: "Protects the frontal lobes and contributes to the cranial, orbital, and nasal cavities.", location: "Anterior portion of the skull." },
  "skeletal.atlas": { type: "Cervical vertebra", description: "First cervical vertebra, ring-shaped and without a typical vertebral body.", function: "Supports the skull and primarily facilitates flexion and extension of the head.", location: "Superior end of the cervical spine." },
  "skeletal.thoracic-vertebrae": { type: "Vertebrae", description: "Twelve vertebrae with articular surfaces for the ribs.", function: "Support the thorax, protect the spinal cord, and form the posterior wall of the thoracic cage.", location: "Between the cervical and lumbar regions of the spine." },
  "skeletal.first-rib": { type: "Atypical rib", description: "Short, broad, highly curved rib that bounds the superior thoracic aperture.", function: "Protects cervicothoracic structures and provides attachment for the scalene muscles.", location: "Superior part of the thoracic cage." },
  "skeletal.sternum": { type: "Flat bone", description: "Midline bone of the anterior thoracic wall, formed by the manubrium, body, and xiphoid process.", function: "Protects the mediastinum and receives the clavicles and costal cartilages.", location: "Anterior midline of the thorax." },
  "skeletal.clavicle": { type: "Long bone", description: "Curved bone acting as a strut between the sternum and scapula.", function: "Keeps the shoulder away from the thorax and transmits forces from the upper limb to the axial skeleton.", location: "Anterior base of the neck." },
  "skeletal.scapula": { type: "Flat bone", description: "Triangular bone of the shoulder girdle located over the posterior thoracic wall.", function: "Provides muscle attachment and orients the glenoid cavity during shoulder movement.", location: "Superior posterolateral region of the thorax." },
  "skeletal.humerus": { type: "Long bone", description: "Bone of the arm extending from the shoulder to the elbow.", function: "Acts as a lever for the upper limb and transmits forces between the shoulder and forearm.", location: "Arm." },
  "skeletal.radius": { type: "Long bone", description: "Lateral bone of the forearm in the anatomical position.", function: "Participates in the wrist and rotates around the ulna during pronation and supination.", location: "Forearm, thumb side." },
  "skeletal.ulna": { type: "Long bone", description: "Medial bone of the forearm, also called the ulna.", function: "Forms the principal hinge joint of the elbow and stabilizes the forearm.", location: "Forearm, little-finger side." },
  "skeletal.hip-bone": { type: "Irregular bone", description: "Bone of the pelvic girdle formed by fused ilium, ischium, and pubis.", function: "Transmits weight to the lower limb and protects pelvic structures.", location: "Corresponding side of the pelvis." },
  "skeletal.femur": { type: "Long bone", description: "Longest and strongest bone of the body, the main bony component of the thigh.", function: "Transmits loads between the pelvis and knee and acts as a lever for locomotion.", location: "Thigh, from the hip to the knee." },
  "skeletal.tibia": { type: "Long bone", description: "Medial and principal weight-bearing bone of the leg.", function: "Transmits weight from the femur to the talus and stabilizes the knee and ankle.", location: "Leg, medial to the fibula." },
  "skeletal.fibula": { type: "Long bone", description: "Slender bone located on the lateral side of the leg.", function: "Stabilizes the ankle and provides a broad surface for muscle attachment.", location: "Lateral leg, parallel to the tibia." },
};

function repairMojibake(value: string): string {
  const bytes = Uint8Array.from(value, (character) => character.charCodeAt(0));
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return value;
  }
}

const normalizedTerms = [...terms, ...extraTerms]
  .map(([source, target]) => [repairMojibake(source), target] as const)
  .sort(([left], [right]) => right.length - left.length);

function translate(value: string): string {
  let result = value;
  for (const [source, target] of normalizedTerms) {
    const escaped = source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(`(?<!\\p{L})${escaped}(?!\\p{L})`, "giu"), target);
  }
  return repairMojibake(result);
}

export function localizeSkeletalText(id: string, value: string, field: SkeletalField): LocalizedText {
  const en = field === "name" ? names[id] ?? translate(value) : field === "relationship" ? translate(value) : curated[id]?.[field] ?? translate(value);
  return { es: value, en: repairMojibake(en) };
}
