import type { LocalizedText } from "../i18n/localizedText";

/** Nombres visibles explícitos por Anatomy ID; no se derivan de slugs ni de nodos GLB. */
export const anatomyLocalizedDisplayNames: Readonly<Record<string, LocalizedText>> = {
  "respiratory.upper-lobe.left": {
    es: "Lóbulo superior del pulmón izquierdo",
    en: "Superior lobe of the left lung",
  },
  "muscular.pectoralis-major.left": {
    es: "Músculo pectoral mayor izquierdo",
    en: "Left pectoralis major muscle",
  },
  "muscular.pectoralis-major.right": {
    es: "Músculo pectoral mayor derecho",
    en: "Right pectoralis major muscle",
  },
};
