import type {
  AnatomySystemId,
} from "../config/anatomySystems";

import {
  getSpanishStructureName,
} from "./cardiovascular/cardiovascularNames";

import {
  getRespiratoryStructureName,
} from "./respiratory/respiratoryNames";

import {
  getNervousStructureName,
} from "./nervous/nervousNames";

/* ======================================================
   ANATOMYLAB AI
   SISTEMA CENTRAL DE NOMBRES
====================================================== */

type Laterality =
  | "left"
  | "right"
  | null;

/* ======================================================
   EXTRAER LATERALIDAD
====================================================== */

function extractLaterality(
  structureName: string
): {
  name: string;
  laterality: Laterality;
} {
  let name =
    structureName.trim();

  let laterality:
    Laterality =
    null;

  /* ====================================================
     DUPLICADOS BLENDER
  ==================================================== */

  name =
    name.replace(
      /\.\d{3}$/i,
      ""
    );

  /* ====================================================
     IZQUIERDO / DERECHO
  ==================================================== */

  if (
    /\.l$/i.test(name)
  ) {
    laterality =
      "left";

    name =
      name.replace(
        /\.l$/i,
        ""
      );
  } else if (
    /\.r$/i.test(name)
  ) {
    laterality =
      "right";

    name =
      name.replace(
        /\.r$/i,
        ""
      );
  }

  return {
    name,
    laterality,
  };
}

/* ======================================================
   LIMPIAR NOMBRE
====================================================== */

function cleanBaseName(
  structureName: string
) {
  let name =
    structureName;

  /* Sufijos técnicos */

  name =
    name.replace(
      /\.(j|g|t)$/i,
      ""
    );

  /* Underscores */

  name =
    name.replace(
      /_/g,
      " "
    );

  /* Asteriscos */

  name =
    name.replace(
      /\*/g,
      ""
    );

  /* Espacios duplicados */

  name =
    name.replace(
      /\s+/g,
      " "
    );

  return name.trim();
}

/* ======================================================
   CAPITALIZAR
====================================================== */

function capitalize(
  value: string
) {
  if (!value) {
    return value;
  }

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

/* ======================================================
   LATERALIDAD GENÉRICA
====================================================== */

function getLateralityText(
  name: string,
  laterality: Laterality
) {
  if (!laterality) {
    return "";
  }

  const normalized =
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      );

  const feminineWords =
    new Set([
      "arteria",
      "vena",
      "escapula",
      "clavicula",
      "costilla",
      "vertebra",
      "tibia",
      "fibula",
      "rotula",
      "patela",
      "mandibula",
      "glandula",
      "rama",
      "fascia",
      "lengua",
      "amigdala",
    ]);

  const firstWord =
    normalized
      .split(/\s+/)[0];

  const feminine =
    feminineWords.has(
      firstWord
    );

  if (
    laterality ===
    "left"
  ) {
    return feminine
      ? " izquierda"
      : " izquierdo";
  }

  return feminine
    ? " derecha"
    : " derecho";
}

/* ======================================================
   LIMPIEZA GENÉRICA

   Temporalmente utilizada por:
   - Esquelético
   - Muscular
   - Digestivo
====================================================== */

function cleanGenericName(
  structureName: string
): string {
  if (
    !structureName ||
    !structureName.trim()
  ) {
    return "Estructura anatómica";
  }

  const {
    name: nameWithoutSide,
    laterality,
  } =
    extractLaterality(
      structureName
    );

  const cleanName =
    cleanBaseName(
      nameWithoutSide
    );

  if (!cleanName) {
    return "Estructura anatómica";
  }

  const visibleName =
    capitalize(
      cleanName
    );

  return (
    visibleName +
    getLateralityText(
      visibleName,
      laterality
    )
  );
}

/* ======================================================
   FUNCIÓN PÚBLICA
====================================================== */

export function getSystemStructureName(
  system: AnatomySystemId,
  structureName: string
): string {
  switch (system) {
    case "cardiovascular":
      return getSpanishStructureName(
        structureName
      );

    case "respiratory":
      return getRespiratoryStructureName(
        structureName
      );

    case "nervous":
      return getNervousStructureName(
        structureName
      );

    case "skeletal":
    case "muscular":
    case "digestive":
      return cleanGenericName(
        structureName
      );

    default:
      return cleanGenericName(
        structureName
      );
  }
}