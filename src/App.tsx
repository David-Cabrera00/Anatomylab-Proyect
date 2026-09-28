import { useState } from "react";
import "./App.css";

import AnatomyViewer, {
  type AnatomyLayer,
  type ViewerAction,
  type ViewerActionType,
  type StructureFocusRequest,
} from "./three/AnatomyViewer";

import {
  getSpanishStructureName,
  getStructureCategory,
} from "./utils/anatomyNames";

import {
  getCardiovascularStructure,
} from "./data/cardiovascular";

import {
  cardiovascularStudyGuide,
} from "./data/studyGuides";

/* =========================================
   MODELOS
========================================= */

const CARDIOVASCULAR_OVERVIEW_MODEL =
  "/models/cardiovascular/cardiovascular_overview_v2.glb";

const HEART_DETAIL_MODEL =
  "/models/cardiovascular/cardiovascular_bodyparts.glb";

/* =========================================
   VISTAS
========================================= */

type CardiovascularView =
  | "overview"
  | "heart-detail";

/* =========================================
   SISTEMAS
========================================= */

const systems = [
  "Cardiovascular",
  "Respiratorio",
  "Nervioso",
  "Esquelético",
  "Muscular",
  "Digestivo",
];

/* =========================================
   CAPAS
========================================= */

const layers: {
  id: AnatomyLayer;
  label: string;
}[] = [
  {
    id: "general",
    label: "General",
  },
  {
    id: "heart",
    label: "Corazón",
  },
  {
    id: "arteries",
    label: "Arterias",
  },
  {
    id: "veins",
    label: "Venas",
  },
  {
    id: "complete",
    label: "Completo",
  },
];

function App() {
  /* =========================================
     VISTA CARDIOVASCULAR
  ========================================= */

  const [
    cardiovascularView,
    setCardiovascularView,
  ] = useState<CardiovascularView>(
    "overview"
  );

  /* =========================================
     CAPA ACTIVA
  ========================================= */

  const [
    activeLayer,
    setActiveLayer,
  ] = useState<AnatomyLayer>(
    "general"
  );

  /* =========================================
     ESTRUCTURA SELECCIONADA
  ========================================= */

  const [
    selectedStructure,
    setSelectedStructure,
  ] = useState<string | null>(
    null
  );

  /* =========================================
     ACCIONES DEL VISOR
  ========================================= */

  const [
    viewerAction,
    setViewerAction,
  ] = useState<ViewerAction | null>(
    null
  );

  /* =========================================
     MODO ESTUDIO
  ========================================= */

  const [
    studyMode,
    setStudyMode,
  ] = useState(false);

  const [
    studyStepIndex,
    setStudyStepIndex,
  ] = useState(0);

  const [
    focusRequest,
    setFocusRequest,
  ] =
    useState<StructureFocusRequest | null>(
      null
    );

  const currentStudyStep =
    cardiovascularStudyGuide.steps[
      studyStepIndex
    ];

  const studyProgress =
    ((studyStepIndex + 1) /
      cardiovascularStudyGuide.steps
        .length) *
    100;

  /* =========================================
     ACCIONES
  ========================================= */

  const runViewerAction = (
    type: ViewerActionType
  ) => {
    setViewerAction(
      (previous) => ({
        type,
        id:
          (previous?.id ?? 0) +
          1,
      })
    );
  };

  /* =========================================
     MODELO ACTUAL
  ========================================= */

  const currentModel =
    cardiovascularView ===
    "heart-detail"
      ? HEART_DETAIL_MODEL
      : CARDIOVASCULAR_OVERVIEW_MODEL;

  const currentLayer:
    AnatomyLayer =
    cardiovascularView ===
    "heart-detail"
      ? "complete"
      : activeLayer;

  /* =========================================
     INFORMACIÓN ESTRUCTURA
  ========================================= */

  const selectedStructureName =
    selectedStructure
      ? getSpanishStructureName(
          selectedStructure
        )
      : null;

  const selectedStructureData =
    selectedStructure
      ? getCardiovascularStructure(
          selectedStructure
        )
      : null;

  const selectedCategory =
    selectedStructure
      ? getStructureCategory(
          selectedStructure
        )
      : null;

  /* =========================================
     EXPLORAR CORAZÓN
  ========================================= */

  const canExploreHeart =
    !studyMode &&
    cardiovascularView ===
      "overview" &&
    selectedStructure !== null &&
    selectedCategory === "heart";

  /* =========================================
     NOMBRE DE LA VISTA
  ========================================= */

  const activeViewName =
    cardiovascularView ===
    "heart-detail"
      ? "Corazón en detalle"
      : layers.find(
          (layer) =>
            layer.id ===
            activeLayer
        )?.label ?? "General";

  /* =========================================
     CAPA SEGÚN ESTRUCTURA
  ========================================= */

  const getLayerForStructure = (
    structureName: string
  ): AnatomyLayer => {
    const category =
      getStructureCategory(
        structureName
      );

    if (
      category === "heart"
    ) {
      return "heart";
    }

    if (
      category === "artery"
    ) {
      return "arteries";
    }

    if (
      category === "vein"
    ) {
      return "veins";
    }

    return "complete";
  };

  /* =========================================
     ENFOCAR ESTRUCTURA
  ========================================= */

  const focusStructure = (
    structureName: string
  ) => {
    setViewerAction(null);

    setActiveLayer(
      getLayerForStructure(
        structureName
      )
    );

    setFocusRequest(
      (previous) => ({
        structureName,
        id:
          (previous?.id ?? 0) +
          1,
      })
    );
  };

  /* =========================================
     IR A PASO DE ESTUDIO
  ========================================= */

  const goToStudyStep = (
    index: number
  ) => {
    const maxIndex =
      cardiovascularStudyGuide.steps
        .length - 1;

    const nextIndex =
      Math.min(
        maxIndex,
        Math.max(0, index)
      );

    const step =
      cardiovascularStudyGuide.steps[
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

  /* =========================================
     INICIAR ESTUDIO
  ========================================= */

  const startStudyMode = () => {
    setStudyMode(true);

    setSelectedStructure(
      null
    );

    setFocusRequest(null);

    setViewerAction(null);

    setCardiovascularView(
      "overview"
    );

    goToStudyStep(0);
  };

  /* =========================================
     FINALIZAR ESTUDIO
  ========================================= */

  const finishStudyMode =
    () => {
      setStudyMode(false);

      setStudyStepIndex(0);

      setFocusRequest(null);

      setSelectedStructure(
        null
      );

      setActiveLayer(
        "general"
      );

      setViewerAction(
        (previous) => ({
          type: "reset",
          id:
            (previous?.id ?? 0) +
            1,
        })
      );
    };

  /* =========================================
     CORAZÓN DETALLADO
  ========================================= */

  const openHeartDetail =
    () => {
      setStudyMode(false);

      setFocusRequest(null);

      setSelectedStructure(
        null
      );

      setViewerAction(null);

      setCardiovascularView(
        "heart-detail"
      );
    };

  /* =========================================
     VOLVER AL SISTEMA
  ========================================= */

  const returnToOverview =
    () => {
      setFocusRequest(null);

      setSelectedStructure(
        null
      );

      setViewerAction(null);

      setActiveLayer(
        "general"
      );

      setCardiovascularView(
        "overview"
      );
    };

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900">
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

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
          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-50">
            Progreso
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            DC
          </div>
        </div>
      </header>

      {/* ================================= */}
      {/* CONTENIDO PRINCIPAL */}
      {/* ================================= */}

      <main className="flex min-h-0 flex-1">
        {/* ================================= */}
        {/* SIDEBAR */}
        {/* ================================= */}

        <aside className="w-55 shrink-0 border-r border-slate-200 bg-white p-4">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Sistemas anatómicos
          </p>

          <nav className="space-y-1">
            {systems.map(
              (
                system,
                index
              ) => (
                <button
                  key={
                    system
                  }
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                    index === 0
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {system}
                </button>
              )
            )}
          </nav>

          <div className="mt-6 border-t border-slate-300 pt-5">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Aprendizaje
            </p>

            <button
              onClick={
                studyMode
                  ? finishStudyMode
                  : startStudyMode
              }
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                studyMode
                  ? "bg-amber-50 text-amber-800"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {studyMode
                ? "Salir del estudio"
                : "Modo estudio"}
            </button>

            <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100">
              Quiz anatómico
            </button>

            <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100">
              Tutor IA
            </button>
          </div>
        </aside>

        {/* ================================= */}
        {/* VISOR 3D */}
        {/* ================================= */}

        <section className="relative min-w-0 flex-1 overflow-hidden bg-slate-100">
          <AnatomyViewer
            key={
              cardiovascularView
            }
            modelPath={
              currentModel
            }
            layer={
              currentLayer
            }
            onStructureSelect={
              setSelectedStructure
            }
            action={
              viewerAction
            }
            focusRequest={
              focusRequest
            }
          />

          {/* ================================= */}
          {/* CAPAS */}
          {/* ================================= */}

          {cardiovascularView === "overview" &&
            !studyMode && (
              <div className="absolute left-1/2 top-5 z-10 flex -translate-x-1/2 gap-1 rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-sm backdrop-blur">
                {layers.map((layer) => (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => {
                      setFocusRequest(null);

                      setSelectedStructure(null);

                      setViewerAction(null);

                      setActiveLayer(
                        layer.id
                      );
                    }}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      activeLayer === layer.id
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {layer.label}
                  </button>
                ))}
              </div>
            )}

          {/* ================================= */}
          {/* CORAZÓN DETALLADO */}
          {/* ================================= */}

          {cardiovascularView ===
            "heart-detail" && (
            <div className="absolute left-1/2 top-5 z-10 flex -translate-x-1/2 items-center gap-3 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur">
              <button
                onClick={
                  returnToOverview
                }
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                ← Volver al sistema
              </button>

              <div className="h-5 w-px bg-slate-200" />

              <span className="pr-2 text-sm font-semibold text-slate-800">
                Corazón en detalle
              </span>
            </div>
          )}

          {/* ================================= */}
          {/* LEYENDA */}
          {/* ================================= */}

          {cardiovascularView ===
            "overview" &&
            !studyMode && (
              <div className="absolute left-5 top-5 z-10 rounded-xl border border-slate-200 bg-white/95 p-3 text-xs shadow-sm backdrop-blur">
                <p className="mb-2 font-semibold text-slate-700">
                  Capas anatómicas
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#8f2438]" />

                    <span className="text-slate-600">
                      Corazón
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#d94b59]" />

                    <span className="text-slate-600">
                      Arterias
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#4f6fa8]" />

                    <span className="text-slate-600">
                      Venas
                    </span>
                  </div>
                </div>
              </div>
            )}

          {/* ================================= */}
          {/* MODO ESTUDIO */}
          {/* ================================= */}

          {studyMode && (
            <div className="absolute left-5 top-5 z-20 w-[340px] max-h-[calc(100%-40px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lg backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                    Modo estudio
                  </p>

                  <h3 className="mt-1 text-base font-semibold text-slate-900">
                    {
                      cardiovascularStudyGuide.title
                    }
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={
                    finishStudyMode
                  }
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              {/* PROGRESO */}

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
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
                    className="h-full rounded-full bg-amber-500 transition-all duration-300"
                    style={{
                      width: `${studyProgress}%`,
                    }}
                  />
                </div>
              </div>

              {/* CONTENIDO */}

              <div className="mt-5">
                <h4 className="text-lg font-semibold text-slate-900">
                  {
                    currentStudyStep.title
                  }
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {
                    currentStudyStep.instruction
                  }
                </p>

                <div className="mt-4 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Pista
                  </p>

                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    {
                      currentStudyStep.hint
                    }
                  </p>
                </div>
              </div>

              {/* BOTONES */}

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
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                    className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
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
                    className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Siguiente →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================================= */}
          {/* TOOLBAR NORMAL */}
          {/* ================================= */}

          {!studyMode && (
            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur">
              <button
                type="button"
                onClick={() =>
                  runViewerAction(
                    "isolate"
                  )
                }
                disabled={
                  !selectedStructure
                }
                className="rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Aislar
              </button>

              <button
                type="button"
                onClick={() =>
                  runViewerAction(
                    "hide"
                  )
                }
                disabled={
                  !selectedStructure
                }
                className="rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Ocultar
              </button>

              <button
                type="button"
                onClick={() =>
                  runViewerAction(
                    "transparency"
                  )
                }
                disabled={
                  !selectedStructure
                }
                className="rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Transparencia
              </button>

              <button
                type="button"
                onClick={() =>
                  runViewerAction(
                    "reset"
                  )
                }
                className="rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100"
              >
                Restablecer
              </button>
            </div>
          )}
        </section>

        {/* ================================= */}
        {/* PANEL DERECHO */}
        {/* ================================= */}

        <aside className="w-80 shrink-0 overflow-y-auto border-l border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Estructura seleccionada
          </p>

          <div className="mt-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl">
              ♥
            </div>

            <h2 className="text-xl font-semibold">
              {selectedStructureName ??
                (cardiovascularView ===
                "heart-detail"
                  ? "Corazón"
                  : "Sistema cardiovascular")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sistema cardiovascular
            </p>

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

          {/* EXPLORAR CORAZÓN */}

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

          {/* DESCRIPCIÓN */}

          <div>
            <h3 className="text-sm font-semibold">
              Descripción
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {selectedStructureData
                ? selectedStructureData.description
                : selectedStructure
                  ? `Has seleccionado ${selectedStructureName}. Todavía estamos agregando información educativa para esta estructura.`
                  : cardiovascularView ===
                      "heart-detail"
                    ? "Explora las cavidades, válvulas y estructuras internas disponibles en el modelo detallado del corazón."
                    : "Selecciona una estructura del sistema cardiovascular para consultar su información anatómica."}
            </p>
          </div>

          {/* DATOS */}

          {selectedStructureData && (
            <>
              <div className="my-5 border-t border-slate-200" />

              <div>
                <h3 className="text-sm font-semibold">
                  Función
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {
                    selectedStructureData.function
                  }
                </p>
              </div>

              <div className="my-5 border-t border-slate-200" />

              <div>
                <h3 className="text-sm font-semibold">
                  Ubicación
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {
                    selectedStructureData.location
                  }
                </p>
              </div>

              <div className="my-5 border-t border-slate-200" />

              <div>
                <h3 className="text-sm font-semibold">
                  Relaciones anatómicas
                </h3>

                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {selectedStructureData.relationships.map(
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

          {/* IA */}

          <button
            type="button"
            disabled={
              !selectedStructure
            }
            className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Preguntar a Anatomy AI
          </button>
        </aside>
      </main>
    </div>
  );
}

export default App;