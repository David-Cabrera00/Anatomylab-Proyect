/**
 * Clasificación revisada de las entradas musculares que aún no tienen ficha.
 *
 * Los candidatos representan músculos con función anatómica propia y deben
 * compartir una ficha entre izquierda y derecha. El resto del conjunto
 * pendiente se conserva como geometría de apoyo (porciones, cabezas, bolsas,
 * vainas, retináculos, tendones y otros elementos accesorios).
 *
 * Esta lista usa Anatomy IDs persistentes; no depende del orden del catálogo.
 * ACTUALIZADO: Los 21 conceptos / 42 entradas clasificados como candidatos
 * ahora tienen ficha educativa propia. Quedan 147 entradas de geometría técnica/apoyo.
 */
export const muscularEducationalCandidateIds = [] as const;

export const muscularEducationalClassificationSnapshot = {
  entriesWithoutEducationalContent: 147,
  educationalCandidateEntries: 0,
  educationalCandidateConcepts: 0,
  technicalGeometryEntries: 147,
} as const;