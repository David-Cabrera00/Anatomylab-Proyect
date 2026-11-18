const { randomUUID, randomBytes } = require("node:crypto");
const path = require("node:path");
const { PrismaClient } = require("@prisma/client");

require("dotenv").config({ path: path.join(__dirname, "..", ".env"), quiet: true });

const apiUrl = process.env.API_URL || "https://anatomylab-backend.onrender.com/api";
const prisma = new PrismaClient();
const email = `release-smoke-${randomUUID()}@example.com`;
const password = `Release-${randomBytes(16).toString("hex")}`;
const anatomyId = "cardiovascular.right-atrium";

async function request(route, body, token) {
  const response = await fetch(`${apiUrl}${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(45000),
  });
  const result = await response.json().catch(() => null);
  return { status: response.status, result };
}

function check(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`PASS ${message}`);
}

async function run() {
  // Confirm cleanup access before creating any production data.
  await prisma.$connect();
  await prisma.user.findUnique({ where: { email }, select: { id: true } });

  const corsProbe = async (origin) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "OPTIONS",
      headers: {
        Origin: origin,
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
      },
      signal: AbortSignal.timeout(45000),
    });
    return response.headers.get("access-control-allow-origin");
  };
  check(await corsProbe("http://tauri.localhost") === "http://tauri.localhost", "desktop origin allowed by CORS");
  check(await corsProbe("https://example.org") === null, "untrusted origin rejected by CORS");

  const invalid = await request("/auth/register", { email: "invalid", password: "short" });
  check(invalid.status === 400, "invalid registration rejected");

  const registered = await request("/auth/register", { email, password, displayName: "Release Smoke" });
  check(registered.status === 201 && Boolean(registered.result?.accessToken), "API registration");

  const denied = await request("/auth/login", { email, password: "WrongPassword123" });
  check(denied.status === 401, "invalid login rejected");

  const login = await request("/auth/login", { email, password });
  check(login.status === 201 && Boolean(login.result?.accessToken), "API login");
  const token = login.result.accessToken;

  const unauthorized = await request("/sync", { progress: [] });
  check(unauthorized.status === 401, "sync requires authentication");

  const now = new Date().toISOString();
  const quizId = `release-quiz-${randomUUID()}`;
  const studyId = `release-study-${randomUUID()}`;
  const payload = {
    progress: [{ system: "cardiovascular", anatomyId, score: 0.8 }],
    favorites: [{ system: "cardiovascular", anatomyId, notes: "release-smoke" }],
    quizSessions: [{ id: quizId, system: "cardiovascular", configId: "release-smoke", score: 100, totalQuestions: 1, correctCount: 1, startedAt: now, completedAt: now, answers: [{ questionId: "release-smoke", anatomyId, selectedIndex: 0, correctIndex: 0, isCorrect: true }] }],
    studySessions: [{ id: studyId, system: "cardiovascular", stepsDone: 1, startedAt: now, completedAt: now }],
    preferences: [{ key: "release-smoke", value: "ok" }],
  };
  const sync = await request("/sync", payload, token);
  check(sync.status === 201 && sync.result?.synced === true, "API sync");

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  check(Boolean(user), "account persisted in Supabase");
  const counts = await Promise.all([
    prisma.studyProgress.count({ where: { userId: user.id, anatomyId } }),
    prisma.favorite.count({ where: { userId: user.id, anatomyId } }),
    prisma.quizSession.count({ where: { userId: user.id, id: quizId } }),
    prisma.studySession.count({ where: { userId: user.id, id: studyId } }),
    prisma.userPreference.count({ where: { userId: user.id, key: "release-smoke" } }),
  ]);
  check(counts.every((count) => count === 1), "progress, favorite, quiz, study, and preference persisted");

  const fallback = await request("/tutor/ask", { system: "cardiovascular", anatomyId, language: "es", question: "¿Cuál es su función?" }, token);
  check(fallback.status === 201 && fallback.result?.provider === "local", "tutor local fallback");

  const remote = await request("/tutor/ask", {
    system: "cardiovascular", anatomyId, language: "es", question: "Explica brevemente su función anatómica.",
    structureName: "Aurícula derecha", description: "Cavidad cardíaca que recibe el retorno venoso sistémico.",
  }, token);
  check(remote.status === 201 && Boolean(remote.result?.answer) && remote.result?.provider !== "local", "remote tutor response");
}

run()
  .catch((error) => { console.error(`FAIL ${error.message}`); process.exitCode = 1; })
  .finally(async () => {
    try {
      const deleted = await prisma.user.deleteMany({ where: { email } });
      if (deleted.count > 0) console.log("PASS isolated test account removed");
    } catch (error) {
      console.error(`CLEANUP FAILED for ${email}: ${error.message}`);
      process.exitCode = 1;
    }
    await prisma.$disconnect();
  });
