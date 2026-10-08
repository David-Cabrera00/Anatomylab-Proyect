import type { LocalizedText } from "../i18n/localizedText";

type CardiovascularLocalizedFields = {
  name: string;
  type: string;
  description: string;
  function: string;
  location: string;
  relationships: readonly string[];
};

export const cardiovascularLocalizedText: Readonly<Record<string, CardiovascularLocalizedFields>> = {
  Right_atrium: {
    name: "Right atrium", type: "Heart", description: "Upper right chamber of the heart that receives venous blood from the systemic circulation.",
    function: "Receives deoxygenated blood and directs it to the right ventricle through the tricuspid valve.", location: "Located in the upper right region of the heart.", relationships: ["Superior vena cava", "Inferior vena cava", "Coronary sinus", "Right ventricle"],
  },
  Left_atrium: {
    name: "Left atrium", type: "Heart", description: "Upper left chamber of the heart that receives oxygenated blood from the lungs.",
    function: "Receives blood from the pulmonary veins and directs it to the left ventricle.", location: "Located mainly in the posterior and superior region of the heart.", relationships: ["Pulmonary veins", "Left ventricle", "Mitral valve"],
  },
  Right_ventricle: {
    name: "Right ventricle", type: "Heart", description: "Lower right chamber of the heart responsible for propelling blood into the pulmonary circulation.",
    function: "Pumps deoxygenated blood into the pulmonary trunk and subsequently to the lungs.", location: "Occupies much of the anterior surface of the heart.", relationships: ["Right atrium", "Tricuspid valve", "Pulmonary trunk", "Pulmonary valve"],
  },
  Left_ventricle: {
    name: "Left ventricle", type: "Heart", description: "Lower left chamber of the heart with a thick muscular wall, prepared to generate high pressure.",
    function: "Pumps oxygenated blood into the aorta for distribution through the systemic circulation.", location: "Forms much of the left side and apex of the heart.", relationships: ["Left atrium", "Mitral valve", "Aorta", "Interventricular septum"],
  },
  Ascending_aorta: {
    name: "Ascending aorta", type: "Artery", description: "First portion of the aorta after its exit from the left ventricle.",
    function: "Transports oxygenated blood from the heart to the systemic circulation.", location: "Originates in the left ventricle and ascends within the thorax before continuing as the aortic arch.", relationships: ["Left ventricle", "Aortic valve", "Aortic arch", "Coronary arteries"],
  },
  Aortic_arch: {
    name: "Aortic arch", type: "Artery", description: "Curved portion of the aorta located between the ascending aorta and the descending aorta.",
    function: "Distributes blood to structures of the head, neck, and upper limbs through its main branches.", location: "Located in the upper part of the thorax.", relationships: ["Ascending aorta", "Descending aorta", "Brachiocephalic trunk", "Left common carotid artery", "Left subclavian artery"],
  },
  Thoracic_aorta: {
    name: "Descending aorta", type: "Artery", description: "Continuation of the aorta after the aortic arch.",
    function: "Distributes oxygenated blood to the thorax, abdomen, and lower regions of the body.", location: "Descends from the thorax toward the abdomen.", relationships: ["Aortic arch", "Thoracic aorta", "Abdominal aorta"],
  },
  Pulmonary_trunk: {
    name: "Pulmonary trunk", type: "Great vessel", description: "Great vessel that exits the right ventricle and divides into the right and left pulmonary arteries.",
    function: "Transports deoxygenated blood from the heart to the lungs.", location: "Originates in the right ventricle and ascends before dividing into the pulmonary arteries.", relationships: ["Right ventricle", "Pulmonary valve", "Right pulmonary artery", "Left pulmonary artery"],
  },
  Right_pulmonary_artery: {
    name: "Right pulmonary artery", type: "Artery", description: "Right branch of the pulmonary trunk responsible for carrying blood to the right lung.",
    function: "Transports deoxygenated blood from the heart to the right lung for gas exchange.", location: "Runs from the pulmonary trunk toward the hilum of the right lung.", relationships: ["Pulmonary trunk", "Right lung", "Pulmonary vessels"],
  },
  Left_pulmonary_artery: {
    name: "Left pulmonary artery", type: "Artery", description: "Left branch of the pulmonary trunk responsible for carrying blood to the left lung.",
    function: "Transports deoxygenated blood to the left lung to permit gas exchange.", location: "Runs from the pulmonary trunk toward the hilum of the left lung.", relationships: ["Pulmonary trunk", "Left lung", "Pulmonary vessels"],
  },
  Right_superior_pulmonary_vein: {
    name: "Right superior pulmonary vein", type: "Vein", description: "Pulmonary vein that returns oxygenated blood from superior regions of the right lung.",
    function: "Transports oxygenated blood from the right lung to the left atrium.", location: "Extends from the right lung to the left atrium.", relationships: ["Right lung", "Left atrium", "Pulmonary veins"],
  },
  Right_inferior_pulmonary_vein: {
    name: "Right inferior pulmonary vein", type: "Vein", description: "Pulmonary vein that returns oxygenated blood from inferior regions of the right lung.",
    function: "Transports oxygenated blood to the left atrium.", location: "Connects the right lung with the left atrium.", relationships: ["Right lung", "Left atrium"],
  },
  Left_superior_pulmonary_vein: {
    name: "Left superior pulmonary vein", type: "Vein", description: "Pulmonary vein that returns oxygenated blood from superior regions of the left lung.",
    function: "Transports oxygenated blood to the left atrium.", location: "Connects the left lung with the left atrium.", relationships: ["Left lung", "Left atrium"],
  },
  Left_inferior_pulmonary_vein: {
    name: "Left inferior pulmonary vein", type: "Vein", description: "Pulmonary vein that returns oxygenated blood from inferior regions of the left lung.",
    function: "Transports oxygenated blood from the left lung to the heart.", location: "Extends from the left lung to the left atrium.", relationships: ["Left lung", "Left atrium"],
  },
  Superior_vena_cava: {
    name: "Superior vena cava", type: "Vein", description: "Great vein responsible for venous return from the upper regions of the body.",
    function: "Transports deoxygenated blood from the head, neck, thorax, and upper limbs to the right atrium.", location: "Descends through the thorax and empties into the right atrium.", relationships: ["Right atrium", "Brachiocephalic veins"],
  },
  "Inferior_vena_cava_(thoracic_part)": {
    name: "Inferior vena cava", type: "Vein", description: "Great vein responsible for venous return from the lower regions of the body.",
    function: "Transports deoxygenated blood from the abdomen, pelvis, and lower limbs to the right atrium.", location: "Ascends through the abdomen, passes through the diaphragm, and empties into the right atrium.", relationships: ["Right atrium", "Common iliac veins", "Renal veins", "Hepatic veins"],
  },
  Brachiocephalic_trunk: {
    name: "Brachiocephalic trunk", type: "Artery", description: "First great branch of the aortic arch.",
    function: "Carries blood to the right side of the head and neck and to the right upper limb.", location: "Originates in the aortic arch within the upper thorax.", relationships: ["Aortic arch", "Right common carotid artery", "Right subclavian artery"],
  },
  Coeliac_trunk: {
    name: "Celiac trunk", type: "Artery", description: "Main arterial branch of the abdominal aorta that supplies organs of the upper abdomen.",
    function: "Distributes blood mainly to the stomach, liver, spleen, and other related structures.", location: "Originates in the upper portion of the abdominal aorta.", relationships: ["Abdominal aorta", "Left gastric artery", "Common hepatic artery", "Splenic artery"],
  },
};

export function localizeCardiovascularStructure<T extends { id: string; name: string; type: string; description: string; function: string; location: string; relationships: readonly string[] }>(structure: T) {
  const english = cardiovascularLocalizedText[structure.id];
  if (!english) throw new Error(`Traducción cardiovascular ausente: ${structure.id}`);
  const localize = (es: string, en: string): LocalizedText => ({ es, en });
  return {
    ...structure,
    name: localize(structure.name, english.name),
    type: localize(structure.type, english.type),
    description: localize(structure.description, english.description),
    function: localize(structure.function, english.function),
    location: localize(structure.location, english.location),
    relationships: structure.relationships.map((es, index) => localize(es, english.relationships[index])),
  };
}
