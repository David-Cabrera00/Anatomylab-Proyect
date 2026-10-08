import type { EducationalStructureBinding } from "../educationalCollection";
import { bilateralGroup } from "./binding";

export const trunkEntries: readonly EducationalStructureBinding[] = [
  bilateralGroup(
    [
      "(Porción abdominal del músculo pectoral mayor)",
      "Porción clavicular del músculo pectoral mayor",
      "Porción esternocostal del músculo pectoral mayor",
    ],
    {
      id: "muscular.pectoralis-major",
      name: {
        es: "Músculo pectoral mayor",
        en: "Pectoralis major muscle",
      },
      type: {
        es: "Músculo esquelético",
        en: "Skeletal muscle",
      },
      description: {
        es: "Gran músculo en forma de abanico que cubre la parte superior del tórax.",
        en: "Large fan-shaped muscle that covers the upper chest.",
      },
      function: {
        es: "Aduce y rota medialmente el brazo; su porción clavicular flexiona el brazo, y su porción esternocostal lo extiende desde una posición flexionada.",
        en: "Adducts and medially rotates the arm; its clavicular part flexes the arm, and its sternocostal part extends it from a flexed position.",
      },
      location: {
        es: "Región anterior del tórax.",
        en: "Anterior region of the chest.",
      },
    }
  ),
  bilateralGroup(
    [
      "Músculo pectoral menor",
    ],
    {
      id: "muscular.pectoralis-minor",
      name: "Músculo pectoral menor",
      type: "Músculo esquelético",
      description: "Músculo triangular situado profundo al pectoral mayor.",
      function: "Estabiliza la escápula tirando de ella hacia inferior y anterior contra la pared torácica.",
      location: "Pared anterior del tórax, profundo al pectoral mayor.",
    }
  ),
  bilateralGroup(
    [
      "Músculo recto del abdomen",
    ],
    {
      id: "muscular.rectus-abdominis",
      name: "Músculo recto del abdomen",
      type: "Músculo esquelético",
      description: "Músculo poligástrico longitudinal situado en la cara anterior de la pared abdominal.",
      function: "Flexiona el tronco, comprime el contenido abdominal y estabiliza la pelvis.",
      location: "Pared anteromedial del abdomen, dentro de la vaina de los rectos.",
    }
  ),
  bilateralGroup(
    [
      "Músculo oblicuo externo del abdomen",
    ],
    {
      id: "muscular.external-oblique",
      name: "Músculo oblicuo externo del abdomen",
      type: "Músculo esquelético",
      description: "El más superficial de los músculos planos de la pared anterolateral del abdomen.",
      function: "Comprime y sostiene las vísceras abdominales; flexiona y rota el tronco.",
      location: "Pared anterolateral del abdomen.",
    }
  ),
  bilateralGroup(
    [
      "Bolsa subtendinosa del músculo trapecio",
      "Porción ascendente del músculo trapecio",
      "Porción descendente del músculo trapecio",
      "Porción transversa del músculo trapecio",
    ],
    {
      id: "muscular.trapezius",
      name: "Músculo trapecio",
      type: "Músculo esquelético",
      description: "Músculo plano y triangular de gran tamaño que cubre la nuca y el dorso superior.",
      function: "Eleva, retrae y rota la escápula; las fibras inferiores la deprimen.",
      location: "Región posterior del cuello y tórax superior.",
    }
  ),
  bilateralGroup(
    [
      "Músculo serrato anterior",
    ],
    {
      id: "muscular.serratus-anterior",
      name: "Músculo serrato anterior",
      type: "Músculo esquelético",
      description: "Músculo ancho y digitado situado en la pared lateral del tórax.",
      function: "Protrae la escápula y la sujeta contra la pared torácica; rota la escápula hacia arriba.",
      location: "Pared lateral del tórax, profundo a la escápula y a los músculos pectorales.",
    }
  ),
  bilateralGroup(
    [
      "Músculo latísimo del dorso",
    ],
    {
      id: "muscular.latissimus-dorsi",
      name: "Músculo dorsal ancho",
      type: "Músculo esquelético",
      description: "Músculo extenso, plano y triangular que cubre gran parte de la espalda inferior.",
      function: "Extiende, aduce y rota medialmente el brazo en la articulación del hombro.",
      location: "Dorso del tronco, desde la región lumbar hasta el húmero.",
    }
  ),
];
