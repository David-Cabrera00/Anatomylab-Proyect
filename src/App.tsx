import {
  useCallback,
  useState,
} from "react";

import "./App.css";

import { Badge, Button, Card } from "./components/ui";

import AnatomyViewer, {
  type ViewerAction,
  type ViewerActionType,
  type StructureFocusRequest,
} from "./three/AnatomyViewer";

import {
  anatomySystems,
  anatomySystemList,
  type AnatomyLayerId,
  type AnatomySystemId,
} from "./config/anatomySystems";

import {
  getStructureCategory,
} from "./utils/cardiovascular/cardiovascularNames";

import {
  getSystemStructureName,
} from "./utils/systemNames";

import {
  getCardiovascularStructure,
} from "./data/cardiovascular";

import {
  getRespiratoryStructure,
} from "./data/respiratory";

import {
  cardiovascularStudyGuide,
} from "./data/studyGuides";

/* ======================================================
   VISTA CARDIOVASCULAR
====================================================== */

type CardiovascularView =
  | "overview"
  | "heart-detail";

/* ======================================================
   SÍMBOLOS TEMPORALES

   Más adelante podemos reemplazarlos por iconos.
====================================================== */

const systemSymbols: Record<
  AnatomySystemId,
  string
> = {
  cardiovascular:
    "♥",

  respiratory:
    "R",

  nervous:
    "N",

  skeletal:
    "E",

  muscular:
    "M",

  digestive:
    "D",
};

/* ======================================================
   TEXTO INICIAL DE CADA SISTEMA
====================================================== */

const systemDescriptions: Record<
  AnatomySystemId,
  string
> = {
  cardiovascular:
    "Selecciona una estructura del sistema cardiovascular para consultar su información anatómica.",

  respiratory:
    "Selecciona una estructura del sistema respiratorio para consultar su información anatómica.",

  nervous:
    "Selecciona una estructura del sistema nervioso para identificar sus componentes anatómicos.",

  skeletal:
    "Selecciona una estructura del sistema esquelético para identificar huesos y regiones anatómicas.",

  muscular:
    "Selecciona una estructura del sistema muscular para identificar los músculos del cuerpo humano.",

  digestive:
    "Selecciona una estructura del sistema digestivo para identificar órganos y estructuras relacionadas.",
};

/* ======================================================
   APP
====================================================== */

function App() {
  /* ====================================================
     SISTEMA ACTIVO
  ==================================================== */

  const [
    activeSystem,
    setActiveSystem,
  ] =
    useState<AnatomySystemId>(
      "cardiovascular"
    );

  /* ====================================================
     CARDIOVASCULAR
  ==================================================== */

  const [
    cardiovascularView,
    setCardiovascularView,
  ] =
    useState<CardiovascularView>(
      "overview"
    );

  /* ====================================================
     CAPA
  ==================================================== */

  const [
    activeLayer,
    setActiveLayer,
  ] =
    useState<AnatomyLayerId>(
      "general"
    );

  /* ====================================================
     ESTRUCTURA SELECCIONADA
  ==================================================== */

  const [
    selectedStructure,
    setSelectedStructure,
  ] =
    useState<
      string | null
    >(
      null
    );

  const [selectedThreeName, setSelectedThreeName] = useState<string | null>(null);

  const handleStructureSelect = useCallback((
    originalName: string | null,
    threeName: string | null = null
  ) => {
    setSelectedStructure(originalName);
    setSelectedThreeName(threeName);
  }, []);

  /* ====================================================
     ACCIÓN DEL VISOR
  ==================================================== */

  const [
    viewerAction,
    setViewerAction,
  ] =
    useState<
      ViewerAction | null
    >(
      null
    );

  /* ====================================================
     ENFOQUE
  ==================================================== */

  const [
    focusRequest,
    setFocusRequest,
  ] =
    useState<
      StructureFocusRequest | null
    >(
      null
    );

  /* ====================================================
     MODO ESTUDIO
  ==================================================== */

  const [
    studyMode,
    setStudyMode,
  ] =
    useState(
      false
    );

  const [
    studyStepIndex,
    setStudyStepIndex,
  ] =
    useState(
      0
    );

  /* ====================================================
     CONFIGURACIÓN ACTUAL
  ==================================================== */

  const activeConfig =
    anatomySystems[
      activeSystem
    ];

  /* ====================================================
     CAPAS
  ==================================================== */

  const activeLayers =
    activeConfig.layers;

  /* ====================================================
     GUÍA ACTUAL
  ==================================================== */

  const currentStudyStep =
    cardiovascularStudyGuide
      .steps[
      studyStepIndex
    ];

  const studyProgress =
    ((studyStepIndex +
      1) /
      cardiovascularStudyGuide
        .steps.length) *
    100;

  /* ====================================================
     MODELO ACTUAL
  ==================================================== */

  const heartDetailModel =
    anatomySystems
      .cardiovascular
      .detailModels
      ?.heart;

  let currentModel =
    activeConfig
      .modelPath;

  if (
    activeSystem ===
      "cardiovascular" &&
    cardiovascularView ===
      "heart-detail" &&
    heartDetailModel
  ) {
    currentModel =
      heartDetailModel;
  }

  /* ====================================================
     CAPA ACTUAL
  ==================================================== */

  const currentLayer:
    AnatomyLayerId =
    activeSystem ===
      "cardiovascular" &&
    cardiovascularView ===
      "heart-detail"
      ? "complete"
      : activeLayer;

  /* ====================================================
     NOMBRE DE ESTRUCTURA
  ==================================================== */

  const selectedStructureName =
    selectedStructure
      ? getSystemStructureName(
          activeSystem,
          selectedStructure
        )
      : null;

  /* ====================================================
     INFORMACIÓN EDUCATIVA
  ==================================================== */

  const selectedStructureData =
    selectedStructure
      ? activeSystem ===
        "cardiovascular"
        ? getCardiovascularStructure(
            selectedThreeName ?? selectedStructure
          )
        : activeSystem ===
            "respiratory"
          ? getRespiratoryStructure(
              selectedStructure
            )
          : null
      : null;

  /* ====================================================
     CATEGORÍA CARDIOVASCULAR
  ==================================================== */

  const selectedCardiovascularCategory =
    activeSystem ===
      "cardiovascular" &&
    selectedStructure
      ? getStructureCategory(
          selectedThreeName ?? selectedStructure
        )
      : null;

  /* ====================================================
     CORAZÓN DETALLADO
  ==================================================== */

  const canExploreHeart =
    activeSystem ===
      "cardiovascular" &&
    !studyMode &&
    cardiovascularView ===
      "overview" &&
    selectedStructure !==
      null &&
    selectedCardiovascularCategory ===
      "heart";

  /* ====================================================
     NOMBRE DE VISTA
  ==================================================== */

  const activeViewName =
    activeSystem ===
      "cardiovascular" &&
    cardiovascularView ===
      "heart-detail"
      ? "Corazón en detalle"
      : activeLayers.find(
          (layer) =>
            layer.id ===
            activeLayer
        )?.label ??
        "General";

  /* ====================================================
     EJECUTAR ACCIÓN
  ==================================================== */

  const runViewerAction = (
    type:
      ViewerActionType
  ) => {
    setViewerAction(
      (previous) => ({
        type,

        id:
          (previous?.id ??
            0) +
          1,
      })
    );
  };

  /* ====================================================
     CAMBIAR SISTEMA
  ==================================================== */

  const changeSystem = (
    systemId:
      AnatomySystemId
  ) => {
    if (
      systemId ===
      activeSystem
    ) {
      return;
    }

    setStudyMode(
      false
    );

    setStudyStepIndex(
      0
    );

    setFocusRequest(
      null
    );

    handleStructureSelect(
      null
    );

    setViewerAction(
      null
    );

    setCardiovascularView(
      "overview"
    );

    setActiveLayer(
      "general"
    );

    setActiveSystem(
      systemId
    );
  };

  /* ====================================================
     CAMBIAR CAPA
  ==================================================== */

  const changeLayer = (
    layer:
      AnatomyLayerId
  ) => {
    setFocusRequest(
      null
    );

    handleStructureSelect(
      null
    );

    setViewerAction(
      null
    );

    setActiveLayer(
      layer
    );
  };

  /* ====================================================
     CAPA PARA MODO ESTUDIO
  ==================================================== */

  const getLayerForStudyStructure =
    (
      structureName:
        string
    ): AnatomyLayerId => {
      const category =
        getStructureCategory(
          structureName
        );

      if (
        category ===
        "heart"
      ) {
        return "heart";
      }

      if (
        category ===
        "artery"
      ) {
        return "arteries";
      }

      if (
        category ===
        "vein"
      ) {
        return "veins";
      }

      return "complete";
    };

  /* ====================================================
     ENFOCAR ESTRUCTURA
  ==================================================== */

  const focusStructure = (
    structureName:
      string
  ) => {
    setViewerAction(
      null
    );

    setActiveLayer(
      getLayerForStudyStructure(
        structureName
      )
    );

    setFocusRequest(
      (previous) => ({
        structureName,

        id:
          (previous?.id ??
            0) +
          1,
      })
    );
  };

  /* ====================================================
     IR A PASO
  ==================================================== */

  const goToStudyStep = (
    index:
      number
  ) => {
    if (
      activeSystem !==
      "cardiovascular"
    ) {
      return;
    }

    const maxIndex =
      cardiovascularStudyGuide
        .steps.length -
      1;

    const nextIndex =
      Math.min(
        maxIndex,
        Math.max(
          0,
          index
        )
      );

    const step =
      cardiovascularStudyGuide
        .steps[
        nextIndex
      ];

    setCardiovascularView(
      "overview"
    );

    setStudyStepIndex(
      nextIndex
    );

    focusStructure(
      step.structureId
    );
  };

  /* ====================================================
     INICIAR ESTUDIO
  ==================================================== */

  const startStudyMode =
    () => {
      if (
        !activeConfig
          .studyAvailable
      ) {
        return;
      }

      if (
        activeSystem !==
        "cardiovascular"
      ) {
        return;
      }

      setStudyMode(
        true
      );

      handleStructureSelect(
        null
      );

      setFocusRequest(
        null
      );

      setViewerAction(
        null
      );

      setCardiovascularView(
        "overview"
      );

      goToStudyStep(
        0
      );
    };

  /* ====================================================
     FINALIZAR ESTUDIO
  ==================================================== */

  const finishStudyMode =
    () => {
      setStudyMode(
        false
      );

      setStudyStepIndex(
        0
      );

      setFocusRequest(
        null
      );

      handleStructureSelect(
        null
      );

      setActiveLayer(
        "general"
      );

      setViewerAction(
        (previous) => ({
          type:
            "reset",

          id:
            (previous?.id ??
              0) +
            1,
        })
      );
    };

  /* ====================================================
     ABRIR CORAZÓN
  ==================================================== */

  const openHeartDetail =
    () => {
      if (
        !heartDetailModel
      ) {
        return;
      }

      setStudyMode(
        false
      );

      setFocusRequest(
        null
      );

      handleStructureSelect(
        null
      );

      setViewerAction(
        null
      );

      setCardiovascularView(
        "heart-detail"
      );
    };

  /* ====================================================
     VOLVER AL SISTEMA CARDIOVASCULAR
  ==================================================== */

  const returnToOverview =
    () => {
      setFocusRequest(
        null
      );

      handleStructureSelect(
        null
      );

      setViewerAction(
        null
      );

      setActiveLayer(
        "general"
      );

      setCardiovascularView(
        "overview"
      );
    };

  /* ====================================================
     RENDER
  ==================================================== */

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900">
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            AnatomyLab AI
          </h1>

          <p className="text-xs text-slate-500">
            Plataforma interactiva
            de aprendizaje
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
          >
            Progreso
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            DC
          </div>
        </div>
      </header>

      {/* =================================================
          CONTENIDO
      ================================================= */}

      <main className="flex min-h-0 flex-1">
        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="w-55 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Sistemas anatómicos
          </p>

          <nav className="space-y-1">
            {anatomySystemList.map(
              (system) => {
                const isActive =
                  activeSystem ===
                  system.id;

                return (
                  <Button
                    key={
                      system.id
                    }
                    variant="ghost"
                    size="md"
                    align="start"
                    selected={isActive}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() =>
                      changeSystem(
                        system.id
                      )
                    }
                    className="w-full"
                  >
                    {
                      system.label
                    }
                  </Button>
                );
              }
            )}
          </nav>

          {/* =================================================
              APRENDIZAJE
          ================================================= */}

          <div className="mt-6 border-t border-slate-300 pt-5">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Aprendizaje
            </p>

            <button
              type="button"
              disabled={
                !activeConfig
                  .studyAvailable &&
                !studyMode
              }
              onClick={
                studyMode
                  ? finishStudyMode
                  : startStudyMode
              }
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                studyMode
                  ? "bg-amber-50 text-amber-800"
                  : activeConfig
                        .studyAvailable
                    ? "text-slate-600 hover:bg-slate-100"
                    : "cursor-not-allowed text-slate-300"
              }`}
            >
              {studyMode
                ? "Salir del estudio"
                : "Modo estudio"}
            </button>

            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-300"
            >
              Quiz anatómico
            </button>

            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-300"
            >
              Tutor IA
            </button>
          </div>
        </aside>

        {/* =================================================
            VISOR 3D
        ================================================= */}

        <section className="relative min-w-0 flex-1 overflow-hidden bg-slate-100">
          <AnatomyViewer
            /*
             * Esta key es importante.
             *
             * Al cambiar de sistema se destruye
             * completamente el visor anterior y
             * se monta uno nuevo.
             */
            key={`${activeSystem}-${cardiovascularView}`}
            system={
              activeSystem
            }
            modelPath={
              currentModel
            }
            layer={
              currentLayer
            }
            onStructureSelect={
              handleStructureSelect
            }
            action={
              viewerAction
            }
            focusRequest={
              focusRequest
            }
          />

          {/* =================================================
              CAPAS
          ================================================= */}

          {!studyMode &&
            !(
              activeSystem ===
                "cardiovascular" &&
              cardiovascularView ===
                "heart-detail"
            ) && (
              <div className="absolute left-1/2 top-5 z-10 flex -translate-x-1/2 gap-1 rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-sm backdrop-blur">
                {activeLayers.map(
                  (layer) => (
                    <button
                      key={
                        layer.id
                      }
                      type="button"
                      onClick={() =>
                        changeLayer(
                          layer.id
                        )
                      }
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                        activeLayer ===
                        layer.id
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {
                        layer.label
                      }
                    </button>
                  )
                )}
              </div>
            )}

          {/* =================================================
              CORAZÓN DETALLADO
          ================================================= */}

          {activeSystem ===
            "cardiovascular" &&
            cardiovascularView ===
              "heart-detail" && (
              <div className="absolute left-1/2 top-5 z-10 flex -translate-x-1/2 items-center gap-3 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur">
                <button
                  type="button"
                  onClick={
                    returnToOverview
                  }
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                >
                  ← Volver al sistema
                </button>

                <div className="h-5 w-px bg-slate-200" />

                <span className="pr-2 text-sm font-semibold">
                  Corazón en detalle
                </span>
              </div>
            )}

          {/* =================================================
              LEYENDA
          ================================================= */}

          {!studyMode &&
            !(
              activeSystem ===
                "cardiovascular" &&
              cardiovascularView ===
                "heart-detail"
            ) &&
            activeConfig
              .legend.length >
              0 && (
              <div className="absolute left-5 top-5 z-10 rounded-xl border border-slate-200 bg-white/95 p-3 text-xs shadow-sm backdrop-blur">
                <p className="mb-2 font-semibold text-slate-700">
                  Capas anatómicas
                </p>

                <div className="space-y-2">
                  {activeConfig.legend.map(
                    (
                      item
                    ) => (
                      <div
                        key={
                          item.label
                        }
                        className="flex items-center gap-2"
                      >
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor:
                              item.color,
                          }}
                        />

                        <span>
                          {
                            item.label
                          }
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* =================================================
              MODO ESTUDIO
          ================================================= */}

          {studyMode && (
            <div className="absolute left-5 top-5 z-20 w-[340px] max-h-[calc(100%-40px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lg backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                    Modo estudio
                  </p>

                  <h3 className="mt-1 text-base font-semibold">
                    {
                      cardiovascularStudyGuide
                        .title
                    }
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={
                    finishStudyMode
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-slate-400 hover:bg-slate-100"
                >
                  ×
                </button>
              </div>

              {/* =================================================
                  PROGRESO
              ================================================= */}

              <div className="mt-4">
                <div className="mb-2 flex justify-between text-xs text-slate-500">
                  <span>
                    Paso{" "}
                    {studyStepIndex +
                      1}{" "}
                    de{" "}
                    {
                      cardiovascularStudyGuide
                        .steps.length
                    }
                  </span>

                  <span>
                    {Math.round(
                      studyProgress
                    )}
                    %
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all"
                    style={{
                      width: `${studyProgress}%`,
                    }}
                  />
                </div>
              </div>

              {/* =================================================
                  PASO
              ================================================= */}

              <div className="mt-5">
                <h4 className="text-lg font-semibold">
                  {
                    currentStudyStep
                      .title
                  }
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {
                    currentStudyStep
                      .instruction
                  }
                </p>

                <div className="mt-4 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Pista
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {
                      currentStudyStep
                        .hint
                    }
                  </p>
                </div>
              </div>

              {/* =================================================
                  NAVEGACIÓN
              ================================================= */}

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  disabled={
                    studyStepIndex ===
                    0
                  }
                  onClick={() =>
                    goToStudyStep(
                      studyStepIndex -
                        1
                    )
                  }
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-40"
                >
                  ← Anterior
                </button>

                {studyStepIndex ===
                cardiovascularStudyGuide
                  .steps.length -
                  1 ? (
                  <button
                    type="button"
                    onClick={
                      finishStudyMode
                    }
                    className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
                  >
                    Finalizar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      goToStudyStep(
                        studyStepIndex +
                          1
                      )
                    }
                    className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
                  >
                    Siguiente →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* =================================================
              TOOLBAR
          ================================================= */}

          {!studyMode && (
            <Card variant="floating" className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1 p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  runViewerAction(
                    "isolate"
                  )
                }
                disabled={
                  !selectedStructure
                }
              >
                Aislar
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  runViewerAction(
                    "hide"
                  )
                }
                disabled={
                  !selectedStructure
                }
              >
                Ocultar
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  runViewerAction(
                    "transparency"
                  )
                }
                disabled={
                  !selectedStructure
                }
              >
                Transparencia
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  runViewerAction(
                    "reset"
                  )
                }
              >
                Restablecer
              </Button>
            </Card>
          )}
        </section>

        {/* =================================================
            PANEL DERECHO
        ================================================= */}

        <aside className="w-80 shrink-0 overflow-y-auto border-l border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Estructura seleccionada
          </p>

          {/* =================================================
              IDENTIFICACIÓN
          ================================================= */}

          <div className="mt-5">
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-lg font-semibold"
              style={{
                backgroundColor:
                  activeConfig
                    .accentColor,

                color:
                  activeConfig
                    .color,
              }}
            >
              {
                systemSymbols[
                  activeSystem
                ]
              }
            </div>

            <h2 className="break-words text-xl font-semibold">
              {selectedStructureName ??
                activeConfig
                  .fullName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {
                activeConfig
                  .fullName
              }
            </p>

            {/* =================================================
                TIPO
            ================================================= */}

            {selectedStructureData && (
              <Badge className="mt-2">
                {
                  selectedStructureData
                    .type
                }
              </Badge>
            )}

            <p className="mt-2 text-xs font-medium text-slate-400">
              Vista:{" "}
              {
                activeViewName
              }
            </p>

            {studyMode && (
              <div className="mt-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                Estudio{" "}
                {studyStepIndex +
                  1}
                /
                {
                  cardiovascularStudyGuide
                    .steps.length
                }
              </div>
            )}
          </div>

          {/* =================================================
              EXPLORAR CORAZÓN
          ================================================= */}

          {canExploreHeart && (
            <button
              type="button"
              onClick={
                openHeartDetail
              }
              className="mt-5 w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800 transition hover:bg-red-100"
            >
              Explorar corazón en detalle →
            </button>
          )}

          <div className="my-5 border-t border-slate-200" />

          {/* =================================================
              DESCRIPCIÓN
          ================================================= */}

          <div>
            <h3 className="text-sm font-semibold">
              Descripción
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {selectedStructureData
                ? selectedStructureData
                    .description
                : selectedStructure
                  ? activeSystem ===
                      "nervous"
                    ? `Has seleccionado ${selectedStructureName}. La información educativa del sistema nervioso se añadirá en la siguiente fase.`
                    : activeSystem ===
                        "skeletal"
                      ? `Has seleccionado ${selectedStructureName}. La información educativa del sistema esquelético se añadirá en la siguiente fase.`
                      : activeSystem ===
                          "muscular"
                        ? `Has seleccionado ${selectedStructureName}. La información educativa del sistema muscular se añadirá en la siguiente fase.`
                        : activeSystem ===
                            "digestive"
                          ? `Has seleccionado ${selectedStructureName}. La información educativa del sistema digestivo se añadirá en la siguiente fase.`
                          : `Has seleccionado ${selectedStructureName}. Todavía estamos agregando información educativa específica para esta estructura.`
                  : activeSystem ===
                        "cardiovascular" &&
                      cardiovascularView ===
                        "heart-detail"
                    ? "Explora las cavidades, válvulas y estructuras internas disponibles en el modelo detallado del corazón."
                    : systemDescriptions[
                        activeSystem
                      ]}
            </p>
          </div>

          {/* =================================================
              INFORMACIÓN EDUCATIVA
          ================================================= */}

          {selectedStructureData && (
            <>
              <div className="my-5 border-t border-slate-200" />

              {/* FUNCIÓN */}

              <div>
                <h3 className="text-sm font-semibold">
                  Función
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {
                    selectedStructureData
                      .function
                  }
                </p>
              </div>

              <div className="my-5 border-t border-slate-200" />

              {/* UBICACIÓN */}

              <div>
                <h3 className="text-sm font-semibold">
                  Ubicación
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {
                    selectedStructureData
                      .location
                  }
                </p>
              </div>

              <div className="my-5 border-t border-slate-200" />

              {/* RELACIONES */}

              <div>
                <h3 className="text-sm font-semibold">
                  Relaciones anatómicas
                </h3>

                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {selectedStructureData
                    .relationships
                    .map(
                      (
                        relationship
                      ) => (
                        <li
                          key={
                            relationship
                          }
                          className="flex gap-2"
                        >
                          <span className="text-slate-400">
                            •
                          </span>

                          <span>
                            {
                              relationship
                            }
                          </span>
                        </li>
                      )
                    )}
                </ul>
              </div>
            </>
          )}

          {/* =================================================
              ANATOMY AI
          ================================================= */}

          <button
            type="button"
            disabled={
              !selectedStructure
            }
            className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Preguntar a Anatomy AI
          </button>
        </aside>
      </main>
    </div>
  );
}

export default App;
