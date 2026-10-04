import fs from "node:fs";
import path from "node:path";
import { TextDecoder } from "node:util";

const ROOT = process.cwd();

const DATA_DIR = path.join(
  ROOT,
  "src",
  "data",
  "nervous"
);

const CATALOG_FILE = path.join(
  ROOT,
  "src",
  "anatomy",
  "catalogs",
  "nervousModelCatalog.ts"
);

const WRITE = process.argv.includes("--write");

const decoder = new TextDecoder("utf-8", {
  fatal: true,
});

/*
 * Algunos caracteres de Windows-1252 no coinciden directamente
 * con los valores Unicode 0x80-0x9F.
 *
 * Este mapa permite reconstruir correctamente cadenas que fueron
 * interpretadas con una codificación incorrecta.
 */
const CP1252_REVERSE = new Map([
  ["€", 0x80],
  ["‚", 0x82],
  ["ƒ", 0x83],
  ["„", 0x84],
  ["…", 0x85],
  ["†", 0x86],
  ["‡", 0x87],
  ["ˆ", 0x88],
  ["‰", 0x89],
  ["Š", 0x8a],
  ["‹", 0x8b],
  ["Œ", 0x8c],
  ["Ž", 0x8e],
  ["‘", 0x91],
  ["’", 0x92],
  ["“", 0x93],
  ["”", 0x94],
  ["•", 0x95],
  ["–", 0x96],
  ["—", 0x97],
  ["˜", 0x98],
  ["™", 0x99],
  ["š", 0x9a],
  ["›", 0x9b],
  ["œ", 0x9c],
  ["ž", 0x9e],
  ["Ÿ", 0x9f],
]);

function toLegacyByte(char) {
  const codePoint = char.codePointAt(0);

  if (codePoint <= 0xff) {
    return codePoint;
  }

  return CP1252_REVERSE.get(char) ?? null;
}

/*
 * Intenta deshacer una pasada de mojibake.
 *
 * Ejemplo:
 *
 *   "TÃ¡lamo"
 *        ↓
 *   "Tálamo"
 */
function decodeMojibakeOnce(value) {
  const bytes = [];

  for (const char of value) {
    const byte = toLegacyByte(char);

    if (byte === null) {
      return null;
    }

    bytes.push(byte);
  }

  try {
    return decoder.decode(
      Uint8Array.from(bytes)
    );
  } catch {
    return null;
  }
}

/*
 * Genera varias posibilidades porque algunos strings
 * pueden haber sufrido más de una conversión incorrecta.
 */
function buildRepairCandidates(value) {
  const candidates = [];
  const seen = new Set();

  let current = value;

  for (let pass = 0; pass < 4; pass += 1) {
    const normalized =
      current.normalize("NFC");

    if (!seen.has(normalized)) {
      seen.add(normalized);
      candidates.push(normalized);
    }

    const decoded =
      decodeMojibakeOnce(current);

    if (
      !decoded ||
      decoded === current
    ) {
      break;
    }

    current = decoded;
  }

  return candidates;
}

/*
 * Lee todos los originalName del catálogo nervioso.
 *
 * Soporta:
 *
 * originalName: "..."
 *
 * y también:
 *
 * "originalName": "..."
 */
function extractCatalogNames(source) {
  const names = [];

  const regex =
    /["']?originalName["']?\s*:\s*["']([^"']+)["']/g;

  let match;

  while ((match = regex.exec(source)) !== null) {
    names.push(match[1]);
  }

  return names;
}

/*
 * Busca recursivamente todos los archivos TypeScript
 * dentro de src/data/nervous.
 */
function collectTsFiles(directory) {
  const files = [];

  for (
    const entry of fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      }
    )
  ) {
    const fullPath =
      path.join(
        directory,
        entry.name
      );

    if (entry.isDirectory()) {
      files.push(
        ...collectTsFiles(fullPath)
      );

      continue;
    }

    if (
      entry.isFile() &&
      entry.name.endsWith(".ts")
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

/*
 * Validaciones iniciales.
 */
if (!fs.existsSync(CATALOG_FILE)) {
  throw new Error(
    `No existe el catálogo nervioso:\n${CATALOG_FILE}`
  );
}

if (!fs.existsSync(DATA_DIR)) {
  throw new Error(
    `No existe la carpeta de datos nerviosos:\n${DATA_DIR}`
  );
}

/*
 * Cargar catálogo.
 */
const catalogSource =
  fs.readFileSync(
    CATALOG_FILE,
    "utf8"
  );

const catalogNames =
  extractCatalogNames(
    catalogSource
  );

if (catalogNames.length === 0) {
  throw new Error(
    "No se encontraron originalName en nervousModelCatalog.ts"
  );
}

/*
 * Índice del catálogo usando NFC.
 *
 * NFC solamente normaliza la representación Unicode.
 * NO elimina tildes ni cambia palabras.
 */
const catalogByNormalizedName =
  new Map();

for (const name of catalogNames) {
  const normalized =
    name.normalize("NFC");

  const previous =
    catalogByNormalizedName.get(
      normalized
    );

  if (
    previous &&
    previous !== name
  ) {
    throw new Error(
      [
        "El catálogo contiene formas Unicode equivalentes distintas:",
        previous,
        name,
      ].join("\n")
    );
  }

  catalogByNormalizedName.set(
    normalized,
    name
  );
}

/*
 * Busca una reparación que pueda demostrarse
 * contra el catálogo real.
 *
 * CASO 1:
 *
 *   "Nervio Ã³ptico (II).l"
 *
 *             ↓
 *
 *   "Nervio óptico (II).l"
 *
 * y ese nombre existe exactamente en catálogo.
 *
 *
 * CASO 2:
 *
 * Los helpers bilaterales usan una base:
 *
 *   bilateral("TÃ¡lamo", ...)
 *
 * pero el catálogo contiene:
 *
 *   Tálamo.l
 *   Tálamo.r
 *
 * Si ambos lados existen, podemos demostrar
 * que la base correcta es "Tálamo".
 */
function findExactRepair(value) {
  const matches = new Set();

  const candidates =
    buildRepairCandidates(value);

  for (const candidate of candidates) {
    const normalized =
      candidate.normalize("NFC");

    /*
     * Coincidencia exacta.
     */
    const exact =
      catalogByNormalizedName.get(
        normalized
      );

    if (exact) {
      matches.add(exact);
      continue;
    }

    /*
     * Coincidencia bilateral.
     */
    const left =
      catalogByNormalizedName.get(
        `${normalized}.l`
      );

    const right =
      catalogByNormalizedName.get(
        `${normalized}.r`
      );

    if (left && right) {
      matches.add(
        candidate.normalize("NFC")
      );
    }
  }

  if (matches.size === 0) {
    return null;
  }

  if (matches.size > 1) {
    throw new Error(
      `Reparación ambigua para "${value}":\n` +
        [...matches].join("\n")
    );
  }

  return [...matches][0];
}

/*
 * Los textos educativos no siempre coinciden con un originalName del catálogo.
 * En esos casos sólo aceptamos una reparación si una recodificación completa
 * elimina todos los marcadores conocidos de mojibake y no introduce U+FFFD.
 */
function findSafeTextRepair(value) {
  if (!/Ã|Â|â|ð|�/.test(value)) {
    return null;
  }

  const repaired = buildRepairCandidates(value)
    .slice(1)
    .find((candidate) => !/Ã|Â|â|ð|�/.test(candidate));

  return repaired && repaired !== value ? repaired : null;
}

const files =
  collectTsFiles(DATA_DIR);

const replacements = [];

const unresolvedSuspicious =
  new Set();

/*
 * Revisa strings con comillas dobles o simples.
 *
 * Solo reemplaza si findExactRepair()
 * consigue demostrar una correspondencia
 * contra el catálogo.
 */
function processQuotedStrings(
  source,
  filePath,
  quote
) {
  const regex =
    quote === '"'
      ? /"((?:\\.|[^"\\])*)"/g
      : /'((?:\\.|[^'\\])*)'/g;

  return source.replace(
    regex,
    (
      fullMatch,
      rawValue
    ) => {
      /*
       * No reinterpretamos strings con escapes.
       *
       * Evita tocar cosas como:
       *
       * "\u00f3"
       */
      if (
        rawValue.includes("\\")
      ) {
        return fullMatch;
      }

      const repaired =
        findExactRepair(rawValue) ?? findSafeTextRepair(rawValue);

      if (
        repaired &&
        repaired !== rawValue
      ) {
        replacements.push({
          file: path
            .relative(
              ROOT,
              filePath
            )
            .replaceAll("\\", "/"),
          before: rawValue,
          after: repaired,
        });

        return (
          quote +
          repaired +
          quote
        );
      }

      /*
       * Detectar posibles mojibakes que no pudieron
       * demostrarse contra el catálogo.
       *
       * Muchos serán textos educativos visibles,
       * no necesariamente originalName.
       */
      if (
        /Ã|Â|â|ð|�/.test(
          rawValue
        ) &&
        !catalogByNormalizedName.has(
          rawValue.normalize("NFC")
        )
      ) {
        unresolvedSuspicious.add(
          `${path
            .relative(
              ROOT,
              filePath
            )
            .replaceAll(
              "\\",
              "/"
            )}: ${rawValue}`
        );
      }

      return fullMatch;
    }
  );
}

/*
 * Procesar archivos.
 */
for (const filePath of files) {
  const original =
    fs.readFileSync(
      filePath,
      "utf8"
    );

  let updated =
    processQuotedStrings(
      original,
      filePath,
      '"'
    );

  updated =
    processQuotedStrings(
      updated,
      filePath,
      "'"
    );

  updated.split(/\r?\n/).forEach((line, index) => {
    if (/Ã|Â|â|ð|�/.test(line)) {
      unresolvedSuspicious.add(
        `${path.relative(ROOT, filePath).replaceAll("\\", "/")}:${index + 1}: ${line.trim()}`
      );
    }
  });

  if (
    WRITE &&
    updated !== original
  ) {
    fs.writeFileSync(
      filePath,
      updated,
      "utf8"
    );
  }
}

/*
 * Reporte.
 */
console.log(
  "\n=== REPARACIÓN MOJIBAKE NERVIOSO ==="
);

console.log(
  `Modo: ${
    WRITE
      ? "ESCRITURA"
      : "SIMULACIÓN"
  }`
);

console.log(
  `Archivos .ts revisados: ${files.length}`
);

console.log(
  `OriginalName en catálogo: ${catalogNames.length}`
);

console.log(
  `Reemplazos seguros encontrados: ${replacements.length}`
);

/*
 * Mostrar cambios.
 */
for (
  const item of replacements
) {
  console.log(
    `\n${item.file}`
  );

  console.log(
    `  - ${item.before}`
  );

  console.log(
    `  + ${item.after}`
  );
}

/*
 * Mostrar sospechosos que no pudimos comprobar.
 */
console.log(
  `\nStrings sospechosos sin equivalencia exacta en catálogo: ${unresolvedSuspicious.size}`
);

for (
  const item of [
    ...unresolvedSuspicious,
  ].sort()
) {
  console.log(
    `  ? ${item}`
  );
}

if (!WRITE) {
  console.log(
    "\nSIMULACIÓN TERMINADA."
  );

  console.log(
    "No se modificó ningún archivo."
  );

  console.log(
    "\nSi los reemplazos son correctos ejecuta:"
  );

  console.log(
    "node scripts/fix-nervous-mojibake.mjs --write"
  );
} else {
  console.log(
    "\nREPARACIÓN TERMINADA."
  );

  console.log(
    "Los reemplazos seguros fueron guardados en UTF-8."
  );
}
