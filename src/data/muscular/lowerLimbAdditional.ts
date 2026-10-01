import type { EducationalStructureBinding } from "../educationalCollection";
import { bilateralGroup } from "./binding";

export const lowerLimbAdditionalEntries: readonly EducationalStructureBinding[] = [
  bilateralGroup(["Músculo glúteo mínimo"], {
    id: "muscular.gluteus-minimus", name: "Músculo glúteo mínimo", type: "Músculo esquelético",
    description: "Músculo profundo de la región glútea situado bajo el glúteo medio.",
    function: "Abduce y rota medialmente el muslo, estabilizando la pelvis durante la marcha.", location: "Región glútea profunda."
  }),
  bilateralGroup(["Aductor corto", "Aductor largo", "Aductor mayor", "(Aductor mínimo)"], {
    id: "muscular.adductors", name: "Músculos aductores del muslo", type: "Músculo esquelético",
    description: "Grupo medial del muslo formado por aductores de distinta profundidad y extensión.",
    function: "Aducen el muslo y contribuyen a su flexión o extensión según la porción.", location: "Compartimento medial del muslo."
  }),
  bilateralGroup(["Músculo grácil"], {
    id: "muscular.gracilis", name: "Músculo grácil", type: "Músculo esquelético",
    description: "Músculo largo y superficial del compartimento medial del muslo.",
    function: "Aduce el muslo y ayuda a flexionar y rotar medialmente la pierna.", location: "Compartimento medial del muslo."
  }),
  bilateralGroup(["Músculo semimembranoso"], {
    id: "muscular.semimembranosus", name: "Músculo semimembranoso", type: "Músculo esquelético",
    description: "Músculo medial profundo del grupo isquiotibial.",
    function: "Extiende el muslo y flexiona la rodilla; rota medialmente la pierna con la rodilla flexionada.", location: "Compartimento posterior del muslo."
  }),
  bilateralGroup(["Músculo fibular largo", "Músculo fibular corto", "Músculo fibular tercero"], {
    id: "muscular.fibular-group", name: "Músculos fibulares", type: "Músculo esquelético",
    description: "Grupo lateral de la pierna formado por los músculos fibulares largo, corto y tercero.",
    function: "Eversión del pie y contribución a la flexión plantar y a la estabilidad de los arcos.", location: "Compartimento lateral de la pierna."
  }),
  bilateralGroup(["Músculo tibial posterior"], {
    id: "muscular.tibialis-posterior", name: "Músculo tibial posterior", type: "Músculo esquelético",
    description: "Músculo profundo posterior de la pierna con tendón que pasa detrás del tobillo medial.",
    function: "Realiza flexión plantar e inversión y sostiene el arco medial del pie.", location: "Compartimento posterior profundo de la pierna."
  }),
  bilateralGroup(["Músculo piriforme", "Obturador interno", "Músculo cuadrado femoral"], {
    id: "muscular.deep-lateral-rotators", name: "Rotadores laterales profundos de la cadera", type: "Músculo esquelético",
    description: "Grupo profundo de músculos que rodea la articulación coxofemoral.",
    function: "Rotan lateralmente el muslo y estabilizan la cabeza femoral en el acetábulo.", location: "Región glútea profunda."
  }),
  bilateralGroup(["Músculos lumbricales del pie", "Músculos interóseos dorsales del pie", "Músculos interóseos plantares", "Flexor corto de los dedos"], {
    id: "muscular.foot-intrinsics", name: "Músculos intrínsecos del pie", type: "Músculo esquelético",
    description: "Músculos cortos que ocupan la planta y los espacios interóseos del pie.",
    function: "Mueven los dedos y ayudan a sostener y adaptar los arcos plantares durante la marcha.", location: "Planta y dorso profundo del pie."
  })
];
