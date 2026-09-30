import {
  getSpanishStructureName,
} from "./anatomyNames";

import {
  getRespiratoryStructureName,
} from "./respiratoryNames";

import type {
  AnatomySystemId,
} from "../config/anatomySystems";

function cleanGenericName(
  structureName: string
) {
  let name =
    structureName.trim();

  name = name.replace(
    /\.(j|g|t)$/i,
    ""
  );

  name = name.replace(
    /\.\d{3}$/i,
    ""
  );

  name = name.replace(
    /_/g,
    " "
  );

  name = name.replace(
    /\.l$/i,
    " izquierdo"
  );

  name = name.replace(
    /\.r$/i,
    " derecho"
  );

  name = name.replace(
    /\s+/g,
    " "
  );

  name = name.trim();

  if (!name) {
    return "Estructura anatómica";
  }

  return (
    name.charAt(0).toUpperCase() +
    name.slice(1)
  );
}

export function getSystemStructureName(
  system: AnatomySystemId,
  structureName: string
) {
  if (
    system === "cardiovascular"
  ) {
    return getSpanishStructureName(
      structureName
    );
  }

  if (
    system === "respiratory"
  ) {
    return getRespiratoryStructureName(
      structureName
    );
  }

  return cleanGenericName(
    structureName
  );
}