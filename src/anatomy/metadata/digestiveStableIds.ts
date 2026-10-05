/**
 * Identidades persistentes para el sistema digestivo.
 * Los valores se conservan aunque cambien nombres, orden o índices del GLB.
 * Cubre las 22 entradas del catálogo.
 */
export const digestiveStableIdByOriginalName = {
  // Glándulas salivales (piloto + accesorias)
  "Glándula parótida.l": "digestive.parotid-gland.left",
  "Glándula parótida.r": "digestive.parotid-gland.right",
  "Glándula submandibular.l": "digestive.submandibular-gland.left",
  "Glándula submandibular.r": "digestive.submandibular-gland.right",
  "Glándula sublingual.l": "digestive.sublingual-gland.left",
  "Glándula sublingual.r": "digestive.sublingual-gland.right",

  // Tubo digestivo
  "Estómago": "digestive.stomach",
  "Esófago": "digestive.esophagus",
  "Duodeno": "digestive.duodenum",
  "Yeyuno": "digestive.jejunum",
  "Apéndice vermiforme": "digestive.appendix",
  "Colon ascendente": "digestive.ascending-colon",
  "Colon transverso": "digestive.transverse-colon",
  "Colon descendente": "digestive.descending-colon",
  "Colon sigmoideo": "digestive.sigmoid-colon",

  // Órganos accesorios
  "Hígado": "digestive.liver",
  "Vesícula biliar": "digestive.gallbladder",
  "Páncreas": "digestive.pancreas",
  "Conducto biliar": "digestive.bile-duct",
  "Conducto pancreático": "digestive.pancreatic-duct",
  "Lengua": "digestive.tongue",

  // Sin ficha educativa
  "Gingiva": "digestive.gingiva",
} as const satisfies Readonly<Record<string, string>>;