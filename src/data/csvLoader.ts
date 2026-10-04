import type { AnatomyStructureData } from "./educationalCollection";
import { cardiovascularStableIdByOriginalName } from "../anatomy/metadata/cardiovascularStableIds";

/**
 * Carga datos educativos desde CSV en tiempo de ejecución.
 * Evita problemas de codificación en tiempo de compilación TypeScript.
 */
export class CSVEducationalLoader {
  private static cache: Map<string, AnatomyStructureData> | null = null;

  static async loadCardiovascularData(): Promise<Map<string, AnatomyStructureData>> {
    if (this.cache) return this.cache;

    const map = new Map<string, AnatomyStructureData>();
    const response = await fetch('/data/csv/cardiovascular_missing_educational_filled.csv');
    if (!response.ok) {
      throw new Error(`No se pudo cargar el contenido cardiovascular: ${response.status}`);
    }
    const text = await response.text();
    const lines = text.trim().split('\n');
    const dataLines = lines.slice(1);

    // Cast to allow dynamic indexing
    const stableIds = cardiovascularStableIdByOriginalName as Record<string, string>;

    for (const line of dataLines) {
      const match = line.match(/"([^"]+)","([^"]+)","([^"]*)","([^"]*)","([^"]*)","([^"]*)"/);
      if (match) {
        const [, originalName, , description, func, location, relationshipsStr] = match;
        const relationships = relationshipsStr
          ? relationshipsStr.split(/\s*[;,]\s*/).filter((relationship) => relationship.trim())
          : [];
        
        // Use the stable ID from the stable IDs map
        const stableId = stableIds[originalName];
        if (!stableId) {
          console.warn(`No stable ID found for: ${originalName}`);
          continue;
        }
        
        // Skip if already exists (from original 18)
        if (map.has(stableId)) continue;
        
        map.set(stableId, {
          id: stableId,
          name: originalName,
          type: originalName.toLowerCase().includes('vein') || originalName.toLowerCase().includes('vena') ? 'Vena' : 
                originalName.toLowerCase().includes('artery') || originalName.toLowerCase().includes('arteria') ? 'Arteria' :
                originalName.toLowerCase().includes('vein') || originalName.toLowerCase().includes('vena') ? 'Vena' : 'Estructura',
          description,
          function: func,
          location,
          relationships,
        });
      }
    }

    this.cache = map;
    return map;
  }

  static async getStructureData(
    structureIdentifier: string
  ): Promise<AnatomyStructureData | null> {
    const data = await this.loadCardiovascularData();
    return data.get(structureIdentifier) || null;
  }

  static clearCache() {
    this.cache = null;
  }
}
