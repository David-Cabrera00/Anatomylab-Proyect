type CardiovascularQuizEnglish = {
  prompt: string;
  options: readonly string[];
  explanation: string;
};

export const cardiovascularQuizEnglish: Readonly<Record<string, CardiovascularQuizEnglish>> = {
  "cv-q-001": {
    prompt: "This cardiac chamber receives deoxygenated venous blood from the systemic circulation through the venae cavae.",
    options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
    explanation: "The right atrium receives deoxygenated blood from the superior and inferior venae cavae.",
  },
  "cv-q-002": {
    prompt: "Leaflet of the tricuspid valve located next to the interventricular septum.",
    options: ["Anterior tricuspid leaflet", "Septal tricuspid leaflet", "Posterior mitral leaflet", "Pulmonary semilunar leaflet"],
    explanation: "The septal leaflet is one of the three leaflets of the right atrioventricular valve.",
  },
  "cv-q-003": {
    prompt: "This great artery emerges from the right ventricle and divides into the right and left pulmonary arteries.",
    options: ["Ascending aorta", "Pulmonary trunk", "Superior vena cava", "Right coronary artery"],
    explanation: "The pulmonary trunk arises from the right ventricle and carries deoxygenated blood to the lungs.",
  },
  "cv-q-004": {
    prompt: "This cardiac chamber has the thickest wall and pumps oxygenated blood into the systemic circulation through the aorta.",
    options: ["Left atrium", "Right ventricle", "Left ventricle", "Right atrium"],
    explanation: "The left ventricle generates the highest pressure to distribute blood throughout the body.",
  },
  "cv-q-005": {
    prompt: "Posterior leaflet of the left atrioventricular or mitral valve.",
    options: ["Septal tricuspid leaflet", "Posterior mitral leaflet", "Noncoronary aortic leaflet", "Anterior pulmonary leaflet"],
    explanation: "The mitral valve has two leaflets; the posterior leaflet contributes to closure between the left atrium and ventricle.",
  },
  "cv-q-006": {
    prompt: "First segment of the aorta that ascends from the left ventricle before curving into the aortic arch.",
    options: ["Aortic arch", "Ascending aorta", "Descending thoracic aorta", "Abdominal aorta"],
    explanation: "The ascending aorta is the initial segment that arises from the left ventricle.",
  },
  "cv-q-007": {
    prompt: "Artery that originates in the right aortic sinus and runs through the right coronary sulcus, mainly supplying the right ventricle and the sinoatrial node.",
    options: ["Left coronary artery", "Right coronary artery", "Circumflex artery", "Anterior descending artery"],
    explanation: "The right coronary artery supplies the right ventricle and usually gives rise to the branch supplying the sinoatrial node.",
  },
  "cv-q-008": {
    prompt: "Aortic valve leaflet that does not give rise to a coronary artery.",
    options: ["Right coronary leaflet", "Anterior pulmonary leaflet", "Noncoronary leaflet", "Left coronary leaflet"],
    explanation: "The noncoronary leaflet is the only aortic leaflet without an associated coronary ostium.",
  },
  "cv-q-009": {
    prompt: "The pulmonary veins carry deoxygenated blood from the lungs to the heart.",
    options: ["True", "False"],
    explanation: "The pulmonary veins carry OXYGENATED blood from the lungs to the left atrium.",
  },
  "cv-q-010": {
    prompt: "Cardiac chamber that propels deoxygenated blood toward the pulmonary trunk during systole.",
    options: ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle"],
    explanation: "The right ventricle sends blood into the pulmonary circuit through the pulmonary trunk.",
  },
  "cv-q-011": {
    prompt: "Great vein that returns blood from the head, neck, and upper limbs to the right atrium.",
    options: ["Inferior vena cava", "Pulmonary trunk", "Superior vena cava", "Ascending aorta"],
    explanation: "The superior vena cava empties into the right atrium and drains the upper half of the body.",
  },
  "cv-q-012": {
    prompt: "Branch of the left coronary artery that descends through the anterior interventricular sulcus, supplying the septum and the anterior wall of the left ventricle.",
    options: ["Circumflex artery", "Anterior descending artery", "Right coronary artery", "Acute marginal artery"],
    explanation: "The anterior descending artery (LAD) is critical for supplying the left ventricle.",
  },
  "cv-q-013": {
    prompt: "Muscular structure of the right ventricle that tenses the chordae tendineae during systole.",
    options: ["Trabecula carneae", "Anterior papillary muscle", "Crista terminalis", "Interatrial septum"],
    explanation: "The anterior papillary muscle of the right ventricle participates in the tension apparatus of the tricuspid valve.",
  },
  "cv-q-014": {
    prompt: "Curved segment of the aorta located between the ascending aorta and the descending thoracic aorta.",
    options: ["Ascending aorta", "Aortic arch", "Pulmonary trunk", "Superior vena cava"],
    explanation: "The aortic arch continues from the ascending aorta and gives rise to the great branches for the head and upper limbs.",
  },
  "cv-q-015": {
    prompt: "Anterior semilunar leaflet that forms part of the pulmonary trunk valve.",
    options: ["Noncoronary aortic leaflet", "Anterior pulmonary semilunar leaflet", "Posterior mitral leaflet", "Septal tricuspid leaflet"],
    explanation: "The anterior semilunar leaflet participates in closure of the pulmonary valve during diastole.",
  },
};
