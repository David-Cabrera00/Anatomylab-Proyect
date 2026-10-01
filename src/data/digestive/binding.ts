import type { AnatomyStructureData, EducationalStructureBinding } from "../educationalCollection";
export const grouped=(names:readonly string[],data:AnatomyStructureData):EducationalStructureBinding=>({originalNames:names,data});
