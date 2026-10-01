import type { EducationalStructureBinding } from "../educationalCollection";
import { grouped } from "./binding";
const d=(id:string,name:string,original:string):EducationalStructureBinding=>grouped([original],{id,name,type:"Órgano del tubo digestivo",description:`Estructura anatómica del sistema digestivo: ${name}.`,function:"Participa en el transporte, digestión o absorción del contenido digestivo.",location:"Región correspondiente del aparato digestivo."});
export const tractEntries:readonly EducationalStructureBinding[]=[
 d("digestive.esophagus","Esófago","Esófago"),d("digestive.duodenum","Duodeno","Duodeno"),d("digestive.jejunum","Yeyuno","Yeyuno"),d("digestive.appendix","Apéndice vermiforme","Apéndice vermiforme"),d("digestive.ascending-colon","Colon ascendente","Colon ascendente"),d("digestive.transverse-colon","Colon transverso","Colon transverso"),d("digestive.descending-colon","Colon descendente","Colon descendente"),d("digestive.sigmoid-colon","Colon sigmoideo","Colon sigmoideo")];

