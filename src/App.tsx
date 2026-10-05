import {
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";

import "./App.css";

import {
  Badge,
  Button,
  Card,
  EmptyState,
  InfoSection,
  SegmentedControl,
} from "./components/ui";

import { SearchBar } from "./components/SearchBar";

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

import { getAnatomyStructureData } from "./data/anatomyStructureData";
import { getAnatomyEntryById, type AnatomyModelKey } from "./anatomy";
import type { AnatomyStructureData } from "./data/anatomyStructureData";

import {
  studyGuidesBySystem,
} from "./data/studyGuides";

import { QuizPanel } from "./components/quiz/QuizPanel";
import type { QuizState } from "./data/quiz/types";
import { HistoryTab, FavoritesTab, ProgressTab } from "./components/learning";
import { dbAddFavorite, dbAddSearchHistory, dbSaveStudyProgress, dbSaveStudySession } from "./utils/db";

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
    "Haz clic sobre el corazón o un vaso del modelo 3D para consultar su información anatómica.",

  respiratory:
    "Haz clic sobre una estructura respiratoria del modelo 3D para consultar su información anatómica.",

  nervous:
    "Haz clic sobre una estructura nerviosa para identificar sus componentes anatómicos.",

  skeletal:
    "Haz clic sobre un hueso del modelo 3D para identificarlo y explorar su región anatómica.",

  muscular:
    "Haz clic sobre un músculo del modelo 3D para identificarlo.",

  digestive:
    "Haz clic sobre un órgano o estructura digestiva del modelo 3D para identificarlo.",
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

/* ======================================================
   ESTRUCTURA SELECCIONADA
====================================================== */

  const [
    selectedAnatomyId,
    setSelectedAnatomyId,
  ] =
  useState<
    string | null
  >(
    null
  );

const handleStructureSelect = useCallback((anatomyId: string | null) => {
    setSelectedAnatomyId(anatomyId);
  }, []);

  const selectedAnatomyEntry = selectedAnatomyId
    ? getAnatomyEntryById(selectedAnatomyId)
    : null;
  const selectedDisplayName = selectedAnatomyEntry?.displayName ?? null;

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
   QUIZ
  ==================================================== */

  const [quizState, setQuizState] = useState<QuizState>({ status: "closed" });

  const openQuiz = useCallback(() => {
    setQuizState({ status: "idle" });
  }, []);

  const closeQuiz = useCallback(() => {
    setQuizState({ status: "closed" });
  }, []);

  /* ====================================================
   LEARNING TABS
  ==================================================== */

  type LearningTab = "quiz" | "history" | "favorites" | "progress";

  const [learningTab, setLearningTab] = useState<LearningTab>("quiz");
  const [favoritesRevision, setFavoritesRevision] = useState(0);
  const [favoriteSaved, setFavoriteSaved] = useState(false);
  const studyStartedAtRef = useRef<number | null>(null);

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

  const activeStudyGuide =
    studyGuidesBySystem[
      activeSystem
    ];

  const currentStudyStep =
    activeStudyGuide
      ?.steps[
      studyStepIndex
    ];

  const studyProgress =
    activeStudyGuide
      ? ((studyStepIndex +
          1) /
          activeStudyGuide
            .steps.length) *
        100
      : 0;

  const persistStudySession = (completed: boolean) => {
    const guide = activeStudyGuide;
    const startedAt = studyStartedAtRef.current;
    const finishedAt = Date.now();
    if (!guide || !startedAt) return;

    void dbSaveStudySession({
      system: activeSystem,
      guideId: guide.id,
      currentStep: studyStepIndex,
      startedAt: new Date(startedAt).toISOString(),
      completedAt: new Date(finishedAt).toISOString(),
      completed,
    }).catch((error) => console.error("Error saving study session:", error));

    if (completed) {
      const timePerStep = Math.round((finishedAt - startedAt) / guide.steps.length);
      void Promise.all(guide.steps.map((step) => dbSaveStudyProgress(activeSystem, step.anatomyId, null, timePerStep)))
        .catch((error) => console.error("Error saving study progress:", error));
    }
  };

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

  const currentModelKey: AnatomyModelKey =
    activeSystem === "cardiovascular" ? cardiovascularView : "overview";

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

  /* ====================================================
   INFORMACIÓN EDUCATIVA
  ==================================================== */

  const [selectedAnatomyIdData, setSelectedAnatomyIdData] = useState<AnatomyStructureData | null>(null);

  useEffect(() => {
    if (!selectedAnatomyId) {
      setSelectedAnatomyIdData(null);
      return;
    }
    const modelKey = activeSystem === "cardiovascular" ? cardiovascularView : "overview";
    getAnatomyStructureData(activeSystem, selectedAnatomyId, modelKey).then(setSelectedAnatomyIdData);
  }, [selectedAnatomyId, activeSystem, cardiovascularView]);

  useEffect(() => {
    setFavoriteSaved(false);
  }, [selectedAnatomyId]);

  /* ====================================================
   CATEGORÍA CARDIOVASCULAR
  ==================================================== */

  /* ====================================================
   CORAZÓN DETALLADO
  ==================================================== */

  const canExploreHeart =
    activeSystem ===
      "cardiovascular" &&
    !studyMode &&
    cardiovascularView ===
      "overview" &&
    selectedAnatomyEntry?.system === "cardiovascular" &&
    selectedAnatomyEntry.layer === "heart";

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

    if (studyMode) persistStudySession(false);
    studyStartedAtRef.current = null;

    setStudyMode(
      false
    );

    setStudyStepIndex(
      0
    );

    setFocusRequest(
      null
    );

    handleStructureSelect(null);

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

    handleStructureSelect(null);

    setViewerAction(
      null
    );

    setActiveLayer(
      layer
    );
  };

  /* ====================================================
   ENFOCAR ESTRUCTURA
  ==================================================== */

  const focusStructure = (
    anatomyId:
      string,
    preferredModelKey?: AnatomyModelKey
  ) => {
    setViewerAction(
      null
    );

    const entry = getAnatomyEntryById(anatomyId);
    if (!entry) return;

    const binding = preferredModelKey
      ? entry.modelBindings.find((candidate) => candidate.modelKey === preferredModelKey)
      : entry.modelBindings.find((candidate) => candidate.modelKey === "overview")
        ?? entry.modelBindings[0];
    if (!binding) return;

    if (entry.system === "cardiovascular") {
      setCardiovascularView(binding.modelKey);
    }

    handleStructureSelect(anatomyId);

    setActiveLayer(
      entry.layer ?? "complete"
    );

    setFocusRequest(
      (previous) => ({
        anatomyId,

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
    if (!activeStudyGuide) {
      return;
    }

    const maxIndex =
      activeStudyGuide
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
      activeStudyGuide
        .steps[
        nextIndex
      ];

    if (
      activeSystem ===
      "cardiovascular"
    ) {
      setCardiovascularView(
        "overview"
      );
    }

    setStudyStepIndex(
      nextIndex
    );

    focusStructure(step.anatomyId, "overview");
  };

  /* ====================================================
   INICIAR ESTUDIO
  ==================================================== */

  const startStudyMode =
    () => {
      if (
        !activeConfig
          .studyAvailable ||
        !activeStudyGuide
      ) {
        return;
      }

      setStudyMode(
        true
      );

      studyStartedAtRef.current = Date.now();

      handleStructureSelect(null);

      setFocusRequest(
        null
      );

      setViewerAction(
        null
      );

      if (
        activeSystem ===
        "cardiovascular"
      ) {
        setCardiovascularView(
          "overview"
        );
      }

      goToStudyStep(
        0
      );
    };

  /* ====================================================
   FINALIZAR ESTUDIO
  ==================================================== */

  const finishStudyMode =
    (completed: boolean) => {
      persistStudySession(completed);
      studyStartedAtRef.current = null;
      setStudyMode(
        false
      );

      setStudyStepIndex(
        0
      );

      setFocusRequest(
        null
      );

      handleStructureSelect(null);

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

      handleStructureSelect(null);

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

      handleStructureSelect(null);

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
        <div className="flex items-center gap-6 min-w-0">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              AnatomyLab AI
            </h1>

            <p className="text-xs text-slate-500">
              Plataforma interactiva
              de aprendizaje
            </p>
          </div>

          <SearchBar
            onSelect={(entry, context) => {
              const { anatomyId, system } = entry;
              if (context.query) {
                void dbAddSearchHistory(context.query, system, context.resultsCount, anatomyId)
                  .catch((error) => console.error("Error saving search history:", error));
              }
              if (system !== activeSystem) {
                changeSystem(system);
              }
              focusStructure(anatomyId);
            }}
            currentSystem={activeSystem}
            className="flex-1 max-w-md"
          />
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

            {/* Tabs */}
            <div className="mb-3 flex gap-1" role="tablist">
              {[
                { id: "quiz", label: "Quiz", icon: "❓" },
                { id: "history", label: "Historial", icon: "📜" },
                { id: "favorites", label: "Favoritos", icon: "⭐" },
                { id: "progress", label: "Progreso", icon: "📈" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={learningTab === tab.id}
                  onClick={() => setLearningTab(tab.id as LearningTab)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    learningTab === tab.id
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-2">
              {learningTab === "quiz" && (
                <>
                  <button
                    type="button"
                    disabled={
                      !activeConfig.studyAvailable && !studyMode
                    }
                    onClick={studyMode ? () => finishStudyMode(false) : startStudyMode}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                      studyMode
                        ? "bg-amber-50 text-amber-800"
                        : activeConfig.studyAvailable
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
                    onClick={openQuiz}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition hover:bg-slate-100"
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
                </>
              )}

              {learningTab === "history" && (
                <HistoryTab system={activeSystem} />
              )}

              {learningTab === "favorites" && (
                <FavoritesTab system={activeSystem} onFocus={focusStructure} refreshKey={favoritesRevision} />
              )}

              {learningTab === "progress" && (
                <ProgressTab system={activeSystem} />
              )}
            </div>
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
            modelKey={currentModelKey}
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
              <Card
                variant="floating"
                className="absolute right-5 top-5 z-10 flex max-w-[calc(100%-14rem)] min-w-0 items-center gap-3 p-2"
              >
                <div className="min-w-0 shrink-0 pl-1">
                  <p className="text-caption font-semibold uppercase tracking-wide text-ink-subtle">
                    Capas
                  </p>
                  <p className="max-w-24 truncate text-label font-medium text-ink">
                    {activeConfig.label}
                  </p>
                </div>
                <div className="min-w-0 overflow-x-auto">
                  <SegmentedControl
                    label={`Capas de ${activeConfig.fullName}`}
                    options={activeLayers.map((layer) => ({
                      value: layer.id,
                      label: layer.label,
                    }))}
                    value={activeLayer}
                    onChange={changeLayer}
                  />
                </div>
              </Card>
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

          {studyMode && activeStudyGuide && currentStudyStep && (
            <div className="absolute left-5 top-5 z-20 w-[340px] max-h-[calc(100%-40px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lg backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                    Modo estudio
                  </p>

                  <h3 className="mt-1 text-base font-semibold">
                    {
                      activeStudyGuide
                        .title
                    }
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => finishStudyMode(false)}
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
                      activeStudyGuide
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
                activeStudyGuide
                  .steps.length -
                  1 ? (
                  <button
                    type="button"
                    onClick={() => finishStudyMode(true)}
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
              QUIZ
          ================================================= */}

          {quizState.status !== "closed" && (
            <div className="absolute left-5 top-5 z-20 w-[380px] max-h-[calc(100%-40px)] overflow-hidden">
              <QuizPanel
                activeSystem={activeSystem}
                quizState={quizState}
                onStateChange={setQuizState}
                onClose={closeQuiz}
              />
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
                  !selectedAnatomyId
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
                  !selectedAnatomyId
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
                  !selectedAnatomyId
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

        <aside className="flex w-80 min-w-0 shrink-0 flex-col overflow-y-auto border-l border-line bg-surface px-5 py-6">
          <p className="text-caption font-semibold uppercase tracking-wider text-ink-subtle">
            Información anatómica
          </p>

          {selectedAnatomyId ? (
            <>
              <div className="mt-5 min-w-0">
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-ds-md text-heading font-semibold"
                  style={{
                    backgroundColor: activeConfig.accentColor,
                    color: activeConfig.color,
                  }}
                  aria-hidden="true"
                >
                  {systemSymbols[activeSystem]}
                </div>

                <h2 className="text-title font-semibold tracking-tight text-ink [overflow-wrap:anywhere]">
                  {selectedDisplayName}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {selectedAnatomyIdData && (
                    <Badge>{selectedAnatomyIdData.type}</Badge>
                  )}
                  <span className="text-caption text-ink-muted">
                    {activeConfig.fullName}
                  </span>
                </div>

                <p className="mt-2 text-caption text-ink-subtle">
                  Vista: {activeViewName}
                </p>

                {studyMode && activeStudyGuide && (
                  <Badge variant="warning" className="mt-3">
                    Estudio {studyStepIndex + 1}/
                    {activeStudyGuide.steps.length}
                  </Badge>
                )}
              </div>

              <div className="mt-6 space-y-6 border-t border-line pt-5">
                <InfoSection title="Descripción">
                  <p className="break-words">
                    {selectedAnatomyIdData
                      ? selectedAnatomyIdData.description
                      : activeSystem === "nervous"
                        ? `Has seleccionado ${selectedDisplayName}. La información educativa del sistema nervioso se añadirá en la siguiente fase.`
                        : activeSystem === "skeletal"
                          ? `Has seleccionado ${selectedDisplayName}. La información educativa del sistema esquelético se añadirá en la siguiente fase.`
                          : activeSystem === "muscular"
                            ? `Has seleccionado ${selectedDisplayName}. La información educativa del sistema muscular se añadirá en la siguiente fase.`
                            : activeSystem === "digestive"
                              ? `Has seleccionado ${selectedDisplayName}. La información educativa del sistema digestivo se añadirá en la siguiente fase.`
                              : `Has seleccionado ${selectedDisplayName}. Todavía estamos agregando información educativa específica para esta estructura.`}
                  </p>
                </InfoSection>

                {selectedAnatomyIdData && (
                  <>
                    {selectedAnatomyIdData.function && (
                      <InfoSection title="Función">
                        <p>{selectedAnatomyIdData.function}</p>
                      </InfoSection>
                    )}
                    {selectedAnatomyIdData.location && (
                      <InfoSection title="Ubicación">
                        <p>{selectedAnatomyIdData.location}</p>
                      </InfoSection>
                    )}
                    {selectedAnatomyIdData.relationships && selectedAnatomyIdData.relationships.length > 0 && (
                      <InfoSection title="Relaciones anatómicas">
                        <ul className="list-disc space-y-1 pl-5 marker:text-ink-subtle">
                          {selectedAnatomyIdData.relationships.map((relationship) => (
                            <li key={relationship} className="break-words">
                              {relationship}
                            </li>
                          ))}
                        </ul>
                      </InfoSection>
                    )}
                  </>
                )}
              </div>
            </>
          ) : (
            <EmptyState
              className="mt-12"
              title="Selecciona una estructura"
              description={
                activeSystem === "cardiovascular" &&
                cardiovascularView === "heart-detail"
                  ? "Explora las cavidades, válvulas y estructuras internas disponibles en el modelo detallado del corazón."
                  : systemDescriptions[activeSystem]
              }
            />
          )}

          <div className="mt-auto pt-6">
            <div className="border-t border-line pt-5">
              {selectedAnatomyId && (
                <p className="mb-3 text-caption font-semibold uppercase tracking-wider text-ink-subtle">
                  Acciones
                </p>
              )}
              <div className="space-y-2">
                {canExploreHeart && (
                  <Button
                    variant="secondary"
                    onClick={openHeartDetail}
                    className="w-full whitespace-normal"
                  >
                    Explorar corazón en detalle →
                  </Button>
                )}
                <Button
                  variant="secondary"
                  disabled={!selectedAnatomyId || favoriteSaved}
                  onClick={() => {
                    if (!selectedAnatomyId) return;
                    void dbAddFavorite(activeSystem, selectedAnatomyId)
                      .then(() => {
                        setFavoriteSaved(true);
                        setFavoritesRevision((revision) => revision + 1);
                      })
                      .catch((error) => console.error("Error saving favorite:", error));
                  }}
                  className="w-full whitespace-normal"
                >
                  {favoriteSaved ? "Guardado en favoritos" : "Guardar en favoritos"}
                </Button>
                <Button
                  variant={selectedAnatomyId ? "primary" : "secondary"}
                  disabled={!selectedAnatomyId}
                  className="w-full whitespace-normal"
                >
                  Preguntar a Anatomy AI
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
