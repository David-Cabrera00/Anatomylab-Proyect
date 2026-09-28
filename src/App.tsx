import { useState } from "react";
import "./App.css";

import AnatomyViewer, {
  type AnatomyLayer,
  type ViewerAction,
  type ViewerActionType,
} from "./three/AnatomyViewer";

/*
 * Modelo cardiovascular principal.
 */
const CARDIOVASCULAR_MODEL =
  "/models/cardiovascular/cardiovascular_overview_v2.glb";

const systems = [
  "Cardiovascular",
  "Respiratorio",
  "Nervioso",
  "Esquelético",
  "Muscular",
  "Digestivo",
];

/*
 * Nombres que ya tenemos
 * traducidos del corazón.
 */
const structureNames: Record<
  string,
  string
> = {
  Left_atrium:
    "Aurícula izquierda",

  Left_ventricle:
    "Ventrículo izquierdo",

  Inferior_papillary_muscle_of_left_ventricle:
    "Músculo papilar inferior del ventrículo izquierdo",

  Right_atrium:
    "Aurícula derecha",

  Right_ventricle:
    "Ventrículo derecho",

  Anterior_papillary_muscle_of_right_ventricle:
    "Músculo papilar anterior del ventrículo derecho",

  Inferior_papillary_muscle_of_right_ventricle:
    "Músculo papilar inferior del ventrículo derecho",

  Septal_papillary_muscle_of_right_ventricle:
    "Músculo papilar septal del ventrículo derecho",

  Inferior_leaflet_of_right_atrioventricular_valve:
    "Valva inferior de la válvula auriculoventricular derecha",

  Posterior_leaflet_of_left_atrioventricular_valve:
    "Valva posterior de la válvula auriculoventricular izquierda",

  Septal_leaflet_of_right_atrioventricular_valve:
    "Valva septal de la válvula auriculoventricular derecha",

  Left_coronary_leaflet:
    "Valva coronaria izquierda",

  Non_coronary_leaflet:
    "Valva no coronaria",

  Right_coronary_leaflet:
    "Valva coronaria derecha",

  Anterior_semilunar_leaflet_of_pulmonary_valve:
    "Valva semilunar anterior de la válvula pulmonar",

  Left_semilunar_leaflet_of_pulmonary_valve:
    "Valva semilunar izquierda de la válvula pulmonar",

  Right_semilunar_leaflet_of_pulmonary_valve:
    "Valva semilunar derecha de la válvula pulmonar",

  Pulmonary_trunk:
    "Tronco pulmonar",
};

/*
 * Botones de capas.
 */
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
  /*
   * Capa activa.
   *
   * General será la vista inicial.
   */
  const [
    activeLayer,
    setActiveLayer,
  ] =
    useState<AnatomyLayer>(
      "general"
    );

  /*
   * Estructura seleccionada.
   */
  const [
    selectedStructure,
    setSelectedStructure,
  ] =
    useState<string | null>(
      null
    );

  /*
   * Acción del toolbar.
   */
  const [
    viewerAction,
    setViewerAction,
  ] =
    useState<ViewerAction | null>(
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

  /*
   * Nombre visual.
   *
   * Si todavía no tenemos
   * traducción, limpiamos
   * los guiones bajos.
   */
  const selectedStructureName =
    selectedStructure
      ? structureNames[
          selectedStructure
        ] ??
        selectedStructure
          .replaceAll("_", " ")
          .replaceAll(
            ".",
            " "
          )
      : null;

  const layerName =
    layers.find(
      (layer) =>
        layer.id ===
        activeLayer
    )?.label ?? "General";

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900">

      {/* ==================== */}
      {/* HEADER */}
      {/* ==================== */}

      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">

        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            AnatomyLab AI
          </h1>

          <p className="text-xs text-slate-500">
            Plataforma interactiva de aprendizaje
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


      {/* ==================== */}
      {/* MAIN */}
      {/* ==================== */}

      <main className="flex min-h-0 flex-1">

        {/* ==================== */}
        {/* SIDEBAR */}
        {/* ==================== */}

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


        {/* ==================== */}
        {/* VISOR 3D */}
        {/* ==================== */}

        <section className="relative min-w-0 flex-1 overflow-hidden bg-slate-100">

          <AnatomyViewer
            modelPath={
              CARDIOVASCULAR_MODEL
            }
            layer={
              activeLayer
            }
            onStructureSelect={
              setSelectedStructure
            }
            action={
              viewerAction
            }
          />


          {/* ==================== */}
          {/* CAPAS */}
          {/* ==================== */}

          <div className="absolute left-1/2 top-5 z-10 flex -translate-x-1/2 gap-1 rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-sm backdrop-blur">

            {layers.map(
              (layer) => (
                <button
                  key={layer.id}
                  onClick={() =>
                    setActiveLayer(
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
                  {layer.label}
                </button>
              )
            )}

          </div>


          {/* ==================== */}
          {/* LEYENDA */}
          {/* ==================== */}

          <div className="absolute left-5 top-5 z-10 rounded-xl border border-slate-200 bg-white/95 p-3 text-xs shadow-sm backdrop-blur">

            <div className="mb-2 font-semibold text-slate-700">
              Capas anatómicas
            </div>

            <div className="space-y-2">

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#8f2438]" />
                <span>
                  Corazón
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#d94b59]" />
                <span>
                  Arterias
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#4f6fa8]" />
                <span>
                  Venas
                </span>
              </div>

            </div>

          </div>


          {/* ==================== */}
          {/* TOOLBAR */}
          {/* ==================== */}

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


        {/* ==================== */}
        {/* PANEL DERECHO */}
        {/* ==================== */}

        <aside className="w-70 shrink-0 border-l border-slate-200 bg-white p-5">

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Estructura seleccionada
          </p>


          <div className="mt-5">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl">
              ♥
            </div>


            <h2 className="text-xl font-semibold">
              {selectedStructureName ??
                "Sistema cardiovascular"}
            </h2>


            <p className="mt-1 text-sm text-slate-500">
              Sistema cardiovascular
            </p>


            <p className="mt-2 text-xs font-medium text-slate-400">
              Vista: {layerName}
            </p>

          </div>


          <div className="my-5 border-t border-slate-200" />


          <div>

            <h3 className="text-sm font-semibold">
              Descripción
            </h3>


            <p className="mt-2 text-sm leading-6 text-slate-600">

              {selectedStructure
                ? `Has seleccionado ${selectedStructureName}. Aquí podrás consultar su descripción anatómica, función, relaciones y material de estudio.`
                : activeLayer ===
                    "general"
                  ? "Vista simplificada de las principales estructuras del sistema cardiovascular. Selecciona una estructura para estudiarla."
                  : activeLayer ===
                      "arteries"
                    ? "Explora el sistema arterial y selecciona una arteria para consultar su información anatómica."
                    : activeLayer ===
                        "veins"
                      ? "Explora el sistema venoso y selecciona una vena para consultar su información anatómica."
                      : activeLayer ===
                          "heart"
                        ? "Explora las estructuras cardíacas disponibles en el modelo."
                        : "Vista completa del sistema cardiovascular con todas las estructuras disponibles."}

            </p>

          </div>


          <button className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Preguntar a Anatomy AI
          </button>

        </aside>

      </main>

    </div>
  );
}

export default App;