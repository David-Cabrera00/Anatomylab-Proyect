export type CardiovascularStructure = {
  id: string;

  name: string;

  type:
    | "Corazón"
    | "Arteria"
    | "Vena"
    | "Gran vaso";

  description: string;

  function: string;

  location: string;

  relationships: string[];
};

export const cardiovascularData: Record<
  string,
  CardiovascularStructure
> = {
  /* =========================
     CORAZÓN
  ========================= */

  Right_atrium: {
    id: "Right_atrium",

    name: "Aurícula derecha",

    type: "Corazón",

    description:
      "Cavidad superior derecha del corazón que recibe la sangre venosa procedente de la circulación sistémica.",

    function:
      "Recibe sangre desoxigenada y la dirige hacia el ventrículo derecho a través de la válvula tricúspide.",

    location:
      "Se encuentra en la región superior derecha del corazón.",

    relationships: [
      "Vena cava superior",
      "Vena cava inferior",
      "Seno coronario",
      "Ventrículo derecho",
    ],
  },

  Left_atrium: {
    id: "Left_atrium",

    name: "Aurícula izquierda",

    type: "Corazón",

    description:
      "Cavidad superior izquierda del corazón que recibe sangre oxigenada procedente de los pulmones.",

    function:
      "Recibe sangre proveniente de las venas pulmonares y la dirige hacia el ventrículo izquierdo.",

    location:
      "Se encuentra principalmente en la región posterior y superior del corazón.",

    relationships: [
      "Venas pulmonares",
      "Ventrículo izquierdo",
      "Válvula mitral",
    ],
  },

  Right_ventricle: {
    id: "Right_ventricle",

    name: "Ventrículo derecho",

    type: "Corazón",

    description:
      "Cavidad inferior derecha del corazón encargada de impulsar la sangre hacia la circulación pulmonar.",

    function:
      "Bombea sangre desoxigenada hacia el tronco pulmonar y posteriormente hacia los pulmones.",

    location:
      "Ocupa gran parte de la superficie anterior del corazón.",

    relationships: [
      "Aurícula derecha",
      "Válvula tricúspide",
      "Tronco pulmonar",
      "Válvula pulmonar",
    ],
  },

  Left_ventricle: {
    id: "Left_ventricle",

    name: "Ventrículo izquierdo",

    type: "Corazón",

    description:
      "Cavidad inferior izquierda del corazón con una pared muscular gruesa, preparada para generar alta presión.",

    function:
      "Bombea sangre oxigenada hacia la aorta para distribuirla por la circulación sistémica.",

    location:
      "Forma gran parte del lado izquierdo y del ápice del corazón.",

    relationships: [
      "Aurícula izquierda",
      "Válvula mitral",
      "Aorta",
      "Tabique interventricular",
    ],
  },

  /* =========================
     AORTA
  ========================= */

  Ascending_aorta: {
    id: "Ascending_aorta",

    name: "Aorta ascendente",

    type: "Arteria",

    description:
      "Primera porción de la aorta después de su salida del ventrículo izquierdo.",

    function:
      "Transporta sangre oxigenada desde el corazón hacia la circulación sistémica.",

    location:
      "Se origina en el ventrículo izquierdo y asciende dentro del tórax antes de continuar como arco aórtico.",

    relationships: [
      "Ventrículo izquierdo",
      "Válvula aórtica",
      "Arco aórtico",
      "Arterias coronarias",
    ],
  },

  Aortic_arch: {
    id: "Aortic_arch",

    name: "Arco aórtico",

    type: "Arteria",

    description:
      "Porción curva de la aorta situada entre la aorta ascendente y la aorta descendente.",

    function:
      "Distribuye sangre hacia estructuras de la cabeza, cuello y miembros superiores mediante sus principales ramas.",

    location:
      "Se encuentra en la parte superior del tórax.",

    relationships: [
      "Aorta ascendente",
      "Aorta descendente",
      "Tronco braquiocefálico",
      "Arteria carótida común izquierda",
      "Arteria subclavia izquierda",
    ],
  },

  Thoracic_aorta: {
    id: "Thoracic_aorta",

    name: "Aorta descendente",

    type: "Arteria",

    description:
      "Continuación de la aorta después del arco aórtico.",

    function:
      "Distribuye sangre oxigenada hacia el tórax, abdomen y regiones inferiores del cuerpo.",

    location:
      "Desciende desde el tórax hacia el abdomen.",

    relationships: [
      "Arco aórtico",
      "Aorta torácica",
      "Aorta abdominal",
    ],
  },

  /* =========================
     CIRCULACIÓN PULMONAR
  ========================= */

  Pulmonary_trunk: {
    id: "Pulmonary_trunk",

    name: "Tronco pulmonar",

    type: "Gran vaso",

    description:
      "Gran vaso que sale del ventrículo derecho y se divide en las arterias pulmonares derecha e izquierda.",

    function:
      "Transporta sangre desoxigenada desde el corazón hacia los pulmones.",

    location:
      "Se origina en el ventrículo derecho y asciende antes de dividirse en las arterias pulmonares.",

    relationships: [
      "Ventrículo derecho",
      "Válvula pulmonar",
      "Arteria pulmonar derecha",
      "Arteria pulmonar izquierda",
    ],
  },

  Right_pulmonary_artery: {
    id: "Right_pulmonary_artery",

    name: "Arteria pulmonar derecha",

    type: "Arteria",

    description:
      "Rama derecha del tronco pulmonar encargada de llevar sangre hacia el pulmón derecho.",

    function:
      "Transporta sangre desoxigenada desde el corazón hacia el pulmón derecho para realizar el intercambio gaseoso.",

    location:
      "Se dirige desde el tronco pulmonar hacia el hilio del pulmón derecho.",

    relationships: [
      "Tronco pulmonar",
      "Pulmón derecho",
      "Vasos pulmonares",
    ],
  },

  Left_pulmonary_artery: {
    id: "Left_pulmonary_artery",

    name: "Arteria pulmonar izquierda",

    type: "Arteria",

    description:
      "Rama izquierda del tronco pulmonar encargada de llevar sangre hacia el pulmón izquierdo.",

    function:
      "Transporta sangre desoxigenada hacia el pulmón izquierdo para permitir el intercambio gaseoso.",

    location:
      "Se dirige desde el tronco pulmonar hacia el hilio pulmonar izquierdo.",

    relationships: [
      "Tronco pulmonar",
      "Pulmón izquierdo",
      "Vasos pulmonares",
    ],
  },

  Right_superior_pulmonary_vein: {
    id: "Right_superior_pulmonary_vein",

    name: "Vena pulmonar superior derecha",

    type: "Vena",

    description:
      "Vena pulmonar que retorna sangre oxigenada desde regiones superiores del pulmón derecho.",

    function:
      "Transporta sangre oxigenada desde el pulmón derecho hacia la aurícula izquierda.",

    location:
      "Se extiende desde el pulmón derecho hasta la aurícula izquierda.",

    relationships: [
      "Pulmón derecho",
      "Aurícula izquierda",
      "Venas pulmonares",
    ],
  },

  Right_inferior_pulmonary_vein: {
    id: "Right_inferior_pulmonary_vein",

    name: "Vena pulmonar inferior derecha",

    type: "Vena",

    description:
      "Vena pulmonar que retorna sangre oxigenada desde regiones inferiores del pulmón derecho.",

    function:
      "Transporta sangre oxigenada hacia la aurícula izquierda.",

    location:
      "Comunica el pulmón derecho con la aurícula izquierda.",

    relationships: [
      "Pulmón derecho",
      "Aurícula izquierda",
    ],
  },

  Left_superior_pulmonary_vein: {
    id: "Left_superior_pulmonary_vein",

    name: "Vena pulmonar superior izquierda",

    type: "Vena",

    description:
      "Vena pulmonar que retorna sangre oxigenada desde regiones superiores del pulmón izquierdo.",

    function:
      "Transporta sangre oxigenada hacia la aurícula izquierda.",

    location:
      "Comunica el pulmón izquierdo con la aurícula izquierda.",

    relationships: [
      "Pulmón izquierdo",
      "Aurícula izquierda",
    ],
  },

  Left_inferior_pulmonary_vein: {
    id: "Left_inferior_pulmonary_vein",

    name: "Vena pulmonar inferior izquierda",

    type: "Vena",

    description:
      "Vena pulmonar que retorna sangre oxigenada desde regiones inferiores del pulmón izquierdo.",

    function:
      "Transporta sangre oxigenada desde el pulmón izquierdo hacia el corazón.",

    location:
      "Se extiende desde el pulmón izquierdo hasta la aurícula izquierda.",

    relationships: [
      "Pulmón izquierdo",
      "Aurícula izquierda",
    ],
  },

  /* =========================
     VENAS CAVAS
  ========================= */

  Superior_vena_cava: {
    id: "Superior_vena_cava",

    name: "Vena cava superior",

    type: "Vena",

    description:
      "Gran vena encargada del retorno venoso de las regiones superiores del cuerpo.",

    function:
      "Transporta sangre desoxigenada desde la cabeza, cuello, tórax y miembros superiores hacia la aurícula derecha.",

    location:
      "Desciende por el tórax y desemboca en la aurícula derecha.",

    relationships: [
      "Aurícula derecha",
      "Venas braquiocefálicas",
    ],
  },

  "Inferior_vena_cava_(thoracic_part)": {
    id: "Inferior_vena_cava_(thoracic_part)",

    name: "Vena cava inferior",

    type: "Vena",

    description:
      "Gran vena encargada del retorno venoso desde las regiones inferiores del cuerpo.",

    function:
      "Transporta sangre desoxigenada desde abdomen, pelvis y miembros inferiores hacia la aurícula derecha.",

    location:
      "Asciende por el abdomen, atraviesa el diafragma y desemboca en la aurícula derecha.",

    relationships: [
      "Aurícula derecha",
      "Venas ilíacas comunes",
      "Venas renales",
      "Venas hepáticas",
    ],
  },

  /* =========================
     GRANDES RAMAS
  ========================= */

  Brachiocephalic_trunk: {
    id: "Brachiocephalic_trunk",

    name: "Tronco braquiocefálico",

    type: "Arteria",

    description:
      "Primera gran rama del arco aórtico.",

    function:
      "Conduce sangre hacia el lado derecho de la cabeza y cuello y hacia el miembro superior derecho.",

    location:
      "Se origina en el arco aórtico dentro del tórax superior.",

    relationships: [
      "Arco aórtico",
      "Arteria carótida común derecha",
      "Arteria subclavia derecha",
    ],
  },

  Coeliac_trunk: {
    id: "Coeliac_trunk",

    name: "Tronco celíaco",

    type: "Arteria",

    description:
      "Rama arterial principal de la aorta abdominal que irriga órganos del abdomen superior.",

    function:
      "Distribuye sangre principalmente hacia estómago, hígado, bazo y otras estructuras relacionadas.",

    location:
      "Se origina en la porción superior de la aorta abdominal.",

    relationships: [
      "Aorta abdominal",
      "Arteria gástrica izquierda",
      "Arteria hepática común",
      "Arteria esplénica",
    ],
  },
};

/* =========================
   CONSULTA DE DATOS
========================= */

export function getCardiovascularStructure(
  id: string
) {
  return cardiovascularData[id] ?? null;
}
