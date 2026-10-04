const fs = require('fs');
const path = require('path');

// Read the filled CSV
const csvPath = 'data/csv/cardiovascular_missing_educational_filled.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.trim().split('\n');
const header = lines[0];
const dataLines = lines.slice(1);

const newEntries = [];
for (const line of dataLines) {
  const match = line.match(/"([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)"/);
  if (match) {
    newEntries.push({
      originalName: match[1],
      layer: match[2],
      description: match[3],
      function: match[4],
      location: match[5],
      relationships: match[6].split('; ').filter(r => r.trim())
    });
  }
}

console.log(`Processing ${newEntries.length} new entries...`);

// ============================================
// 1. Update cardiovascular.ts - add to cardiovascularData
// ============================================
const cardioPath = 'src/data/cardiovascular.ts';
let cardioContent = fs.readFileSync(cardioPath, 'utf8');

// Find the cardiovascularData object and add new entries before the closing brace
const cardioDataStart = cardioContent.indexOf('export const cardiovascularData: Record<');
if (cardioDataStart === -1) {
  console.error('Could not find cardiovascularData in cardiovascular.ts');
  process.exit(1);
}

// Find the closing brace of the cardiovascularData object
let braceCount = 0;
let dataEnd = -1;
let inData = false;
for (let i = cardioDataStart; i < cardioContent.length; i++) {
  if (cardioContent[i] === '{') {
    if (!inData) inData = true;
    braceCount++;
  } else if (cardioContent[i] === '}') {
    braceCount--;
    if (inData && braceCount === 0) {
      dataEnd = i;
      break;
    }
  }
}

if (dataEnd === -1) {
  console.error('Could not find end of cardiovascularData object');
  process.exit(1);
}

// Generate new entries for cardiovascularData
function escapeForTS(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

const newCardioEntries = newEntries.map(e => {
  // Convert originalName to ID format (replace spaces with underscores, remove parentheses)
  const id = e.originalName
    .replace(/[()]/g, '')
    .replace(/[,\.]/g, '')
    .replace(/\s+/g, '_')
    .replace(/__+/g, '_')
    .replace(/^_|_$/g, '');
  
  // Determine type based on layer
  let type = 'Arteria';
  if (e.layer === 'heart') type = 'Corazón';
  else if (e.layer === 'veins') type = 'Vena';
  else if (e.layer === 'arteries') {
    if (e.originalName.toLowerCase().includes('pulmonary') || e.originalName.toLowerCase().includes('pulmonar')) {
      type = 'Gran vaso';
    } else {
      type = 'Arteria';
    }
  } else if (e.layer === 'veins') {
    if (e.originalName.toLowerCase().includes('pulmonary') || e.originalName.toLowerCase().includes('pulmonar')) {
      type = 'Gran vaso';
    } else {
      type = 'Vena';
    }
  }

  return `  ${id}: {
    id: "${id}",
    name: "${escapeForTS(e.originalName)}",
    type: "${type}",
    description: "${escapeForTS(e.description)}",
    function: "${escapeForTS(e.function)}",
    location: "${escapeForTS(e.location)}",
    relationships: [${e.relationships.map(r => `"${escapeForTS(r)}"`).join(', ')}],
  },`;
}).join('\n');

// Insert new entries before the closing brace
const beforeEnd = cardioContent.substring(0, dataEnd);
const afterEnd = cardioContent.substring(dataEnd);
const newCardioContent = beforeEnd + '\n' + newCardioEntries + '\n' + afterEnd;

fs.writeFileSync(cardioPath, newCardioContent);
console.log('Updated src/data/cardiovascular.ts');

// ============================================
// 2. Update cardiovascularAdapter.ts - add to anatomyIdByEducationalId
// ============================================
const adapterPath = 'src/anatomy/cardiovascularAdapter.ts';
let adapterContent = fs.readFileSync(adapterPath, 'utf8');

// Find the anatomyIdByEducationalId object
const mappingStart = adapterContent.indexOf('const anatomyIdByEducationalId: Readonly<Record<string, string>> = {');
if (mappingStart === -1) {
  console.error('Could not find anatomyIdByEducationalId in cardiovascularAdapter.ts');
  process.exit(1);
}

// Find the closing brace of this object
let braceCount2 = 0;
let mappingEnd = -1;
let inMapping = false;
for (let i = mappingStart; i < adapterContent.length; i++) {
  if (adapterContent[i] === '{') {
    if (!inMapping) inMapping = true;
    braceCount2++;
  } else if (adapterContent[i] === '}') {
    braceCount2--;
    if (inMapping && braceCount2 === 0) {
      mappingEnd = i;
      break;
    }
  }
}

if (mappingEnd === -1) {
  console.error('Could not find end of anatomyIdByEducationalId object');
  process.exit(1);
}

const beforeMappingEnd = adapterContent.substring(0, mappingEnd);
const afterMappingEnd = adapterContent.substring(mappingEnd);

// Generate new mappings
const newMappingLines = newEntries.map(e => {
  const eduId = e.originalName
    .replace(/[()]/g, '')
    .replace(/[,\.]/g, '')
    .replace(/\s+/g, '_')
    .replace(/__+/g, '_')
    .replace(/^_|_$/g, '');
  
  return `  ${eduId}: "cardiovascular.${e.originalName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}",`;
});

const newAdapterContent = beforeMappingEnd + '\n' + newMappingLines.join('\n') + '\n' + afterMappingEnd;

fs.writeFileSync(adapterPath, newAdapterContent);
console.log('Updated src/anatomy/cardiovascularAdapter.ts');

// ============================================
// 3. Verify stable IDs exist (they should already be there)
// ============================================
console.log('Done! Run npm run build to validate.');