import type { EducationalStructureBinding } from "../educationalCollection";
import { bilateralGroup, grouped } from "./binding";

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
  }),

  // Prevertebrales y rectos del cuello/cabeza
  bilateralGroup(["Músculo largo de la cabeza", "Músculo largo del cuello", "Músculo recto anterior de la cabeza", "Músculo recto lateral de la cabeza"], {
    id: "muscular.prevertebral-group", name: "Músculos prevertebrales y rectos", type: "Músculo esquelético",
    description: "Músculos profundos anteriores del cuello y base del cráneo.",
    function: "Flexionan la cabeza y el cuello; los rectos también estabilizan la articulación atlantooccipital.",
    location: "Región prevertebral profunda del cuello."
  }),

  // Constrictores faríngeos
  bilateralGroup(["Constrictor superior de la faringe", "Constrictor medio de la faringe", "Constrictor inferior de la faringe"], {
    id: "muscular.pharyngeal-constrictors", name: "Constrictores faríngeos", type: "Músculo esquelético",
    description: "Tres músculos superpuestos que forman la pared posterior y lateral de la faringe.",
    function: "Constriñen la faringe de superior a inferior para impulsar el bolo alimenticio hacia el esófago.",
    location: "Pared faríngea posterior y lateral."
  }),

  // Estilofaríngeo
  bilateralGroup(["Músculo estilofaríngeo"], {
    id: "muscular.stylopharyngeus", name: "Músculo estilofaríngeo", type: "Músculo esquelético",
    description: "Músculo largo y delgado que discurre entre el proceso estiloides y la faringe.",
    function: "Eleva la faringe y la laringe; dilata la faringe durante la deglución.",
    location: "Región faríngea lateral."
  }),

  // Esternotiroideo
  bilateralGroup(["Músculo esternotiroideo"], {
    id: "muscular.sternothyroid", name: "Músculo esternotiroideo", type: "Músculo esquelético",
    description: "Músculo infrahioideo ancho y plano que conecta el esternón con el cartílago tiroides.",
    function: "Deprime la laringe tras su elevación durante la deglución.",
    location: "Región anterior del cuello, profundo al esternohioideo."
  }),

  // Músculos laríngeos intrínsecos principales
  grouped(
    [
      "Músculo cricoaritenoideo lateral.l",
      "Músculo cricoaritenoideo lateral.r",
      "Músculo cricoaritenoideo posterior.l",
      "Músculo cricoaritenoideo posterior.r",
      "Músculo aritenoideo transverso",
    ],
    {
      id: "muscular.laryngeal-abductors-adductors",
      name: "Músculos laríngeos abductores y aductores",
      type: "Músculo esquelético",
      description: "Músculos que controlan la apertura y cierre de la glotis mediante el movimiento de los aritenoides.",
      function: "Cricoaritenoideo posterior: único abductor de las cuerdas vocales. Cricoaritenoideo lateral y transverso: aducen las cuerdas vocales.",
      location: "Cavidad laríngea, entre cartílago cricoides y aritenoides.",
    }
  ),

  // Suprahioideos adicionales
  bilateralGroup(["Músculo estilohioideo", "Músculo geniohioideo"], {
    id: "muscular.suprahyoid-additional", name: "Músculos suprahiodeos accesorios", type: "Músculo esquelético",
    description: "Músculos que elevan el hioides y participan en la deglución y apertura mandibular.",
    function: "Estilohioideo: eleva y retrae el hioides. Geniohioideo: eleva el hioides o deprime la mandíbula.",
    location: "Región suprahiodea del cuello y suelo de la boca."
  }),

  // Lengua
  bilateralGroup(["Músculo geniogloso", "Músculo hiogloso"], {
    id: "muscular.tongue-muscles", name: "Músculos de la lengua", type: "Músculo esquelético",
    description: "Músculos extrínsecos que mueven la lengua; el geniogloso es el principal protrusor.",
    function: "Geniogloso: protruye la lengua. Hiogloso: retrae y deprime.",
    location: "Base y cuerpo de la lengua."
  }),

  // Palatofaríngeo
  bilateralGroup(["Músculo palatofaríngeo"], {
    id: "muscular.palatopharyngeus", name: "Músculo palatofaríngeo", type: "Músculo esquelético",
    description: "Músculo que forma el pilar posterior del velo palatino y discurre hacia la faringe.",
    function: "Eleva la faringe y cierra el istmo de las fauces durante la deglución.",
    location: "Pared lateral de la faringe, posterior al paladar blando."
  }),

  // Músculos oculares extrínsecos
  grouped(
    [
      "Elevador del párpado superior.l",
      "Elevador del párpado superior.r",
      "Músculo recto superior.l",
      "Músculo recto superior.r",
      "Músculo recto inferior.l",
      "Músculo recto inferior.r",
      "Músculo recto medial.l",
      "Músculo recto medial.r",
      "Músculo recto lateral.l",
      "Músculo recto lateral.r",
      "Músculo oblicuo superior del bulbo ocular.l",
      "Músculo oblicuo superior del bulbo ocular.r",
      "Músculo oblicuo inferior del bulbo ocular.l",
      "Músculo oblicuo inferior del bulbo ocular.r",
    ],
    {
      id: "muscular.extraocular-group",
      name: "Músculos extraoculares",
      type: "Músculo esquelético",
      description: "Siete músculos que controlan el movimiento del globo ocular y el párpado superior.",
      function: "Cuatro rectos: movimientos cardinales. Dos oblicuos: torsión y movimientos verticales en abducción. Elevador: levanta el párpado superior.",
      location: "Órbita ocular.",
    }
  ),

  // Músculos masticatorios
  grouped(
    [
      "Músculo pterigoideo medial.l",
      "Músculo pterigoideo medial.r",
      "Cabeza inferior del músculo pterigoideo lateral.l",
      "Cabeza inferior del músculo pterigoideo lateral.r",
      "Cabeza superior del músculo pterigoideo lateral.l",
      "Cabeza superior del músculo pterigoideo lateral.r",
    ],
    {
      id: "muscular.pterygoid-group",
      name: "Músculos pterigoideos",
      type: "Músculo esquelético",
      description: "Músculos profundos de la masticación situados en la fosa infratemporal.",
      function: "Pterigoideo medial: eleva y protruye mandíbula, rota contralateral. Pterigoideo lateral (dos cabezas): deprime y protruye, abre boca.",
      location: "Fosa infratemporal, medial a la rama mandibular.",
    }
  ),

  // Músculos faciales adicionales
  bilateralGroup(["Músculo frontal", "Músculo occipital", "Músculo temporoparietal"], {
    id: "muscular.epicranial-group", name: "Músculos epicraneales", type: "Músculo esquelético",
    description: "Músculos del cuero cabelludo (frontal, occipital) y región temporal conectados por la aponeurosis epicraneal.",
    function: "Frontal: eleva cejas y arruga frente. Occipital: retrae cuero cabelludo. Temporoparietal: tensa aponeurosis.",
    location: "Región craneal superficial."
  }),

  // Músculos de la expresión facial (depresores, elevadores, corrugador)
  grouped(
    [
      "Depresor del labio inferior.l",
      "Depresor del labio inferior.r",
      "Depresor del ángulo oral.l",
      "Depresor del ángulo oral.r",
      "Depresor del septo nasal.l",
      "Depresor del septo nasal.r",
      "Elevador del angulo de la boca.l",
      "Elevador del angulo de la boca.r",
      "Elevador del labio superior.l",
      "Elevador del labio superior.r",
      "Elevador nasolabial.l",
      "Elevador nasolabial.r",
      "Músculo corrugador del supercilio.l",
      "Músculo corrugador del supercilio.r",
    ],
    {
      id: "muscular.facial-expression-detailed",
      name: "Músculos de la expresión facial (detallados)",
      type: "Músculo esquelético",
      description: "Músculos periorales, nasales y frontales que configuran las expresiones faciales.",
      function: "Depresores: bajan labios/comisuras. Elevadores: suben labios/ala nasal. Corrugador: frunce ceño.",
      location: "Tejido subcutáneo facial.",
    }
  ),

  // Suboccipitales
  bilateralGroup(["Músculo oblicuo inferior de la cabeza", "Músculo oblicuo superior de la cabeza", "Músculo recto posterior mayor de la cabeza", "Músculo recto posterior menor de la cabeza"], {
    id: "muscular.suboccipital-group", name: "Músculos suboccipitales", type: "Músculo esquelético",
    description: "Cuatro músculos profundos entre el occipital, atlas y axis que controlan movimientos finos de la cabeza.",
    function: "Oblicuo inferior: rota la cabeza ipsilateral. Oblicuo superior: extiende y flexiona lateralmente. Recto posterior mayor: extiende y rota. Recto posterior menor: extiende.",
    location: "Región suboccipital, profundo al semiespinoso de la cabeza."
  }),

  // Esplenios
  bilateralGroup(["Músculo esplenio de la cabeza", "Músculo esplenio del cuello"], {
    id: "muscular.splenius-group", name: "Músculos esplenios", type: "Músculo esquelético",
    description: "Músculos anchos y planos que cubren la región posterior del cuello y se insertan en la base del cráneo y vértebras cervicales.",
    function: "Extienden la cabeza y el cuello; de forma unilateral rotan la cabeza hacia el mismo lado.",
    location: "Región posterior del cuello, profundo al trapecio y esternocleidomastoideo."
  }),

  // Interespinosos cervicales
  bilateralGroup(["Músculos interespinosos del cuello"], {
    id: "muscular.interspinales-cervicis", name: "Interespinosos cervicales", type: "Músculo esquelético",
    description: "Músculos cortos que unen apófisis espinosas adyacentes en la región cervical.",
    function: "Estabilizan la columna cervical y asisten en la extensión.",
    location: "Región cervical profunda, entre apófisis espinosas."
  })
];
