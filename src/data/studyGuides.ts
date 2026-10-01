export type StudyStep = {
  id: string;
  structureId: string;
  title: string;
  instruction: string;
  hint: string;
};

export type StudyGuide = {
  id: string;
  system: string;
  title: string;
  description: string;
  steps: StudyStep[];
};

export const cardiovascularStudyGuide: StudyGuide = {
  id: "cardiovascular-basic-flow",

  system: "Cardiovascular",

  title: "Recorrido básico de la sangre",

  description:
    "Estudia las principales estructuras del sistema cardiovascular siguiendo el recorrido general de la sangre a través del corazón y los grandes vasos.",

  steps: [
    {
      id: "cv-study-01",

      structureId:
        "Superior_vena_cava",

      title:
        "Vena cava superior",

      instruction:
        "Identifica la vena cava superior y observa cómo conduce sangre desde las regiones superiores del cuerpo hacia el corazón.",

      hint:
        "Busca un gran vaso venoso que llega a la aurícula derecha desde la parte superior.",
    },

    {
      id: "cv-study-02",

      structureId:
        "Inferior_vena_cava_(thoracic_part)",

      title:
        "Vena cava inferior",

      instruction:
        "Localiza la vena cava inferior y observa su llegada a la aurícula derecha desde la región inferior del cuerpo.",

      hint:
        "Es un gran vaso venoso que asciende hacia el corazón desde la parte inferior.",
    },

    {
      id: "cv-study-03",

      structureId:
        "Right_atrium",

      title:
        "Aurícula derecha",

      instruction:
        "Observa la aurícula derecha. Esta cavidad recibe gran parte de la sangre venosa que retorna al corazón.",

      hint:
        "Se encuentra en la región superior derecha del corazón.",
    },

    {
      id: "cv-study-04",

      structureId:
        "Right_ventricle",

      title:
        "Ventrículo derecho",

      instruction:
        "Identifica el ventrículo derecho y relaciónalo con la salida de sangre hacia la circulación pulmonar.",

      hint:
        "Forma buena parte de la superficie anterior del corazón.",
    },

    {
      id: "cv-study-05",

      structureId:
        "Pulmonary_trunk",

      title:
        "Tronco pulmonar",

      instruction:
        "Sigue el recorrido desde el ventrículo derecho hacia el tronco pulmonar.",

      hint:
        "Este gran vaso sale directamente del ventrículo derecho antes de dividirse.",
    },

    {
      id: "cv-study-06",

      structureId:
        "Right_pulmonary_artery",

      title:
        "Arteria pulmonar derecha",

      instruction:
        "Observa una de las ramas del tronco pulmonar y su dirección hacia el pulmón derecho.",

      hint:
        "Parte del tronco pulmonar y se dirige lateralmente hacia el lado derecho.",
    },

    {
      id: "cv-study-07",

      structureId:
        "Left_atrium",

      title:
        "Aurícula izquierda",

      instruction:
        "Identifica la aurícula izquierda, cavidad que recibe la sangre oxigenada procedente de los pulmones.",

      hint:
        "Está localizada principalmente en la región posterior y superior del corazón.",
    },

    {
      id: "cv-study-08",

      structureId:
        "Left_ventricle",

      title:
        "Ventrículo izquierdo",

      instruction:
        "Observa el ventrículo izquierdo y relaciónalo con la circulación sistémica.",

      hint:
        "Tiene una pared muscular gruesa y participa en la formación del ápice cardíaco.",
    },

    {
      id: "cv-study-09",

      structureId:
        "Ascending_aorta",

      title:
        "Aorta ascendente",

      instruction:
        "Localiza la primera porción de la aorta después de su salida del ventrículo izquierdo.",

      hint:
        "Busca el gran vaso arterial que asciende desde el corazón.",
    },

    {
      id: "cv-study-10",

      structureId:
        "Aortic_arch",

      title:
        "Arco aórtico",

      instruction:
        "Observa la curvatura de la aorta y su relación con los grandes vasos que llevan sangre hacia cabeza, cuello y miembros superiores.",

      hint:
        "Es la porción curva que continúa después de la aorta ascendente.",
    },
  ],
};
