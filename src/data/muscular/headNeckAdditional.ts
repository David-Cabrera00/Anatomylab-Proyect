import type { EducationalStructureBinding } from "../educationalCollection";
import { bilateralGroup } from "./binding";

export const headNeckAdditionalEntries: readonly EducationalStructureBinding[] = [
  bilateralGroup(["Músculo escaleno anterior", "Músculo escaleno medio", "Músculo escaleno posterior"], {
    id: "muscular.scalene-group", name: "Músculos escalenos", type: "Músculo esquelético",
    description: "Grupo de músculos laterales del cuello formado por porciones anterior, media y posterior.",
    function: "Flexionan lateralmente el cuello y elevan las primeras costillas durante la inspiración forzada.",
    location: "Región lateral profunda del cuello."
  }),
  bilateralGroup(["Músculo esternohioideo", "Músculo omohioideo", "Músculo tirohioideo"], {
    id: "muscular.infrahyoid-group", name: "Músculos infrahioideos", type: "Músculo esquelético",
    description: "Músculos situados por debajo del hioides que conectan el hioides, la laringe y la cintura escapular.",
    function: "Descienden y estabilizan el hioides y la laringe durante la deglución y el habla.",
    location: "Región anterior del cuello, inferior al hueso hioides."
  }),
  bilateralGroup(["Buccinador"], {
    id: "muscular.buccinator", name: "Músculo buccinador", type: "Músculo esquelético",
    description: "Músculo plano que forma la pared muscular de la mejilla.",
    function: "Comprime la mejilla y mantiene el alimento entre las superficies dentarias.", location: "Pared lateral de la cavidad oral."
  }),
  bilateralGroup(["Músculo cigomático mayor", "Músculo cigomático menor"], {
    id: "muscular.zygomaticus", name: "Músculos cigomáticos", type: "Músculo esquelético",
    description: "Músculos de la expresión facial que se extienden desde el cigomático hacia el ángulo de la boca y el labio superior.",
    function: "Elevan el ángulo de la boca y el labio superior, participando en la sonrisa.", location: "Región anterior de la mejilla."
  }),
  bilateralGroup(["Músculo mental", "Músculo nasal", "Músculo prócer", "Músculo risorio"], {
    id: "muscular.facial-expression", name: "Músculos de la expresión facial", type: "Músculo esquelético",
    description: "Conjunto de músculos periorales y nasales que movilizan la piel de la cara.",
    function: "Modifican la forma de los labios, la nariz y el mentón para producir expresiones faciales.", location: "Tejido subcutáneo de la cara."
  })
];
