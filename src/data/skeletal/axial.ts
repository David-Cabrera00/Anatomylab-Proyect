import type { EducationalStructureBinding } from "../educationalCollection";
import { bilateral, bilateralGroup, grouped } from "./binding";

const cervicalVertebrae = ["Vértebra C3", "Vértebra C4", "Vértebra C5", "Vértebra C6", "Vértebra C7"];
const thoracicVertebrae = Array.from({ length: 12 }, (_, index) => `Vértebra T${index + 1}`);
const lumbarVertebrae = Array.from({ length: 5 }, (_, index) => `Vértebra L${index + 1}`);
const typicalRibs = ["Segunda costilla", "Tercera costilla", "Cuarta costilla", "Quinta costilla", "Sexta costilla", "Séptima costilla", "Octava costilla", "Novena costilla", "Décima costilla"];
const floatingRibs = ["Undécima costilla", "Duodécima costilla"];
const costalCartilages = [
  "Cartílago costal de la primera costilla", "Cartílago costal de la segunda costilla",
  "Cartílago costal de la tercera costilla", "Cartílago costal de la cuarta costilla",
  "Cartílago costal de la quinta costilla", "Cartílago costal de la sexta costilla",
  "Cartílago costal de la séptima costilla", "Cartílago costal de la octava costilla",
  "Cartílago costal de la novena costilla", "Cartílago costal de la décima costilla",
];

export const axialEntries: readonly EducationalStructureBinding[] = [
  // Neurocráneo.
  {
    originalName: "Hueso frontal",
    data: {
      id: "skeletal.frontal-bone", name: "Hueso frontal", type: "Hueso plano del cráneo",
      description: "Hueso impar que forma la frente y gran parte del techo de las órbitas.",
      function: "Protege los lóbulos frontales y contribuye a las cavidades craneal, orbitaria y nasal.",
      location: "Porción anterior del cráneo.",
      relationships: ["Huesos parietales", "Hueso esfenoides", "Huesos nasales"],
    },
  },
  bilateral("Hueso parietal", {
    id: "skeletal.parietal-bone", name: "Hueso parietal", type: "Hueso plano del cráneo",
    description: "Hueso par que forma gran parte de la bóveda craneal superior y lateral.",
    function: "Protege el encéfalo y proporciona inserción a fascia y músculos temporales.",
    location: "Techo y paredes superolaterales del cráneo.",
    relationships: ["Hueso frontal", "Hueso temporal", "Hueso occipital"],
  }),
  bilateral("Hueso temporal", {
    id: "skeletal.temporal-bone", name: "Hueso temporal", type: "Hueso irregular del cráneo",
    description: "Hueso par de la base y pared lateral del cráneo que aloja estructuras del oído.",
    function: "Protege órganos auditivos y participa en la articulación temporomandibular.",
    location: "Región inferolateral del cráneo.",
    relationships: ["Mandíbula", "Hueso parietal", "Hueso occipital"],
  }),
  {
    originalName: "Hueso occipital",
    data: {
      id: "skeletal.occipital-bone", name: "Hueso occipital", type: "Hueso plano del cráneo",
      description: "Hueso impar que forma la parte posterior y gran parte de la base del cráneo.",
      function: "Protege el encéfalo posterior y transmite su continuidad con la médula por el foramen magno.",
      location: "Región posterior e inferior del cráneo.",
      relationships: ["Atlas", "Huesos parietales", "Huesos temporales"],
    },
  },
  {
    originalName: "Hueso esfenoide",
    data: {
      id: "skeletal.sphenoid-bone", name: "Hueso esfenoide", type: "Hueso irregular del cráneo",
      description: "Hueso central de la base craneal que se articula con numerosos huesos del cráneo.",
      function: "Integra la base craneal, contribuye a las órbitas y aloja la hipófisis en la silla turca.",
      location: "Centro de la base del cráneo, posterior a las órbitas.",
      relationships: ["Hueso frontal", "Huesos temporales", "Hueso etmoides"],
    },
  },
  {
    originalName: "Hueso etmoides",
    data: {
      id: "skeletal.ethmoid-bone", name: "Hueso etmoides", type: "Hueso irregular del cráneo",
      description: "Hueso ligero situado entre las órbitas y asociado a la cavidad nasal.",
      function: "Forma parte del techo nasal, el tabique, las órbitas y la base craneal anterior.",
      location: "Línea media entre las cavidades orbitarias.",
      relationships: ["Hueso frontal", "Vómer", "Conchas nasales"],
    },
  },

  // Viscerocráneo.
  bilateral("Hueso maxilar", {
    id: "skeletal.maxilla", name: "Hueso maxilar", type: "Hueso irregular de la cara",
    description: "Hueso par que forma la mandíbula superior y sostiene los dientes superiores.",
    function: "Contribuye a las órbitas y cavidades nasal y oral, y transmite fuerzas de la masticación.",
    location: "Región central de la cara.",
    relationships: ["Hueso cigomático", "Hueso palatino", "Dientes superiores"],
  }),
  {
    originalName: "Mandíbula",
    data: {
      id: "skeletal.mandible", name: "Mandíbula", type: "Hueso irregular de la cara",
      description: "Hueso móvil que forma la mandíbula inferior y sostiene los dientes inferiores.",
      function: "Permite la masticación, contribuye al habla y da forma al tercio inferior de la cara.",
      location: "Porción inferior del esqueleto facial.",
      relationships: ["Huesos temporales", "Dientes inferiores", "Articulaciones temporomandibulares"],
    },
  },
  bilateral("Hueso cigomático", {
    id: "skeletal.zygomatic-bone", name: "Hueso cigomático", type: "Hueso de la cara",
    description: "Hueso par que forma la prominencia de la mejilla y parte de la órbita.",
    function: "Refuerza el macizo facial y transmite fuerzas hacia el cráneo.",
    location: "Región superolateral de la cara.",
    relationships: ["Maxilar", "Hueso temporal", "Hueso frontal"],
  }),
  bilateral("Hueso nasal", {
    id: "skeletal.nasal-bone", name: "Hueso nasal", type: "Hueso de la cara",
    description: "Pequeño hueso par que forma el puente óseo de la nariz.",
    function: "Sostiene los cartílagos nasales y contribuye al contorno nasal.",
    location: "Línea media superior de la cara.",
    relationships: ["Hueso frontal", "Maxilar", "Cartílago nasal"],
  }),
  bilateral("Hueso lagrimal", {
    id: "skeletal.lacrimal-bone", name: "Hueso lagrimal", type: "Hueso de la cara",
    description: "Hueso par pequeño y delgado de la pared medial de la órbita.",
    function: "Contribuye al conducto por el que drena el aparato lagrimal hacia la cavidad nasal.",
    location: "Pared medial anterior de cada órbita.",
    relationships: ["Hueso etmoides", "Maxilar", "Saco lagrimal"],
  }),
  bilateral("Hueso palatino", {
    id: "skeletal.palatine-bone", name: "Hueso palatino", type: "Hueso de la cara",
    description: "Hueso par en forma de L que participa en el paladar duro y la cavidad nasal.",
    function: "Separa parcialmente las cavidades oral y nasal y contribuye a la órbita.",
    location: "Parte posterior del paladar óseo.",
    relationships: ["Maxilar", "Hueso esfenoides", "Vómer"],
  }),
  bilateral("Concha nasal inferior", {
    id: "skeletal.inferior-nasal-concha", name: "Concha nasal inferior", type: "Hueso de la cara",
    description: "Hueso curvo independiente que sobresale de la pared lateral de la cavidad nasal.",
    function: "Aumenta la superficie mucosa para acondicionar el aire inspirado.",
    location: "Pared lateral inferior de cada cavidad nasal.",
    relationships: ["Maxilar", "Hueso palatino", "Cavidad nasal"],
  }),
  {
    originalName: "Vómer",
    data: {
      id: "skeletal.vomer", name: "Vómer", type: "Hueso de la cara",
      description: "Hueso impar, delgado y plano que forma la porción posteroinferior del tabique nasal.",
      function: "Separa las cavidades nasales derecha e izquierda.",
      location: "Línea media de la cavidad nasal.",
      relationships: ["Hueso etmoides", "Hueso esfenoides", "Huesos palatinos"],
    },
  },

  // Oído medio e hioides.
  bilateral("Malleus", {
    id: "skeletal.malleus", name: "Martillo", type: "Huesecillo del oído",
    description: "Primer huesecillo de la cadena auditiva, unido a la membrana timpánica.",
    function: "Transmite vibraciones de la membrana timpánica hacia el yunque.",
    location: "Cavidad del oído medio.",
    relationships: ["Membrana timpánica", "Yunque"],
  }),
  bilateral("Incus", {
    id: "skeletal.incus", name: "Yunque", type: "Huesecillo del oído",
    description: "Huesecillo intermedio de la cadena auditiva.",
    function: "Conduce vibraciones desde el martillo hacia el estribo.",
    location: "Cavidad del oído medio, entre martillo y estribo.",
    relationships: ["Martillo", "Estribo"],
  }),
  bilateral("Estapedio", {
    id: "skeletal.stapes", name: "Estribo", type: "Huesecillo del oído",
    description: "Tercer huesecillo de la cadena auditiva y el hueso más pequeño del cuerpo.",
    function: "Transmite las vibraciones del yunque a la ventana oval del oído interno.",
    location: "Cavidad del oído medio, medial al yunque.",
    relationships: ["Yunque", "Ventana oval"],
  }),
  {
    originalName: "Hueso hioides",
    data: {
      id: "skeletal.hyoid-bone", name: "Hueso hioides", type: "Hueso irregular",
      description: "Hueso en forma de U que no articula directamente con otros huesos.",
      function: "Sirve de soporte a la lengua y de inserción a músculos de deglución y fonación.",
      location: "Cuello anterior, entre la mandíbula y el cartílago tiroides.",
      relationships: ["Lengua", "Laringe", "Músculos suprahioideos e infrahioideos"],
    },
  },

  // Columna vertebral.
  {
    originalName: "Atlas (C1)",
    data: {
      id: "skeletal.atlas", name: "Atlas (C1)", type: "Vértebra cervical",
      description: "Primera vértebra cervical, de forma anular y sin cuerpo vertebral típico.",
      function: "Sostiene el cráneo y facilita principalmente la flexión y extensión de la cabeza.",
      location: "Extremo superior de la columna cervical.",
      relationships: ["Hueso occipital", "Axis (C2)"],
    },
  },
  {
    originalName: "Axis (C2)",
    data: {
      id: "skeletal.axis", name: "Axis (C2)", type: "Vértebra cervical",
      description: "Segunda vértebra cervical, caracterizada por la apófisis odontoides.",
      function: "Actúa como pivote para la rotación del atlas y la cabeza.",
      location: "Inferior al atlas en la columna cervical alta.",
      relationships: ["Atlas (C1)", "Vértebra C3"],
    },
  },
  grouped(cervicalVertebrae, {
    id: "skeletal.cervical-vertebrae-c3-c7", name: "Vértebras cervicales C3–C7", type: "Vértebras cervicales",
    description: "Cinco vértebras cervicales con cuerpos pequeños y forámenes transversos.",
    function: "Sostienen el cuello, protegen la médula cervical y permiten amplia movilidad.",
    location: "Columna cervical inferior, entre el axis y la región torácica.",
    relationships: ["Axis (C2)", "Vértebra T1", "Médula espinal"],
  }),
  grouped(thoracicVertebrae, {
    id: "skeletal.thoracic-vertebrae", name: "Vértebras torácicas", type: "Vértebras",
    description: "Doce vértebras que presentan superficies articulares para las costillas.",
    function: "Sostienen el tórax, protegen la médula y forman la pared posterior de la caja torácica.",
    location: "Entre las regiones cervical y lumbar de la columna.",
    relationships: ["Costillas", "Discos intervertebrales", "Médula espinal"],
  }),
  grouped(lumbarVertebrae, {
    id: "skeletal.lumbar-vertebrae", name: "Vértebras lumbares", type: "Vértebras",
    description: "Cinco vértebras de cuerpos grandes adaptadas para soportar carga.",
    function: "Transmiten el peso del tronco y permiten flexión, extensión e inclinación lumbar.",
    location: "Entre la región torácica y el sacro.",
    relationships: ["Vértebra T12", "Sacro", "Discos intervertebrales"],
  }),
  {
    originalName: "Hueso sacro",
    data: {
      id: "skeletal.sacrum", name: "Hueso sacro", type: "Hueso irregular",
      description: "Hueso triangular formado por la fusión de cinco vértebras sacras.",
      function: "Transmite el peso de la columna a la pelvis y protege raíces nerviosas sacras.",
      location: "Pared posterior de la pelvis, inferior a L5.",
      relationships: ["Vértebra L5", "Huesos coxales", "Cóccix"],
    },
  },
  {
    originalName: "Cóccix",
    data: {
      id: "skeletal.coccyx", name: "Cóccix", type: "Hueso irregular",
      description: "Segmento terminal de la columna formado por vértebras coccígeas fusionadas.",
      function: "Proporciona inserción a músculos y ligamentos del suelo pélvico.",
      location: "Inferior al sacro, en la línea media posterior de la pelvis.",
      relationships: ["Sacro", "Suelo pélvico"],
    },
  },

  // Caja torácica.
  bilateral("Primera costilla", {
    id: "skeletal.first-rib", name: "Primera costilla", type: "Costilla atípica",
    description: "Costilla corta, ancha y muy curvada que delimita la abertura torácica superior.",
    function: "Protege estructuras cervicotorácicas y sirve de inserción a músculos escalenos.",
    location: "Parte superior de la caja torácica.",
    relationships: ["Vértebra T1", "Manubrio", "Clavícula"],
  }),
  bilateralGroup(typicalRibs, {
    id: "skeletal.ribs-2-10", name: "Costillas segunda a décima", type: "Costillas",
    description: "Arcos óseos pares que forman la mayor parte de la pared torácica.",
    function: "Protegen órganos torácicos y se desplazan durante la respiración.",
    location: "Paredes lateral y anterior del tórax.",
    relationships: ["Vértebras torácicas", "Cartílagos costales", "Esternón"],
  }),
  bilateralGroup(floatingRibs, {
    id: "skeletal.floating-ribs", name: "Costillas flotantes", type: "Costillas atípicas",
    description: "Costillas undécima y duodécima, sin unión anterior al esternón.",
    function: "Protegen parcialmente órganos abdominales superiores y dan inserción muscular.",
    location: "Parte posteroinferior de la caja torácica.",
    relationships: ["Vértebras T11 y T12", "Músculos de la pared abdominal"],
  }),
  bilateralGroup(costalCartilages, {
    id: "skeletal.costal-cartilages", name: "Cartílagos costales", type: "Cartílago hialino",
    description: "Segmentos cartilaginosos que prolongan anteriormente las costillas.",
    function: "Aportan elasticidad a la caja torácica y conectan directa o indirectamente las costillas con el esternón.",
    location: "Pared anterior del tórax.",
    relationships: ["Costillas", "Esternón"],
  }),
  grouped(["Manubrio del esternón", "Cuerpo del esternón", "Proceso xifoides"], {
    id: "skeletal.sternum", name: "Esternón", type: "Hueso plano",
    description: "Hueso medio de la pared torácica anterior, formado por manubrio, cuerpo y proceso xifoides.",
    function: "Protege el mediastino y recibe las clavículas y los cartílagos costales.",
    location: "Línea media anterior del tórax.",
    relationships: ["Clavículas", "Cartílagos costales", "Mediastino"],
  }),

  // Dientes agrupados por clase funcional.
  bilateralGroup(["Diente incisivo inferolateral", "Diente incisivo inferomedial", "Diente incisivo superolateral", "Diente incisivo superomedial"], {
    id: "skeletal.incisor-teeth", name: "Dientes incisivos", type: "Dientes anteriores",
    description: "Dientes anteriores de corona cortante, situados en ambas arcadas.",
    function: "Cortan los alimentos y contribuyen a la articulación del habla.",
    location: "Región anterior del maxilar y la mandíbula.",
    relationships: ["Maxilar", "Mandíbula", "Caninos"],
  }),
  bilateralGroup(["Diente canino inferior", "Diente canino superior"], {
    id: "skeletal.canine-teeth", name: "Dientes caninos", type: "Dientes",
    description: "Dientes de corona puntiaguda situados entre incisivos y premolares.",
    function: "Desgarran alimentos y ayudan a guiar los movimientos mandibulares.",
    location: "Arcadas superior e inferior, laterales a los incisivos.",
    relationships: ["Incisivos", "Premolares", "Huesos alveolares"],
  }),
  bilateralGroup(["Diente primer premolar inferior", "Diente primer premolar superior", "Diente segundo premolar inferior", "Diente segundo premolar superior"], {
    id: "skeletal.premolar-teeth", name: "Dientes premolares", type: "Dientes posteriores",
    description: "Dientes permanentes situados entre caninos y molares.",
    function: "Trituran y aplastan los alimentos durante la masticación.",
    location: "Región lateral de ambas arcadas dentarias.",
    relationships: ["Caninos", "Molares", "Maxilar y mandíbula"],
  }),
  bilateralGroup(["Diente primer molar inferior", "Diente primer molar superior", "Diente segundo molar inferior", "Diente segundo molar superior"], {
    id: "skeletal.molar-teeth", name: "Dientes molares", type: "Dientes posteriores",
    description: "Dientes posteriores de corona amplia y varias cúspides.",
    function: "Muelen los alimentos y soportan grandes fuerzas masticatorias.",
    location: "Porción posterior de las arcadas dentarias.",
    relationships: ["Premolares", "Maxilar", "Mandíbula"],
  }),
];
