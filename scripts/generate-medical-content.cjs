const fs = require('fs');
const path = require('path');

// Medical knowledge base for generating content
const medicalKnowledge = {
  // Heart structures
  heart: {
    valves: {
      description: "Válvula cardíaca que regula el flujo sanguíneo entre cámaras.",
      function: "Previene el reflujo sanguíneo y asegura flujo unidireccional.",
      location: "Entre aurícula y ventrículo correspondiente.",
      relationships: ["Aurícula", "Ventrículo", "Aparato fibroso cardíaco"]
    },
    papillary: {
      description: "Músculo papilar que ancla los cordones tendinosos de la válvula.",
      function: "Evita la prolapso valvular durante la sístole ventricular.",
      location: "Pared interna del ventrículo correspondiente.",
      relationships: ["Válvula asociada", "Cordones tendinosos", "Pared ventricular"]
    },
    leaflet: {
      description: "Valva o cuspide de válvula cardíaca.",
      function: "Forma parte del mecanismo de cierre valvular.",
      location: "En el anillo valvular correspondiente.",
      relationships: ["Anillo fibroso", "Cordones tendinosos", "Músculos papilares"]
    },
    chordae: {
      description: "Cordón tendinoso que conecta valva con músculo papilar.",
      function: "Transmite la fuerza de contracción ventricular a las valvas.",
      location: "Entre valva y músculo papilar correspondiente.",
      relationships: ["Valva", "Músculo papilar", "Aparato subvalvular"]
    },
    septum: {
      description: "Tabique que separa cavidades cardíacas.",
      function: "Separa flujos de sangre oxigenada y desoxigenada.",
      location: "Línea media del corazón.",
      relationships: ["Aurículas", "Ventrículos", "Tabique interauricular", "Tabique interventricular"]
    },
    default: {
      description: "Estructura anatómica del corazón.",
      function: "Participa en la función de bombeo cardíaco.",
      location: "Región cardíaca correspondiente.",
      relationships: ["Cámaras cardíacas", "Válvulas", "Tabiques"]
    }
  },
  
  // Arteries
  arteries: {
    coronary: {
      description: "Arteria coronaria que irriga el músculo cardíaco.",
      function: "Suministra sangre oxigenada al miocardio.",
      location: "Superficie del corazón, origen en aorta ascendente.",
      relationships: ["Aorta", "Miocardio", "Venas cardíacas"]
    },
    pulmonary: {
      description: "Arteria pulmonar que transporta sangre desoxigenada a los pulmones.",
      function: "Transporta sangre desde ventrículo derecho a capilares pulmonares.",
      location: "Origen en tronco pulmonar, distribución a pulmones.",
      relationships: ["Tronco pulmonar", "Pulmones", "Venas pulmonares"]
    },
    aorta: {
      description: "Rama de la aorta que distribuye sangre oxigenada.",
      function: "Distribuye sangre oxigenada a territorio específico.",
      location: "Rama de aorta ascendente/arco/descendente.",
      relationships: ["Aorta", "Territorio irrigado", "Ramas colaterales"]
    },
    cerebral: {
      description: "Arteria que irriga encéfalo y meninges.",
      function: "Suministra sangre oxigenada a territorio cerebral específico.",
      location: "Base del cráneo, polígono de Willis.",
      relationships: ["Polígono de Willis", "Encéfalo", "Arterias carótidas/vertebrales"]
    },
    limb: {
      description: "Arteria de miembro que irriga músculos y piel.",
      function: "Suministra sangre oxigenada a territorio del miembro.",
      location: "Trayecto anatómico en miembro correspondiente.",
      relationships: ["Arteria proximal", "Músculos", "Arterias distales"]
    },
    visceral: {
      description: "Arteria que irriga víscera abdominal/pélvica.",
      function: "Irrigación arterial de órgano digestivo/urogenital.",
      location: "Origen en aorta abdominal, trayecto retroperitoneal/peritoneal.",
      relationships: ["Aorta abdominal", "Vísceras", "Plexos nerviosos"]
    },
    default: {
      description: "Arteria que transporta sangre oxigenada a territorio específico.",
      function: "Distribuye sangre oxigenada desde corazón a tejidos.",
      location: "Trayecto anatómico correspondiente.",
      relationships: ["Arteria proximal", "Territorio irrigado", "Ramas colaterales"]
    }
  },
  
  // Veins
  veins: {
    pulmonary: {
      description: "Vena pulmonar que retorna sangre oxigenada al corazón.",
      function: "Transporta sangre oxigenada desde pulmones a aurícula izquierda.",
      location: "Hilio pulmonar a aurícula izquierda.",
      relationships: ["Pulmones", "Aurícula izquierda", "Capilares pulmonares"]
    },
    cava: {
      description: "Gran vena cava que retorna sangre desoxigenada al corazón.",
      function: "Retorno venoso sistémico a aurícula derecha.",
      location: "Trayecto torácico/abdominal a aurícula derecha.",
      relationships: ["Aurícula derecha", "Venas tributarias", "Diafragma"]
    },
    portal: {
      description: "Vena del sistema porta hepático.",
      function: "Transporta sangre nutritiva desde tracto GI a hígado.",
      location: "Formación detrás de páncreas, entrada a hígado.",
      relationships: ["Venas mesentéricas", "Hígado", "Bazo", "Páncreas"]
    },
    limb: {
      description: "Vena de miembro que retorna sangre desoxigenada.",
      function: "Drenaje venoso de miembro correspondiente.",
      location: "Sistema superficial/profundo de miembro.",
      relationships: ["Venas superficiales", "Venas profundas", "Arterias acompañantes"]
    },
    cerebral: {
      description: "Vena o seno venoso que drena encéfalo.",
      function: "Drenaje venoso cerebral hacia senos durales/yugulares.",
      location: "Cavidad craneal, senos durales.",
      relationships: ["Senos durales", "Venas yugulares", "Encéfalo"]
    },
    default: {
      description: "Vena que retorna sangre desoxigenada al corazón.",
      function: "Drenaje venoso de territorio específico.",
      location: "Trayecto anatómico correspondiente.",
      relationships: ["Vena proximal", "Territorio drenado", "Venas tributarias"]
    }
  }
};

function getRelationships(name, layer) {
  const rels = [];
  const lower = name.toLowerCase();
  
  // Side
  if (lower.includes('left') || lower.includes('izquierd')) rels.push('Lado izquierdo');
  if (lower.includes('right') || lower.includes('derech')) rels.push('Lado derecho');
  if (lower.includes('superior')) rels.push('Región superior');
  if (lower.includes('inferior')) rels.push('Región inferior');
  if (lower.includes('anterior')) rels.push('Región anterior');
  if (lower.includes('posterior')) rels.push('Región posterior');
  if (lower.includes('medial') || lower.includes('medial')) rels.push('Región medial');
  if (lower.includes('lateral')) rels.push('Región lateral');
  
  // Layer-specific
  if (layer === 'heart') rels.push('Corazón');
  if (layer === 'arteries') rels.push('Sistema arterial');
  if (layer === 'veins') rels.push('Sistema venoso');
  
  // Specific organ relationships
  if (name.toLowerCase().includes('lung') || name.toLowerCase().includes('pulmon')) rels.push('Pulmón');
  if (name.toLowerCase().includes('heart') || name.toLowerCase().includes('cardiac') || name.toLowerCase().includes('coronary') || name.toLowerCase().includes('coronari')) rels.push('Corazón');
  if (name.toLowerCase().includes('liver') || name.toLowerCase().includes('hepatic') || name.toLowerCase().includes('hepat')) rels.push('Hígado');
  if (name.toLowerCase().includes('kidney') || name.toLowerCase().includes('renal')) rels.push('Riñón');
  if (name.toLowerCase().includes('spleen') || name.toLowerCase().includes('splenic') || name.toLowerCase().includes('bazo')) rels.push('Bazo');
  if (name.toLowerCase().includes('stomach') || name.toLowerCase().includes('gastric') || name.toLowerCase().includes('gástric')) rels.push('Estómago');
  if (name.toLowerCase().includes('intestine') || name.toLowerCase().includes('mesenteric') || name.toLowerCase().includes('mesent')) rels.push('Intestino');
  if (name.toLowerCase().includes('brain') || name.toLowerCase().includes('cerebr') || name.toLowerCase().includes('cerebell') || name.toLowerCase().includes('cerebral')) rels.push('Encéfalo');
  if (name.toLowerCase().includes('spinal') || name.toLowerCase().includes('medular')) rels.push('Médula espinal');
  
  // Specific vessels
  if (name.toLowerCase().includes('coronary') || name.toLowerCase().includes('coronari')) rels.push('Coronarias');
  if (name.toLowerCase().includes('pulmonary') || name.toLowerCase().includes('pulmonar')) rels.push('Pulmonar');
  if (name.toLowerCase().includes('aorta') || name.toLowerCase().includes('aortic') || name.toLowerCase().includes('aórtic')) rels.push('Aorta');
  if (name.toLowerCase().includes('carotid') || name.toLowerCase().includes('carotid')) rels.push('Carótida');
  if (name.toLowerCase().includes('subclavian')) rels.push('Subclavia');
  if (name.toLowerCase().includes('vertebral')) rels.push('Vertebral');
  if (name.toLowerCase().includes('renal')) rels.push('Riñón');
  if (name.toLowerCase().includes('hepatic') || name.toLowerCase().includes('hepat')) rels.push('Hígado');
  if (name.toLowerCase().includes('splenic') || name.toLowerCase().includes('esplen')) rels.push('Bazo');
  if (name.toLowerCase().includes('mesenteric') || name.toLowerCase().includes('mesent')) rels.push('Intestino');
  if (name.toLowerCase().includes('gastric') || name.toLowerCase().includes('gástric')) rels.push('Estómago');
  if (name.toLowerCase().includes('iliac') || name.toLowerCase().includes('ilíac')) rels.push('Ilíaca');
  if (name.toLowerCase().includes('femoral')) rels.push('Femoral');
  if (name.toLowerCase().includes('radial')) rels.push('Radial');
  if (name.toLowerCase().includes('ulnar')) rels.push('Cubital');
  if (name.toLowerCase().includes('tibial')) rels.push('Tibial');
  if (name.toLowerCase().includes('fibular') || name.toLowerCase().includes('peroneal')) rels.push('Fibular');
  if (name.toLowerCase().includes('saphenous') || name.toLowerCase().includes('safena')) rels.push('Safena');
  
  return [...new Set(rels)].join('; ');
}

function generateContent(name, layer) {
  const lower = name.toLowerCase();
  
  // Heart layer
  if (layer === 'heart') {
    if (lower.includes('valve') || lower.includes('valvula') || lower.includes('valvul') || lower.includes('cusp') || lower.includes('leaflet')) {
      if (lower.includes('leaflet') || lower.includes('cusp')) {
        return medicalKnowledge.heart.leaflet;
      }
      return medicalKnowledge.heart.valves;
    }
    if (lower.includes('papillary') || lower.includes('papilar')) {
      return medicalKnowledge.heart.papillary;
    }
    if (lower.includes('chordae') || lower.includes('tendin')) {
      return medicalKnowledge.heart.chordae;
    }
    if (lower.includes('septum') || lower.includes('septal')) {
      return medicalKnowledge.heart.septum;
    }
    if (lower.includes('muscle') || lower.includes('muscular') || lower.includes('trabec') || lower.includes('trabécul')) {
      return {
        description: "Músculo cardíaco que forma parte de la pared ventricular.",
        function: "Contribuye a la contracción ventricular y ejección sanguínea.",
        location: "Pared interna de ventrículo correspondiente.",
        relationships: getRelationships(name, layer)
      };
    }
    return medicalKnowledge.heart.default;
  }
  
  // Arteries layer
  if (layer === 'arteries') {
    if (lower.includes('coronary') || lower.includes('coronari')) {
      return medicalKnowledge.arteries.coronary;
    }
    if (lower.includes('pulmonary') || lower.includes('pulmonar')) {
      return medicalKnowledge.arteries.pulmonary;
    }
    if (lower.includes('aorta') || lower.includes('aortic') || lower.includes('aórtic')) {
      return medicalKnowledge.arteries.aorta;
    }
    if (lower.includes('cerebral') || lower.includes('carotid') || lower.includes('vertebral') || lower.includes('basilar') || lower.includes('cerebellar') || lower.includes('ophthalmic') || lower.includes('cortical') || lower.includes('striate') || lower.includes('central') || lower.includes('lenticulostriate')) {
      return medicalKnowledge.arteries.cerebral;
    }
    if (lower.includes('subclavian') || lower.includes('axillary') || lower.includes('brachial') || lower.includes('radial') || lower.includes('ulnar') || lower.includes('interosseous') || lower.includes('palmar') || lower.includes('digital') || lower.includes('femoral') || lower.includes('popliteal') || lower.includes('tibial') || lower.includes('fibular') || lower.includes('peroneal') || lower.includes('plantar') || lower.includes('metatarsal') || lower.includes('deep femoral') || lower.includes('profunda') || lower.includes('circumflex') || lower.includes('genicular') || lower.includes('epigastric') || lower.includes('epigástric') || lower.includes('circunflejo')) {
      return medicalKnowledge.arteries.limb;
    }
    if (lower.includes('hepatic') || lower.includes('hepátic') || lower.includes('gastric') || lower.includes('gástric') || lower.includes('splenic') || lower.includes('esplénic') || lower.includes('mesenteric') || lower.includes('mesentéric') || lower.includes('renal') || lower.includes('gonadal') || lower.includes('ovarian') || lower.includes('testicular') || lower.includes('iliac') || lower.includes('ilíac') || lower.includes('vesical') || lower.includes('uterine') || lower.includes('vaginal') || lower.includes('rectal') || lower.includes('sigmoid') || lower.includes('colic') || lower.includes('cólico') || lower.includes('ileocolic') || lower.includes('ileocólico') || lower.includes('appendicular') || lower.includes('apendicular')) {
      return medicalKnowledge.arteries.visceral;
    }
    return medicalKnowledge.arteries.default;
  }
  
  // Veins layer
  if (layer === 'veins') {
    if (lower.includes('pulmonary') || lower.includes('pulmonar')) {
      return medicalKnowledge.veins.pulmonary;
    }
    if (lower.includes('cava') || lower.includes('azygos') || lower.includes('hemiazygos') || lower.includes('intercostal') || lower.includes('phrenic') || lower.includes('frénic') || lower.includes('pericardial') || lower.includes('pericárdic')) {
      return medicalKnowledge.veins.cava;
    }
    if (lower.includes('portal') || lower.includes('mesenteric') || lower.includes('mesentéric') || lower.includes('splenic') || lower.includes('esplénic') || lower.includes('gastric') || lower.includes('gástric') || lower.includes('colic') || lower.includes('cólico') || lower.includes('rectal') || lower.includes('sigmoid') || lower.includes('gastroepiploic') || lower.includes('pancreatic') || lower.includes('pancreático')) {
      return medicalKnowledge.veins.portal;
    }
    if (lower.includes('jugular') || lower.includes('subclavian') || lower.includes('brachiocephalic') || lower.includes('braquiocefálic') || lower.includes('vertebral') || lower.includes('internal jugular') || lower.includes('external jugular') || lower.includes('anterior jugular') || lower.includes('posterior jugular') || lower.includes('facial') || lower.includes('lingual') || lower.includes('thyroid') || lower.includes('tiroid') || lower.includes('superior thyroid') || lower.includes('middle thyroid') || lower.includes('inferior thyroid') || lower.includes('superior tiroidea') || lower.includes('media tiroidea') || lower.includes('inferior tiroidea')) {
      return medicalKnowledge.veins.cerebral;
    }
    if (lower.includes('femoral') || lower.includes('popliteal') || lower.includes('tibial') || lower.includes('fibular') || lower.includes('peroneal') || lower.includes('plantar') || lower.includes('saphenous') || lower.includes('safena') || lower.includes('great saphenous') || lower.includes('small saphenous') || lower.includes('magna') || lower.includes('parva') || lower.includes('dorsal') || lower.includes('metatarsal') || lower.includes('digital') || lower.includes('ulnar') || lower.includes('radial') || lower.includes('brachial') || lower.includes('basilic') || lower.includes('basilic') || lower.includes('cephalic') || lower.includes('cefálic') || lower.includes('median') || lower.includes('antebrachial') || lower.includes('antebraquial') || lower.includes('cubital') || lower.includes('interosseous') || lower.includes('interóseo') || lower.includes('palmar') || lower.includes('metacarpal') || lower.includes('metacarpiano') || lower.includes('communicating') || lower.includes('communicante')) {
      return medicalKnowledge.veins.limb;
    }
    if (lower.includes('hepatic') || lower.includes('hepátic') || lower.includes('renal') || lower.includes('suprarenal') || lower.includes('suprarrenal') || lower.includes('adrenal') || lower.includes('gonadal') || lower.includes('testicular') || lower.includes('ovarian') || lower.includes('uterine') || lower.includes('uterin') || lower.includes('vaginal') || lower.includes('vesical') || lower.includes('rectal') || lower.includes('sigmoid') || lower.includes('colic') || lower.includes('cólico') || lower.includes('iliac') || lower.includes('ilíac') || lower.includes('lumbar') || lower.includes('ascending lumbar') || lower.includes('ascendente lumbar')) {
      return medicalKnowledge.veins.default;
    }
    if (lower.includes('sinus') || lower.includes('seno') || lower.includes('cavernous') || lower.includes('cavernoso') || lower.includes('petrosal') || lower.includes('petroso') || lower.includes('transverse') || lower.includes('transverso') || lower.includes('sigmoid') || lower.includes('sigmoide') || lower.includes('sagittal') || lower.includes('sagital') || lower.includes('straight') || lower.includes('recto') || lower.includes('occipital') || lower.includes('confluence') || lower.includes('confluencia') || lower.includes('superior sagittal') || lower.includes('inferior sagittal') || lower.includes('superior sagital') || lower.includes('inferior sagital') || lower.includes('superior petrosal') || lower.includes('inferior petrosal') || lower.includes('straight sinus') || lower.includes('seno recto') || lower.includes('confluence of sinuses') || lower.includes('confluencia de senos')) {
      return medicalKnowledge.veins.cerebral;
    }
    return medicalKnowledge.veins.default;
  }
  
  return {
    description: `Estructura anatómica del sistema ${layer === 'heart' ? 'cardíaco' : layer === 'arteries' ? 'arterial' : 'venoso'}.`,
    function: `Participa en la función ${layer === 'heart' ? 'de bombeo cardíaco' : layer === 'arteries' ? 'de distribución arterial' : 'de drenaje venoso'}.`,
    location: `Región ${layer === 'heart' ? 'cardíaca' : layer === 'arteries' ? 'arterial' : 'venosa'} correspondiente.`,
    relationships: getRelationships(name, layer)
  };
}

// Read the missing CSV
const csvPath = 'data/csv/cardiovascular_missing_educational.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.trim().split('\n');
const header = lines[0];
const dataLines = lines.slice(1);

const outputLines = [header + ',description,function,location,relationships'];

for (const line of dataLines) {
  const match = line.match(/"([^"]+)","([^"]+)"/);
  if (match) {
    const originalName = match[1];
    const layer = match[2];
    const content = generateContent(originalName, layer);
    const row = `"${originalName}","${layer}","${content.description}","${content.function}","${content.location}","${content.relationships}"`;
    outputLines.push(row);
  }
}

const outputPath = 'data/csv/cardiovascular_missing_educational_filled.csv';
fs.writeFileSync(outputPath, outputLines.join('\n'));
console.log(`Generated ${outputLines.length - 1} entries in ${outputPath}`);
console.log('Done!');