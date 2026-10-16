export type BackendUser = {
  id: string;
  email: string;
  displayName: string | null;
};

export type BackendSession = {
  accessToken: string;
  user: BackendUser;
};

export type BackendProgressItem = {
  system: string;
  anatomyId: string;
  score: number;
  timeSpentMs?: number;
};

export type BackendFavoriteItem = {
  system: string;
  anatomyId: string;
  notes?: string;
};

export type BackendQuizSessionItem = {
  id: string;
  system: string;
  configId: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  startedAt: string;
  completedAt: string;
  timeSpentMs?: number;
  answers: Array<{
    questionId: string;
    anatomyId: string;
    selectedIndex: number;
    correctIndex: number;
    isCorrect: boolean;
    timeMs?: number;
  }>;
};

export type BackendStudySessionItem = {
  id: string;
  system: string;
  stepsDone: number;
  startedAt: string;
  completedAt?: string;
};

export type BackendPreferenceItem = { key: string; value: string };

export type TutorRequest = {
  system: string;
  anatomyId: string;
  language: "es" | "en";
  question: string;
  structureName?: string;
  description?: string;
  function?: string;
  location?: string;
  relationships?: string;
};

export type BackendSessionListener = (session: BackendSession | null) => void;

const backendUrl = (): string =>
  (import.meta.env.VITE_BACKEND_URL as string | undefined)?.replace(/\/$/, "") || "http://localhost:3000/api";

const backendSessionKey = "anatomylab.backend.session";

export function saveBackendSession(session: BackendSession): void {
  localStorage.setItem(backendSessionKey, JSON.stringify(session));
}

export function loadBackendSession(): BackendSession | null {
  const stored = localStorage.getItem(backendSessionKey);
  if (!stored) return null;

  try {
    const session = JSON.parse(stored) as BackendSession;
    if (session.accessToken && session.user?.id && session.user.email) return session;
  } catch {
    // Ignore malformed local session data and start in logged-out mode.
  }

  localStorage.removeItem(backendSessionKey);
  return null;
}

export function clearBackendSession(): void {
  localStorage.removeItem(backendSessionKey);
}

export class BackendApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "BackendApiError";
  }
}

async function request<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${backendUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    let message = body;
    try {
      const parsed = JSON.parse(body) as { message?: string | string[] };
      message = Array.isArray(parsed.message) ? parsed.message.join(" ") : parsed.message || body;
    } catch {
      // Keep the raw response when it is not JSON.
    }
    throw new BackendApiError(message || `Backend request failed: ${response.status}`, response.status);
  }
  return response.json() as Promise<T>;
}

export function backendRegister(email: string, password: string, displayName?: string) {
  return request<BackendSession>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, displayName }),
  });
}

export function backendLogin(email: string, password: string) {
  return request<BackendSession>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function backendSync(
  token: string,
  progress: BackendProgressItem[],
  favorites: BackendFavoriteItem[],
  quizSessions: BackendQuizSessionItem[],
  studySessions: BackendStudySessionItem[],
  preferences: BackendPreferenceItem[],
) {
  return request<{ synced: boolean; progress: number; favorites: number; quizSessions: number; studySessions: number; preferences: number }>("/sync", {
    method: "POST",
    body: JSON.stringify({ progress, favorites, quizSessions, studySessions, preferences }),
  }, token);
}

export function backendAskTutor(token: string, input: TutorRequest) {
  return request<{ answer: string; system: string; anatomyId: string; provider: string }>("/tutor/ask", {
    method: "POST",
    body: JSON.stringify(input),
  }, token);
}
