const { randomUUID } = require("node:crypto");
const { PrismaClient } = require("@prisma/client");

const apiUrl = process.env.API_URL || "http://127.0.0.1:3000/api";
const prisma = new PrismaClient();
const suffix = randomUUID();
const users = [
  { email: `security-a-${suffix}@example.com`, password: "SecurityTest123!" },
  { email: `security-b-${suffix}@example.com`, password: "SecurityTest123!" },
];

async function request(path, options = {}) {
  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  let body = null;
  try { body = await response.json(); } catch { /* Empty response is valid for some errors. */ }
  return { response, body };
}

function assert(condition, message) {
  if (!condition) throw new Error(`FAIL: ${message}`);
  console.log(`PASS: ${message}`);
}

async function expectStatus(path, status, options, message) {
  const result = await request(path, options);
  assert(result.response.status === status, `${message} (${result.response.status})`);
  return result;
}

async function run() {
  const health = await request("/health");
  assert(health.response.ok && health.body?.status === "ok", "health endpoint available");

  const invalidRegister = await expectStatus("/auth/register", 400, {
    method: "POST",
    body: JSON.stringify({ email: "not-an-email", password: "short", unexpected: true }),
  }, "invalid registration rejected");
  assert(Array.isArray(invalidRegister.body?.message), "validation details returned without server error");

  const sessions = [];
  for (const user of users) {
    const result = await request("/auth/register", { method: "POST", body: JSON.stringify(user) });
    assert(result.response.status === 201 && result.body?.accessToken, "user registration returns access token");
    sessions.push(result.body);
  }

  await expectStatus("/auth/login", 401, {
    method: "POST",
    body: JSON.stringify({ email: users[0].email, password: "WrongPassword123!" }),
  }, "invalid credentials rejected");

  await expectStatus("/sync", 401, {
    method: "POST",
    body: JSON.stringify({ progress: [], favorites: [], quizSessions: [], studySessions: [], preferences: [] }),
  }, "sync without token rejected");

  await expectStatus("/sync", 401, {
    method: "POST",
    headers: { Authorization: "Bearer invalid-token" },
    body: JSON.stringify({ progress: [], favorites: [], quizSessions: [], studySessions: [], preferences: [] }),
  }, "invalid token rejected");

  await expectStatus("/sync", 400, {
    method: "POST",
    headers: { Authorization: `Bearer ${sessions[0].accessToken}` },
    body: JSON.stringify({
      progress: [{ system: "unknown", anatomyId: "test", score: 1 }],
      favorites: [], quizSessions: [], studySessions: [], preferences: [],
    }),
  }, "unknown anatomical system rejected");

  const sharedQuizId = `security-quiz-${suffix}`;
  const sharedStudyId = `security-study-${suffix}`;
  const syncPayload = {
    progress: [{ system: "cardiovascular", anatomyId: "cardiovascular.right-atrium", score: 0.5 }],
    favorites: [],
    quizSessions: [{
      id: sharedQuizId,
      system: "cardiovascular",
      configId: "security",
      score: 50,
      totalQuestions: 2,
      correctCount: 1,
      startedAt: "2026-10-12T16:00:00.000Z",
      completedAt: "2026-10-12T16:01:00.000Z",
      answers: [],
    }],
    studySessions: [{
      id: sharedStudyId,
      system: "cardiovascular",
      stepsDone: 1,
      startedAt: "2026-10-12T16:00:00.000Z",
      completedAt: "2026-10-12T16:01:00.000Z",
    }],
    preferences: [{ key: "security-test", value: "ok" }],
  };

  const synced = await request("/sync", {
    method: "POST",
    headers: { Authorization: `Bearer ${sessions[0].accessToken}` },
    body: JSON.stringify(syncPayload),
  });
  assert(synced.response.status === 201 && synced.body?.synced === true, "authenticated sync succeeds");

  await expectStatus("/sync", 403, {
    method: "POST",
    headers: { Authorization: `Bearer ${sessions[1].accessToken}` },
    body: JSON.stringify(syncPayload),
  }, "cross-user sync is rejected");

  await expectStatus("/tutor/ask", 400, {
    method: "POST",
    headers: { Authorization: `Bearer ${sessions[0].accessToken}` },
    body: JSON.stringify({ system: "cardiovascular", anatomyId: "cardiovascular.right-atrium", question: "x".repeat(2001) }),
  }, "oversized tutor question rejected");

  console.log("Security smoke test completed.");
}

run()
  .catch((error) => {
    console.error(error.message || error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.user.deleteMany({ where: { email: { startsWith: "security-" } } });
    await prisma.$disconnect();
  });
