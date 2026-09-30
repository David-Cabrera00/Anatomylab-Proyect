/* ======================================================
   ANATOMYLAB AI
   CONFIGURACIÓN DE SISTEMAS ANATÓMICOS
====================================================== */

export type AnatomySystemId =
  | "cardiovascular"
  | "respiratory"
  | "nervous"
  | "skeletal"
  | "muscular"
  | "digestive";

/* ======================================================
   CAPAS
====================================================== */

export type AnatomyLayerId =
  | "general"
  | "complete"

  /* Cardiovascular */
  | "heart"
  | "arteries"
  | "veins"

  /* Respiratorio */
  | "lungs"
  | "airways"
  | "upper-airway"

  /* Nervioso */
  | "nervous-central"
  | "nervous-peripheral"

  /* Esquelético */
  | "skeletal-axial"
  | "skeletal-appendicular"

  /* Muscular */
  | "muscular-head-neck"
  | "muscular-trunk"
  | "muscular-upper-limb"
  | "muscular-lower-limb"

  /* Digestivo */
  | "digestive-tract"
  | "digestive-accessory";

/* ======================================================
   TIPOS
====================================================== */

export type AnatomyLayerOption = {
  id: AnatomyLayerId;

  label: string;
};

export type AnatomyLegendItem = {
  label: string;

  color: string;
};

export type AnatomyDetailModels = {
  heart?: string;
};

export type AnatomySystemConfig = {
  id: AnatomySystemId;

  label: string;

  fullName: string;

  modelPath: string;

  color: string;

  accentColor: string;

  viewerSize: number;

  layers: AnatomyLayerOption[];

  legend: AnatomyLegendItem[];

  studyAvailable: boolean;

  detailModels?: AnatomyDetailModels;
};

/* ======================================================
   SISTEMAS
====================================================== */

export const anatomySystems: Record<
  AnatomySystemId,
  AnatomySystemConfig
> = {
  /* ====================================================
     CARDIOVASCULAR
  ==================================================== */

  cardiovascular: {
    id:
      "cardiovascular",

    label:
      "Cardiovascular",

    fullName:
      "Sistema cardiovascular",

    modelPath:
      "/models/cardiovascular/cardiovascular_overview_v2.glb",

    color:
      "#8f2438",

    accentColor:
      "#fee2e2",

    viewerSize:
      5.8,

    studyAvailable:
      true,

    detailModels: {
      heart:
        "/models/cardiovascular/cardiovascular_bodyparts.glb",
    },

    layers: [
      {
        id:
          "general",

        label:
          "General",
      },

      {
        id:
          "heart",

        label:
          "Corazón",
      },

      {
        id:
          "arteries",

        label:
          "Arterias",
      },

      {
        id:
          "veins",

        label:
          "Venas",
      },

      {
        id:
          "complete",

        label:
          "Completo",
      },
    ],

    legend: [
      {
        label:
          "Corazón",

        color:
          "#8f2438",
      },

      {
        label:
          "Arterias",

        color:
          "#d94b59",
      },

      {
        label:
          "Venas",

        color:
          "#4f6fa8",
      },
    ],
  },

  /* ====================================================
     RESPIRATORIO
  ==================================================== */

  respiratory: {
    id:
      "respiratory",

    label:
      "Respiratorio",

    fullName:
      "Sistema respiratorio",

    modelPath:
      "/models/respiratory/respiratory_overview.glb",

    color:
      "#b97882",

    accentColor:
      "#fce7f3",

    viewerSize:
      6,

    studyAvailable:
      false,

    layers: [
      {
        id:
          "general",

        label:
          "General",
      },

      {
        id:
          "lungs",

        label:
          "Pulmones",
      },

      {
        id:
          "airways",

        label:
          "Vías respiratorias",
      },

      {
        id:
          "upper-airway",

        label:
          "Vía aérea superior",
      },

      {
        id:
          "complete",

        label:
          "Completo",
      },
    ],

    legend: [
      {
        label:
          "Pulmones",

        color:
          "#b97882",
      },

      {
        label:
          "Vías respiratorias",

        color:
          "#7896a8",
      },

      {
        label:
          "Vía aérea superior",

        color:
          "#9c87aa",
      },
    ],
  },

  /* ====================================================
     NERVIOSO
  ==================================================== */

  nervous: {
    id:
      "nervous",

    label:
      "Nervioso",

    fullName:
      "Sistema nervioso",

    modelPath:
      "/models/nervous/nervous_overview.glb",

    color:
      "#d6a84b",

    accentColor:
      "#fef3c7",

    viewerSize:
      5.8,

    studyAvailable:
      false,

    layers: [
      {
        id:
          "general",

        label:
          "General",
      },

      {
        id:
          "nervous-central",

        label:
          "Central",
      },

      {
        id:
          "nervous-peripheral",

        label:
          "Periférico",
      },

      {
        id:
          "complete",

        label:
          "Completo",
      },
    ],

    legend: [
      {
        label:
          "Sistema nervioso central",

        color:
          "#d6a84b",
      },

      {
        label:
          "Sistema nervioso periférico",

        color:
          "#e4c978",
      },
    ],
  },

  /* ====================================================
     ESQUELÉTICO
  ==================================================== */

  skeletal: {
    id:
      "skeletal",

    label:
      "Esquelético",

    fullName:
      "Sistema esquelético",

    modelPath:
      "/models/skeletal/skeletal_overview.glb",

    color:
      "#d8d1c4",

    accentColor:
      "#f1f5f9",

    viewerSize:
      5.8,

    studyAvailable:
      false,

    layers: [
      {
        id:
          "general",

        label:
          "General",
      },

      {
        id:
          "skeletal-axial",

        label:
          "Axial",
      },

      {
        id:
          "skeletal-appendicular",

        label:
          "Apendicular",
      },

      {
        id:
          "complete",

        label:
          "Completo",
      },
    ],

    legend: [
      {
        label:
          "Esqueleto axial",

        color:
          "#d8d1c4",
      },

      {
        label:
          "Esqueleto apendicular",

        color:
          "#b9c1ca",
      },
    ],
  },

  /* ====================================================
     MUSCULAR
  ==================================================== */

  muscular: {
    id:
      "muscular",

    label:
      "Muscular",

    fullName:
      "Sistema muscular",

    modelPath:
      "/models/muscular/muscular_overview.glb",

    color:
      "#a64b4b",

    accentColor:
      "#fee2e2",

    viewerSize:
      5.8,

    studyAvailable:
      false,

    layers: [
      {
        id:
          "general",

        label:
          "General",
      },

      {
        id:
          "muscular-head-neck",

        label:
          "Cabeza y cuello",
      },

      {
        id:
          "muscular-trunk",

        label:
          "Tronco",
      },

      {
        id:
          "muscular-upper-limb",

        label:
          "Miembros superiores",
      },

      {
        id:
          "muscular-lower-limb",

        label:
          "Miembros inferiores",
      },

      {
        id:
          "complete",

        label:
          "Completo",
      },
    ],

    legend: [
      {
        label:
          "Cabeza y cuello",

        color:
          "#9f5656",
      },

      {
        label:
          "Tronco",

        color:
          "#a64b4b",
      },

      {
        label:
          "Miembros superiores",

        color:
          "#bd6666",
      },

      {
        label:
          "Miembros inferiores",

        color:
          "#874040",
      },
    ],
  },

  /* ====================================================
     DIGESTIVO
  ==================================================== */

  digestive: {
    id:
      "digestive",

    label:
      "Digestivo",

    fullName:
      "Sistema digestivo",

    modelPath:
      "/models/digestive/digestive_overview.glb",

    color:
      "#a87544",

    accentColor:
      "#ffedd5",

    viewerSize:
      6,

    studyAvailable:
      false,

    layers: [
      {
        id:
          "general",

        label:
          "General",
      },

      {
        id:
          "digestive-tract",

        label:
          "Tubo digestivo",
      },

      {
        id:
          "digestive-accessory",

        label:
          "Órganos accesorios",
      },

      {
        id:
          "complete",

        label:
          "Completo",
      },
    ],

    legend: [
      {
        label:
          "Tubo digestivo",

        color:
          "#b87949",
      },

      {
        label:
          "Órganos accesorios",

        color:
          "#d2a15f",
      },
    ],
  },
};

/* ======================================================
   LISTA PARA SIDEBAR
====================================================== */

export const anatomySystemList =
  Object.values(
    anatomySystems
  );