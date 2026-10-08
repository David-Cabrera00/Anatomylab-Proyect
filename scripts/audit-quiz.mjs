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

const [{ anatomyIndex }, { quizConfigs }] = await Promise.all([
  import("../src/anatomy/anatomyIndex.ts"),
  import("../src/data/quiz/index.ts"),
]);

const expectedSystems = ["cardiovascular", "respiratory", "nervous", "skeletal", "muscular", "digestive"];
const anatomyById = new Map(anatomyIndex.map((entry) => [entry.id, entry]));
const configIds = new Set();
const questionDefinitions = new Map();
const errors = [];
const spanishText = (value) => typeof value === "string" ? value : value.es;

for (const system of expectedSystems) {
  if (!quizConfigs.some((config) => config.system === system)) {
    errors.push(`No existe configuración de quiz para ${system}.`);
  }
}

for (const config of quizConfigs) {
  if (configIds.has(config.id)) errors.push(`Config id duplicado: ${config.id}.`);
  configIds.add(config.id);

  if (config.questionPool.length < config.questionsPerSession) {
    errors.push(`${config.id}: pool de ${config.questionPool.length}, menor que questionsPerSession=${config.questionsPerSession}.`);
  }
  if (config.questionsPerSession <= 0) errors.push(`${config.id}: questionsPerSession debe ser positivo.`);
  if (config.passingScore < 0 || config.passingScore > 100) errors.push(`${config.id}: passingScore fuera de 0-100.`);

  const idsInConfig = new Set();
  for (const question of config.questionPool) {
    if (idsInConfig.has(question.id)) errors.push(`${config.id}: pregunta duplicada ${question.id}.`);
    idsInConfig.add(question.id);

    const previous = questionDefinitions.get(question.id);
    const serialized = JSON.stringify(question);
    if (previous && previous !== serialized) errors.push(`La pregunta ${question.id} tiene definiciones distintas.`);
    questionDefinitions.set(question.id, serialized);

    if (question.system !== config.system) errors.push(`${question.id}: sistema ${question.system}, config ${config.system}.`);
    const anatomyEntry = anatomyById.get(question.anatomyId);
    if (!anatomyEntry) {
      errors.push(`${question.id}: anatomyId inexistente ${question.anatomyId}.`);
    } else if (anatomyEntry.system !== question.system) {
      errors.push(`${question.id}: anatomyId pertenece a ${anatomyEntry.system}, no a ${question.system}.`);
    }
    if (!spanishText(question.prompt).trim()) errors.push(`${question.id}: prompt vacío.`);
    if (!spanishText(question.explanation).trim()) errors.push(`${question.id}: explicación vacía.`);
    if (question.options.length < 2) errors.push(`${question.id}: requiere al menos dos opciones.`);
    if (new Set(question.options.map((option) => spanishText(option).trim().toLocaleLowerCase())).size !== question.options.length) {
      errors.push(`${question.id}: contiene opciones duplicadas.`);
    }
    if (question.correctIndex < 0 || question.correctIndex >= question.options.length) {
      errors.push(`${question.id}: correctIndex=${question.correctIndex} fuera de rango.`);
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Quiz validado: ${quizConfigs.length} configuraciones, ${questionDefinitions.size} preguntas y 6/6 sistemas.`);
}
