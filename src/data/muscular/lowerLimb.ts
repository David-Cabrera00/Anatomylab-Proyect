import type { EducationalStructureBinding } from "../educationalCollection";
import { bilateralGroup } from "./binding";

export const lowerLimbEntries: readonly EducationalStructureBinding[] = [
  bilateralGroup(
    [
      "Bolsa isquiática del músculo glúteo máximo",
      "Bolsa trocantérica del músculo glúteo máximo",
      "Músculo glúteo máximo",
    ],
    {
      id: "muscular.gluteus-maximus",
      name: "Músculo glúteo mayor",
      type: "Músculo esquelético",
      description: "El músculo más grande y superficial de la región glútea.",
      function: "Principal extensor y rotador lateral del muslo; contribuye a la estabilización de la cadera.",
      location: "Región glútea superficial.",
    }
  ),
  bilateralGroup(
    [
      "Músculo glúteo medio",
    ],
    {
      id: "muscular.gluteus-medius",
      name: "Músculo glúteo medio",
      type: "Músculo esquelético",
      description: "Músculo en forma de abanico parcialmente cubierto por el glúteo mayor.",
      function: "Abduce y rota medialmente el muslo; mantiene la pelvis nivelada durante la marcha.",
      location: "Superficie externa del ilion.",
    }
  ),
  bilateralGroup(
    [
      "Tensor de la fascia lata",
    ],
    {
      id: "muscular.tensor-fasciae-latae",
      name: "Músculo tensor de la fascia lata",
      type: "Músculo esquelético",
      description: "Músculo fusiforme que se continúa con el tracto iliotibial.",
      function: "Estabiliza la rodilla en extensión y colabora en la abducción y flexión del muslo.",
      location: "Cara lateral de la cadera y el muslo.",
    }
  ),
  bilateralGroup(
    [
      "Bolsa subtendínea del músculo sartorio",
      "Músculo sartorio",
    ],
    {
      id: "muscular.sartorius",
      name: "Músculo sartorio",
      type: "Músculo esquelético",
      description: "Músculo largo y acintado, el más largo del cuerpo humano, que cruza oblicuamente el muslo anterior.",
      function: "Flexiona, abduce y rota lateralmente el muslo en la cadera; flexiona la rodilla.",
      location: "Compartimento anterior del muslo, en posición superficial.",
    }
  ),
  bilateralGroup(
    [
      "Músculo recto femoral",
    ],
    {
      id: "muscular.rectus-femoris",
      name: "Músculo recto femoral",
      type: "Músculo esquelético",
      description: "Una de las cuatro porciones del cuádriceps, cruza tanto la cadera como la rodilla.",
      function: "Extiende la pierna en la rodilla y ayuda a flexionar el muslo en la cadera.",
      location: "Compartimento anterior del muslo.",
    }
  ),
  bilateralGroup(
    [
      "Músculo vasto lateral",
    ],
    {
      id: "muscular.vastus-lateralis",
      name: "Músculo vasto lateral",
      type: "Músculo esquelético",
      description: "El componente más grande del cuádriceps femoral.",
      function: "Extiende la pierna en la articulación de la rodilla.",
      location: "Compartimento anterior del muslo, cara lateral.",
    }
  ),
  bilateralGroup(
    [
      "Músculo vasto medial",
    ],
    {
      id: "muscular.vastus-medialis",
      name: "Músculo vasto medial",
      type: "Músculo esquelético",
      description: "Componente medial del cuádriceps femoral.",
      function: "Extiende la pierna y estabiliza la rótula.",
      location: "Compartimento anterior del muslo, cara medial.",
    }
  ),
  bilateralGroup(
    [
      "Músculo vasto intermedio",
    ],
    {
      id: "muscular.vastus-intermedius",
      name: "Músculo vasto intermedio",
      type: "Músculo esquelético",
      description: "Componente profundo del cuádriceps situado bajo el recto femoral.",
      function: "Extiende la pierna en la articulación de la rodilla.",
      location: "Compartimento anterior del muslo, cara anterior del fémur.",
    }
  ),
  bilateralGroup(
    [
      "Bolsa subtendínea inferior del músculo bíceps femoral",
      "Bolsa superior del músculo bíceps femoral",
      "Cabeza corta del músculo bíceps femoral",
      "Cabeza larga del músculo bíceps femoral",
    ],
    {
      id: "muscular.biceps-femoris",
      name: "Músculo bíceps femoral",
      type: "Músculo esquelético",
      description: "Músculo del compartimento posterior del muslo con una cabeza larga y otra corta.",
      function: "Flexiona la rodilla y rota lateralmente la pierna; su cabeza larga extiende el muslo.",
      location: "Compartimento posterior del muslo, lado lateral.",
    }
  ),
  bilateralGroup(
    [
      "Músculo semitendinoso",
    ],
    {
      id: "muscular.semitendinosus",
      name: "Músculo semitendinoso",
      type: "Músculo esquelético",
      description: "Músculo isquiosural con un tendón largo distal.",
      function: "Flexiona la rodilla y extiende el muslo.",
      location: "Compartimento posterior del muslo, lado medial.",
    }
  ),
  bilateralGroup(
    [
      "Bolsa subtendínea del músculo tibial anterior",
      "Músculo tibial anterior",
    ],
    {
      id: "muscular.tibialis-anterior",
      name: "Músculo tibial anterior",
      type: "Músculo esquelético",
      description: "Músculo grueso situado en el compartimento anterior de la pierna, paralelo a la cresta tibial.",
      function: "Produce la dorsiflexión y la inversión del pie.",
      location: "Compartimento anterior de la pierna.",
    }
  ),
  bilateralGroup(
    [
      "Bolsa subtendínea lateral del músculo gastrocnemio",
      "Bolsa subtendínea medial del músculo gastrocnemio",
      "Cabeza lateral del músculo gastrocnemio",
      "Cabeza medial del músculo gastrocnemio",
    ],
    {
      id: "muscular.gastrocnemius",
      name: "Músculo gastrocnemio",
      type: "Músculo esquelético",
      description: "Músculo más superficial de la pantorrilla, formado por dos cabezas (medial y lateral).",
      function: "Flexor plantar del pie cuando la rodilla está extendida, y flexor secundario de la rodilla.",
      location: "Compartimento posterior de la pierna (superficial).",
    }
  ),
  bilateralGroup(
    [
      "Músculo sóleo",
    ],
    {
      id: "muscular.soleus",
      name: "Músculo sóleo",
      type: "Músculo esquelético",
      description: "Músculo plano y ancho situado profundamente al gastrocnemio.",
      function: "Potente flexor plantar del pie, esencial para la marcha y postura.",
      location: "Compartimento posterior de la pierna (profundo al gastrocnemio).",
    }
  ),
];
