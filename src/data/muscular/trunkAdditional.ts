import type { EducationalStructureBinding } from "../educationalCollection";
import { bilateralGroup, grouped } from "./binding";

export const trunkAdditionalEntries: readonly EducationalStructureBinding[] = [
  bilateralGroup(["Músculo oblicuo interno del abdomen"], {
    id: "muscular.internal-oblique", name: "Músculo oblicuo interno del abdomen", type: "Músculo esquelético",
    description: "Músculo plano intermedio de la pared anterolateral abdominal.",
    function: "Comprime las vísceras, flexiona el tronco y rota el tronco hacia el mismo lado.", location: "Pared anterolateral del abdomen."
  }),
  bilateralGroup(["Músculo transverso del abdomen"], {
    id: "muscular.transversus-abdominis", name: "Músculo transverso del abdomen", type: "Músculo esquelético",
    description: "Capa muscular profunda de la pared anterolateral del abdomen.",
    function: "Comprime el contenido abdominal y contribuye a la estabilidad del tronco.", location: "Pared profunda del abdomen."
  }),
  bilateralGroup(["Músculos intercostales externos", "Músculos intercostales internos", "Músculos intercostales íntimos"], {
    id: "muscular.intercostals", name: "Músculos intercostales", type: "Músculo esquelético",
    description: "Tres capas musculares que ocupan los espacios entre las costillas.",
    function: "Estabilizan la pared torácica y participan en los movimientos respiratorios.", location: "Pared torácica entre las costillas."
  }),
  grouped(["Diafragma"], {
    id: "muscular.diaphragm", name: "Diafragma", type: "Músculo esquelético",
    description: "Lámina musculotendinosa que separa las cavidades torácica y abdominal.",
    function: "Es el principal músculo inspiratorio; su contracción aumenta el volumen torácico.", location: "Base de la cavidad torácica."
  }),
  bilateralGroup(["Músculo multifido del cuello", "Músculo multifido del tórax", "Músculo multifido lumbar"], {
    id: "muscular.multifidus", name: "Músculos multífidos", type: "Músculo esquelético",
    description: "Músculos profundos transversoespinosos que unen apófisis transversas y espinosas vertebrales.",
    function: "Estabilizan la columna y colaboran en su extensión y rotación contralateral.", location: "Región profunda posterior de la columna."
  }),

  // Cuadrado lumbar y piramidal
  bilateralGroup(["Músculo cuadrado lumbar"], {
    id: "muscular.quadratus-lumborum", name: "Músculo cuadrado lumbar", type: "Músculo esquelético",
    description: "Músculo cuadrangular profundo de la pared abdominal posterior.",
    function: "Flexiona lateralmente el tronco, fija la duodécima costilla y estabiliza la columna lumbar.", location: "Región lumbar posterior, entre la cresta ilíaca y la duodécima costilla."
  }),
  bilateralGroup(["Músculo piramidal"], {
    id: "muscular.pyramidalis", name: "Músculo piramidal", type: "Músculo esquelético",
    description: "Músculo triangular pequeño situado en la parte inferior del recto del abdomen.",
    function: "Tensa la línea alba.", location: "Porción inferior de la vaina de los rectos, anterior al recto del abdomen."
  }),

  // Erectores de la columna - Espinales
  bilateralGroup(["Músculo espinal de la cabeza", "Músculo espinal del cuello", "Músculo espinal del tórax"], {
    id: "muscular.spinalis-group", name: "Músculos espinales", type: "Músculo esquelético",
    description: "Porción medial de los erectores de la columna, unen apófisis espinosas.",
    function: "Extienden la columna vertebral y la cabeza.", location: "Región medial profunda del dorso."
  }),

  // Erectores de la columna - Longísimos
  bilateralGroup(["Músculo longísimo de la cabeza", "Músculo longísmo del cuello", "Músculo longísimo del tórax"], {
    id: "muscular.longissimus-group", name: "Músculos longísimos", type: "Músculo esquelético",
    description: "Porción intermedia de los erectores de la columna, la más larga.",
    function: "Extienden la columna y la cabeza; de forma unilateral flexionan lateralmente.", location: "Región intermedia profunda del dorso, lateral a los espinales."
  }),

  // Erectores de la columna - Iliocostales
  grouped(
    [
      "Músculo iliocostal del cuello",
      "Músculo iliocostal del cuello.r",
      "Músculo iliocostal del tórax.l",
      "Músculo iliocostal del tórax.r",
      "Músculo iliocostal lumbar.l",
      "Músculo iliocostal lumbar.r",
    ],
    {
      id: "muscular.iliocostalis-group",
      name: "Músculos iliocostales",
      type: "Músculo esquelético",
      description: "Porción lateral de los erectores de la columna, se originan en la cresta ilíaca y costillas.",
      function: "Extienden la columna, flexionan lateralmente y rotan el tronco.",
      location: "Región lateral profunda del dorso, sobre las costillas y apófisis transversas.",
    }
  ),

  // Semiespinosos
  bilateralGroup(["Músculo semiespinoso del cuello", "Músculo semiespinoso del tórax"], {
    id: "muscular.semispinalis-group", name: "Músculos semiespinosos", type: "Músculo esquelético",
    description: "Músculos transversoespinosos profundos que cruzan varias vértebras.",
    function: "Extienden y rotan la columna en sentido contralateral.", location: "Región profunda posterior del cuello y tórax."
  }),

  // Rotadores
  bilateralGroup(["Rotadores"], {
    id: "muscular.rotatores", name: "Músculos rotadores", type: "Músculo esquelético",
    description: "Músculos transversoespinosos más profundos y cortos.",
    function: "Rotan la columna contralateral y estabilizan segmentos vertebrales.", location: "Región más profunda de la musculatura transvertoespinosa."
  }),

  // Elevador de la escápula
  bilateralGroup(["Elevador de la escápula"], {
    id: "muscular.levator-scapulae", name: "Elevador de la escápula", type: "Músculo esquelético",
    description: "Músculo que une las vértebras cervicales superiores con el ángulo superior de la escápula.",
    function: "Eleva y rota medialmente la escápula.", location: "Región posterolateral del cuello, profundo al trapecio y esternocleidomastoideo."
  }),

  // Romboides
  bilateralGroup(["Músculo romboides mayor", "Músculo romboides menor"], {
    id: "muscular.rhomboids", name: "Músculos romboides", type: "Músculo esquelético",
    description: "Músculos que unen las vértebras torácicas superiores con el borde medial de la escápula.",
    function: "Retraen y rota medialmente la escápula; la elevan ligeramente.", location: "Región interescapular, profundo al trapecio."
  }),

  // Serratos posteriores
  bilateralGroup(["Músculo serrato posterior superior", "Músculo serrato posterior inferior"], {
    id: "muscular.serratus-posterior", name: "Músculos serratos posteriores", type: "Músculo esquelético",
    description: "Músculos delgados que unen vértebras con costillas, situados profundo a los romboides y latísimo.",
    function: "Serrato posterior superior: eleva costillas (inspiración). Serrato posterior inferior: deprime costillas (espiración forzada).", location: "Región torácica posterior profunda."
  }),

  // Suelo pélvico
  bilateralGroup(["Músculo iliococcígeo", "Músculo puboanal", "Músculo pubococcígeo"], {
    id: "muscular.levator-ani", name: "Músculo elevador del ano", type: "Músculo esquelético",
    description: "Conjunto de músculos (iliococcígeo, puboanal, pubococcígeo) que forman el diafragma pélvico.",
    function: "Sostiene las vísceras pélvicas, mantiene continencia fecal y urinaria, interviene en la defecación y micción.", location: "Cavidad pélvica, formando el diafragma pélvico."
  }),
  bilateralGroup(["Músculo coccígeo"], {
    id: "muscular.coccygeus", name: "Músculo coccígeo", type: "Músculo esquelético",
    description: "Músculo triangular posterior al elevador del ano, parte del diafragma pélvico.",
    function: "Tira del cóccix hacia anterior y sostiene el suelo pélvico.", location: "Región pélvica posterior, desde la espina isquiática al cóccix y sacro."
  }),
  bilateralGroup(["Esfínter anal externo"], {
    id: "muscular.external-anal-sphincter", name: "Esfínter anal externo", type: "Músculo esquelético",
    description: "Músculo estriado voluntario que rodea el canal anal distal.",
    function: "Mantiene la continencia fecal voluntaria.", location: "Región perineal, rodeando el canal anal."
  }),

  // Elevadores de costillas
  bilateralGroup(["Elevadores cortos de las costillas", "Elevadores largos de las costillas"], {
    id: "muscular.levatores-costarum", name: "Elevadores de las costillas", type: "Músculo esquelético",
    description: "Músculos pequeños que unen vértebras torácicas con las costillas inmediatas superiores.",
    function: "Elevan las costillas durante la inspiración profunda.", location: "Región torácica posterior profunda."
  }),

  // Subclavio y transverso del tórax
  bilateralGroup(["Músculo subclavio"], {
    id: "muscular.subclavius", name: "Músculo subclavio", type: "Músculo esquelético",
    description: "Músculo cilíndrico pequeño situado bajo la clavícula.",
    function: "Deprime la clavícula y tensa la fascia clavipectoral.", location: "Surco subclavicular, bajo la clavícula."
  }),
  bilateralGroup(["Músculo transverso del tórax"], {
    id: "muscular.transversus-thoracis", name: "Músculo transverso del tórax", type: "Músculo esquelético",
    description: "Músculo delgado en la cara interna de la pared torácica anterior.",
    function: "Deprime las costillas (espiración forzada).", location: "Cara interna del esternón y costillas adyacentes."
  }),

  // Interespinosos torácicos
  bilateralGroup(["Músculos interespinosos del tórax"], {
    id: "muscular.interspinales-thoracis", name: "Interespinosos torácicos", type: "Músculo esquelético",
    description: "Músculos cortos que unen apófisis espinosas adyacentes en la región torácica.",
    function: "Estabilizan la columna torácica y asisten en la extensión.",
    location: "Región torácica profunda, entre apófisis espinosas."
  }),

  // Interespinosos lumbares
  bilateralGroup(["Músculos interespinosos lumbares"], {
    id: "muscular.interspinales-lumborum", name: "Interespinosos lumbares", type: "Músculo esquelético",
    description: "Músculos cortos que unen apófisis espinosas adyacentes en la región lumbar.",
    function: "Estabilizan la columna lumbar y asisten en la extensión.",
    location: "Región lumbar profunda, entre apófisis espinosas."
  })
];