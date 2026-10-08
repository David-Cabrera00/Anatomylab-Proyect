import type { LocalizedText } from "../i18n/localizedText";

type DigestiveEnglishFields = {
  name: string;
  type: string;
  description: string;
  function: string;
  location: string;
  relationships?: readonly string[];
};

const commonTract = {
  type: "Organ of the digestive tract",
  function: "Participates in the transport, digestion, or absorption of digestive contents.",
  location: "Corresponding region of the digestive tract.",
} as const;

const commonAccessory = {
  type: "Digestive accessory organ",
  function: "Contributes to digestion, secretion, or conduction of digestive substances.",
  location: "Corresponding anatomical region.",
} as const;

export const digestiveEnglishFields: Readonly<Record<string, DigestiveEnglishFields>> = {
  "parotid-gland-left": {
    name: "Parotid gland", type: "Salivary gland", description: "Major salivary gland.", function: "Produces serous saliva.", location: "Parotid region.",
  },
  stomach: {
    name: "Stomach", type: "Organ of the digestive tract", description: "Digestive muscular organ.", function: "Stores and mixes food.", location: "Upper abdomen.", relationships: ["Esophagus", "Duodenum"],
  },
  "digestive.esophagus": { name: "Esophagus", description: "Anatomical structure of the digestive system: Esophagus.", ...commonTract },
  "digestive.duodenum": { name: "Duodenum", description: "Anatomical structure of the digestive system: Duodenum.", ...commonTract },
  "digestive.jejunum": { name: "Jejunum", description: "Anatomical structure of the digestive system: Jejunum.", ...commonTract },
  "digestive.appendix": { name: "Vermiform appendix", description: "Anatomical structure of the digestive system: Vermiform appendix.", ...commonTract },
  "digestive.ascending-colon": { name: "Ascending colon", description: "Anatomical structure of the digestive system: Ascending colon.", ...commonTract },
  "digestive.transverse-colon": { name: "Transverse colon", description: "Anatomical structure of the digestive system: Transverse colon.", ...commonTract },
  "digestive.descending-colon": { name: "Descending colon", description: "Anatomical structure of the digestive system: Descending colon.", ...commonTract },
  "digestive.sigmoid-colon": { name: "Sigmoid colon", description: "Anatomical structure of the digestive system: Sigmoid colon.", ...commonTract },
  "digestive.submandibular-gland": { name: "Submandibular gland", description: "Digestive accessory structure: Submandibular gland.", ...commonAccessory },
  "digestive.submandibular-gland-right": { name: "Right submandibular gland", description: "Digestive accessory structure: Right submandibular gland.", ...commonAccessory },
  "digestive.sublingual-gland": { name: "Sublingual gland", description: "Digestive accessory structure: Sublingual gland.", ...commonAccessory },
  "digestive.sublingual-gland-right": { name: "Right sublingual gland", description: "Digestive accessory structure: Right sublingual gland.", ...commonAccessory },
  "digestive.liver": { name: "Liver", description: "Digestive accessory structure: Liver.", ...commonAccessory },
  "digestive.gallbladder": { name: "Gallbladder", description: "Digestive accessory structure: Gallbladder.", ...commonAccessory },
  "digestive.pancreas": { name: "Pancreas", description: "Digestive accessory structure: Pancreas.", ...commonAccessory },
  "digestive.bile-duct": { name: "Bile duct", description: "Digestive accessory structure: Bile duct.", ...commonAccessory },
  "digestive.pancreatic-duct": { name: "Pancreatic duct", description: "Digestive accessory structure: Pancreatic duct.", ...commonAccessory },
  "digestive.tongue": { name: "Tongue", description: "Digestive accessory structure: Tongue.", ...commonAccessory },
};

export function localizeDigestiveText(id: string, value: string, field: keyof DigestiveEnglishFields): LocalizedText {
  const english = digestiveEnglishFields[id]?.[field];
  if (typeof english !== "string") throw new Error(`Traducción digestiva ausente: ${id}:${field}`);
  return { es: value, en: english };
}

export function localizeDigestiveRelationship(id: string, value: string, index: number): LocalizedText {
  const english = digestiveEnglishFields[id]?.relationships?.[index];
  if (!english) throw new Error(`Relación digestiva ausente: ${id}:${index}`);
  return { es: value, en: english };
}
