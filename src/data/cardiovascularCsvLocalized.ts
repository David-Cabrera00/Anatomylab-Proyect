import type { LocalizedText } from "../i18n/localizedText";

type PhraseMap = Readonly<Record<string, string>>;

const descriptionEn: PhraseMap = {
  "Arteria coronaria que irriga el músculo cardíaco.": "Coronary artery that supplies the cardiac muscle.",
  "Arteria de miembro que irriga músculos y piel.": "Limb artery that supplies muscles and skin.",
  "Arteria principal que nace del seno aórtico izquierdo y se divide habitualmente en las ramas interventricular anterior y circunfleja.": "Main artery that arises from the left aortic sinus and usually divides into the anterior interventricular and circumflex branches.",
  "Arteria pulmonar que transporta sangre desoxigenada a los pulmones.": "Pulmonary artery that carries deoxygenated blood to the lungs.",
  "Arteria que irriga encéfalo y meninges.": "Artery that supplies the brain and meninges.",
  "Arteria que irriga víscera abdominal/pélvica.": "Artery that supplies an abdominal or pelvic viscus.",
  "Arteria que transporta sangre oxigenada a territorio específico.": "Artery that carries oxygenated blood to a specific territory.",
  "Estructura anatómica del corazón.": "Anatomical structure of the heart.",
  "Gran vena cava que retorna sangre desoxigenada al corazón.": "Large vena cava that returns deoxygenated blood to the heart.",
  "Músculo papilar que ancla los cordones tendinosos de la válvula.": "Papillary muscle that anchors the valve's chordae tendineae.",
  "Rama de la aorta que distribuye sangre oxigenada.": "Branch of the aorta that distributes oxygenated blood.",
  "Tabique que separa cavidades cardíacas.": "Septum that separates the cardiac chambers.",
  "Valva o cuspide de válvula cardíaca.": "Leaflet or cusp of a cardiac valve.",
  "Vena de miembro que retorna sangre desoxigenada.": "Limb vein that returns deoxygenated blood.",
  "Vena del sistema porta hepático.": "Vein of the hepatic portal system.",
  "Vena o seno venoso que drena encéfalo.": "Vein or venous sinus that drains the brain.",
  "Vena que retorna sangre desoxigenada al corazón.": "Vein that returns deoxygenated blood to the heart.",
};

const functionEn: PhraseMap = {
  "Distribuye sangre oxigenada a territorio específico.": "Distributes oxygenated blood to a specific territory.",
  "Distribuye sangre oxigenada desde corazón a tejidos.": "Distributes oxygenated blood from the heart to the tissues.",
  "Drenaje venoso cerebral hacia senos durales/yugulares.": "Cerebral venous drainage toward the dural sinuses and jugular veins.",
  "Drenaje venoso de miembro correspondiente.": "Venous drainage of the corresponding limb.",
  "Drenaje venoso de territorio específico.": "Venous drainage of a specific territory.",
  "Evita la prolapso valvular durante la sístole ventricular.": "Prevents valve prolapse during ventricular systole.",
  "Forma parte del mecanismo de cierre valvular.": "Contributes to the valve-closing mechanism.",
  "Irriga gran parte de la aurícula izquierda, el ventrículo izquierdo y el tabique interventricular mediante sus ramas.": "Supplies much of the left atrium, left ventricle, and interventricular septum through its branches.",
  "Irrigación arterial de órgano digestivo/urogenital.": "Arterial supply to a digestive or urogenital organ.",
  "Participa en la función de bombeo cardíaco.": "Participates in the heart's pumping function.",
  "Retorno venoso sistémico a aurícula derecha.": "Systemic venous return to the right atrium.",
  "Separa flujos de sangre oxigenada y desoxigenada.": "Separates oxygenated and deoxygenated blood flows.",
  "Suministra sangre oxigenada a territorio cerebral específico.": "Supplies oxygenated blood to a specific cerebral territory.",
  "Suministra sangre oxigenada a territorio del miembro.": "Supplies oxygenated blood to a limb territory.",
  "Suministra sangre oxigenada al miocardio.": "Supplies oxygenated blood to the myocardium.",
  "Transporta sangre desde ventrículo derecho a capilares pulmonares.": "Carries blood from the right ventricle to the pulmonary capillaries.",
  "Transporta sangre nutritiva desde tracto GI a hígado.": "Carries nutrient-rich blood from the gastrointestinal tract to the liver.",
};

const locationEn: PhraseMap = {
  "Base del cráneo, polígono de Willis.": "Base of the skull, circle of Willis.",
  "Cavidad craneal, senos durales.": "Cranial cavity, dural sinuses.",
  "En el anillo valvular correspondiente.": "Within the corresponding valve ring.",
  "Formación detrás de páncreas, entrada a hígado.": "Formation behind the pancreas, at the entrance to the liver.",
  "Línea media del corazón.": "Midline of the heart.",
  "Origen en aorta abdominal, trayecto retroperitoneal/peritoneal.": "Origin at the abdominal aorta, with a retroperitoneal or peritoneal course.",
  "Origen en tronco pulmonar, distribución a pulmones.": "Origin at the pulmonary trunk, with distribution to the lungs.",
  "Pared interna del ventrículo correspondiente.": "Inner wall of the corresponding ventricle.",
  "Rama de aorta ascendente/arco/descendente.": "Branch of the ascending aorta, aortic arch, or descending aorta.",
  "Región cardíaca correspondiente.": "Corresponding cardiac region.",
  "Se origina en la aorta ascendente, pasa entre el tronco pulmonar y la aurícula izquierda y alcanza el surco coronario.": "It originates from the ascending aorta, passes between the pulmonary trunk and left atrium, and reaches the coronary sulcus.",
  "Sistema superficial/profundo de miembro.": "Superficial/deep system of the limb.",
  "Superficie del corazón, origen en aorta ascendente.": "Surface of the heart, originating from the ascending aorta.",
  "Trayecto anatómico correspondiente.": "Corresponding anatomical course.",
  "Trayecto anatómico en miembro correspondiente.": "Anatomical course in the corresponding limb.",
  "Trayecto torácico/abdominal a aurícula derecha.": "Thoracic or abdominal course to the right atrium.",
};

const relationshipsEn: PhraseMap = {
  "Anillo fibroso,Cordones tendinosos,Músculos papilares": "Fibrous ring,Chordae tendineae,Papillary muscles",
  "Aorta abdominal,Vísceras,Plexos nerviosos": "Abdominal aorta,Viscera,Nerve plexuses",
  "Aorta ascendente,Arteria interventricular anterior,Arteria circunfleja,Aurícula izquierda,Tronco pulmonar": "Ascending aorta,Anterior interventricular artery,Circumflex artery,Left atrium,Pulmonary trunk",
  "Aorta,Miocardio,Venas cardíacas": "Aorta,Myocardium,Cardiac veins",
  "Aorta,Territorio irrigado,Ramas colaterales": "Aorta,Supplied territory,Collateral branches",
  "Arteria proximal,Músculos,Arterias distales": "Proximal artery,Muscles,Distal arteries",
  "Arteria proximal,Territorio irrigado,Ramas colaterales": "Proximal artery,Supplied territory,Collateral branches",
  "Aurícula derecha,Venas tributarias,Diafragma": "Right atrium,Tributary veins,Diaphragm",
  "Aurículas,Ventrículos,Tabique interauricular,Tabique interventricular": "Atria,Ventricles,Interatrial septum,Interventricular septum",
  "Cámaras cardíacas,Válvulas,Tabiques": "Cardiac chambers,Valves,Septa",
  "Polígono de Willis,Encéfalo,Arterias carótidas/vertebrales": "Circle of Willis,Brain,Carotid/vertebral arteries",
  "Senos durales,Venas yugulares,Encéfalo": "Dural sinuses,Jugular veins,Brain",
  "Tronco pulmonar,Pulmones,Venas pulmonares": "Pulmonary trunk,Lungs,Pulmonary veins",
  "Válvula asociada,Cordones tendinosos,Pared ventricular": "Associated valve,Chordae tendineae,Ventricular wall",
  "Vena proximal,Territorio drenado,Venas tributarias": "Proximal vein,Drained territory,Tributary veins",
  "Venas mesentéricas,Hígado,Bazo,Páncreas": "Mesenteric veins,Liver,Spleen,Pancreas",
  "Venas superficiales,Venas profundas,Arterias acompañantes": "Superficial veins,Deep veins,Accompanying arteries",
};

function localized(map: PhraseMap, value: string): LocalizedText {
  const en = map[value];
  if (!en) throw new Error(`Traducción cardiovascular CSV ausente: ${value}`);
  return { es: value, en };
}

export function localizeCardiovascularCsvField(field: "description" | "function" | "location", value: string): LocalizedText {
  return localized(field === "description" ? descriptionEn : field === "function" ? functionEn : locationEn, value);
}

export function localizeCardiovascularCsvRelationships(value: string): LocalizedText[] {
  const en = relationshipsEn[value];
  if (!en) throw new Error(`Traducción de relaciones cardiovasculares CSV ausente: ${value}`);
  const spanish = value.split(",");
  const english = en.split(",");
  if (spanish.length !== english.length) throw new Error(`Relaciones cardiovasculares CSV desalineadas: ${value}`);
  return spanish.map((es, index) => ({ es, en: english[index] }));
}

export const cardiovascularCsvLocalizationStats = Object.freeze({
  descriptionPhrases: Object.keys(descriptionEn).length,
  functionPhrases: Object.keys(functionEn).length,
  locationPhrases: Object.keys(locationEn).length,
  relationshipLists: Object.keys(relationshipsEn).length,
});
