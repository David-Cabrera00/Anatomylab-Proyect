import fs from "node:fs";
import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith(".") && !/\.[a-z]+$/i.test(specifier)) {
      const url = new URL(`${specifier}.ts`, context.parentURL);
      if (fs.existsSync(url)) return { url: url.href, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
});

const { anatomyIndex } = await import("../src/anatomy/anatomyIndex.ts");
const { anatomySystems } = await import("../src/config/anatomySystems.ts");
const { studyGuidesBySystem } = await import("../src/data/studyGuides.ts");

const entriesById = new Map(anatomyIndex.map((entry) => [entry.id, entry]));
const availableSystems = Object.values(anatomySystems)
  .filter((system) => system.studyAvailable)
  .map((system) => system.id);
const failures = [];
const guideIds = new Set();

for (const systemId of availableSystems) {
  if (!studyGuidesBySystem[systemId]) {
    failures.push(`Sistema habilitado sin guía: ${systemId}`);
  }
}

for (const [systemId, guide] of Object.entries(studyGuidesBySystem)) {
  if (!anatomySystems[systemId]?.studyAvailable) {
    failures.push(`Guía registrada para un sistema no habilitado: ${systemId}`);
  }
  if (guide.system !== systemId) {
    failures.push(`Sistema incoherente en la guía ${guide.id}: ${guide.system}`);
  }
  if (guideIds.has(guide.id)) failures.push(`ID de guía duplicado: ${guide.id}`);
  guideIds.add(guide.id);
  if (!guide.steps.length) failures.push(`Guía sin pasos: ${guide.id}`);

  const stepIds = new Set();
  const anatomyIds = new Set();
  for (const step of guide.steps) {
    if (stepIds.has(step.id)) failures.push(`ID de paso duplicado: ${step.id}`);
    stepIds.add(step.id);
    if (anatomyIds.has(step.anatomyId)) {
      failures.push(`Anatomy ID repetido en ${guide.id}: ${step.anatomyId}`);
    }
    anatomyIds.add(step.anatomyId);

    const entry = entriesById.get(step.anatomyId);
    if (!entry) {
      failures.push(`Anatomy ID inexistente en ${step.id}: ${step.anatomyId}`);
    } else if (entry.system !== systemId) {
      failures.push(`Anatomy ID de otro sistema en ${step.id}: ${step.anatomyId}`);
    } else if (!entry.educationalId) {
      failures.push(`Paso sin ficha educativa en ${step.id}: ${step.anatomyId}`);
    }
  }
}

console.log(JSON.stringify({
  availableSystems,
  guides: Object.values(studyGuidesBySystem).map((guide) => ({
    id: guide.id,
    system: guide.system,
    steps: guide.steps.length,
  })),
  failures,
}, null, 2));

if (failures.length) process.exitCode = 1;
