import fs from "node:fs";

const catalogPath =
  "src/anatomy/catalogs/nervousModelCatalog.ts";

const files = [
  "src/data/nervous/central.ts",
  "src/data/nervous/peripheral.ts",
  "src/data/nervous/senses.ts",
];

const target = "Lóbulo central";

const catalog = fs.readFileSync(
  catalogPath,
  "utf8"
);

console.log("=== CATÁLOGO ===");
console.log(
  "Contiene exacto:",
  catalog.includes(`"originalName": "${target}"`)
);

console.log(
  "Target codepoints:",
  [...target].map(
    c => `${c}=U+${c.codePointAt(0)
      .toString(16)
      .toUpperCase()
      .padStart(4, "0")}`
  ).join(" ")
);

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");

  if (text.includes(target)) {
    console.log(`\n=== ${file} ===`);
    console.log("Contiene exacto:", true);

    const matches =
      text.match(/[^"\n]*Lóbulo central[^"\n]*/g) ?? [];

    for (const match of matches) {
      console.log(JSON.stringify(match));

      console.log(
        [...match].map(
          c =>
            `${c}=U+${c.codePointAt(0)
              .toString(16)
              .toUpperCase()
              .padStart(4, "0")}`
        ).join(" ")
      );
    }
  }
}