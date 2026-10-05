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

const pending = anatomyIndex
  .filter((entry) => entry.system === "nervous" && !entry.educationalId)
  .sort((left, right) =>
    left.layer.localeCompare(right.layer, "es") ||
    left.displayName.localeCompare(right.displayName, "es") ||
    left.id.localeCompare(right.id, "es")
  );

const entriesByLayer = Map.groupBy(pending, (entry) => entry.layer);

console.log(`Sistema nervioso sin ficha: ${pending.length}`);
for (const [layer, entries] of entriesByLayer) {
  console.log(`\n${layer}: ${entries.length}`);
  for (const entry of entries) {
    const originalNames = entry.modelBindings.map((binding) => binding.originalName).join(" | ");
    console.log(`- ${entry.id}\t${entry.displayName}\t${originalNames}`);
  }
}
