import type { AnatomyModelBinding } from "../types";

export type RespiratoryModelLayer = "lungs" | "airways" | "upper-airway";

/** Catálogo estático generado desde respiratory_overview.glb. */
export type RespiratoryModelCatalogEntry = AnatomyModelBinding & {
  hasSelectableGeometry: true;
  layer: RespiratoryModelLayer;
};

export const respiratoryModelCatalog = [
  { modelKey: "overview", originalName: "Epiglotis", hasSelectableGeometry: true, layer: "upper-airway" },
  { modelKey: "overview", originalName: "Capa mucosa de la cavidad nasal", hasSelectableGeometry: true, layer: "upper-airway" },
  { modelKey: "overview", originalName: "Lóbulo inferior del pulmón izquierdo", hasSelectableGeometry: true, layer: "lungs" },
  { modelKey: "overview", originalName: "Lóbulo superior del pulmón izquierdo", hasSelectableGeometry: true, layer: "lungs" },
  { modelKey: "overview", originalName: "Lóbulo inferior del pulmón derecho", hasSelectableGeometry: true, layer: "lungs" },
  { modelKey: "overview", originalName: "Lóbulo medio del pulmón derecho", hasSelectableGeometry: true, layer: "lungs" },
  { modelKey: "overview", originalName: "Lóbulo superior del pulmón derecho", hasSelectableGeometry: true, layer: "lungs" },
  { modelKey: "overview", originalName: "Bronquio segmentario basal ant. del pulmón derecho (BVIII)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario basal lateral del pulmón derecho (BIX)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario basal posterior del pulmón derecho (BX)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario superior del pulmón derecho (BVI)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Medial basal segmental bronchus of right lung (BVII)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio lobar inferior derecho", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario lateral del pulmón derecho (BIV)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario medial del pulmón derecho (BV)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio lobar medio.r", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio intermedio.r", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario anterior del pulmón derecho (BIII)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario apical del pulmón derecho (BI)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario posterior del pulmón derecho (BII)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio lobar superior derecho", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio principal derecho", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "(Bronquio segmentario basal anteromedial-pulmón izquierdo)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario basal anterior-pulmón izquierdo (BVIII)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario basal medial del pulmón izquierdo (BVII)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario basal posterior-pulmón izquierdo (BX)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario superior del pulmón izquierdo (BVI)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Lateral basal segmental bronchus of left lung (BIX)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio lobar inferior izquierdo", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segm. apicoposterior-pulmón izquierdo (BI + BII)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segm. lingular sup. del pulmón izquierdo (BIV)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario anterior del pulmón izquierdo (BIII)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio segmentario lingular inf. del pulmón izquierdo (BV)", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio lobar superior izquierdo", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Bronquio principal izquierdo", hasSelectableGeometry: true, layer: "airways" },
  { modelKey: "overview", originalName: "Tráquea", hasSelectableGeometry: true, layer: "airways" },
] as const satisfies readonly RespiratoryModelCatalogEntry[];
