import type { AnatomyDivisionId, AnatomyModelBinding } from "../types";

export type CardiovascularModelCatalogEntry = AnatomyModelBinding & {
  hasSelectableGeometry: true;
  layer: Extract<AnatomyDivisionId, "heart" | "arteries" | "veins">;
};

/** Catálogo estático generado desde los GLB cardiovasculares activos. */
export const cardiovascularModelCatalog = [
  {
    "modelKey": "overview",
    "originalName": "Left coronary artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior interventricular artery",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Septal branches of anterior interventricular artery",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Circumflex artery of heart",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Right coronary artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Right inferolateral branch of right coronary artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Left atrium",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Left ventricle",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior papillary muscle of left ventricle",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Right atrium",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Right ventricle",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior papillary muscle of right ventricle",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior papillary muscle of right ventricle",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Septal papillary muscle of right ventricle",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior leaflet of right atrioventricular valve",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior leaflet of left atrioventricular valve",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Septal leaflet of right atrioventricular valve",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Left coronary leaflet",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Non-coronary leaflet",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Right coronary leaflet",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior semilunar leaflet of pulmonary valve",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Left semilunar leaflet of pulmonary valve",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Right semilunar leaflet of pulmonary valve",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Left pulmonary artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior basal segmental artery of left lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral basal segmental artery of left lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial basal segmental artery of left lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior basal segmental artery of left lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior segmental artery of left lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior segmental artery of left lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Apical segmental artery of left lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior lingular artery of left lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior segmental artery of left lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior lingular artery of left lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Pulmonary trunk",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Bifurcation of pulmonary trunk",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Right pulmonary artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior lobar artery of right lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior basal segmental artery of right lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral basal segmental artery of right lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial basal segmental artery of right lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior basal segmental artery of right lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior segmental artery of right lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle lobar artery of right lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral segmental artery of right lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial segmental artery of right lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior lobar artery of right lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior segmental artery of right lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Apical segmental artery of right lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior segmental artery of right lung",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Abdominal aorta",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Coeliac trunk",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Common hepatic artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Gastroduodenal artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Proper hepatic artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Left gastric artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Splenic artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior mesenteric artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Left colic artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Ascending branch of left colic artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Descending branch of left colic artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Sigmoid arteries",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior anorectal artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior phrenic artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Left renal artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior branch of renal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior suprarenal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Intrarenal arteries of left kidney",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior branch of renal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Left testicular artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lumbar arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lumbar arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Right renal artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior branch of renal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior suprarenal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Intrarenal arteries of right kidney",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior branch of renal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Right testicular artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior mesenteric artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Ileocolic artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Appendicular artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Colic branch of ileocolic artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Ileal branch of ileocolic artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior pancreaticoduodenal artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior inferior pancreaticoduodenal artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Marginal artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle colic artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Right colic artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Aortic arch",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Brachiocephalic trunk",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Common iliac artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "External iliac artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior epigastric artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal iliac artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior division of internal iliac artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior gluteal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal pudendal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep artery of penis.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal artery of penis.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior division of internal iliac artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Iliolumbar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Iliacus branch of iliolumbar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lumbar branch of iliolumbar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Spinal branch of iliolumbar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior gluteal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Common iliac artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "External iliac artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior epigastric artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal iliac artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior division of internal iliac artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior gluteal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal pudendal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep artery of penis.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal artery of penis.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Obturator artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Obturator artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior division of internal iliac artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Iliolumbar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Iliacus branch of iliolumbar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lumbar branch of iliolumbar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Spinal branch of iliolumbar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior gluteal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Median sacral artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Ascending aorta",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Thoracic aorta",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior intercostal arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior intercostal arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Subcostal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Subcostal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior phrenic arteries",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior spinal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior spinal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior communicating artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior communicating artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior communicating artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Femoral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep external pudendal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep femoral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral circumflex femoral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Descending branch of lateral circumflex femoral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial circumflex femoral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Perforating femoral arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Popliteal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior tibial artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsalis pedis artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Arcuate artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal metatarsal arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal digital arteries of foot.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep plantar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral tarsal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior lateral genicular artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior medial genicular artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle genicular artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Patellar anastomosis.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior tibial artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Calcaneal branches of posterior tibial artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Fibular artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Calcaneal branches of fibular artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral plantar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Plantar arch.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Plantar metatarsal arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Common plantar digital arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Proper plantar digital arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Perforating branches of plantar metatarsal arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial plantar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial branch of medial plantar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior lateral genicular artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior medial genicular artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial epigastric artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial external pudendal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Femoral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep external pudendal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep femoral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral circumflex femoral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Descending branch of lateral circumflex femoral artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial circumflex femoral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Perforating femoral arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Popliteal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior tibial artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsalis pedis artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Arcuate artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal metatarsal arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal digital arteries of foot.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep plantar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral tarsal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior lateral genicular artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior medial genicular artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle genicular artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Patellar anastomosis.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior tibial artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Calcaneal branches of posterior tibial artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Fibular artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Calcaneal branches of fibular artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral plantar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Plantar arch.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Plantar metatarsal arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Common plantar digital arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Proper plantar digital arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Perforating branches of plantar metatarsal arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial plantar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial branch of medial plantar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior lateral genicular artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior medial genicular artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial epigastric artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial external pudendal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Left common carotid artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "External carotid artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Ascending pharyngeal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Facial artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Angular artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior labial artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Submental artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior labial artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Maxillary artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior deep temporal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Artery of pterygoid canal.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Buccal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Descending palatine artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Greater palatine artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior alveolar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Mental branch of inferior alveolar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Mylohyoid branch of inferior alveolar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Infra-orbital artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle meningeal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Accessory branch of middle meningeal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior deep temporal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior lateral nasal branches of sphenopalatine artery..l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior septal branches of sphenopalatine artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior superior alveolar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Occipital artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial temporal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Frontal branch of superficial temporal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Transverse facial artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal carotid artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle cerebral artery (M1-segment).l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Distal lateral striate branches.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Insular branches of middle cerebral artery (M2-segment).l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior temporal branch.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Artery of precentral sulcus.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle cerebral artery (M3 segment).l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Artery of central sulcus.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Parietal branches of middle cerebral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Postcentral arterial branch.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior parietal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior temporal branch.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Temporal branches of middle cerebral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Temporo-occipital branch.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Branch to angular gyrus.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Prefrontal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral frontobasal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Proximal lateral striate branches.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Ophthalmic artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior ethmoidal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior septal branches of anterior ethmoidal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Central retinal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lacrimal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Long posterior ciliary arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior ethmoidal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Septal branches of posterior ethmoidal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Short posterior ciliary arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Supra-orbital artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Supratrochlear artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Left subclavian artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Axillary artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior circumflex humeral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Brachial artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep brachial artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle collateral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Radial collateral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior ulnar collateral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Radial artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep palmar arch.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Palmar metacarpal arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal carpal anastomosis.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal metacarpal arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal digital arteries of hand.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Palmar carpal branch of radial artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior ulnar collateral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Ulnar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "(Ulnar recurrent artery).l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Common interosseous artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior interosseous artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Recurrent interosseous artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal carpal branch of ulnar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial palmar arch.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Common palmar digital arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Proper palmar digital arteries.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral thoracic artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior circumflex humeral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Subscapular artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Circumflex scapular artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Thoracodorsal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Thoraco-acromial artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Pectoral branches of thoraco-acromial artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Costocervical trunk.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep cervical artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Supreme intercostal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "First posterior intercostal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Second posterior intercostal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal thoracic artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Musculophrenic artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior epigastric artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Thyrocervical trunk.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior thyroid artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Suprascapular artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Transverse cervical artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "(Deep branch of transverse cervical artery).l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "(Superficial branch of transverse cervical artery).l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Vertebral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior inferior cerebellar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Right common carotid artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "External carotid artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Ascending pharyngeal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Facial artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Angular artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior labial artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Submental artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior labial artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Maxillary artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior deep temporal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Artery of pterygoid canal.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Buccal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Descending palatine artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Greater palatine artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior alveolar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Mental branch of inferior alveolar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Mylohyoid branch of inferior alveolar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Infra-orbital artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle meningeal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Accessory branch of middle meningeal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior deep temporal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior lateral nasal branches of sphenopalatine artery..r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior septal branches of sphenopalatine artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior superior alveolar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Occipital artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial temporal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Frontal branch of superficial temporal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Transverse facial artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal carotid artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior cerebral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Callosomarginal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Frontal branches of callosomarginal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Orbitofrontal branches of anterior cerebral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Pericallosal artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior cerebral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Callosomarginal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Frontal branches of callosomarginal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Orbitofrontal branches of anterior cerebral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Pericallosal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle cerebral artery (M1-segment).r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Distal lateral striate branches.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Insular branches of middle cerebral artery (M2).r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior temporal branch.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Artery of precentral sulcus.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle cerebral artery (M3-segment).r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Artery of central sulcus.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Parietal branches of middle cerebral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Postcentral arterial branch.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior parietal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior temporal branch.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Temporal branches of middle cerebral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Temporo-occipital branch.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Branch to angular gyrus.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Prefrontal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral frontobasal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Proximal lateral striate branches.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Ophthalmic artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior ethmoidal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior septal branches of anterior ethmoidal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Central retinal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lacrimal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Long posterior ciliary arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior ethmoidal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Septal branches of posterior ethmoidal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Short posterior ciliary arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Supra-orbital artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Supratrochlear artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Right subclavian artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Axillary artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior circumflex humeral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Brachial artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep brachial artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle collateral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Radial collateral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior ulnar collateral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Radial artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep palmar arch.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Palmar metacarpal arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal carpal anastomosis.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal metacarpal arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal digital arteries of hand.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Palmar carpal branch of radial artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior ulnar collateral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Ulnar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "(Ulnar recurrent artery).r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Common interosseous artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior interosseous artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Recurrent interosseous artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal carpal branch of ulnar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial palmar arch.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Common palmar digital arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Proper palmar digital arteries.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral thoracic artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior circumflex humeral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Subscapular artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Circumflex scapular artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Thoracodorsal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Thoraco-acromial artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Pectoral branches of thoraco-acromial artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Costocervical trunk.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep cervical artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Supreme intercostal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "First posterior intercostal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Second posterior intercostal artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal thoracic artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Musculophrenic artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior epigastric artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Thyrocervical trunk.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior thyroid artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Suprascapular artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Transverse cervical artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "(Deep branch of transverse cervical artery).r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "(Superficial branch of transverse cervical artery).r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Vertebral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Basilar artery",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior inferior cerebellar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior inferior cerebellar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral pontine branches of basilar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral pontine branches of basilar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial pontine branches of basilar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial pontine branches of basilar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior cerebral artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral occipital artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial occipital artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Parieto-occipital artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior cerebral artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial occipital artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral occipital artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Parieto-occipital artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior cerebellar artery.l",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior cerebellar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior inferior cerebellar artery.r",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  },
  {
    "modelKey": "overview",
    "originalName": "Coronary sinus",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Great cardiac vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior vein of left ventricle",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior vein of left ventricle (//Posterior '')",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle cardiac vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Left inferior pulmonary vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior basal vein of left lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior basal vein of left lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior vein of left lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Left superior pulmonary vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior vein of left lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Apicoposterior vein of left lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lingular vein of left lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior lingular vein of left lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior lingular vein of left lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Right inferior pulmonary vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior basal vein of right lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior basal vein of right lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior vein of right lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Right superior pulmonary vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior vein of right lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Apical vein of right lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral vein of right lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial vein of right lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior vein of right lung",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior petrosal sinus.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior petrosal sinus.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Basilar venous plexus",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior intercavernous sinus",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior intercavernous sinus",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Cavernous sinus.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Cavernous sinus.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Sigmoid sinus.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Transverse sinus.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior petrosal sinus.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Sigmoid sinus.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Transverse sinus.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior petrosal sinus.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior sagittal sinus",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Occipital sinus",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Straight sinus",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior sagittal sinus",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior ophthalmic vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior ophthalmic vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior ophthalmic vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior ophthalmic vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Femoral vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep femoral vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Perforating veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Great saphenous vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "External pudendal veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial epigastric vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral circumflex femoral veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial circumflex femoral veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Popliteal vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior tibial veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Genicular veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior tibial veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Fibular veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral plantar veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Plantar venous arch.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Plantar metatarsal veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Plantar digital veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial plantar veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Small saphenous vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal venous arch of foot.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal metatarsal veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal digital veins of foot.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Intercapitular veins of foot.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Femoral vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep femoral vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Perforating veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Great saphenous vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "External pudendal veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial dorsal veins of penis",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial epigastric vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral circumflex femoral veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial circumflex femoral veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Popliteal vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior tibial veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Genicular veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior tibial veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Fibular veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral plantar veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Plantar venous arch.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Plantar metatarsal veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Plantar digital veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Medial plantar veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Small saphenous vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal venous arch of foot.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal metatarsal veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal digital veins of foot.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Intercapitular veins of foot.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Hepatic portal vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Splenic vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior mesenteric vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Sigmoid veins",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Left gastro-omental vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior mesenteric vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Middle colic vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Right colic vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Right gastro-omental vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior vena cava (thoracic part)",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Hepatic veins",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior vena cava (abdominal part)",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Common iliac vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "External iliac vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior epigastric vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Iliolumbar vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal iliac vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior gluteal veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal pudendal vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral sacral veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior gluteal veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Common iliac vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "External iliac vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior epigastric vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Iliolumbar vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal iliac vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep dorsal vein of penis",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior gluteal veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal pudendal vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral sacral veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior gluteal veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Left renal vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Intrarenal veins of left kidney",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Left testicular vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lumbar veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lumbar veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Right renal vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Intrarenal veins of right kidney",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Right testicular vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal jugular vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Common facial vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior division of retromandibular vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Retromandibular vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Maxillary veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial temporal veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Facial vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Angular vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior labial veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Submental vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior labial vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lingual vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior thyroid vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal jugular vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Common facial vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior division of retromandibular vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Retromandibular vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Maxillary veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial temporal veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Facial vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Angular vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Inferior labial veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Submental vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior labial vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lingual vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior thyroid vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Left subclavian vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Axillary vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior circumflex humeral vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Basilic vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Median cubital vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Median antebrachial vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Brachial veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Radial veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep venous palmar arch.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Ulnar veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial venous palmar arch.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Palmar digital veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Cephalic vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal venous network of hand.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal digital veins of hand.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral thoracic vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior circumflex humeral vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Subscapular vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Circumflex scapular vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Thoracodorsal vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "External jugular vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior jugular vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior auricular vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior division of retromandibular vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Suprascapular vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Right subclavian vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Axillary vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior circumflex humeral vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Basilic vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Median cubital vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Median antebrachial vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Brachial veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Radial veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Deep venous palmar arch.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Ulnar veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superficial venous palmar arch.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Palmar digital veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Cephalic vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal venous network of hand.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Dorsal digital veins of hand.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Lateral thoracic vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior circumflex humeral vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Subscapular vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Circumflex scapular vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Thoracodorsal vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "External jugular vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Anterior jugular vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior auricular vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Posterior division of retromandibular vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Suprascapular vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior vena cava",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Azygos vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Accessory hemi-azygos vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Hemi-azygos vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Left ascending lumbar vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Left subcostal vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Right ascending lumbar vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Right subcostal vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Right superior intercostal vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Right superior phrenic vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Left brachiocephalic vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal thoracic veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Musculophrenic veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior epigastric veins.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Left superior intercostal vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Vertebral vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Occipital vein.l",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Right brachiocephalic vein",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Internal thoracic veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Musculophrenic veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Superior epigastric veins.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Vertebral vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "overview",
    "originalName": "Occipital vein.r",
    "hasSelectableGeometry": true,
    "layer": "veins"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Left atrium",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Left ventricle",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Inferior papillary muscle of left ventricle",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Right atrium",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Right ventricle",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Anterior papillary muscle of right ventricle",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Inferior papillary muscle of right ventricle",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Septal papillary muscle of right ventricle",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Inferior leaflet of right atrioventricular valve",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Posterior leaflet of left atrioventricular valve",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Septal leaflet of right atrioventricular valve",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Left coronary leaflet",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Non-coronary leaflet",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Right coronary leaflet",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Anterior semilunar leaflet of pulmonary valve",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Left semilunar leaflet of pulmonary valve",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Right semilunar leaflet of pulmonary valve",
    "hasSelectableGeometry": true,
    "layer": "heart"
  },
  {
    "modelKey": "heart-detail",
    "originalName": "Pulmonary trunk",
    "hasSelectableGeometry": true,
    "layer": "arteries"
  }
] as const satisfies readonly CardiovascularModelCatalogEntry[];
