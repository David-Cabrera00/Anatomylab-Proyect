import type { EducationalStructureBinding } from "../educationalCollection";
import { bilateral, bilateralGroup } from "./binding";

const metacarpals = [
  "Primer hueso metacarpiano", "Segundo hueso metacarpiano", "Tercer hueso metacarpiano",
  "Cuarto hueso metacarpiano", "Quinto hueso metacarpiano",
];
const handProximalPhalanges = ["primer", "segundo", "tercer", "cuarto", "quinto"]
  .map((ordinal) => `Falange proximal del ${ordinal} dedo de la mano`);
const handMiddlePhalanges = ["segundo", "tercer", "cuarto", "quinto"]
  .map((ordinal) => `Falange media del ${ordinal} dedo de la mano`);
const handDistalPhalanges = ["primer", "segundo", "tercer", "cuarto", "quinto"]
  .map((ordinal) => `Falange distal del ${ordinal} dedo de la mano`);
const metatarsals = [
  "Primer hueso metatarsiano", "Segundo hueso metatarsiano", "Tercer hueso metatarsiano",
  "Cuarto hueso metatarsiano", "Quinto hueso metatarsiano",
];
const footProximalPhalanges = ["primer", "segundo", "tercer", "cuarto", "quinto"]
  .map((ordinal) => `Falange proximal del ${ordinal} dedo del pie`);
const footMiddlePhalanges = ["segundo", "tercer", "cuarto", "quinto"]
  .map((ordinal) => `Falange media del ${ordinal} dedo del pie`);
const footDistalPhalanges = ["primer", "segundo", "tercer", "cuarto", "quinto"]
  .map((ordinal) => `Falange distal del ${ordinal} dedo del pie`);

export const appendicularEntries: readonly EducationalStructureBinding[] = [
  // Cintura escapular y miembro superior.
  bilateral("Clavícula", {
    id: "skeletal.clavicle", name: "Clavícula", type: "Hueso largo",
    description: "Hueso curvo que actúa como puntal entre el esternón y la escápula.",
    function: "Mantiene el hombro separado del tórax y transmite fuerzas del miembro superior al esqueleto axial.",
    location: "Base anterior del cuello.",
    relationships: ["Manubrio del esternón", "Acromion de la escápula"],
  }),
  bilateral("Escápula", {
    id: "skeletal.scapula", name: "Escápula", type: "Hueso plano",
    description: "Hueso triangular de la cintura escapular situado sobre la pared torácica posterior.",
    function: "Proporciona inserción muscular y orienta la cavidad glenoidea durante el movimiento del hombro.",
    location: "Región posterolateral superior del tórax.",
    relationships: ["Clavícula", "Húmero", "Caja torácica"],
  }),
  bilateral("Húmero", {
    id: "skeletal.humerus", name: "Húmero", type: "Hueso largo",
    description: "Hueso del brazo que se extiende desde el hombro hasta el codo.",
    function: "Actúa como palanca para el miembro superior y transmite fuerzas entre hombro y antebrazo.",
    location: "Brazo.",
    relationships: ["Escápula", "Radio", "Ulna"],
  }),
  bilateral("Radio", {
    id: "skeletal.radius", name: "Radio", type: "Hueso largo",
    description: "Hueso lateral del antebrazo en posición anatómica.",
    function: "Participa en la muñeca y rota alrededor de la ulna durante pronación y supinación.",
    location: "Antebrazo, lado del pulgar.",
    relationships: ["Húmero", "Ulna", "Escafoides y semilunar"],
  }),
  bilateral("Ulna", {
    id: "skeletal.ulna", name: "Cúbito", type: "Hueso largo",
    description: "Hueso medial del antebrazo, también denominado cúbito.",
    function: "Forma la principal articulación en bisagra del codo y estabiliza el antebrazo.",
    location: "Antebrazo, lado del meñique.",
    relationships: ["Húmero", "Radio", "Carpo"],
  }),

  // Carpo: se individualiza cada hueso por sus relaciones propias.
  bilateral("Hueso escafoides", {
    id: "skeletal.scaphoid", name: "Hueso escafoides", type: "Hueso del carpo",
    description: "Hueso de la fila proximal del carpo situado en el lado radial.",
    function: "Participa en la transmisión de carga entre la mano y el radio.",
    location: "Muñeca, base del pulgar.",
    relationships: ["Radio", "Semilunar", "Trapecio"],
  }),
  bilateral("Hueso lunado", {
    id: "skeletal.lunate", name: "Hueso semilunar", type: "Hueso del carpo",
    description: "Hueso central de la fila proximal del carpo, de contorno semilunar.",
    function: "Contribuye a la movilidad y estabilidad de la articulación radiocarpiana.",
    location: "Centro de la fila proximal del carpo.",
    relationships: ["Radio", "Escafoides", "Triquetral", "Capitado"],
  }),
  bilateral("Hueso triquetral", {
    id: "skeletal.triquetrum", name: "Hueso piramidal", type: "Hueso del carpo",
    description: "Hueso de la fila proximal del carpo situado en el lado ulnar.",
    function: "Contribuye a la estabilidad y al movimiento ulnar de la muñeca.",
    location: "Fila proximal del carpo, medial al lunado.",
    relationships: ["Lunado", "Pisiforme", "Hamatal"],
  }),
  bilateral("Hueso pisiforme", {
    id: "skeletal.pisiform", name: "Hueso pisiforme", type: "Hueso sesamoideo del carpo",
    description: "Pequeño hueso sesamoideo incluido en el tendón del flexor ulnar del carpo.",
    function: "Aumenta la ventaja mecánica del tendón y protege estructuras ulnares de la muñeca.",
    location: "Cara palmar del triquetral.",
    relationships: ["Triquetral", "Flexor ulnar del carpo"],
  }),
  bilateral("Hueso trapecio", {
    id: "skeletal.trapezium", name: "Hueso trapecio", type: "Hueso del carpo",
    description: "Hueso radial de la fila distal del carpo que articula con el primer metacarpiano.",
    function: "Su articulación en silla permite la oposición del pulgar.",
    location: "Fila distal del carpo, base del pulgar.",
    relationships: ["Escafoides", "Primer metacarpiano", "Trapezoide"],
  }),
  bilateral("Hueso trapezoide", {
    id: "skeletal.trapezoid", name: "Hueso trapezoide", type: "Hueso del carpo",
    description: "Pequeño hueso de la fila distal del carpo, firmemente unido al segundo metacarpiano.",
    function: "Contribuye a la estabilidad de la base del índice.",
    location: "Entre el trapecio y el capitado.",
    relationships: ["Escafoides", "Segundo metacarpiano", "Capitado"],
  }),
  bilateral("Hueso capitado", {
    id: "skeletal.capitate", name: "Hueso grande", type: "Hueso del carpo",
    description: "Mayor hueso del carpo y elemento central de su fila distal.",
    function: "Forma el eje mecánico central de la muñeca y transmite cargas de la mano.",
    location: "Centro de la fila distal del carpo.",
    relationships: ["Lunado", "Tercer metacarpiano", "Hamatal"],
  }),
  bilateral("Hueso hamatal", {
    id: "skeletal.hamate", name: "Hueso ganchoso", type: "Hueso del carpo",
    description: "Hueso ulnar de la fila distal del carpo, caracterizado por su gancho.",
    function: "Estabiliza el lado ulnar de la mano y delimita el canal de Guyon.",
    location: "Fila distal del carpo, medial al capitado.",
    relationships: ["Cuarto y quinto metacarpianos", "Triquetral", "Canal de Guyon"],
  }),
  bilateralGroup(metacarpals, {
    id: "skeletal.metacarpals", name: "Huesos metacarpianos", type: "Huesos largos de la mano",
    description: "Cinco huesos numerados que forman el armazón de la palma.",
    function: "Transmiten fuerzas entre el carpo y los dedos y sirven de inserción muscular.",
    location: "Palma de la mano, entre carpo y falanges.",
    relationships: ["Huesos del carpo", "Falanges proximales"],
  }),
  bilateralGroup(handProximalPhalanges, {
    id: "skeletal.hand-proximal-phalanges", name: "Falanges proximales de la mano", type: "Falanges",
    description: "Primer segmento óseo de cada dedo, distal a los metacarpianos.",
    function: "Forman los nudillos y actúan como palancas para los movimientos digitales.",
    location: "Base de los cinco dedos de la mano.",
    relationships: ["Metacarpianos", "Falanges medias o distal del pulgar"],
  }),
  bilateralGroup(handMiddlePhalanges, {
    id: "skeletal.hand-middle-phalanges", name: "Falanges medias de la mano", type: "Falanges",
    description: "Segmentos intermedios de los dedos segundo a quinto; el pulgar carece de ellos.",
    function: "Contribuyen a la flexión y extensión de los dedos.",
    location: "Entre las falanges proximales y distales de los dedos segundo a quinto.",
    relationships: ["Falanges proximales", "Falanges distales"],
  }),
  bilateralGroup(handDistalPhalanges, {
    id: "skeletal.hand-distal-phalanges", name: "Falanges distales de la mano", type: "Falanges",
    description: "Segmentos terminales de los dedos que sostienen los lechos ungueales.",
    function: "Facilitan la pinza, el tacto preciso y la manipulación fina.",
    location: "Extremos de los dedos de la mano.",
    relationships: ["Falanges medias", "Falange proximal del pulgar"],
  }),

  // Cintura pélvica y miembro inferior.
  bilateral("Hueso coxal", {
    id: "skeletal.hip-bone", name: "Hueso coxal", type: "Hueso irregular",
    description: "Hueso de la cintura pélvica formado por ilion, isquion y pubis fusionados.",
    function: "Transmite el peso al miembro inferior y protege estructuras pélvicas.",
    location: "Lado correspondiente de la pelvis.",
    relationships: ["Sacro", "Fémur", "Sínfisis púbica"],
  }),
  bilateral("Hueso Fémur", {
    id: "skeletal.femur", name: "Fémur", type: "Hueso largo",
    description: "Hueso más largo y resistente del cuerpo, principal componente óseo del muslo.",
    function: "Transmite cargas entre pelvis y rodilla y actúa como palanca para la locomoción.",
    location: "Muslo, desde la cadera hasta la rodilla.",
    relationships: ["Acetábulo", "Tibia", "Rótula"],
  }),
  bilateral("Patela", {
    id: "skeletal.patella", name: "Rótula", type: "Hueso sesamoideo",
    description: "Hueso sesamoideo incluido en el tendón del cuádriceps.",
    function: "Protege la rodilla y aumenta la ventaja mecánica del aparato extensor.",
    location: "Cara anterior de la articulación de la rodilla.",
    relationships: ["Fémur", "Tendón del cuádriceps", "Ligamento patelar"],
  }),
  bilateral("Tibia", {
    id: "skeletal.tibia", name: "Tibia", type: "Hueso largo",
    description: "Hueso medial y principal portador de carga de la pierna.",
    function: "Transmite el peso desde el fémur hacia el astrágalo y estabiliza rodilla y tobillo.",
    location: "Pierna, medial a la fíbula.",
    relationships: ["Fémur", "Fíbula", "Astrágalo"],
  }),
  bilateral("Fíbula", {
    id: "skeletal.fibula", name: "Fíbula", type: "Hueso largo",
    description: "Hueso delgado situado en el lado lateral de la pierna.",
    function: "Estabiliza el tobillo y ofrece amplia superficie de inserción muscular.",
    location: "Pierna lateral, paralela a la tibia.",
    relationships: ["Tibia", "Astrágalo", "Maléolo lateral"],
  }),

  // Tarso: cada hueso conserva una ficha propia por su papel biomecánico.
  bilateral("Hueso Talo", {
    id: "skeletal.talus", name: "Astrágalo", type: "Hueso del tarso",
    description: "Hueso del retropié que recibe el peso transmitido por tibia y fíbula.",
    function: "Forma el núcleo de las articulaciones del tobillo y distribuye carga hacia el pie.",
    location: "Entre la pierna, el calcáneo y el navicular.",
    relationships: ["Tibia", "Fíbula", "Calcáneo", "Navicular"],
  }),
  bilateral("Calcáneo", {
    id: "skeletal.calcaneus", name: "Calcáneo", type: "Hueso del tarso",
    description: "Mayor hueso del tarso y soporte óseo del talón.",
    function: "Recibe carga en el apoyo y actúa como brazo de palanca para el tendón calcáneo.",
    location: "Retropié, inferior al astrágalo.",
    relationships: ["Astrágalo", "Cuboides", "Tendón calcáneo"],
  }),
  bilateral("Hueso navicular", {
    id: "skeletal.navicular", name: "Hueso navicular", type: "Hueso del tarso",
    description: "Hueso del mediopié situado entre el astrágalo y los cuneiformes.",
    function: "Contribuye al arco longitudinal medial y transmite fuerzas al antepié.",
    location: "Mediopié medial.",
    relationships: ["Astrágalo", "Huesos cuneiformes"],
  }),
  bilateral("Hueso cuboide", {
    id: "skeletal.cuboid", name: "Hueso cuboide", type: "Hueso del tarso",
    description: "Hueso lateral del mediopié de forma aproximadamente cúbica.",
    function: "Estabiliza la columna lateral del pie y participa en su arco lateral.",
    location: "Entre el calcáneo y los metatarsianos cuarto y quinto.",
    relationships: ["Calcáneo", "Metatarsianos cuarto y quinto"],
  }),
  bilateral("Hueso cuneiforme medial", {
    id: "skeletal.medial-cuneiform", name: "Hueso cuneiforme medial", type: "Hueso del tarso",
    description: "Mayor de los tres cuneiformes y elemento medial del mediopié.",
    function: "Contribuye al arco medial y articula con el primer metatarsiano.",
    location: "Mediopié, anterior al navicular.",
    relationships: ["Navicular", "Primer metatarsiano"],
  }),
  bilateral("Hueso cuneiforme intermedio", {
    id: "skeletal.intermediate-cuneiform", name: "Hueso cuneiforme intermedio", type: "Hueso del tarso",
    description: "El menor de los tres cuneiformes, encajado en el centro del mediopié.",
    function: "Ayuda a estabilizar el segundo metatarsiano en la articulación tarsometatarsiana.",
    location: "Entre los cuneiformes medial y lateral.",
    relationships: ["Navicular", "Segundo metatarsiano"],
  }),
  bilateral("Hueso cuneiforme lateral", {
    id: "skeletal.lateral-cuneiform", name: "Hueso cuneiforme lateral", type: "Hueso del tarso",
    description: "Cuneiforme situado en la porción lateral de la fila distal del mediopié.",
    function: "Contribuye a los arcos del pie y articula principalmente con el tercer metatarsiano.",
    location: "Entre el cuneiforme intermedio y el cuboides.",
    relationships: ["Navicular", "Tercer metatarsiano", "Cuboides"],
  }),
  bilateralGroup(metatarsals, {
    id: "skeletal.metatarsals", name: "Huesos metatarsianos", type: "Huesos largos del pie",
    description: "Cinco huesos numerados que conectan el tarso con los dedos.",
    function: "Transmiten carga durante apoyo y marcha y forman parte de los arcos del pie.",
    location: "Antepié, entre tarso y falanges.",
    relationships: ["Huesos del tarso", "Falanges proximales"],
  }),
  bilateralGroup(footProximalPhalanges, {
    id: "skeletal.foot-proximal-phalanges", name: "Falanges proximales del pie", type: "Falanges",
    description: "Primer segmento óseo de cada dedo del pie.",
    function: "Participan en el apoyo, el equilibrio y la propulsión durante la marcha.",
    location: "Base de los cinco dedos del pie.",
    relationships: ["Metatarsianos", "Falanges medias o distal del primer dedo"],
  }),
  bilateralGroup(footMiddlePhalanges, {
    id: "skeletal.foot-middle-phalanges", name: "Falanges medias del pie", type: "Falanges",
    description: "Segmentos intermedios de los dedos segundo a quinto; el primer dedo carece de ellos.",
    function: "Contribuyen a la adaptación de los dedos durante apoyo y marcha.",
    location: "Dedos segundo a quinto del pie.",
    relationships: ["Falanges proximales", "Falanges distales"],
  }),
  bilateralGroup(footDistalPhalanges, {
    id: "skeletal.foot-distal-phalanges", name: "Falanges distales del pie", type: "Falanges",
    description: "Segmentos terminales de los dedos del pie.",
    function: "Contribuyen al contacto final y a la propulsión, especialmente en el primer dedo.",
    location: "Extremos de los dedos del pie.",
    relationships: ["Falanges medias", "Falange proximal del primer dedo"],
  }),
  bilateral("Huesos sesamoideos del pie", {
    id: "skeletal.foot-sesamoids", name: "Huesos sesamoideos del pie", type: "Huesos sesamoideos",
    description: "Pequeños huesos incluidos habitualmente en tendones bajo la cabeza del primer metatarsiano.",
    function: "Protegen tendones y mejoran la ventaja mecánica de la flexión del primer dedo.",
    location: "Planta del antepié, bajo la primera articulación metatarsofalángica.",
    relationships: ["Primer metatarsiano", "Primer dedo del pie"],
  }),
];
