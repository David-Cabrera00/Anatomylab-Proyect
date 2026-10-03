import type { AnatomyDivisionId, AnatomyModelBinding } from "../types";

export type MuscularModelCatalogEntry = AnatomyModelBinding & {
  hasSelectableGeometry: true;
  layer: Extract<
    AnatomyDivisionId,
    | "muscular-head-neck"
    | "muscular-trunk"
    | "muscular-upper-limb"
    | "muscular-lower-limb"
  >;
};

/** Catálogo estático generado desde muscular_overview.glb. */
export const muscularModelCatalog = [
  {
    "modelKey": "overview",
    "originalName": "Linea alba",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cuadrado lumbar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cuadrado lumbar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oblicuo externo del abdomen.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Ligamento inguinal.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oblicuo externo del abdomen.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Ligamento inguinal.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oblicuo interno del abdomen.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oblicuo interno del abdomen.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo piramidal.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo piramidal.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto del abdomen.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto del abdomen.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo transverso del abdomen.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo transverso del abdomen.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo escaleno anterior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo escaleno anterior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo escaleno medio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo escaleno medio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo escaleno posterior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo escaleno posterior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo esternocleidomastoideo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo esternocleidomastoideo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo largo de la cabeza.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo largo de la cabeza.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo largo del cuello.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo largo del cuello.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto anterior de la cabeza.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto anterior de la cabeza.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto lateral de la cabeza.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto lateral de la cabeza.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Constrictor inferior de la faringe.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Constrictor inferior de la faringe.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Constrictor medio de la faringe.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Constrictor medio de la faringe.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Constrictor superior de la faringe.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Constrictor superior de la faringe.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo estilofaríngeo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo estilofaríngeo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo esternohioideo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo esternohioideo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo esternotiroideo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo esternotiroideo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo omohioideo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo omohioideo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo tirohioideo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo tirohioideo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo aritenoideo transverso",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cricoaritenoideo lateral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cricoaritenoideo lateral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cricoaritenoideo posterior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cricoaritenoideo posterior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción ariepiglótica del músculo aritenoideo oblicuo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción ariepiglótica del músculo aritenoideo oblicuo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción externa del músculo tiroaritenoideo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción externa del músculo tiroaritenoideo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción oblicua del músculo cricotiroideo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción oblicua del músculo cricotiroideo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción recta del músculo cricotiroideo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción recta del músculo cricotiroideo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción tiroepiglótica del músculo tiroaritenoideo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción tiroepiglótica del músculo tiroaritenoideo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendón intermedio del músculo digástrico.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendón intermedio del músculo digástrico.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Vientre anterior del músculo digástrico.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Vientre anterior del músculo digástrico.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Vientre posterior del músculo digástrico.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Vientre posterior del músculo digástrico.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo estilohioideo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo estilohioideo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo geniohioideo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo geniohioideo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo milohioideo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo milohioideo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Platisma.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Platisma.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo geniogloso.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo geniogloso.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo hiogloso.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo hiogloso.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo palatofaríngeo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo palatofaríngeo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Anillo tendinoso común.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Anillo tendinoso común.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevador del párpado superior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevador del párpado superior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oblicuo inferior del bulbo ocular.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oblicuo inferior del bulbo ocular.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oblicuo superior del bulbo ocular.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oblicuo superior del bulbo ocular.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto inferior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto inferior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto lateral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto lateral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto medial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto medial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto superior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto superior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Tarso inferior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Tarso inferior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Tarso superior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Tarso superior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Tróclea del músculo oblicuo superior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Tróclea del músculo oblicuo superior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza inferior del músculo pterigoideo lateral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza inferior del músculo pterigoideo lateral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza superior del músculo pterigoideo lateral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza superior del músculo pterigoideo lateral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo pterigoideo medial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo pterigoideo medial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo temporal.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo temporal.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción profunda del masétero.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción profunda del masétero.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción superficial del masétero.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción superficial del masétero.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Aponeurosis epicraneal.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Aponeurosis epicraneal.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo frontal.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo frontal.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo occipital.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo occipital.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo temporoparietal.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo temporoparietal.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Buccinador.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Buccinador.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Depresor del labio inferior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Depresor del labio inferior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Depresor del septo nasal.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Depresor del septo nasal.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Depresor del ángulo oral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Depresor del ángulo oral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevador del angulo de la boca.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevador del angulo de la boca.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevador del labio superior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevador del labio superior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevador nasolabial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevador nasolabial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cigomático mayor.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cigomático mayor.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cigomático menor.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cigomático menor.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo corrugador del supercilio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo corrugador del supercilio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo mental.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo mental.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo nasal.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo nasal.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo orbicular de la boca.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo orbicular de la boca.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo prócer.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo prócer.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo risorio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo risorio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Parte palpebral del múculo orbicular del ojo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Parte palpebral del múculo orbicular del ojo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción orbitaria del músculo orbicular del ojo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción orbitaria del músculo orbicular del ojo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-head-neck"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo espinal de la cabeza.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo espinal de la cabeza.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo espinal del cuello.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo espinal del cuello.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo espinal del tórax.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo espinal del tórax.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo iliocostal del cuello",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo iliocostal del cuello.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo iliocostal del tórax.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo iliocostal del tórax.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo iliocostal lumbar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo iliocostal lumbar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo longísimo de la cabeza.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo longísimo de la cabeza.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo longísimo del tórax.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo longísimo del tórax.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo longísmo del cuello.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo longísmo del cuello.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo esplenio de la cabeza.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo esplenio de la cabeza.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo esplenio del cuello.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo esplenio del cuello.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interespinosos del cuello.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interespinosos del cuello.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interespinosos del tórax.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interespinosos del tórax.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interespinosos lumbares.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interespinosos lumbares.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oblicuo inferior de la cabeza.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oblicuo inferior de la cabeza.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oblicuo superior de la cabeza.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oblicuo superior de la cabeza.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto posterior mayor de la cabeza.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto posterior mayor de la cabeza.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto posterior menor de la cabeza.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto posterior menor de la cabeza.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo multifido del cuello.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo multifido del cuello.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo multifido del tórax.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo multifido del tórax.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo multifido lumbar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo multifido lumbar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo semiespinoso del cuello.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo semiespinoso del cuello.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo semiespinoso del tórax.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo semiespinoso del tórax.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Rotadores.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Rotadores.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevador de la escápula.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevador de la escápula.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo latísimo del dorso.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo latísimo del dorso.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo romboides mayor.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo romboides mayor.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo romboides menor.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo romboides menor.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo serrato posterior inferior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo serrato posterior inferior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo serrato posterior superior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo serrato posterior superior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción ascendente del músculo trapecio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción ascendente del músculo trapecio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción descendente del músculo trapecio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción descendente del músculo trapecio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción transversa del músculo trapecio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción transversa del músculo trapecio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Partes dorsales de los m. lumbares intertransversarios lat..l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Partes dorsales de los m. lumbares intertransversarios lat..r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Partes ventrales de los m. lumbares intertransvarios lat..l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Partes ventrales de los m. lumbares intertransvarios lat..r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo coccígeo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo coccígeo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Arco tendinoso del elevador del ano.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Arco tendinoso del elevador del ano.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo iliococcígeo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo iliococcígeo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo puboanal.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo puboanal.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo pubococcígeo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo pubococcígeo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Esfínter anal externo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Esfínter anal externo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Diafragma",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevadores cortos de las costillas.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevadores cortos de las costillas.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevadores largos de las costillas.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Elevadores largos de las costillas.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "(Porción abdominal del músculo pectoral mayor).l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "(Porción abdominal del músculo pectoral mayor).r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción clavicular del músculo pectoral mayor.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción clavicular del músculo pectoral mayor.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción esternocostal del músculo pectoral mayor.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción esternocostal del músculo pectoral mayor.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo pectoral menor.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo pectoral menor.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo serrato anterior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo serrato anterior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo subclavio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo subclavio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo transverso del tórax.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo transverso del tórax.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos intercostales externos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos intercostales externos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos intercostales internos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos intercostales internos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos intercostales íntimos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos intercostales íntimos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-trunk"
  },
  {
    "modelKey": "overview",
    "originalName": "(Bolsa iliopectínea).l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "(Bolsa iliopectínea).r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "(Bolsa prepatelar subtendinosa).l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "(Bolsa prepatelar subtendinosa).r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa anserina.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa anserina.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa calcánea subcutánea.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa calcánea subcutánea.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa calcánea subtendinosa.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa calcánea subtendinosa.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa del musculo semimembranoso.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa del musculo semimembranoso.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa del músculo piriforme.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa del músculo piriforme.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa infrapatelar profunda.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa infrapatelar profunda.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa isquiática del músculo glúteo máximo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa isquiática del músculo glúteo máximo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa isquiática del obturador interno.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa isquiática del obturador interno.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa prepatelar subcutánea.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa prepatelar subcutánea.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subcutánea de la tuberosidad de la tibia.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subcutánea de la tuberosidad de la tibia.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subcutánea del maléolo lateral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subcutánea del maléolo lateral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subcutánea del maléolo medial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subcutánea del maléolo medial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subcutánea infrapatelar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subcutánea infrapatelar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea del músculo sartorio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea del músculo sartorio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea del músculo tibial anterior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea del músculo tibial anterior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea del obturador interno.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea del obturador interno.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea ilíaca.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea ilíaca.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea inferior del músculo bíceps femoral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea inferior del músculo bíceps femoral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea lateral del músculo gastrocnemio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea lateral del músculo gastrocnemio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea medial del músculo gastrocnemio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendínea medial del músculo gastrocnemio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa superior del músculo bíceps femoral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa superior del músculo bíceps femoral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa suprapatelar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa suprapatelar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa trocantérica del músculo glúteo máximo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa trocantérica del músculo glúteo máximo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa trocantérica del músculo glúteo mínimo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa trocantérica del músculo glúteo mínimo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa trocantérica subcutánea.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa trocantérica subcutánea.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsas glúteas intermusculares.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsas glúteas intermusculares.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Subfacial prepatellar bursa.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Subfacial prepatellar bursa.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Trochanteric bursa of gluteus medius muscle.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Trochanteric bursa of gluteus medius muscle.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor largo de los dedos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendón del extensor largo de los dedos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor largo de los dedos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendón del extensor largo de los dedos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor largo del hállux.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor largo del hállux.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo fibular tercero.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo fibular tercero.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo tibial anterior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo tibial anterior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto femoral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo recto femoral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo sartorio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo sartorio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo vasto intermedio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo vasto intermedio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo vasto lateral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo vasto lateral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo vasto medial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo vasto medial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Retináculo patelar lateral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Retináculo patelar lateral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Retináculo patelar medial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Retináculo patelar medial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo fibular corto.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo fibular corto.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo fibular largo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo fibular largo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Aductor corto.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Aductor corto.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Aductor largo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Aductor largo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Aductor mayor.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "(Aductor mínimo).l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Aductor mayor.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "(Aductor mínimo).r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo grácil.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo grácil.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo pectíneo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo pectíneo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Obturador externo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Obturador externo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor largo del hállux.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor largo del hállux.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo flexor largo de los dedos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo flexor largo de los dedos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo poplíteo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo poplíteo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo tibial posterior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo tibial posterior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza lateral del músculo gastrocnemio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza lateral del músculo gastrocnemio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza medial del músculo gastrocnemio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza medial del músculo gastrocnemio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo plantar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo plantar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo sóleo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo sóleo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendón calcáneo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendón calcáneo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza corta del músculo bíceps femoral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza corta del músculo bíceps femoral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza larga del músculo bíceps femoral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza larga del músculo bíceps femoral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo semimembranoso.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo semimembranoso.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo semitendinoso.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo semitendinoso.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo ilíaco.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo ilíaco.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Psoas mayor.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Psoas mayor.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "(Músculo oponente del dedo mínimo del pie).l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "(Músculo oponente del dedo mínimo del pie).r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Abductor del dedo mínimo del pie.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Abductor del dedo mínimo del pie.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Abductor del hállux.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Abductor del hállux.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza oblicua del aductor del hállux.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza oblicua del aductor del hállux.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza transversa del aductor del hállux.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza transversa del aductor del hállux.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor corto de los dedos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor corto de los dedos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor corto del hállux.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor corto del hállux.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor corto de los dedos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor corto de los dedos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza lateral del flexor corto del hállux.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza lateral del flexor corto del hállux.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza medial del flexor corto del hállux.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza medial del flexor corto del hállux.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor del dedo mínimo del pie.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor del dedo mínimo del pie.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cuadrado plantar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cuadrado plantar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interóseos dorsales del pie.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interóseos dorsales del pie.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interóseos plantares.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interóseos plantares.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos lumbricales del pie.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos lumbricales del pie.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cuadrado femoral.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo cuadrado femoral.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo gemelo inferior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo gemelo inferior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo gemelo superior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo gemelo superior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo piriforme.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo piriforme.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Obturador interno.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Obturador interno.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo glúteo medio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo glúteo medio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo glúteo máximo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo glúteo máximo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo glúteo mínimo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo glúteo mínimo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tensor de la fascia lata.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tracto iliotibial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tensor de la fascia lata.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tracto iliotibial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendon sheath of tibialis anterior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendon sheath of tibialis anterior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina tendinosa del extensor largo de los dedos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina tendinosa del extensor largo de los dedos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina tendinosa común de los músculos fibulares.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina tendinosa común de los músculos fibulares.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina tendinosa plantar del músculo fibular largo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina tendinosa plantar del músculo fibular largo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina tendinosa del flexor largo de los dedos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina tendinosa del flexor largo de los dedos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina tendinosa del flexor largo del hállux.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina tendinosa del flexor largo del hállux.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina tendinosa del músculo tibial posterior.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina tendinosa del músculo tibial posterior.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-lower-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa bicipitoradial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa bicipitoradial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subacromial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subacromial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subdeltoidea.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subdeltoidea.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendinosa del músculo infraespinoso.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendinosa del músculo infraespinoso.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendinosa del músculo redondo mayor.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendinosa del músculo redondo mayor.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendinosa del músculo trapecio.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendinosa del músculo trapecio.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendinosa del músculo tríceps braquial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Bolsa subtendinosa del músculo tríceps braquial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Coracobrachial bursa.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Coracobrachial bursa.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Subcutaneous acromial bursa.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Subcutaneous acromial bursa.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor largo del pulgar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor largo del pulgar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor profundo de los dedos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor profundo de los dedos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Pronador cuadrado.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Pronador cuadrado.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza humeral del flexor ulnar del carpo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza humeral del flexor ulnar del carpo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza humeroulnar del flexor superficial de los dedos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza humeroulnar del flexor superficial de los dedos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza profunda del pronador redondo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza profunda del pronador redondo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza radial del flexor superficial de los dedos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza radial del flexor superficial de los dedos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza superficial del pronador redondo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza superficial del pronador redondo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza ulnar del flexor ulnar del carpo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza ulnar del flexor ulnar del carpo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor radial del carpo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor radial del carpo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo palmar largo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo palmar largo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo braquial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo braquial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza corta músculo del bíceps braquial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza corta músculo del bíceps braquial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza larga del músculo bíceps braquial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza larga del músculo bíceps braquial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo coracobraquial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo coracobraquial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Abductor largo del pulgar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Abductor largo del pulgar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor corto del pulgar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor corto del pulgar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor del índice.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor del índice.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor largo del pulgar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor largo del pulgar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Supinador.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Supinador.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza humeral del extensor ulnar del carpo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza humeral del extensor ulnar del carpo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza ulnar del extensor ulnar del carpo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza ulnar del extensor ulnar del carpo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor de los dedos.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor de los dedos.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor del dedo mínimo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor del dedo mínimo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor radial corto del carpo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor radial corto del carpo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor radial largo del carpo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Extensor radial largo del carpo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo ancóneo.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo ancóneo.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo braquiorradial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo braquiorradial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza larga del músculo tríceps braquial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza larga del músculo tríceps braquial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza lateral del músculo tríceps braquial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza lateral del músculo tríceps braquial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza medial del músculo tríceps braquial.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza medial del músculo tríceps braquial.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Abductor corto del pulgar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Abductor corto del pulgar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Abductor del dedo mínimo de la mano.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Abductor del dedo mínimo de la mano.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza oblicua del aductor del pulgar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza oblicua del aductor del pulgar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza profunda del flexor corto del pulgar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza profunda del flexor corto del pulgar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza superficial del flexor corto del pulgar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza superficial del flexor corto del pulgar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza transversa del aductor del pulgar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cabeza transversa del aductor del pulgar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor del dedo mínimo de la mano.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Flexor del dedo mínimo de la mano.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oponente del dedo mínimo de la mano.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oponente del dedo mínimo de la mano.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oponente del pulgar.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo oponente del pulgar.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interóseos dorsales de la mano.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interóseos dorsales de la mano.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interóseos palmares.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos interóseos palmares.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos lumbricales de la mano.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculos lumbricales de la mano.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción acromial del músculo deltoides.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción acromial del músculo deltoides.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción clavicular del músculo deltoides.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción clavicular del músculo deltoides.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción espinal escapular del músculo deltoides.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Porción espinal escapular del músculo deltoides.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo redondo mayor.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo redondo mayor.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo infraespinoso.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo infraespinoso.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo redondo menor.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo redondo menor.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo subescapular.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo subescapular.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo supraespinoso.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Músculo supraespinoso.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendon sheath - abd. pollicis longus - ext. pollicis brevis.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendon sheath - abd. pollicis longus - ext. pollicis brevis.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendon sheath of extensor digitorum and extensor indicis.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendon sheath of extensor digitorum and extensor indicis.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendon sheath of extensors carpi radialis.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Tendon sheath of extensors carpi radialis.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina del tendón flexor común.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vaina del tendón flexor común.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cruciform part of fibrous sheath of digit of hand.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Cruciform part of fibrous sheath of digit of hand.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vainas sinoviales de los dedos de la mano.l",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  },
  {
    "modelKey": "overview",
    "originalName": "Vainas sinoviales de los dedos de la mano.r",
    "hasSelectableGeometry": true,
    "layer": "muscular-upper-limb"
  }
] as const satisfies readonly MuscularModelCatalogEntry[];
