import { createEducationalCollection } from "./educationalCollection";

export const skeletalStructures = createEducationalCollection([
  {
    originalName: "Hueso coxal.r",
    data: {
      id: "hip-bone-right",
      name: "Hueso coxal derecho",
      type: "Hueso",
      description: "Hueso de la cintura pélvica formado por ilion, isquion y pubis, fusionados en el adulto.",
      function: "Contribuye a transmitir el peso del tronco al miembro inferior y protege estructuras de la pelvis.",
      location: "Ocupa el lado derecho de la pelvis y se articula con el sacro y el fémur.",
      relationships: ["Sacro", "Fémur derecho", "Sínfisis púbica"],
    },
  },
  {
    originalName: "Escápula.l",
    data: {
      id: "scapula-left",
      name: "Escápula izquierda",
      type: "Hueso",
      description: "Hueso plano de la cintura escapular que forma parte de la región posterior del hombro.",
      function: "Proporciona inserción a músculos del hombro y participa en los movimientos del miembro superior.",
      location: "Se sitúa sobre la pared posterior del tórax izquierdo.",
      relationships: ["Clavícula izquierda", "Húmero izquierdo", "Articulación glenohumeral"],
    },
  },
]);
