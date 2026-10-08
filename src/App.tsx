import {
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";

import "./App.css";

import { SearchBar } from "./components/SearchBar";
import { AppHeader } from "./components/layout/AppHeader";
import { AppShell } from "./components/layout/AppShell";
import { AppSidebar } from "./components/layout/AppSidebar";
import { AuthAnatomyPreview } from "./components/layout/AuthAnatomyPreview";
import { AuthLayout } from "./components/layout/AuthLayout";
import { ContextPanel } from "./components/anatomy/ContextPanel";
import { InfoPanel } from "./components/anatomy/InfoPanel";
import { ViewerToolbar } from "./components/anatomy/ViewerToolbar";
import { ViewportFrame } from "./components/anatomy/ViewportFrame";

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

import type { QuizState } from "./data/quiz/types";
import { dbAddFavorite, dbAddSearchHistory, dbSaveStudyProgress, dbSaveStudySession } from "./utils/db";
import { AnatomyView } from "./views/AnatomyView";
import { HomeView } from "./views/HomeView";
import { LoginView } from "./views/LoginView";
import { ProfileView } from "./views/ProfileView";
import { ProgressView } from "./views/ProgressView";
import { QuizView } from "./views/QuizView";
import { SettingsView } from "./views/SettingsView";
import { StudyView } from "./views/StudyView";
import { RegisterView } from "./views/RegisterView";
import type { AppView } from "./views/types";
import { anatomyLayerTranslationKeys, systemDescriptionTranslationKeys, systemFullNameTranslationKeys, useI18n } from "./i18n";

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

/* ======================================================
   APP
====================================================== */

function App() {
  const [appView, setAppView] = useState<AppView>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { language, t } = useI18n();
  const isEnglish = language === "en";
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

  const [favoriteSaved, setFavoriteSaved] = useState(false);
  const [favoritesRevision, setFavoritesRevision] = useState(0);
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
      ? t("anatomyHeartDetail")
      : activeLayers.find(
          (layer) =>
            layer.id ===
            activeLayer
        )?.id
        ? t(anatomyLayerTranslationKeys[activeLayers.find((layer) => layer.id === activeLayer)!.id])
        : t("anatomyGeneral");

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

  const startStudyMode = () => {
    if (!activeConfig.studyAvailable || !activeStudyGuide) return;

    const selectedStepIndex = selectedAnatomyId
      ? activeStudyGuide.steps.findIndex((step) => step.anatomyId === selectedAnatomyId)
      : -1;

    setStudyMode(true);
    studyStartedAtRef.current = Date.now();
    setViewerAction(null);

    if (activeSystem === "cardiovascular") {
      setCardiovascularView("overview");
    }

    goToStudyStep(selectedStepIndex >= 0 ? selectedStepIndex : 0);
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

  const handleViewChange = (nextView: AppView) => {
    if (nextView !== "study" && studyMode) {
      persistStudySession(false);
      studyStartedAtRef.current = null;
      setStudyMode(false);
    }

    if (nextView !== "quiz") {
      setQuizState({ status: "closed" });
    }

    if (nextView === "quiz" && quizState.status === "closed") {
      setQuizState({ status: "idle" });
    }

    setAppView(nextView);
  };

  const globalSearch = (
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
        handleViewChange("anatomy");
        focusStructure(anatomyId);
      }}
      currentSystem={activeSystem}
      className="flex-1 max-w-md"
    />
  );

  const completeAuth = () => {
    setIsAuthenticated(true);
    setAppView("home");
  };

  if (!isAuthenticated) {
    const isRegister = appView === "register";

    return (
      <AuthLayout
        brand={t("appName")}
        productMeta={isEnglish ? "3D ANATOMY WORKSPACE" : "ESPACIO DE ANATOMÍA 3D"}
        productTitle={isEnglish ? "Explore the human body in 3D" : "Explora el cuerpo humano en 3D"}
        productDescription={isEnglish
          ? "Understand systems, structures, and relationships through interactive models."
          : "Comprende sistemas, estructuras y relaciones mediante modelos interactivos."}
        benefits={[
          { number: "01", content: isEnglish ? "Interactive 3D models" : "Modelos 3D interactivos" },
          { number: "02", content: isEnglish ? "Guided anatomy study" : "Estudio anatómico guiado" },
          { number: "03", content: isEnglish ? "Quiz and progress tracking" : "Quiz y seguimiento de progreso" },
        ]}
        productVisual={<AuthAnatomyPreview />}
        formTitle={isRegister ? t("authRegisterTitle") : (isEnglish ? "Welcome back" : "Bienvenido de nuevo")}
        formSubtitle={isRegister
          ? (isEnglish ? "Start studying anatomy with interactive models." : "Comienza a estudiar anatomía con modelos interactivos.")
          : t("homeIntro")}
      >
        {isRegister ? (
          <RegisterView onRegister={completeAuth} onLogin={() => setAppView("login")} />
        ) : (
          <LoginView onLogin={completeAuth} onRegister={() => setAppView("register")} />
        )}
      </AuthLayout>
    );
  }

  /* ====================================================
   RENDER
  ==================================================== */

  const anatomyViewer = (
    <AnatomyViewer
      /* Cambiar de sistema o modelo destruye el viewer anterior de forma intencional. */
      key={`${activeSystem}-${cardiovascularView}`}
      system={activeSystem}
      modelPath={currentModel}
      layer={currentLayer}
      modelKey={currentModelKey}
      onStructureSelect={handleStructureSelect}
      action={viewerAction}
      focusRequest={focusRequest}
    />
  );

  const viewerToolbar = (
    <ViewerToolbar
      hasSelection={Boolean(selectedAnatomyId)}
      onIsolate={() => runViewerAction("isolate")}
      onHide={() => runViewerAction("hide")}
      onTransparency={() => runViewerAction("transparency")}
      onReset={() => runViewerAction("reset")}
    />
  );

  return (
    <AppShell
      header={
        <AppHeader
          currentView={appView}
          search={appView === "home" ? undefined : globalSearch}
        />
      }
      sidebar={<AppSidebar currentView={appView} onNavigate={handleViewChange} />}
    >
      {appView === "anatomy" ? (
        <AnatomyView>
          <main className="flex min-h-0 flex-1">
            {/* =================================================
                VISOR 3D
            ================================================= */}

        <ContextPanel
          activeSystem={activeSystem}
          activeConfig={activeConfig}
          activeLayer={activeLayer}
          activeLayers={activeLayers}
          studyMode={studyMode}
          heartDetail={activeSystem === "cardiovascular" && cardiovascularView === "heart-detail"}
          onChangeSystem={changeSystem}
          onChangeLayer={changeLayer}
          onReturnToOverview={returnToOverview}
        />

        <ViewportFrame
          label={t(systemFullNameTranslationKeys[activeSystem])}
          metadata={activeViewName}
          hint={t("anatomyViewerHint")}
        >
          {anatomyViewer}

          {/* Sistemas y capas viven en ContextPanel para dejar el viewport libre. */}

          {/* =================================================
              TOOLBAR
          ================================================= */}

          {viewerToolbar}
        </ViewportFrame>

        {/* =================================================
            PANEL DERECHO
        ================================================= */}

        <InfoPanel
          activeSystem={activeSystem}
          activeConfig={activeConfig}
          activeViewName={activeViewName}
          selectedAnatomyId={selectedAnatomyId}
          selectedDisplayName={selectedDisplayName}
          selectedData={selectedAnatomyIdData}
          systemSymbol={systemSymbols[activeSystem]}
          emptyDescription={activeSystem === "cardiovascular" && cardiovascularView === "heart-detail"
            ? t("heartDetailDescription")
            : t(systemDescriptionTranslationKeys[activeSystem])}
          studyMode={studyMode}
          activeStudyGuide={activeStudyGuide}
          studyStepIndex={studyStepIndex}
          canExploreHeart={canExploreHeart}
          onExploreHeart={openHeartDetail}
          favoriteSaved={favoriteSaved}
          onSaveFavorite={() => {
            if (!selectedAnatomyId) return;
            void dbAddFavorite(activeSystem, selectedAnatomyId)
              .then(() => {
                setFavoriteSaved(true);
                setFavoritesRevision((revision) => revision + 1);
              })
              .catch((error) => console.error("Error saving favorite:", error));
          }}
        />
          </main>
        </AnatomyView>
      ) : appView === "home" ? (
        <HomeView
          systems={anatomySystemList}
          search={globalSearch}
          onOpenAnatomy={() => handleViewChange("anatomy")}
          onOpenSystem={(system) => {
            handleViewChange("anatomy");
            changeSystem(system);
          }}
        />
      ) : appView === "study" ? (
        <StudyView
          system={activeSystem}
          guide={activeStudyGuide}
          currentStep={currentStudyStep}
          stepIndex={studyStepIndex}
          progress={studyProgress}
          isActive={studyMode}
          selectedStructureName={selectedDisplayName}
          viewer={anatomyViewer}
          viewerToolbar={viewerToolbar}
          onStart={startStudyMode}
          onPrevious={() => goToStudyStep(studyStepIndex - 1)}
          onNext={() => goToStudyStep(studyStepIndex + 1)}
          onFinish={finishStudyMode}
        />
      ) : appView === "quiz" ? (
        <QuizView
          activeSystem={activeSystem}
          quizState={quizState}
          onStateChange={setQuizState}
          onClose={() => handleViewChange("home")}
        />
      ) : appView === "progress" ? (
        <ProgressView system={activeSystem} />
      ) : appView === "profile" ? (
        <ProfileView
          system={activeSystem}
          onFocusFavorite={(anatomyId) => {
            handleViewChange("anatomy");
            focusStructure(anatomyId);
          }}
          refreshKey={favoritesRevision}
        />
      ) : (
        <SettingsView />
      )}
    </AppShell>
  );
}

export default App;
