import { createEducationalCollection } from "./educationalCollection";
import { tractEntries } from "./digestive/tract";
import { accessoryEntries } from "./digestive/accessory";
import { grouped } from "./digestive/binding";
const pilot=[grouped(["Glándula parótida.l","Glándula parótida.r"],{id:"parotid-gland-left",name:"Glándula parótida",type:"Glándula salival",description:"Glándula salival mayor.",function:"Produce saliva serosa.",location:"Región parotídea."}),grouped(["Estómago"],{id:"stomach",name:"Estómago",type:"Órgano del tubo digestivo",description:"Órgano muscular digestivo.",function:"Almacena y mezcla el alimento.",location:"Abdomen superior.",relationships:["Esófago","Duodeno"]})];
export const digestiveEducationalGroups={tract:tractEntries,accessory:accessoryEntries} as const;
export const digestiveStructures=createEducationalCollection([...pilot,...tractEntries,...accessoryEntries]);


