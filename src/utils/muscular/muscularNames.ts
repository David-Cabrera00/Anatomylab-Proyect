// Los nombres del GLB se conservan para la selección;
// únicamente cambia el texto visible para el usuario.

const translations: Record<string, string> = {
  "Coracobrachial bursa":
    "Bolsa coracobraquial",

  "Cruciform part of fibrous sheath of digit of hand":
    "Parte cruciforme de la vaina fibrosa del dedo de la mano",

  "Subcutaneous acromial bursa":
    "Bolsa acromial subcutánea",

  "Subfacial prepatellar bursa":
    "Bolsa prepatelar subfascial",

  "Tendon sheath - abd. pollicis longus - ext. pollicis brevis":
    "Vaina tendinosa del abductor largo y del extensor corto del pulgar",

  "Tendon sheath of extensor digitorum and extensor indicis":
    "Vaina tendinosa del extensor de los dedos y del extensor del índice",

  "Tendon sheath of extensor digiti minimi manus":
    "Vaina tendinosa del extensor del meñique de la mano",

  "Tendon sheath of extensor pollicis longus":
    "Vaina tendinosa del extensor largo del pulgar",

  "Tendon sheath of extensors carpi radialis":
    "Vaina tendinosa de los extensores radiales del carpo",

  "Tendon sheath of tibialis anterior":
    "Vaina tendinosa del músculo tibial anterior",

  "Trochanteric bursa of gluteus medius muscle":
    "Bolsa trocantérica del músculo glúteo medio",

  "Cabeza corta músculo del bíceps braquial":
    "Cabeza corta del músculo bíceps braquial",

  "Partes dorsales de los m. lumbares intertransversarios lat.":
    "Partes dorsales de los músculos intertransversarios laterales lumbares",

  "Partes ventrales de los m. lumbares intertransvarios lat.":
    "Partes ventrales de los músculos intertransversarios laterales lumbares",
};

const feminineSingular = new Set([
  "aponeurosis",
  "bolsa",
  "cabeza",
  "fascia",
  "linea",
  "parte",
  "porcion",
  "troclea",
  "vaina",
]);

const femininePlural = new Set([
  "bolsas",
  "partes",
  "vainas",
]);

const masculinePlural = new Set([
  "elevadores",
  "ligamentos",
  "musculos",
  "rotadores",
  "tendones",
]);

function plainWord(
  value: string
): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    );
}

export function getMuscularStructureName(
  structureName: string
): string {
  if (
    !structureName?.trim()
  ) {
    return "Estructura muscular";
  }

  let name =
    structureName
      .trim()
      .replace(
        /\.\d{3}$/i,
        ""
      );

  /*
   * El GLB omite .l en esta estructura.
   * Su par .r confirma que esta primera
   * instancia corresponde al lado izquierdo.
   */
  if (
    name ===
    "Músculo iliocostal del cuello"
  ) {
    name += ".l";
  }

  /* ================================
     LATERALIDAD
  ================================ */

  const side =
    name.match(
      /\.(l|r)$/i
    )?.[1]?.toLowerCase();

  if (
    side
  ) {
    name =
      name.slice(
        0,
        -2
      );
  }

  /* ================================
     SUFIJOS TÉCNICOS
  ================================ */

  name =
    name.replace(
      /\.(j|g|t)$/i,
      ""
    );

  /* ================================
     PARÉNTESIS ARTIFICIALES

     Ejemplo:
     (Bolsa iliopectínea)
     ->
     Bolsa iliopectínea
  ================================ */

  name =
    name.replace(
      /^\((.*)\)$/,
      "$1"
    );

  /* ================================
     LIMPIEZA GENERAL
  ================================ */

  name =
    name
      .replace(
        /_/g,
        " "
      )
      .replace(
        /\s+/g,
        " "
      )
      .trim();

  /* ================================
     TRADUCCIONES EXACTAS
  ================================ */

  name =
    translations[name] ??
    name;

  /* ================================
     ERRORES DEL GLB
  ================================ */

  name =
    name
      .replace(
        /\bmusculo\b/gi,
        "músculo"
      )
      .replace(
        /\bmúculo\b/gi,
        "músculo"
      )
      .replace(
        /\bangulo\b/gi,
        "ángulo"
      )
      .replace(
        /\bmultifido\b/gi,
        "multífido"
      )
      .replace(
        /\blongísmo\b/gi,
        "longísimo"
      )
      .replace(
        /\bmasétero\b/gi,
        "masetero"
      )
      .replace(
        /\bhállux\b/gi,
        "primer dedo del pie"
      )
      .replace(
        /^Linea alba$/,
        "Línea alba"
      );

  if (
    !name
  ) {
    return "Estructura muscular";
  }

  /* ================================
     CAPITALIZACIÓN
  ================================ */

  name =
    name[0].toUpperCase() +
    name.slice(1);

  /* ================================
     SIN LATERALIDAD
  ================================ */

  if (
    !side
  ) {
    return name;
  }

  const left =
    side === "l";

  /* ================================
     GÉNERO Y NÚMERO
  ================================ */

  const firstWord =
    plainWord(
      name.split(/\s+/)[0]
    );

  let suffix: string;

  if (
    feminineSingular.has(
      firstWord
    )
  ) {
    suffix =
      left
        ? "izquierda"
        : "derecha";
  } else if (
    femininePlural.has(
      firstWord
    )
  ) {
    suffix =
      left
        ? "izquierdas"
        : "derechas";
  } else if (
    masculinePlural.has(
      firstWord
    )
  ) {
    suffix =
      left
        ? "izquierdos"
        : "derechos";
  } else {
    suffix =
      left
        ? "izquierdo"
        : "derecho";
  }

  return `${name} ${suffix}`;
}