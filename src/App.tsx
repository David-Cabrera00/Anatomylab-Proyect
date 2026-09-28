import { useState } from "react";
import "./App.css";

import AnatomyViewer, {
  type AnatomyLayer,
  type ViewerAction,
  type ViewerActionType,
} from "./three/AnatomyViewer";

import {
  getSpanishStructureName,
  getStructureCategory,
} from "./utils/anatomyNames";

import {
  getCardiovascularStructure,
} from "./data/cardiovascular";

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

  /*
   * En el corazón detallado
   * mostramos todos sus meshes.
   */
  const currentLayer:
    AnatomyLayer =
    cardiovascularView ===
    "heart-detail"
      ? "complete"
      : activeLayer;

  /* =========================================
     DATOS DE LA ESTRUCTURA
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
     ENTRAR AL CORAZÓN
  ========================================= */

  const openHeartDetail = () => {
  setSelectedStructure(null);

  setViewerAction(null);

  setCardiovascularView(
    "heart-detail"
  );
};
  /* =========================================
     VOLVER AL SISTEMA
  ========================================= */

const returnToOverview = () => {
  setSelectedStructure(null);

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
              (system, index) => (
                <button
                  key={system}
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

            <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100">
              Modo estudio
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
            key={cardiovascularView}
            modelPath={currentModel}
            layer={currentLayer}
            onStructureSelect={
              setSelectedStructure
            }
            action={viewerAction}
          />

          {/* ================================= */}
          {/* CAPAS */}
          {/* ================================= */}

          {cardiovascularView ===
            "overview" && (
            <div className="absolute left-1/2 top-5 z-10 flex -translate-x-1/2 gap-1 rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-sm backdrop-blur">
              {layers.map(
                (layer) => (
                  <button
                    key={
                      layer.id
                    }
                    onClick={() => {
                      setSelectedStructure(
                        null
                      );

                      setViewerAction(
                        null
                      );

                      setActiveLayer(
                        layer.id
                      );
                    }}
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
                ← Volver al
                sistema
              </button>

              <div className="h-5 w-px bg-slate-200" />

              <span className="pr-2 text-sm font-semibold text-slate-800">
                Corazón en
                detalle
              </span>
            </div>
          )}

          {/* ================================= */}
          {/* LEYENDA */}
          {/* ================================= */}

          {cardiovascularView ===
            "overview" && (
            <div className="absolute left-5 top-5 z-10 rounded-xl border border-slate-200 bg-white/95 p-3 text-xs shadow-sm backdrop-blur">
              <p className="mb-2 font-semibold text-slate-700">
                Capas
                anatómicas
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
          {/* TOOLBAR */}
          {/* ================================= */}

          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur">
            <button
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
        </section>

        {/* ================================= */}
        {/* PANEL DERECHO */}
        {/* ================================= */}

        <aside className="w-80 shrink-0 overflow-y-auto border-l border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Estructura
            seleccionada
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
              Sistema
              cardiovascular
            </p>

            <p className="mt-2 text-xs font-medium text-slate-400">
              Vista:{" "}
              {
                activeViewName
              }
            </p>
          </div>

          {/* ================================= */}
          {/* EXPLORAR CORAZÓN */}
          {/* ================================= */}

          {canExploreHeart && (
            <button
              onClick={
                openHeartDetail
              }
              className="mt-5 w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800 transition hover:bg-red-100"
            >
              Explorar corazón
              en detalle →
            </button>
          )}

          <div className="my-5 border-t border-slate-200" />

          {/* ================================= */}
          {/* DESCRIPCIÓN */}
          {/* ================================= */}

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

          {/* ================================= */}
          {/* DATOS EDUCATIVOS */}
          {/* ================================= */}

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
                  Relaciones
                  anatómicas
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

          {/* ================================= */}
          {/* ANATOMY AI */}
          {/* ================================= */}

          <button
            disabled={
              !selectedStructure
            }
            className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Preguntar a
            Anatomy AI
          </button>
        </aside>
      </main>
    </div>
  );
}

export default App;