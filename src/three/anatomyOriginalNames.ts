import * as THREE from "three";

import {
  anatomySystems,
  type AnatomySystemId,
} from "../config/anatomySystems";

import { getAnatomyEntryByOriginalName } from "../anatomy";
import type { AnatomyModelKey } from "../anatomy";

type NameParser = {
  associations: {
    get(object: THREE.Object3D): { nodes?: number } | undefined;
  };
  json: {
    nodes?: Array<{ name?: string }>;
  };
};

/** Conserva en cada nodo fuente el nombre escrito en el GLB, antes de clonarlo. */
export function attachOriginalAnatomyNames(
  scene: THREE.Object3D,
  parser: NameParser
): void {
  scene.traverse((object) => {
    const loaderName = object.userData.name;
    const nodeIndex = parser.associations.get(object)?.nodes;
    const associatedName =
      typeof nodeIndex === "number"
        ? parser.json.nodes?.[nodeIndex]?.name
        : undefined;

    // En meshes compartidos, associations puede señalar el último nodo del par
    // .l/.r. GLTFLoader también guarda el nombre exacto del nodo en userData.name.
    const originalName =
      typeof loaderName === "string" && loaderName.trim()
        ? loaderName
        : associatedName;

    if (typeof originalName === "string" && originalName.trim()) {
      object.userData.anatomyOriginalName = originalName;
    }
  });
}

function isAnatomicalName(
  system: AnatomySystemId,
  name: string
): boolean {
  const value = name.trim();
  if (!value || value.includes("?")) return false;

  if (/^(?:scene|root|armature|mesh|object|node|primitive)(?:[\s._-]*\d+)?$/i.test(value)) {
    return false;
  }

  const normalized = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const systemName = anatomySystems[system].fullName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return !normalized.includes(systemName);
}

/** Nombre semántico para la UI; el Mesh conserva su name y su identidad. */
export function getSelectableStructureName(
  system: AnatomySystemId,
  mesh: THREE.Mesh
): string {
  let object: THREE.Object3D | null = mesh;

  while (object) {
    if (object.userData.anatomyIgnore !== true) {
      const originalName = object.userData.anatomyOriginalName;
      if (
        typeof originalName === "string" &&
        isAnatomicalName(system, originalName)
      ) {
        return originalName;
      }
    }
    object = object.parent;
  }

  return mesh.name;
}

/** Admite tanto los identificadores de Three.js como los originales del GLB. */
export function findStructureMesh(
  model: THREE.Object3D,
  system: AnatomySystemId,
  structureName: string
): THREE.Mesh | null {
  let target: THREE.Mesh | null = null;

  // Una coincidencia propia tiene prioridad sobre un nombre heredado.
  model.traverse((object) => {
    if (target || !(object instanceof THREE.Mesh)) return;
    if (object.userData.anatomyIgnore === true) return;
    if (
      object.name === structureName ||
      object.userData.anatomyOriginalName === structureName
    ) {
      target = object;
    }
  });

  if (target) return target;

  model.traverse((object) => {
    if (target || !(object instanceof THREE.Mesh)) return;
    if (object.userData.anatomyIgnore === true) return;
    if (getSelectableStructureName(system, object) === structureName) {
      target = object;
    }
  });

  return target;
}

/** Obtiene el anatomyId estable desde un mesh usando anatomyIndex. Camina hacia padres si el mesh no tiene nombre. */
export function getAnatomyIdFromMesh(
  mesh: THREE.Mesh,
  system: AnatomySystemId,
  modelKey: AnatomyModelKey = "overview"
): string | null {
  let object: THREE.Object3D | null = mesh;

  while (object) {
    if (object.userData.anatomyIgnore !== true) {
      const originalName = object.userData.anatomyOriginalName;
      if (typeof originalName === "string" && originalName.trim()) {
        const entry = getAnatomyEntryByOriginalName(system, originalName, modelKey);
        if (entry) return entry.id;
      }
    }
    object = object.parent;
  }

  return null;
}
