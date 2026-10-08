import {
  getRespiratoryStructureName,
} from "../utils/respiratory/respiratoryNames";
import type { LocalizableText } from "../i18n/localizedText";
import { getLocalizedText } from "../i18n/localizedText";

/* ======================================================
   ANATOMYLAB AI
   INFORMACIÓN EDUCATIVA - SISTEMA RESPIRATORIO
====================================================== */

export type RespiratoryStructure = {
  id: string;

  name: LocalizableText;

  type:
    | LocalizableText
    | "Pulmón"
    | "Lóbulo"
    | "Bronquio"
    | "Segmento pulmonar"
    | "Vía respiratoria"
    | "Vía aérea superior";

  description: LocalizableText;

  function: LocalizableText;

  location: LocalizableText;

  relationships: LocalizableText[];
};

/* ======================================================
   NORMALIZAR TEXTO PARA BÚSQUEDA
====================================================== */

function normalize(
  value: string
) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .trim();
}

/* ======================================================
   ESTRUCTURAS PRINCIPALES
====================================================== */

const rightLung: RespiratoryStructure = {
  id: "right-lung",

  name: "Pulmón derecho",

  type: "Pulmón",

  description:
    "Órgano respiratorio ubicado en el lado derecho de la cavidad torácica. Es ligeramente más grande que el pulmón izquierdo y está dividido en tres lóbulos.",

  function:
    "Participa en el intercambio gaseoso, permitiendo que el oxígeno pase hacia la sangre y que el dióxido de carbono sea eliminado durante la respiración.",

  location:
    "Se encuentra en la cavidad torácica derecha, lateral al mediastino y superior al diafragma.",

  relationships: [
    "Está dividido en los lóbulos superior, medio e inferior.",
    "Se relaciona medialmente con el mediastino.",
    "Descansa inferiormente sobre el diafragma.",
    "Recibe aire a través del bronquio principal derecho.",
  ],
};

const leftLung: RespiratoryStructure = {
  id: "left-lung",

  name: "Pulmón izquierdo",

  type: "Pulmón",

  description:
    "Órgano respiratorio situado en el lado izquierdo de la cavidad torácica. Es ligeramente más pequeño que el pulmón derecho debido al espacio ocupado por el corazón.",

  function:
    "Realiza el intercambio de oxígeno y dióxido de carbono entre el aire inspirado y la sangre de los capilares pulmonares.",

  location:
    "Se encuentra en la cavidad torácica izquierda, lateral al mediastino y superior al diafragma.",

  relationships: [
    "Está dividido en los lóbulos superior e inferior.",
    "Presenta una incisura cardíaca relacionada con el corazón.",
    "Descansa sobre el diafragma.",
    "Recibe aire mediante el bronquio principal izquierdo.",
  ],
};

const trachea: RespiratoryStructure = {
  id: "trachea",

  name: "Tráquea",

  type: "Vía respiratoria",

  description:
    "Conducto respiratorio tubular que comunica la laringe con los bronquios principales. Su pared contiene anillos cartilaginosos que ayudan a mantener abierta la vía aérea.",

  function:
    "Conduce el aire hacia y desde los pulmones, además de participar en la filtración, humidificación y limpieza del aire inspirado.",

  location:
    "Se extiende desde la región inferior de la laringe hasta su bifurcación en los bronquios principales dentro del tórax.",

  relationships: [
    "Superiormente continúa con la laringe.",
    "Inferiormente se divide en bronquio principal derecho e izquierdo.",
    "Se encuentra anterior al esófago.",
    "Su bifurcación forma la carina traqueal.",
  ],
};

const rightMainBronchus: RespiratoryStructure = {
  id: "right-main-bronchus",

  name: "Bronquio principal derecho",

  type: "Bronquio",

  description:
    "Rama derecha originada en la bifurcación de la tráquea. Es generalmente más corto, más ancho y más vertical que el bronquio principal izquierdo.",

  function:
    "Conduce el aire desde la tráquea hacia el pulmón derecho y posteriormente hacia los bronquios lobares y segmentarios.",

  location:
    "Se extiende desde la bifurcación traqueal hasta el hilio del pulmón derecho.",

  relationships: [
    "Se origina en la tráquea.",
    "Entra al pulmón derecho por el hilio pulmonar.",
    "Se divide en bronquios lobares.",
    "Los bronquios lobares originan posteriormente bronquios segmentarios.",
  ],
};

const leftMainBronchus: RespiratoryStructure = {
  id: "left-main-bronchus",

  name: "Bronquio principal izquierdo",

  type: "Bronquio",

  description:
    "Rama izquierda de la bifurcación traqueal que conduce el aire hacia el pulmón izquierdo.",

  function:
    "Transporta aire desde la tráquea hacia el pulmón izquierdo y lo distribuye posteriormente mediante bronquios lobares y segmentarios.",

  location:
    "Se extiende desde la bifurcación de la tráquea hasta el hilio del pulmón izquierdo.",

  relationships: [
    "Se origina en la tráquea.",
    "Entra al pulmón izquierdo por su hilio.",
    "Se divide en bronquios lobares.",
    "Está relacionado con estructuras del mediastino.",
  ],
};

const larynx: RespiratoryStructure = {
  id: "larynx",

  name: "Laringe",

  type: "Vía aérea superior",

  description:
    "Estructura cartilaginosa de la vía aérea situada entre la faringe y la tráquea. También contiene las estructuras responsables de la producción de la voz.",

  function:
    "Permite el paso del aire, participa en la fonación y protege la vía respiratoria durante la deglución.",

  location:
    "Se encuentra en la región anterior del cuello, entre la faringe y la tráquea.",

  relationships: [
    "Superiormente se comunica con la faringe.",
    "Inferiormente continúa con la tráquea.",
    "Contiene las cuerdas vocales.",
    "La epiglotis participa en la protección de la entrada laríngea.",
  ],
};

const pharynx: RespiratoryStructure = {
  id: "pharynx",

  name: "Faringe",

  type: "Vía aérea superior",

  description:
    "Conducto muscular situado detrás de las cavidades nasal y oral que forma parte tanto del sistema respiratorio como del sistema digestivo.",

  function:
    "Conduce el aire desde la cavidad nasal hacia la laringe y participa también en el paso de alimentos hacia el esófago.",

  location:
    "Se encuentra posterior a las cavidades nasal y oral y superior a la laringe y al esófago.",

  relationships: [
    "Se comunica con la cavidad nasal.",
    "Se continúa con la laringe para el paso del aire.",
    "También se relaciona con el esófago.",
  ],
};

const epiglottis: RespiratoryStructure = {
  id: "epiglottis",
  name: "Epiglotis",
  type: "Vía aérea superior",
  description:
    "Lámina de cartílago elástico recubierta por mucosa que forma parte de la entrada de la laringe.",
  function:
    "Contribuye a proteger la vía aérea durante la deglución al desviar el bolo alimenticio lejos de la entrada laríngea.",
  location:
    "Se encuentra en la región superior de la laringe, posterior a la base de la lengua.",
  relationships: [
    "Se une al cartílago tiroides y al hueso hioides mediante ligamentos.",
    "Su cara anterior se relaciona con la base de la lengua.",
    "Delimita anteriormente la entrada de la laringe.",
  ],
};

const nasalCavityMucosa: RespiratoryStructure = {
  id: "nasal-cavity-mucosa",
  name: "Capa mucosa de la cavidad nasal",
  type: "Vía aérea superior",
  description:
    "Revestimiento húmedo de la cavidad nasal que cubre gran parte de sus paredes y cornetes.",
  function:
    "Ayuda a filtrar, calentar y humidificar el aire inspirado antes de que continúe hacia la faringe.",
  location:
    "Recubre la superficie interna de la cavidad nasal en la región superior del tracto respiratorio.",
  relationships: [
    "Se continúa posteriormente con la mucosa de la nasofaringe.",
    "Se relaciona con los cornetes nasales, que aumentan la superficie de contacto con el aire.",
    "Contiene epitelio y glándulas que participan en la limpieza del aire inspirado.",
  ],
};

/* ======================================================
   LÓBULOS
====================================================== */

const rightUpperLobe: RespiratoryStructure = {
  id: "right-upper-lobe",

  name: "Lóbulo superior del pulmón derecho",

  type: "Lóbulo",

  description:
    "Porción superior del pulmón derecho separada de los demás lóbulos mediante las fisuras pulmonares.",

  function:
    "Contiene tejido pulmonar donde se realiza ventilación e intercambio gaseoso.",

  location:
    "Ocupa la región superior del pulmón derecho.",

  relationships: [
    "Forma parte del pulmón derecho.",
    "Se relaciona inferiormente con el lóbulo medio.",
    "Está separado parcialmente por la fisura horizontal.",
    "Recibe aire mediante bronquios lobares y segmentarios.",
  ],
};

const rightMiddleLobe: RespiratoryStructure = {
  id: "right-middle-lobe",

  name: "Lóbulo medio del pulmón derecho",

  type: "Lóbulo",

  description:
    "Lóbulo localizado entre los lóbulos superior e inferior del pulmón derecho.",

  function:
    "Participa en la ventilación pulmonar y en el intercambio gaseoso.",

  location:
    "Se encuentra en la región anterolateral media del pulmón derecho.",

  relationships: [
    "Forma parte exclusivamente del pulmón derecho.",
    "Se encuentra inferior al lóbulo superior.",
    "Se encuentra superior al lóbulo inferior.",
    "Está delimitado por las fisuras horizontal y oblicua.",
  ],
};

const rightLowerLobe: RespiratoryStructure = {
  id: "right-lower-lobe",

  name: "Lóbulo inferior del pulmón derecho",

  type: "Lóbulo",

  description:
    "Porción inferior y posterior del pulmón derecho.",

  function:
    "Participa en el intercambio gaseoso y contiene varios segmentos broncopulmonares basales.",

  location:
    "Ocupa principalmente las regiones inferior y posterior del pulmón derecho.",

  relationships: [
    "Forma parte del pulmón derecho.",
    "Se relaciona inferiormente con el diafragma.",
    "Está separado del lóbulo superior principalmente por la fisura oblicua.",
  ],
};

const leftUpperLobe: RespiratoryStructure = {
  id: "left-upper-lobe",

  name: {
    es: "Lóbulo superior del pulmón izquierdo",
    en: "Superior lobe of the left lung",
  },

  type: {
    es: "Lóbulo",
    en: "Lobe",
  },

  description: {
    es: "Porción superior del pulmón izquierdo que incluye la región de la língula.",
    en: "Upper portion of the left lung that includes the lingula region.",
  },

  function: {
    es: "Participa en la ventilación y en el intercambio gaseoso pulmonar.",
    en: "Participates in ventilation and pulmonary gas exchange.",
  },

  location: {
    es: "Ocupa la región superior y parte de la región anterior del pulmón izquierdo.",
    en: "Occupies the upper region and part of the anterior region of the left lung.",
  },

  relationships: [
    { es: "Forma parte del pulmón izquierdo.", en: "It is part of the left lung." },
    { es: "Se encuentra superior al lóbulo inferior.", en: "It is superior to the lower lobe." },
    { es: "Presenta relación con la incisura cardíaca.", en: "It is related to the cardiac notch." },
    { es: "Incluye la língula.", en: "It includes the lingula." },
  ],
};

const leftLowerLobe: RespiratoryStructure = {
  id: "left-lower-lobe",

  name: "Lóbulo inferior del pulmón izquierdo",

  type: "Lóbulo",

  description:
    "Porción inferior y principalmente posterior del pulmón izquierdo.",

  function:
    "Participa en el intercambio gaseoso y contiene segmentos broncopulmonares basales.",

  location:
    "Se sitúa en las regiones inferior y posterior del pulmón izquierdo.",

  relationships: [
    "Forma parte del pulmón izquierdo.",
    "Está separado del lóbulo superior por la fisura oblicua.",
    "Se relaciona inferiormente con el diafragma.",
  ],
};

type RespiratoryEnglishContent = {
  name: string;
  type: string;
  description: string;
  function: string;
  location: string;
  relationships: string[];
};

const respiratoryEnglishById: Readonly<Record<string, RespiratoryEnglishContent>> = {
  "right-lung": {
    name: "Right lung", type: "Lung",
    description: "Respiratory organ located on the right side of the thoracic cavity. It is slightly larger than the left lung and is divided into three lobes.",
    function: "Participates in gas exchange, allowing oxygen to pass into the blood and carbon dioxide to be removed during breathing.",
    location: "Located in the right thoracic cavity, lateral to the mediastinum and superior to the diaphragm.",
    relationships: ["It is divided into the upper, middle, and lower lobes.", "It is medially related to the mediastinum.", "It rests inferiorly on the diaphragm.", "It receives air through the right main bronchus."],
  },
  "left-lung": {
    name: "Left lung", type: "Lung",
    description: "Respiratory organ located on the left side of the thoracic cavity. It is slightly smaller than the right lung because of the space occupied by the heart.",
    function: "Performs the exchange of oxygen and carbon dioxide between inspired air and the blood in the pulmonary capillaries.",
    location: "Located in the left thoracic cavity, lateral to the mediastinum and superior to the diaphragm.",
    relationships: ["It is divided into the upper and lower lobes.", "It has a cardiac notch related to the heart.", "It rests on the diaphragm.", "It receives air through the left main bronchus."],
  },
  trachea: {
    name: "Trachea", type: "Airway",
    description: "Tubular respiratory passage that connects the larynx with the main bronchi. Its wall contains cartilaginous rings that help keep the airway open.",
    function: "Conducts air to and from the lungs and also participates in filtering, humidifying, and cleaning inspired air.",
    location: "Extends from the lower region of the larynx to its bifurcation into the main bronchi within the thorax.",
    relationships: ["Superiorly, it continues with the larynx.", "Inferiorly, it divides into the right and left main bronchi.", "It lies anterior to the esophagus.", "Its bifurcation forms the tracheal carina."],
  },
  "right-main-bronchus": {
    name: "Right main bronchus", type: "Bronchus",
    description: "Right branch originating at the bifurcation of the trachea. It is generally shorter, wider, and more vertical than the left main bronchus.",
    function: "Conducts air from the trachea to the right lung and subsequently to the lobar and segmental bronchi.",
    location: "Extends from the tracheal bifurcation to the hilum of the right lung.",
    relationships: ["It originates from the trachea.", "It enters the right lung through the pulmonary hilum.", "It divides into lobar bronchi.", "The lobar bronchi subsequently give rise to segmental bronchi."],
  },
  "left-main-bronchus": {
    name: "Left main bronchus", type: "Bronchus",
    description: "Left branch of the tracheal bifurcation that conducts air to the left lung.",
    function: "Transports air from the trachea to the left lung and subsequently distributes it through lobar and segmental bronchi.",
    location: "Extends from the tracheal bifurcation to the hilum of the left lung.",
    relationships: ["It originates from the trachea.", "It enters the left lung through its hilum.", "It divides into lobar bronchi.", "It is related to mediastinal structures."],
  },
  larynx: {
    name: "Larynx", type: "Upper airway",
    description: "Cartilaginous structure of the airway located between the pharynx and the trachea. It also contains the structures responsible for voice production.",
    function: "Allows air passage, participates in phonation, and protects the airway during swallowing.",
    location: "Located in the anterior region of the neck, between the pharynx and the trachea.",
    relationships: ["Superiorly, it communicates with the pharynx.", "Inferiorly, it continues with the trachea.", "It contains the vocal folds.", "The epiglottis participates in protecting the laryngeal inlet."],
  },
  pharynx: {
    name: "Pharynx", type: "Upper airway",
    description: "Muscular passage located behind the nasal and oral cavities that is part of both the respiratory and digestive systems.",
    function: "Conducts air from the nasal cavity to the larynx and also participates in the passage of food to the esophagus.",
    location: "Located posterior to the nasal and oral cavities and superior to the larynx and esophagus.",
    relationships: ["It communicates with the nasal cavity.", "It continues with the larynx for the passage of air.", "It is also related to the esophagus."],
  },
  epiglottis: {
    name: "Epiglottis", type: "Upper airway",
    description: "Mucosa-covered elastic cartilage plate that forms part of the entrance to the larynx.",
    function: "Helps protect the airway during swallowing by diverting the food bolus away from the laryngeal inlet.",
    location: "Located in the upper region of the larynx, posterior to the base of the tongue.",
    relationships: ["It attaches to the thyroid cartilage and hyoid bone by ligaments.", "Its anterior surface is related to the base of the tongue.", "It forms the anterior boundary of the laryngeal inlet."],
  },
  "nasal-cavity-mucosa": {
    name: "Mucosal lining of the nasal cavity", type: "Upper airway",
    description: "Moist lining of the nasal cavity that covers much of its walls and turbinates.",
    function: "Helps filter, warm, and humidify inspired air before it continues to the pharynx.",
    location: "Lines the internal surface of the nasal cavity in the upper region of the respiratory tract.",
    relationships: ["It continues posteriorly with the mucosa of the nasopharynx.", "It is related to the nasal turbinates, which increase the surface area in contact with air.", "It contains epithelium and glands that participate in cleaning inspired air."],
  },
  "right-upper-lobe": {
    name: "Upper lobe of the right lung", type: "Lobe",
    description: "Upper portion of the right lung separated from the other lobes by pulmonary fissures.",
    function: "Contains lung tissue where ventilation and gas exchange occur.",
    location: "Occupies the upper region of the right lung.",
    relationships: ["It is part of the right lung.", "It is inferiorly related to the middle lobe.", "It is partially separated by the horizontal fissure.", "It receives air through lobar and segmental bronchi."],
  },
  "right-middle-lobe": {
    name: "Middle lobe of the right lung", type: "Lobe",
    description: "Lobe located between the upper and lower lobes of the right lung.",
    function: "Participates in pulmonary ventilation and gas exchange.",
    location: "Located in the middle anterolateral region of the right lung.",
    relationships: ["It is exclusively part of the right lung.", "It is inferior to the upper lobe.", "It is superior to the lower lobe.", "It is bounded by the horizontal and oblique fissures."],
  },
  "right-lower-lobe": {
    name: "Lower lobe of the right lung", type: "Lobe",
    description: "Inferior and mainly posterior portion of the right lung.",
    function: "Participates in gas exchange and contains several basal bronchopulmonary segments.",
    location: "Occupies mainly the inferior and posterior regions of the right lung.",
    relationships: ["It is part of the right lung.", "It is inferiorly related to the diaphragm.", "It is separated from the upper lobe mainly by the oblique fissure."],
  },
  "left-lower-lobe": {
    name: "Lower lobe of the left lung", type: "Lobe",
    description: "Inferior and mainly posterior portion of the left lung.",
    function: "Participates in gas exchange and contains basal bronchopulmonary segments.",
    location: "Located in the inferior and posterior regions of the left lung.",
    relationships: ["It is part of the left lung.", "It is separated from the upper lobe by the oblique fissure.", "It is inferiorly related to the diaphragm."],
  },
};

const respiratoryEnglishNameBySpanish: Readonly<Record<string, string>> = {
  "Epiglotis": "Epiglottis",
  "Capa mucosa de la cavidad nasal": "Mucosal lining of the nasal cavity",
  "Lóbulo inferior del pulmón izquierdo": "Lower lobe of the left lung",
  "Lóbulo superior del pulmón izquierdo": "Upper lobe of the left lung",
  "Lóbulo inferior del pulmón derecho": "Lower lobe of the right lung",
  "Lóbulo medio del pulmón derecho": "Middle lobe of the right lung",
  "Lóbulo superior del pulmón derecho": "Upper lobe of the right lung",
  "Bronquio segmentario basal anterior del pulmón derecho (BVIII)": "Anterior basal segmental bronchus of the right lung (BVIII)",
  "Bronquio segmentario basal lateral del pulmón derecho (BIX)": "Lateral basal segmental bronchus of the right lung (BIX)",
  "Bronquio segmentario basal posterior del pulmón derecho (BX)": "Posterior basal segmental bronchus of the right lung (BX)",
  "Bronquio segmentario superior del pulmón derecho (BVI)": "Superior segmental bronchus of the right lung (BVI)",
  "Bronquio segmentario basal medial del pulmón derecho (BVII)": "Medial basal segmental bronchus of the right lung (BVII)",
  "Bronquio lobar inferior derecho": "Right lower lobar bronchus",
  "Bronquio segmentario lateral del pulmón derecho (BIV)": "Lateral segmental bronchus of the right lung (BIV)",
  "Bronquio segmentario medial del pulmón derecho (BV)": "Medial segmental bronchus of the right lung (BV)",
  "Bronquio lobar medio derecho": "Right middle lobar bronchus",
  "Bronquio intermedio derecho": "Right intermediate bronchus",
  "Bronquio segmentario anterior del pulmón derecho (BIII)": "Anterior segmental bronchus of the right lung (BIII)",
  "Bronquio segmentario apical del pulmón derecho (BI)": "Apical segmental bronchus of the right lung (BI)",
  "Bronquio segmentario posterior del pulmón derecho (BII)": "Posterior segmental bronchus of the right lung (BII)",
  "Bronquio lobar superior derecho": "Right upper lobar bronchus",
  "Bronquio principal derecho": "Right main bronchus",
  "Bronquio segmentario basal anteromedial del pulmón izquierdo": "Anteromedial basal segmental bronchus of the left lung",
  "Bronquio segmentario basal anterior del pulmón izquierdo (BVIII)": "Anterior basal segmental bronchus of the left lung (BVIII)",
  "Bronquio segmentario basal medial del pulmón izquierdo (BVII)": "Medial basal segmental bronchus of the left lung (BVII)",
  "Bronquio segmentario basal posterior del pulmón izquierdo (BX)": "Posterior basal segmental bronchus of the left lung (BX)",
  "Bronquio segmentario superior del pulmón izquierdo (BVI)": "Superior segmental bronchus of the left lung (BVI)",
  "Bronquio segmentario basal lateral del pulmón izquierdo (BIX)": "Lateral basal segmental bronchus of the left lung (BIX)",
  "Bronquio lobar inferior izquierdo": "Left lower lobar bronchus",
  "Bronquio segmentario apicoposterior del pulmón izquierdo (BI + BII)": "Apicoposterior segmental bronchus of the left lung (BI + BII)",
  "Bronquio segmentario lingular superior del pulmón izquierdo (BIV)": "Superior lingular segmental bronchus of the left lung (BIV)",
  "Bronquio segmentario anterior del pulmón izquierdo (BIII)": "Anterior segmental bronchus of the left lung (BIII)",
  "Bronquio segmentario lingular inferior del pulmón izquierdo (BV)": "Inferior lingular segmental bronchus of the left lung (BV)",
  "Bronquio lobar superior izquierdo": "Left upper lobar bronchus",
  "Bronquio principal izquierdo": "Left main bronchus",
  "Tráquea": "Trachea",
};

function localizedStructure(structure: RespiratoryStructure): RespiratoryStructure {
  const content = respiratoryEnglishById[structure.id];
  if (!content) return structure;
  return {
    ...structure,
    name: { es: getLocalizedText(structure.name, "es"), en: content.name },
    type: { es: getLocalizedText(structure.type, "es"), en: content.type },
    description: { es: getLocalizedText(structure.description, "es"), en: content.description },
    function: { es: getLocalizedText(structure.function, "es"), en: content.function },
    location: { es: getLocalizedText(structure.location, "es"), en: content.location },
    relationships: structure.relationships.map((relationship, index) => ({
      es: getLocalizedText(relationship, "es"),
      en: content.relationships[index] ?? getLocalizedText(relationship, "es"),
    })),
  };
}

/* ======================================================
   GENERADORES DE INFORMACIÓN

   Esto permite que los muchos bronquios y segmentos
   del modelo también tengan información sin escribir
   decenas de objetos manualmente.
====================================================== */

function createSegmentalBronchus(
  name: string
): RespiratoryStructure {
  const normalized =
    normalize(name);

  const side =
    normalized.includes(
      "derecho"
    )
      ? "derecho"
      : normalized.includes(
            "izquierdo"
          )
        ? "izquierdo"
        : "correspondiente";
  const englishName = respiratoryEnglishNameBySpanish[name] ?? name;
  const englishSide = side === "derecho" ? "right" : side === "izquierdo" ? "left" : "corresponding";

  return {
    id: name,

    name: { es: name, en: englishName },

    type: { es: "Bronquio", en: "Bronchus" },

    description: {
      es: `${name} es una rama bronquial que conduce aire hacia un segmento broncopulmonar específico del pulmón ${side}.`,
      en: `${englishName} is a bronchial branch that conducts air to a specific bronchopulmonary segment of the ${englishSide} lung.`,
    },

    function: {
      es: "Distribuye el aire inspirado hacia una región anatómica específica del pulmón.",
      en: "Distributes inspired air to a specific anatomical region of the lung.",
    },

    location: {
      es: `Se encuentra dentro del árbol bronquial del pulmón ${side}.`,
      en: `It is located within the bronchial tree of the ${englishSide} lung.`,
    },

    relationships: [
      { es: "Se origina a partir de ramas bronquiales de mayor calibre.", en: "It originates from larger-caliber bronchial branches." },
      { es: "Se dirige hacia un segmento broncopulmonar.", en: "It courses toward a bronchopulmonary segment." },
      { es: "Forma parte del árbol traqueobronquial.", en: "It is part of the tracheobronchial tree." },
    ],
  };
}

function createPulmonarySegment(
  name: string
): RespiratoryStructure {
  const normalized =
    normalize(name);

  const side =
    normalized.includes(
      "derecho"
    )
      ? "derecho"
      : normalized.includes(
            "izquierdo"
          )
        ? "izquierdo"
        : "correspondiente";
  const englishName = respiratoryEnglishNameBySpanish[name] ?? name;
  const englishSide = side === "derecho" ? "right" : side === "izquierdo" ? "left" : "corresponding";

  return {
    id: name,

    name: { es: name, en: englishName },

    type: { es: "Segmento pulmonar", en: "Pulmonary segment" },

    description: {
      es: `${name} es una subdivisión anatómica del pulmón ${side}, ventilada por un bronquio segmentario.`,
      en: `${englishName} is a subdivision of the ${englishSide} lung, ventilated by a segmental bronchus.`,
    },

    function: {
      es: "Participa en la ventilación y en el intercambio gaseoso dentro de una región específica del pulmón.",
      en: "Participates in ventilation and gas exchange within a specific region of the lung.",
    },

    location: {
      es: `Se encuentra dentro de uno de los lóbulos del pulmón ${side}.`,
      en: `It is located within one of the lobes of the ${englishSide} lung.`,
    },

    relationships: [
      { es: "Forma parte de un lóbulo pulmonar.", en: "It is part of a pulmonary lobe." },
      { es: "Recibe aire mediante un bronquio segmentario.", en: "It receives air through a segmental bronchus." },
      { es: "Se relaciona con ramas de los vasos pulmonares.", en: "It is related to branches of the pulmonary vessels." },
    ],
  };
}

function createGenericBronchus(
  name: string
): RespiratoryStructure {
  const englishName = respiratoryEnglishNameBySpanish[name] ?? name;
  return {
    id: name,

    name: { es: name, en: englishName },

    type: { es: "Bronquio", en: "Bronchus" },

    description: {
      es: `${name} forma parte del árbol bronquial y participa en la conducción del aire dentro del sistema respiratorio.`,
      en: `${englishName} is part of the bronchial tree and participates in conducting air within the respiratory system.`,
    },

    function: {
      es: "Transporta y distribuye el aire hacia regiones cada vez más pequeñas del pulmón.",
      en: "Transports and distributes air to progressively smaller regions of the lung.",
    },

    location: {
      es: "Se localiza dentro del árbol traqueobronquial.",
      en: "It is located within the tracheobronchial tree.",
    },

    relationships: [
      { es: "Se relaciona con otras ramas bronquiales.", en: "It is related to other bronchial branches." },
      { es: "Conduce aire hacia regiones pulmonares.", en: "It conducts air to pulmonary regions." },
      { es: "Forma parte de la vía respiratoria inferior.", en: "It is part of the lower respiratory tract." },
    ],
  };
}

/* ======================================================
   FUNCIÓN PRINCIPAL DE BÚSQUEDA
====================================================== */

export function getRespiratoryStructure(
  structureId: string
): RespiratoryStructure | null {
  const byId: Record<string, RespiratoryStructure> = {
    [rightLung.id]: rightLung,
    [leftLung.id]: leftLung,
    [trachea.id]: trachea,
    [rightMainBronchus.id]: rightMainBronchus,
    [leftMainBronchus.id]: leftMainBronchus,
    [larynx.id]: larynx,
    [pharynx.id]: pharynx,
    [epiglottis.id]: epiglottis,
    [nasalCavityMucosa.id]: nasalCavityMucosa,
    [rightUpperLobe.id]: rightUpperLobe,
    [rightMiddleLobe.id]: rightMiddleLobe,
    [rightLowerLobe.id]: rightLowerLobe,
    [leftUpperLobe.id]: leftUpperLobe,
    [leftLowerLobe.id]: leftLowerLobe,
  };
  if (Object.prototype.hasOwnProperty.call(byId, structureId)) return localizedStructure(byId[structureId]);

  const visibleName =
    getRespiratoryStructureName(
      structureId
    );

  const name =
    normalize(
      visibleName
    );

  /* ====================================================
     TRÁQUEA
  ==================================================== */

  if (
    name === "traquea" ||
    name.includes(
      "traquea"
    )
  ) {
    return localizedStructure(trachea);
  }

  /* ====================================================
     LARINGE
  ==================================================== */

  if (
    name === "laringe" ||
    name.includes(
      "laringe"
    )
  ) {
    return localizedStructure(larynx);
  }

  /* ====================================================
     FARINGE
  ==================================================== */

  if (
    name === "faringe" ||
    name.includes(
      "faringe"
    )
  ) {
    return localizedStructure(pharynx);
  }

  if (name === "epiglotis" || name.includes("epiglotis")) {
    return localizedStructure(epiglottis);
  }

  if (name.includes("mucosa") && name.includes("cavidad nasal")) {
    return localizedStructure(nasalCavityMucosa);
  }

  /* ====================================================
     BRONQUIOS PRINCIPALES
  ==================================================== */

  if (
    name.includes(
      "bronquio principal derecho"
    )
  ) {
    return localizedStructure(rightMainBronchus);
  }

  if (
    name.includes(
      "bronquio principal izquierdo"
    )
  ) {
    return localizedStructure(leftMainBronchus);
  }

  /* ====================================================
     BRONQUIOS SEGMENTARIOS
  ==================================================== */

  if (
    name.includes(
      "bronquio segmentario"
    )
  ) {
    return createSegmentalBronchus(
      visibleName
    );
  }

  /* ====================================================
     OTROS BRONQUIOS
  ==================================================== */

  if (
    name.includes(
      "bronquio"
    )
  ) {
    return createGenericBronchus(
      visibleName
    );
  }

  /* ====================================================
     SEGMENTOS PULMONARES
  ==================================================== */

  if (
    name.includes(
      "segmento"
    ) &&
    name.includes(
      "pulmon"
    )
  ) {
    return createPulmonarySegment(
      visibleName
    );
  }

  /* ====================================================
     LÓBULO SUPERIOR DERECHO
  ==================================================== */

  if (
    name.includes(
      "lobulo superior"
    ) &&
    name.includes(
      "pulmon derecho"
    )
  ) {
    return localizedStructure(rightUpperLobe);
  }

  /* ====================================================
     LÓBULO MEDIO DERECHO
  ==================================================== */

  if (
    name.includes(
      "lobulo medio"
    ) &&
    name.includes(
      "pulmon derecho"
    )
  ) {
    return localizedStructure(rightMiddleLobe);
  }

  /* ====================================================
     LÓBULO INFERIOR DERECHO
  ==================================================== */

  if (
    name.includes(
      "lobulo inferior"
    ) &&
    name.includes(
      "pulmon derecho"
    )
  ) {
    return localizedStructure(rightLowerLobe);
  }

  /* ====================================================
     LÓBULO SUPERIOR IZQUIERDO
  ==================================================== */

  if (
    name.includes(
      "lobulo superior"
    ) &&
    name.includes(
      "pulmon izquierdo"
    )
  ) {
    return localizedStructure(leftUpperLobe);
  }

  /* ====================================================
     LÓBULO INFERIOR IZQUIERDO
  ==================================================== */

  if (
    name.includes(
      "lobulo inferior"
    ) &&
    name.includes(
      "pulmon izquierdo"
    )
  ) {
    return localizedStructure(leftLowerLobe);
  }

  /* ====================================================
     PULMÓN DERECHO

     Se revisa después de lóbulos y segmentos para
     evitar que "lóbulo superior del pulmón derecho"
     sea identificado simplemente como pulmón derecho.
  ==================================================== */

  if (
    name ===
      "pulmon derecho" ||
    (
      name.includes(
        "pulmon derecho"
      ) &&
      !name.includes(
        "lobulo"
      ) &&
      !name.includes(
        "segmento"
      )
    )
  ) {
    return localizedStructure(rightLung);
  }

  /* ====================================================
     PULMÓN IZQUIERDO
  ==================================================== */

  if (
    name ===
      "pulmon izquierdo" ||
    (
      name.includes(
        "pulmon izquierdo"
      ) &&
      !name.includes(
        "lobulo"
      ) &&
      !name.includes(
        "segmento"
      )
    )
  ) {
    return localizedStructure(leftLung);
  }

  return null;
}
