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
  })
];
