import type { AnatomySystemId } from "../config/anatomySystems";

export type StudyStep = {
  id: string;
  anatomyId: string;
  title: string;
  instruction: string;
  hint: string;
};

export type StudyGuide = {
  id: string;
  system: AnatomySystemId;
  title: string;
  description: string;
  steps: StudyStep[];
};

export const cardiovascularStudyGuide: StudyGuide = {
  id: "cardiovascular-basic-flow",

  system: "cardiovascular",

  title: "Recorrido básico de la sangre",

  description:
    "Estudia las principales estructuras del sistema cardiovascular siguiendo el recorrido general de la sangre a través del corazón y los grandes vasos.",

  steps: [
    {
      id: "cv-study-01",

      anatomyId:
        "cardiovascular.superior-vena-cava",

      title:
        "Vena cava superior",

      instruction:
        "Identifica la vena cava superior y observa cómo conduce sangre desde las regiones superiores del cuerpo hacia el corazón.",

      hint:
        "Busca un gran vaso venoso que llega a la aurícula derecha desde la parte superior.",
    },

    {
      id: "cv-study-02",

      anatomyId:
        "cardiovascular.inferior-vena-cava.thoracic",

      title:
        "Vena cava inferior",

      instruction:
        "Localiza la vena cava inferior y observa su llegada a la aurícula derecha desde la región inferior del cuerpo.",

      hint:
        "Es un gran vaso venoso que asciende hacia el corazón desde la parte inferior.",
    },

    {
      id: "cv-study-03",

      anatomyId:
        "cardiovascular.right-atrium",

      title:
        "Aurícula derecha",

      instruction:
        "Observa la aurícula derecha. Esta cavidad recibe gran parte de la sangre venosa que retorna al corazón.",

      hint:
        "Se encuentra en la región superior derecha del corazón.",
    },

    {
      id: "cv-study-04",

      anatomyId:
        "cardiovascular.right-ventricle",

      title:
        "Ventrículo derecho",

      instruction:
        "Identifica el ventrículo derecho y relaciónalo con la salida de sangre hacia la circulación pulmonar.",

      hint:
        "Forma buena parte de la superficie anterior del corazón.",
    },

    {
      id: "cv-study-05",

      anatomyId:
        "cardiovascular.pulmonary-trunk",

      title:
        "Tronco pulmonar",

      instruction:
        "Sigue el recorrido desde el ventrículo derecho hacia el tronco pulmonar.",

      hint:
        "Este gran vaso sale directamente del ventrículo derecho antes de dividirse.",
    },

    {
      id: "cv-study-06",

      anatomyId:
        "cardiovascular.pulmonary-artery.right",

      title:
        "Arteria pulmonar derecha",

      instruction:
        "Observa una de las ramas del tronco pulmonar y su dirección hacia el pulmón derecho.",

      hint:
        "Parte del tronco pulmonar y se dirige lateralmente hacia el lado derecho.",
    },

    {
      id: "cv-study-07",

      anatomyId:
        "cardiovascular.left-atrium",

      title:
        "Aurícula izquierda",

      instruction:
        "Identifica la aurícula izquierda, cavidad que recibe la sangre oxigenada procedente de los pulmones.",

      hint:
        "Está localizada principalmente en la región posterior y superior del corazón.",
    },

    {
      id: "cv-study-08",

      anatomyId:
        "cardiovascular.left-ventricle",

      title:
        "Ventrículo izquierdo",

      instruction:
        "Observa el ventrículo izquierdo y relaciónalo con la circulación sistémica.",

      hint:
        "Tiene una pared muscular gruesa y participa en la formación del ápice cardíaco.",
    },

    {
      id: "cv-study-09",

      anatomyId:
        "cardiovascular.ascending-aorta",

      title:
        "Aorta ascendente",

      instruction:
        "Localiza la primera porción de la aorta después de su salida del ventrículo izquierdo.",

      hint:
        "Busca el gran vaso arterial que asciende desde el corazón.",
    },

    {
      id: "cv-study-10",

      anatomyId:
        "cardiovascular.aortic-arch",

      title:
        "Arco aórtico",

      instruction:
        "Observa la curvatura de la aorta y su relación con los grandes vasos que llevan sangre hacia cabeza, cuello y miembros superiores.",

      hint:
        "Es la porción curva que continúa después de la aorta ascendente.",
    },
  ],
};

export const respiratoryStudyGuide: StudyGuide = {
  id: "respiratory-basic-airflow",
  system: "respiratory",
  title: "Recorrido básico del aire",
  description:
    "Sigue el recorrido del aire desde la cavidad nasal hasta los pulmones y reconoce la distribución principal del árbol bronquial.",
  steps: [
    {
      id: "resp-study-01",
      anatomyId: "respiratory.nasal-cavity-mucosa",
      title: "Mucosa de la cavidad nasal",
      instruction:
        "Inicia el recorrido en la cavidad nasal y observa la mucosa que acondiciona el aire inspirado antes de que avance hacia las vías respiratorias inferiores.",
      hint:
        "Busca la superficie interna de la nariz, por encima de la cavidad oral.",
    },
    {
      id: "resp-study-02",
      anatomyId: "respiratory.epiglottis",
      title: "Epiglotis",
      instruction:
        "Identifica la epiglotis y relaciónala con la protección de la vía aérea durante la deglución.",
      hint:
        "Se encuentra detrás de la lengua y por encima de la entrada de la laringe.",
    },
    {
      id: "resp-study-03",
      anatomyId: "respiratory.trachea",
      title: "Tráquea",
      instruction:
        "Sigue el paso del aire por la tráquea hasta el punto donde la vía respiratoria se divide hacia ambos pulmones.",
      hint:
        "Busca el conducto central con anillos cartilaginosos que desciende por el cuello y el tórax.",
    },
    {
      id: "resp-study-04",
      anatomyId: "respiratory.main-bronchus.right",
      title: "Bronquio principal derecho",
      instruction:
        "Observa cómo la bifurcación de la tráquea continúa hacia el pulmón derecho a través de su bronquio principal.",
      hint:
        "Desde la tráquea, sigue la rama que se dirige hacia el lado derecho del tórax.",
    },
    {
      id: "resp-study-05",
      anatomyId: "respiratory.upper-lobe.right",
      title: "Lóbulo superior derecho",
      instruction:
        "Localiza el lóbulo superior del pulmón derecho y reconoce su posición por encima de las cisuras pulmonares.",
      hint:
        "Es la porción más alta del pulmón derecho.",
    },
    {
      id: "resp-study-06",
      anatomyId: "respiratory.middle-lobe.right",
      title: "Lóbulo medio derecho",
      instruction:
        "Identifica el lóbulo medio, una división propia del pulmón derecho situada entre los lóbulos superior e inferior.",
      hint:
        "Busca la porción anterior y lateral comprendida entre las dos cisuras del pulmón derecho.",
    },
    {
      id: "resp-study-07",
      anatomyId: "respiratory.lower-lobe.right",
      title: "Lóbulo inferior derecho",
      instruction:
        "Observa el lóbulo inferior derecho y su amplia relación con la base pulmonar y el diafragma.",
      hint:
        "Se ubica principalmente en la región posterior e inferior del pulmón derecho.",
    },
    {
      id: "resp-study-08",
      anatomyId: "respiratory.main-bronchus.left",
      title: "Bronquio principal izquierdo",
      instruction:
        "Regresa a la bifurcación traqueal y sigue ahora el bronquio principal que conduce el aire hacia el pulmón izquierdo.",
      hint:
        "Desde la tráquea, sigue la rama que se dirige hacia el lado izquierdo del tórax.",
    },
    {
      id: "resp-study-09",
      anatomyId: "respiratory.upper-lobe.left",
      title: "Lóbulo superior izquierdo",
      instruction:
        "Identifica el lóbulo superior izquierdo y compáralo con la organización de tres lóbulos del pulmón derecho.",
      hint:
        "Es la porción superior del pulmón izquierdo, por encima de su cisura oblicua.",
    },
    {
      id: "resp-study-10",
      anatomyId: "respiratory.lower-lobe.left",
      title: "Lóbulo inferior izquierdo",
      instruction:
        "Finaliza el recorrido en el lóbulo inferior izquierdo y reconoce su relación con la base pulmonar.",
      hint:
        "Busca la región posterior e inferior del pulmón izquierdo, en contacto con el diafragma.",
    },
  ],
};

export const studyGuidesBySystem: Partial<
  Record<AnatomySystemId, StudyGuide>
> = {
  cardiovascular: cardiovascularStudyGuide,
  respiratory: respiratoryStudyGuide,
};
