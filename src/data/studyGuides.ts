import type { AnatomySystemId } from "../config/anatomySystems";
import type { LocalizableText } from "../i18n/localizedText";
import { getLocalizedText } from "../i18n/localizedText";
import { studyGuideEnglish, studyStepEnglish } from "./studyGuidesLocalizedText";

export type StudyStep = {
  id: string;
  anatomyId: string;
  title: LocalizableText;
  instruction: LocalizableText;
  hint: LocalizableText;
};

export type StudyGuide = {
  id: string;
  system: AnatomySystemId;
  title: LocalizableText;
  description: LocalizableText;
  steps: StudyStep[];
};

const cardiovascularStudyGuideRaw: StudyGuide = {
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

const respiratoryStudyGuideRaw: StudyGuide = {
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

const nervousStudyGuideRaw: StudyGuide = {
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

const skeletalStudyGuideRaw: StudyGuide = {
  id: "skeletal-axis-to-limbs",
  system: "skeletal",
  title: "Del eje a las extremidades",
  description:
    "Distingue el esqueleto axial del apendicular siguiendo estructuras clave desde el cráneo hasta el miembro inferior.",
  steps: [
    {
      id: "skel-study-01",
      anatomyId: "skeletal.frontal-bone",
      title: "Hueso frontal",
      instruction:
        "Comienza en el hueso frontal y observa cómo forma la frente y parte de la protección anterior del encéfalo.",
      hint:
        "Busca el hueso amplio situado en la región anterior del cráneo, por encima de las órbitas.",
    },
    {
      id: "skel-study-02",
      anatomyId: "skeletal.atlas",
      title: "Atlas (C1)",
      instruction:
        "Identifica el atlas, la primera vértebra cervical, y relaciónalo con el soporte y los movimientos de la cabeza.",
      hint:
        "Se encuentra inmediatamente debajo del cráneo y por encima del axis.",
    },
    {
      id: "skel-study-03",
      anatomyId: "skeletal.thoracic-vertebrae.vertebra-t1",
      title: "Primera vértebra torácica",
      instruction:
        "Localiza T1 como transición entre las regiones cervical y torácica de la columna vertebral.",
      hint:
        "Busca la primera vértebra que se articula con una costilla, debajo de C7.",
    },
    {
      id: "skel-study-04",
      anatomyId: "skeletal.sacrum",
      title: "Hueso sacro",
      instruction:
        "Observa el sacro y reconoce su papel en la transmisión del peso de la columna hacia la pelvis.",
      hint:
        "Es el hueso triangular de la línea media situado entre ambos huesos coxales.",
    },
    {
      id: "skel-study-05",
      anatomyId: "skeletal.clavicle.left",
      title: "Clavícula izquierda",
      instruction:
        "Inicia el recorrido apendicular en la clavícula, que mantiene el hombro separado del tórax y transmite fuerzas al esqueleto axial.",
      hint:
        "Busca el hueso curvo y horizontal ubicado en la base anterior del cuello izquierdo.",
    },
    {
      id: "skel-study-06",
      anatomyId: "skeletal.scapula.left",
      title: "Escápula izquierda",
      instruction:
        "Identifica la escápula y observa su relación con la clavícula, el tórax y la articulación del hombro.",
      hint:
        "Es el hueso plano y triangular de la región posterior del hombro izquierdo.",
    },
    {
      id: "skel-study-07",
      anatomyId: "skeletal.humerus.left",
      title: "Húmero izquierdo",
      instruction:
        "Sigue la extremidad superior hasta el húmero y relaciónalo con las articulaciones del hombro y del codo.",
      hint:
        "Es el único hueso largo del brazo, entre la escápula y el antebrazo.",
    },
    {
      id: "skel-study-08",
      anatomyId: "skeletal.hip-bone.left",
      title: "Hueso coxal izquierdo",
      instruction:
        "Localiza el hueso coxal y reconoce la cintura pélvica como unión entre el esqueleto axial y el miembro inferior.",
      hint:
        "Busca el gran hueso lateral de la pelvis que se articula con el sacro y el fémur.",
    },
    {
      id: "skel-study-09",
      anatomyId: "skeletal.femur.left",
      title: "Fémur izquierdo",
      instruction:
        "Observa el fémur, principal hueso del muslo, y su función en la transmisión de carga entre la cadera y la rodilla.",
      hint:
        "Es el hueso más largo del cuerpo y ocupa todo el muslo izquierdo.",
    },
    {
      id: "skel-study-10",
      anatomyId: "skeletal.tibia.left",
      title: "Tibia izquierda",
      instruction:
        "Finaliza en la tibia y reconoce su papel como principal hueso portador de carga de la pierna.",
      hint:
        "Busca el hueso medial y más robusto de la pierna izquierda, entre la rodilla y el tobillo.",
    },
  ],
};

const muscularStudyGuideRaw: StudyGuide = {
  id: "muscular-regional-overview",
  system: "muscular",
  title: "Músculos por regiones",
  description:
    "Recorre músculos representativos de cabeza y cuello, tronco, miembro superior y miembro inferior.",
  steps: [
    {
      id: "mus-study-01",
      anatomyId: "muscular.temporalis.left",
      title: "Músculo temporal izquierdo",
      instruction:
        "Comienza en el músculo temporal y relaciónalo con la elevación y retracción de la mandíbula durante la masticación.",
      hint:
        "Busca un músculo amplio en forma de abanico sobre la región lateral del cráneo.",
    },
    {
      id: "mus-study-02",
      anatomyId: "muscular.sternocleidomastoid.left",
      title: "Esternocleidomastoideo izquierdo",
      instruction:
        "Identifica el esternocleidomastoideo y observa su recorrido oblicuo entre el tórax superior y la región mastoidea.",
      hint:
        "Es un músculo superficial y alargado de la cara anterolateral del cuello.",
    },
    {
      id: "mus-study-03",
      anatomyId: "muscular.pectoralis-minor.left",
      title: "Pectoral menor izquierdo",
      instruction:
        "Localiza el pectoral menor y relaciónalo con la estabilización y el desplazamiento anterior de la escápula.",
      hint:
        "Se encuentra profundo al pectoral mayor, desde las costillas hacia la escápula.",
    },
    {
      id: "mus-study-04",
      anatomyId: "muscular.rectus-abdominis.left",
      title: "Recto del abdomen izquierdo",
      instruction:
        "Observa el recto del abdomen y reconoce su participación en la flexión del tronco y la compresión abdominal.",
      hint:
        "Busca la banda muscular vertical situada a un lado de la línea media anterior del abdomen.",
    },
    {
      id: "mus-study-05",
      anatomyId: "muscular.latissimus-dorsi.left",
      title: "Dorsal ancho izquierdo",
      instruction:
        "Identifica el dorsal ancho y relaciónalo con la extensión, aducción y rotación medial del brazo.",
      hint:
        "Es una lámina muscular extensa que cubre la región inferior y lateral del dorso.",
    },
    {
      id: "mus-study-06",
      anatomyId: "muscular.supraspinatus.left",
      title: "Supraespinoso izquierdo",
      instruction:
        "Localiza el supraespinoso como parte del manguito rotador y observa su relación con el inicio de la abducción del brazo.",
      hint:
        "Está sobre la espina de la escápula, profundo al músculo deltoides.",
    },
    {
      id: "mus-study-07",
      anatomyId: "muscular.brachialis.left",
      title: "Braquial izquierdo",
      instruction:
        "Observa el músculo braquial y reconoce su función como flexor principal del antebrazo en el codo.",
      hint:
        "Se encuentra en la cara anterior del brazo, profundo al bíceps braquial.",
    },
    {
      id: "mus-study-08",
      anatomyId: "muscular.gluteus-medius.left",
      title: "Glúteo medio izquierdo",
      instruction:
        "Identifica el glúteo medio y relaciónalo con la abducción del muslo y la estabilización de la pelvis durante la marcha.",
      hint:
        "Busca un músculo en abanico sobre la superficie lateral del ilion.",
    },
    {
      id: "mus-study-09",
      anatomyId: "muscular.rectus-femoris.left",
      title: "Recto femoral izquierdo",
      instruction:
        "Localiza el recto femoral, componente del cuádriceps que participa en la extensión de la rodilla y la flexión de la cadera.",
      hint:
        "Ocupa la región anterior y superficial del muslo.",
    },
    {
      id: "mus-study-10",
      anatomyId: "muscular.vastus-lateralis.left",
      title: "Vasto lateral izquierdo",
      instruction:
        "Finaliza en el vasto lateral y reconoce su contribución a la extensión de la pierna en la articulación de la rodilla.",
      hint:
        "Busca la gran masa muscular situada en la cara lateral del muslo.",
    },
  ],
};

const digestiveStudyGuideRaw: StudyGuide = {
  id: "digestive-tract-and-accessory-organs",
  system: "digestive",
  title: "Recorrido del sistema digestivo",
  description:
    "Sigue el tubo digestivo desde la cavidad oral hasta el colon e identifica los principales órganos accesorios.",
  steps: [
    {
      id: "dig-study-01",
      anatomyId: "digestive.tongue",
      title: "Lengua",
      instruction:
        "Comienza en la lengua y relaciónala con la manipulación del alimento, la formación del bolo y el inicio de la deglución.",
      hint:
        "Busca la estructura muscular que ocupa el suelo de la cavidad oral.",
    },
    {
      id: "dig-study-02",
      anatomyId: "digestive.esophagus",
      title: "Esófago",
      instruction:
        "Sigue el bolo alimenticio por el esófago y observa su trayecto desde el cuello hasta el estómago.",
      hint:
        "Es un tubo que desciende posterior a la tráquea y atraviesa el diafragma.",
    },
    {
      id: "dig-study-03",
      anatomyId: "digestive.stomach",
      title: "Estómago",
      instruction:
        "Identifica el estómago y reconoce su función en el almacenamiento, la mezcla y el inicio de la digestión del contenido alimentario.",
      hint:
        "Busca el órgano con forma de saco en la región superior izquierda del abdomen.",
    },
    {
      id: "dig-study-04",
      anatomyId: "digestive.liver",
      title: "Hígado",
      instruction:
        "Observa el hígado como órgano accesorio y relaciónalo con la producción de bilis y el procesamiento de nutrientes.",
      hint:
        "Es el gran órgano situado principalmente en la parte superior derecha del abdomen.",
    },
    {
      id: "dig-study-05",
      anatomyId: "digestive.gallbladder",
      title: "Vesícula biliar",
      instruction:
        "Localiza la vesícula biliar y relaciónala con el almacenamiento y la concentración de la bilis producida por el hígado.",
      hint:
        "Busca un pequeño saco adherido a la cara inferior del hígado.",
    },
    {
      id: "dig-study-06",
      anatomyId: "digestive.pancreas",
      title: "Páncreas",
      instruction:
        "Identifica el páncreas y observa su proximidad al duodeno, donde vierte secreciones digestivas.",
      hint:
        "Es una glándula alargada situada posterior al estómago.",
    },
    {
      id: "dig-study-07",
      anatomyId: "digestive.duodenum",
      title: "Duodeno",
      instruction:
        "Continúa hacia el duodeno, primera porción del intestino delgado y punto de llegada de secreciones biliares y pancreáticas.",
      hint:
        "Busca el segmento curvo que rodea parcialmente la cabeza del páncreas.",
    },
    {
      id: "dig-study-08",
      anatomyId: "digestive.jejunum",
      title: "Yeyuno",
      instruction:
        "Sigue el recorrido hasta el yeyuno y relaciónalo con la digestión y absorción de nutrientes en el intestino delgado.",
      hint:
        "Forma asas móviles en la región central y superior izquierda del abdomen.",
    },
    {
      id: "dig-study-09",
      anatomyId: "digestive.ascending-colon",
      title: "Colon ascendente",
      instruction:
        "Identifica el colon ascendente como el segmento del intestino grueso que asciende por el lado derecho del abdomen.",
      hint:
        "Busca el tramo vertical derecho que se dirige hacia el hígado.",
    },
    {
      id: "dig-study-10",
      anatomyId: "digestive.transverse-colon",
      title: "Colon transverso",
      instruction:
        "Sigue el intestino grueso a través del colon transverso y observa su recorrido de derecha a izquierda.",
      hint:
        "Es el segmento aproximadamente horizontal que cruza la parte superior del abdomen.",
    },
    {
      id: "dig-study-11",
      anatomyId: "digestive.descending-colon",
      title: "Colon descendente",
      instruction:
        "Continúa por el colon descendente y reconoce su trayecto hacia la región inferior izquierda del abdomen.",
      hint:
        "Busca el tramo vertical situado en el lado izquierdo del abdomen.",
    },
    {
      id: "dig-study-12",
      anatomyId: "digestive.sigmoid-colon",
      title: "Colon sigmoide",
      instruction:
        "Finaliza en el colon sigmoide y observa cómo el intestino grueso se curva antes de continuar hacia el recto.",
      hint:
        "Busca el segmento curvo en forma de S dentro de la región inferior izquierda de la pelvis.",
    },
  ],
};

function localizeStudyGuide(guide: StudyGuide): StudyGuide {
  const english = studyGuideEnglish[guide.id];
  if (!english) throw new Error(`Traducción de guía Study ausente: ${guide.id}`);
  return {
    ...guide,
    title: { es: getLocalizedText(guide.title, "es"), en: english.title },
    description: { es: getLocalizedText(guide.description, "es"), en: english.description },
    steps: guide.steps.map((step) => {
      const stepEnglish = studyStepEnglish[step.id];
      if (!stepEnglish) throw new Error(`Traducción de step Study ausente: ${step.id}`);
      return {
        ...step,
        title: { es: getLocalizedText(step.title, "es"), en: stepEnglish.title },
        instruction: { es: getLocalizedText(step.instruction, "es"), en: stepEnglish.instruction },
        hint: { es: getLocalizedText(step.hint, "es"), en: stepEnglish.hint },
      };
    }),
  };
}

export const cardiovascularStudyGuide = localizeStudyGuide(cardiovascularStudyGuideRaw);
export const respiratoryStudyGuide = localizeStudyGuide(respiratoryStudyGuideRaw);
export const nervousStudyGuide = localizeStudyGuide(nervousStudyGuideRaw);
export const skeletalStudyGuide = localizeStudyGuide(skeletalStudyGuideRaw);
export const muscularStudyGuide = localizeStudyGuide(muscularStudyGuideRaw);
export const digestiveStudyGuide = localizeStudyGuide(digestiveStudyGuideRaw);

export const studyGuidesBySystem: Partial<
  Record<AnatomySystemId, StudyGuide>
> = {
  cardiovascular: cardiovascularStudyGuide,
  respiratory: respiratoryStudyGuide,
  nervous: nervousStudyGuide,
  skeletal: skeletalStudyGuide,
  muscular: muscularStudyGuide,
  digestive: digestiveStudyGuide,
};
