import type { EducationalStructureBinding } from "../educationalCollection";
import { bilateralGroup } from "./binding";

export const upperLimbAdditionalEntries: readonly EducationalStructureBinding[] = [
  bilateralGroup(["Músculo redondo menor"], {
    id: "muscular.teres-minor", name: "Músculo redondo menor", type: "Músculo esquelético",
    description: "Músculo estrecho del manguito rotador situado en el borde lateral de la escápula.",
    function: "Rota lateralmente el brazo y estabiliza la cabeza del húmero.", location: "Región posterior del hombro."
  }),
  bilateralGroup(["Cabeza profunda del pronador redondo", "Cabeza superficial del pronador redondo", "Pronador cuadrado"], {
    id: "muscular.pronators", name: "Músculos pronadores del antebrazo", type: "Músculo esquelético",
    description: "Músculos que cruzan el antebrazo y producen la pronación.",
    function: "Rotan el radio sobre la ulna para orientar la palma hacia posterior o inferior.", location: "Compartimento anterior del antebrazo."
  }),
  bilateralGroup(["Supinador"], {
    id: "muscular.supinator", name: "Músculo supinador", type: "Músculo esquelético",
    description: "Músculo profundo proximal del compartimento posterior del antebrazo.",
    function: "Supina el antebrazo al rotar el radio lateralmente.", location: "Región proximal posterior del antebrazo."
  }),
  bilateralGroup(["Extensor de los dedos", "Extensor del dedo mínimo", "Extensor del índice"], {
    id: "muscular.finger-extensors", name: "Músculos extensores de los dedos", type: "Músculo esquelético",
    description: "Músculos del compartimento posterior del antebrazo que extienden los dedos.",
    function: "Extienden las articulaciones de los dedos y colaboran en la extensión de la muñeca.", location: "Compartimento posterior del antebrazo."
  }),
  bilateralGroup(["Músculos lumbricales de la mano", "Músculos interóseos dorsales de la mano", "Músculos interóseos palmares"], {
    id: "muscular.hand-intrinsics", name: "Músculos intrínsecos de la mano", type: "Músculo esquelético",
    description: "Grupo de lumbricales e interóseos que ocupa la mano y controla los dedos.",
    function: "Flexionan las metacarpofalángicas y extienden las interfalángicas; los interóseos también separan o aproximan los dedos.", location: "Palma y espacios interóseos de la mano."
  }),
  bilateralGroup(["Abductor corto del pulgar", "Músculo oponente del pulgar"], {
    id: "muscular.thenar", name: "Eminencia tenar", type: "Músculo esquelético",
    description: "Conjunto de músculos cortos situado en la base del pulgar.",
    function: "Abduce y opone el pulgar, permitiendo la prensión de precisión.", location: "Región lateral de la palma."
  }),
  bilateralGroup(["Abductor del dedo mínimo de la mano", "Músculo oponente del dedo mínimo de la mano", "Flexor del dedo mínimo de la mano"], {
    id: "muscular.hypothenar", name: "Eminencia hipotenar", type: "Músculo esquelético",
    description: "Conjunto de músculos cortos situado en la base del quinto dedo.",
    function: "Abduce, flexiona y opone el dedo mínimo para adaptar la mano a objetos curvos.", location: "Región medial de la palma."
  }),

  // Flexores profundos del antebrazo y mano
  bilateralGroup(["Flexor largo del pulgar"], {
    id: "muscular.flexor-pollicis-longus", name: "Flexor largo del pulgar", type: "Músculo esquelético",
    description: "Músculo del compartimento anterior profundo del antebrazo que flexiona el pulgar.",
    function: "Flexiona la falange distal del pulgar; ayuda en la oposición.", location: "Compartimento anterior profundo del antebrazo."
  }),
  bilateralGroup(["Flexor profundo de los dedos"], {
    id: "muscular.flexor-digitorum-profundus", name: "Flexor profundo de los dedos", type: "Músculo esquelético",
    description: "Músculo grande y profundo del antebrazo anterior que flexiona las falanges distales de los dedos 2-5.",
    function: "Flexiona las interfalángicas distales; único flexor de la falange distal.", location: "Compartimento anterior profundo del antebrazo."
  }),
  bilateralGroup(["Flexor radial del carpo"], {
    id: "muscular.flexor-carpi-radialis", name: "Flexor radial del carpo", type: "Músculo esquelético",
    description: "Músculo superficial del compartimento anterior del antebrazo, lateral al palmar largo.",
    function: "Flexiona y abduce la muñeca (desviación radial).", location: "Compartimento anterior superficial del antebrazo."
  }),
  bilateralGroup(["Músculo palmar largo"], {
    id: "muscular.palmaris-longus", name: "Músculo palmar largo", type: "Músculo esquelético",
    description: "Músculo delgado y fusiforme situado entre el flexor radial y el flexor ulnar del carpo (ausente en ~14% de personas).",
    function: "Tensa la aponeurosis palmar y flexiona débilmente la muñeca.", location: "Compartimento anterior superficial del antebrazo."
  }),

  // Extensores del pulgar y muñeca
  bilateralGroup(["Abductor largo del pulgar", "Extensor corto del pulgar"], {
    id: "muscular.thumb-extensors-abductors", name: "Extensores y abductores del pulgar", type: "Músculo esquelético",
    description: "Músculos del compartimento posterior del antebrazo que mueven el pulgar (primer compartimento dorsal).",
    function: "Abductor largo: abduce y extiende el pulgar. Extensor corto: extiende la falange proximal del pulgar.", location: "Compartimento posterior del antebrazo (primer compartimento dorsal)."
  }),
  bilateralGroup(["Extensor largo del pulgar"], {
    id: "muscular.extensor-pollicis-longus", name: "Extensor largo del pulgar", type: "Músculo esquelético",
    description: "Músculo del tercer compartimento dorsal que extiende la falange distal del pulgar.",
    function: "Extiende la falange distal del pulgar y la articulación metacarpofalángica.", location: "Compartimento posterior del antebrazo (tercer compartimento dorsal)."
  }),
  bilateralGroup(["Extensor radial corto del carpo", "Extensor radial largo del carpo"], {
    id: "muscular.extensor-carpi-radialis", name: "Extensores radiales del carpo", type: "Músculo esquelético",
    description: "Dos músculos adyacentes del compartimento posterior que extienden y abducen la muñeca.",
    function: "Extienden y desvían radialmente la muñeca.", location: "Compartimento posterior del antebrazo (segundo compartimento dorsal)."
  }),
  bilateralGroup(["Músculo ancóneo"], {
    id: "muscular.anconeus", name: "Músculo ancóneo", type: "Músculo esquelético",
    description: "Músculo triangular pequeño en la región posterior del codo, a veces considerado parte del tríceps.",
    function: "Ayuda a extender el antebrazo y estabiliza la articulación del codo.", location: "Región posterior del codo, lateral al olécranon."
  })
];