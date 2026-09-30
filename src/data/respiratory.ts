import {
  getRespiratoryStructureName,
} from "../utils/respiratory/respiratoryNames";

/* ======================================================
   ANATOMYLAB AI
   INFORMACIÓN EDUCATIVA - SISTEMA RESPIRATORIO
====================================================== */

export type RespiratoryStructure = {
  id: string;

  name: string;

  type:
    | "Pulmón"
    | "Lóbulo"
    | "Bronquio"
    | "Segmento pulmonar"
    | "Vía respiratoria"
    | "Vía aérea superior";

  description: string;

  function: string;

  location: string;

  relationships: string[];
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

  name: "Lóbulo superior del pulmón izquierdo",

  type: "Lóbulo",

  description:
    "Porción superior del pulmón izquierdo que incluye la región de la língula.",

  function:
    "Participa en la ventilación y en el intercambio gaseoso pulmonar.",

  location:
    "Ocupa la región superior y parte de la región anterior del pulmón izquierdo.",

  relationships: [
    "Forma parte del pulmón izquierdo.",
    "Se encuentra superior al lóbulo inferior.",
    "Presenta relación con la incisura cardíaca.",
    "Incluye la língula.",
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

  return {
    id: name,

    name,

    type: "Bronquio",

    description:
      `${name} es una rama bronquial que conduce aire hacia un segmento broncopulmonar específico del pulmón ${side}.`,

    function:
      "Distribuye el aire inspirado hacia una región anatómica específica del pulmón.",

    location:
      `Se encuentra dentro del árbol bronquial del pulmón ${side}.`,

    relationships: [
      "Se origina a partir de ramas bronquiales de mayor calibre.",
      "Se dirige hacia un segmento broncopulmonar.",
      "Forma parte del árbol traqueobronquial.",
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

  return {
    id: name,

    name,

    type: "Segmento pulmonar",

    description:
      `${name} es una subdivisión anatómica del pulmón ${side}, ventilada por un bronquio segmentario.`,

    function:
      "Participa en la ventilación y en el intercambio gaseoso dentro de una región específica del pulmón.",

    location:
      `Se encuentra dentro de uno de los lóbulos del pulmón ${side}.`,

    relationships: [
      "Forma parte de un lóbulo pulmonar.",
      "Recibe aire mediante un bronquio segmentario.",
      "Se relaciona con ramas de los vasos pulmonares.",
    ],
  };
}

function createGenericBronchus(
  name: string
): RespiratoryStructure {
  return {
    id: name,

    name,

    type: "Bronquio",

    description:
      `${name} forma parte del árbol bronquial y participa en la conducción del aire dentro del sistema respiratorio.`,

    function:
      "Transporta y distribuye el aire hacia regiones cada vez más pequeñas del pulmón.",

    location:
      "Se localiza dentro del árbol traqueobronquial.",

    relationships: [
      "Se relaciona con otras ramas bronquiales.",
      "Conduce aire hacia regiones pulmonares.",
      "Forma parte de la vía respiratoria inferior.",
    ],
  };
}

/* ======================================================
   FUNCIÓN PRINCIPAL DE BÚSQUEDA
====================================================== */

export function getRespiratoryStructure(
  structureId: string
): RespiratoryStructure | null {
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
    return trachea;
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
    return larynx;
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
    return pharynx;
  }

  /* ====================================================
     BRONQUIOS PRINCIPALES
  ==================================================== */

  if (
    name.includes(
      "bronquio principal derecho"
    )
  ) {
    return rightMainBronchus;
  }

  if (
    name.includes(
      "bronquio principal izquierdo"
    )
  ) {
    return leftMainBronchus;
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
    return rightUpperLobe;
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
    return rightMiddleLobe;
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
    return rightLowerLobe;
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
    return leftUpperLobe;
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
    return leftLowerLobe;
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
    return rightLung;
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
    return leftLung;
  }

  return null;
}