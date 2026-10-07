const auditScripts = [
  "audit-cardiovascular-anatomy.mjs",
  "audit-respiratory-anatomy.mjs",
  "audit-nervous-anatomy.mjs",
  "classify-nervous-gaps.mjs",
  "audit-skeletal-anatomy.mjs",
  "audit-muscular-anatomy.mjs",
  "classify-muscular-gaps.mjs",
  "audit-digestive-anatomy.mjs",
  "audit-anatomy-search.mjs",
  "audit-study-guides.mjs",
  "audit-quiz.mjs",
];

for (const scriptName of auditScripts) {
  const capturedOutput = [];
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const capture = (...values) => capturedOutput.push(values.join(" "));
  const previousExitCode = process.exitCode;
  process.exitCode = 0;

  try {
    console.log = capture;
    console.warn = capture;
    console.error = capture;
    await import(new URL(scriptName, import.meta.url));
  } catch (error) {
    capturedOutput.push(error instanceof Error ? error.stack ?? error.message : String(error));
    process.exitCode = 1;
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
  }

  if (process.exitCode) {
    process.stderr.write(`${capturedOutput.join("\n")}\n`);
    console.error(`FAIL ${scriptName}`);
    process.exit(process.exitCode);
  }

  process.exitCode = previousExitCode;
  console.log(`PASS ${scriptName}`);
}

console.log("Anatomía validada: 6/6 sistemas + clasificaciones muscular y nerviosa + búsqueda global + guías de estudio + quiz.");
