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

import {
  getSkeletalStructureName,
} from "./skeletal/skeletalNames";

import { getMuscularStructureName } from "./muscular/muscularNames";
import { getDigestiveStructureName } from "./digestive/digestiveNames";

/* ======================================================
   ANATOMYLAB AI
   SISTEMA CENTRAL DE NOMBRES
====================================================== */

type Laterality =
  | "left"
  | "right"
  | null;

/* ======================================================
   EXTRAER LATERALIDAD GENÉRICA

   Se utiliza solo como respaldo; cada sistema conocido
   tiene su propio normalizador.
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
     DUPLICADOS DE BLENDER
  ==================================================== */

  name =
    name.replace(
      /\.\d{3}$/i,
      ""
    );

  /* ====================================================
     FORMATO .l / .r
  ==================================================== */

  if (
    /\.l$/i.test(
      name
    )
  ) {
    laterality =
      "left";

    name =
      name.replace(
        /\.l$/i,
        ""
      );
  } else if (
    /\.r$/i.test(
      name
    )
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
   LIMPIEZA GENÉRICA
====================================================== */

function cleanBaseName(
  structureName: string
): string {
  let name =
    structureName;

  /* ====================================================
     SUFIJOS TÉCNICOS
  ==================================================== */

  name =
    name.replace(
      /\.(j|g|t)$/i,
      ""
    );

  /* ====================================================
     UNDERSCORES
  ==================================================== */

  name =
    name.replace(
      /_/g,
      " "
    );

  /* ====================================================
     ASTERISCOS
  ==================================================== */

  name =
    name.replace(
      /\*/g,
      ""
    );

  /* ====================================================
     ESPACIOS DUPLICADOS
  ==================================================== */

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
): string {
  if (
    !value
  ) {
    return value;
  }

  return (
    value
      .charAt(0)
      .toUpperCase() +
    value.slice(1)
  );
}

/* ======================================================
   LATERALIDAD GENÉRICA

   Solo para el respaldo genérico.
====================================================== */

function getLateralityText(
  name: string,
  laterality: Laterality
): string {
  if (
    !laterality
  ) {
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

   Respaldo para un sistema no reconocido.
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

  if (
    !cleanName
  ) {
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
   FUNCIÓN PRINCIPAL
====================================================== */

export function getSystemStructureName(
  system: AnatomySystemId,
  structureName: string
): string {
  /* ====================================================
     CARDIOVASCULAR
  ==================================================== */

  if (
    system ===
    "cardiovascular"
  ) {
    return getSpanishStructureName(
      structureName
    );
  }

  /* ====================================================
     RESPIRATORIO
  ==================================================== */

  if (
    system ===
    "respiratory"
  ) {
    return getRespiratoryStructureName(
      structureName
    );
  }

  /* ====================================================
     NERVIOSO
  ==================================================== */

  if (
    system ===
    "nervous"
  ) {
    return getNervousStructureName(
      structureName
    );
  }

  /* ====================================================
     ESQUELÉTICO
  ==================================================== */

  if (
    system ===
    "skeletal"
  ) {
    return getSkeletalStructureName(
      structureName
    );
  }

  /* ====================================================
     MUSCULAR Y DIGESTIVO
  ==================================================== */

  if (system === "muscular") {
    return getMuscularStructureName(structureName);
  }

  if (system === "digestive") {
    return getDigestiveStructureName(structureName);
  }

  return cleanGenericName(
    structureName
  );
}
