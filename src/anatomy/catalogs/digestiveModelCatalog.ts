import type { AnatomyModelBinding } from "../types";

/** Catálogo estático generado/validado para digestive_overview.glb. */
export type DigestiveModelCatalogEntry = AnatomyModelBinding & { hasSelectableGeometry: true };

export const digestiveModelCatalog: readonly DigestiveModelCatalogEntry[] = [
  "Glándula parótida.l","Glándula parótida.r","Estómago","Esófago","Duodeno","Yeyuno","Apéndice vermiforme","Colon ascendente","Colon transverso","Colon descendente","Colon sigmoideo","Glándula submandibular.l","Glándula submandibular.r","Glándula sublingual.l","Glándula sublingual.r","Hígado","Vesícula biliar","Páncreas","Conducto biliar","Conducto pancreático","Lengua","Gingiva",
].map((originalName) => ({ modelKey: "overview", originalName, hasSelectableGeometry: true as const }));
