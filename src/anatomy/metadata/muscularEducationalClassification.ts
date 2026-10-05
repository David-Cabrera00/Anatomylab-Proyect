/**
 * Clasificación revisada de las entradas musculares que aún no tienen ficha.
 *
 * Los candidatos representan músculos con función anatómica propia y deben
 * compartir una ficha entre izquierda y derecha. El resto del conjunto
 * pendiente se conserva como geometría de apoyo (porciones, cabezas, bolsas,
 * vainas, retináculos, tendones y otros elementos accesorios).
 *
 * Esta lista usa Anatomy IDs persistentes; no depende del orden del catálogo.
 */
export const muscularEducationalCandidateIds = [
  "muscular.model-node-0207",
  "muscular.model-node-0208",
  "muscular.model-node-0209",
  "muscular.model-node-0210",
  "muscular.model-node-0212",
  "muscular.model-node-0213",
  "muscular.model-node-0214",
  "muscular.model-node-0215",
  "muscular.model-node-0216",
  "muscular.model-node-0217",
  "muscular.model-node-0220",
  "muscular.model-node-0221",
  "muscular.model-node-0222",
  "muscular.model-node-0223",
  "muscular.model-node-0224",
  "muscular.model-node-0225",
  "muscular.model-node-0226",
  "muscular.model-node-0227",
  "muscular.model-node-0379",
  "muscular.model-node-0381",
  "muscular.model-node-0382",
  "muscular.model-node-0383",
  "muscular.model-node-0421",
  "muscular.model-node-0422",
  "muscular.model-node-0459",
  "muscular.model-node-0460",
  "muscular.model-node-0461",
  "muscular.model-node-0462",
  "muscular.model-node-0463",
  "muscular.model-node-0464",
  "muscular.model-node-0470",
  "muscular.model-node-0471",
  "muscular.model-node-0472",
  "muscular.model-node-0473",
  "muscular.model-node-0481",
  "muscular.model-node-0482",
  "muscular.model-node-0483",
  "muscular.model-node-0484",
  "muscular.model-node-0494",
  "muscular.model-node-0495",
  "muscular.model-node-0496",
  "muscular.model-node-0497",
] as const;

export const muscularEducationalClassificationSnapshot = {
  entriesWithoutEducationalContent: 189,
  educationalCandidateEntries: 42,
  educationalCandidateConcepts: 21,
  technicalGeometryEntries: 147,
} as const;
