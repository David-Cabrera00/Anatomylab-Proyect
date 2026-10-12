type RespiratoryQuizEnglish = {
  prompt: string;
  options: readonly string[];
  explanation: string;
};

export const respiratoryQuizEnglish: Readonly<Record<string, RespiratoryQuizEnglish>> = {
  "resp-q-001": {
    prompt: "Tubular passage with C-shaped cartilage rings that connects the larynx with the main bronchi.",
    options: ["Right main bronchus", "Trachea", "Larynx", "Upper lobar bronchus"],
    explanation: "The trachea has 16–20 cartilage rings that are incomplete posteriorly.",
  },
  "resp-q-002": {
    prompt: "Structure that closes the entrance to the larynx during swallowing to prevent aspiration of food.",
    options: ["Epiglottis", "Thyroid cartilage", "Cricoid cartilage", "Vocal cords"],
    explanation: "The epiglottis tilts backward, covering the glottis during swallowing.",
  },
  "resp-q-003": {
    prompt: "Shortest, widest, and most vertical main bronchus, which is why foreign bodies tend to enter it.",
    options: ["Left main bronchus", "Right main bronchus", "Middle lobar bronchus", "Basal segmental bronchus"],
    explanation: "The right main bronchus is more vertical, shorter, and wider than the left.",
  },
  "resp-q-004": {
    prompt: "Pulmonary lobe occupying the superior region of the right lung, separated from the middle lobe by the horizontal fissure.",
    options: ["Right middle lobe", "Right upper lobe", "Right lower lobe", "Left upper lobe"],
    explanation: "The right lung has three lobes: upper, middle, and lower.",
  },
  "resp-q-005": {
    prompt: "Lining of the nasal cavity that warms, humidifies, and filters inspired air.",
    options: ["Nasal cavity mucosa", "Visceral pleura", "Cricoid cartilage", "Main bronchus"],
    explanation: "The nasal mucosa conditions the air before it reaches the lower airways.",
  },
  "resp-q-006": {
    prompt: "Main bronchus that passes inferior to the aortic arch and anterior to the esophagus before entering the left pulmonary hilum.",
    options: ["Right main bronchus", "Left main bronchus", "Left upper lobar bronchus", "Intermediate bronchus"],
    explanation: "The left main bronchus is longer and passes beneath the aortic arch.",
  },
  "resp-q-007": {
    prompt: "Right bronchial branch that carries air specifically to the middle lobe.",
    options: ["Right upper lobar bronchus", "Right middle lobar bronchus", "Left main bronchus", "Left lower lobar bronchus"],
    explanation: "The middle lobar bronchus arises from the intermediate bronchus and ventilates the right middle lobe.",
  },
  "resp-q-008": {
    prompt: "The right intermediate bronchus continues after the upper lobar bronchus and gives rise to the middle and lower lobar bronchi.",
    options: ["True", "False"],
    explanation: "This arrangement of the intermediate bronchus is characteristic of the right bronchial tree.",
  },
  "resp-q-009": {
    prompt: "Lobe of the left lung located inferior to the oblique fissure, in contact with the diaphragm and heart.",
    options: ["Left upper lobe", "Left lower lobe", "Left middle lobe", "Lingula"],
    explanation: "The left lung has only two lobes (upper and lower); the lingula is part of the upper lobe.",
  },
  "resp-q-010": {
    prompt: "Branch of the left main bronchus that ventilates the upper lobe of the left lung.",
    options: ["Left lower lobar bronchus", "Left upper lobar bronchus", "Right middle lobar bronchus", "Trachea"],
    explanation: "The left upper lobar bronchus distributes air to the segments of the upper lobe.",
  },
};
