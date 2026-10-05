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

export const nervousStudyGuide: StudyGuide = {
  id: "nervous-system-overview",
  system: "nervous",
  title: "Panorama del sistema nervioso",
  description:
    "Reconoce estructuras de los sentidos, centros de integración y vías que comunican el encéfalo con la periferia.",
  steps: [
    {
      id: "nerv-study-01",
      anatomyId: "nervous.retina.left",
      title: "Retina izquierda",
      instruction:
        "Comienza en la retina, donde la luz se transforma en señales nerviosas que pueden ser procesadas por el encéfalo.",
      hint:
        "Busca la capa interna situada en la región posterior del globo ocular izquierdo.",
    },
    {
      id: "nerv-study-02",
      anatomyId: "nervous.optic-nerve.left",
      title: "Nervio óptico izquierdo",
      instruction:
        "Sigue las señales visuales desde la retina por el nervio óptico en dirección a la base del encéfalo.",
      hint:
        "Es el cordón nervioso que emerge de la parte posterior del ojo izquierdo.",
    },
    {
      id: "nerv-study-03",
      anatomyId: "nervous.thalamus.left",
      title: "Tálamo izquierdo",
      instruction:
        "Identifica el tálamo como un centro profundo que integra y retransmite gran parte de la información sensitiva hacia la corteza.",
      hint:
        "Se encuentra profundo en el encéfalo, a un lado del tercer ventrículo.",
    },
    {
      id: "nerv-study-04",
      anatomyId: "nervous.postcentral-gyrus.left",
      title: "Giro poscentral izquierdo",
      instruction:
        "Observa el giro poscentral y relaciónalo con la recepción cortical de información somatosensitiva.",
      hint:
        "Está inmediatamente detrás del surco central, en el lóbulo parietal.",
    },
    {
      id: "nerv-study-05",
      anatomyId: "nervous.precentral-gyrus.left",
      title: "Giro precentral izquierdo",
      instruction:
        "Localiza el giro precentral, una referencia esencial para comprender el control cortical del movimiento voluntario.",
      hint:
        "Está inmediatamente delante del surco central, en el lóbulo frontal.",
    },
    {
      id: "nerv-study-06",
      anatomyId: "nervous.midbrain.left",
      title: "Mesencéfalo izquierdo",
      instruction:
        "Desciende al mesencéfalo y reconoce la porción superior del tronco encefálico, atravesada por numerosas vías nerviosas.",
      hint:
        "Se ubica entre el diencéfalo y el puente.",
    },
    {
      id: "nerv-study-07",
      anatomyId: "nervous.pons.left",
      title: "Puente troncoencefálico izquierdo",
      instruction:
        "Identifica el puente y observa su posición como conexión entre el mesencéfalo, el bulbo y el cerebelo.",
      hint:
        "Busca la prominencia anterior del tronco encefálico situada delante del cerebelo.",
    },
    {
      id: "nerv-study-08",
      anatomyId: "nervous.medulla-oblongata.left",
      title: "Bulbo raquídeo izquierdo",
      instruction:
        "Continúa hacia el bulbo raquídeo, donde el tronco encefálico se hace continuo con la médula espinal.",
      hint:
        "Es la porción inferior del tronco encefálico, justo debajo del puente.",
    },
    {
      id: "nerv-study-09",
      anatomyId: "nervous.spinal-white-matter",
      title: "Sustancia blanca de la médula espinal",
      instruction:
        "Observa la sustancia blanca medular y relaciónala con las vías ascendentes sensitivas y descendentes motoras.",
      hint:
        "En un corte de la médula, rodea externamente a la sustancia gris.",
    },
    {
      id: "nerv-study-10",
      anatomyId: "nervous.sciatic-nerve.left",
      title: "Nervio ciático izquierdo",
      instruction:
        "Finaliza en un gran nervio periférico y reconoce cómo las fibras nerviosas se distribuyen desde el eje central hacia el miembro inferior.",
      hint:
        "Busca un nervio grueso que desciende desde la región glútea por la cara posterior del muslo izquierdo.",
    },
  ],
};

export const studyGuidesBySystem: Partial<
  Record<AnatomySystemId, StudyGuide>
> = {
  cardiovascular: cardiovascularStudyGuide,
  respiratory: respiratoryStudyGuide,
  nervous: nervousStudyGuide,
};
