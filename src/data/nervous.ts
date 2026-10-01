import { createEducationalCollection } from "./educationalCollection";

export const nervousStructures = createEducationalCollection([
  {
    originalName: "Nervio glosofaríngeo (IX).l",
    data: {
      id: "glossopharyngeal-nerve-left",
      name: "Nervio glosofaríngeo izquierdo (IX)",
      type: "Nervio craneal",
      description: "Noveno par craneal. Contiene fibras sensitivas, motoras y parasimpáticas relacionadas con la lengua, la faringe y la glándula parótida.",
      function: "Conduce el gusto y la sensibilidad del tercio posterior de la lengua; también participa en la deglución y en la secreción salival de la parótida.",
      location: "Sale del cráneo por el foramen yugular y se distribuye por el lado izquierdo de la faringe y la base de la lengua.",
      relationships: ["Tercio posterior de la lengua", "Faringe", "Glándula parótida"],
    },
  },
  {
    originalName: "Nervio pudendo.l",
    data: {
      id: "pudendal-nerve-left",
      name: "Nervio pudendo izquierdo",
      type: "Nervio periférico",
      description: "Nervio del plexo sacro que aporta inervación sensitiva y motora a estructuras del periné.",
      function: "Transporta sensibilidad del periné y participa en el control voluntario de los esfínteres externos.",
      location: "Se origina en las raíces sacras S2 a S4 y alcanza el periné a través de la región glútea y el conducto pudendo.",
      relationships: ["Plexo sacro", "Conducto pudendo", "Periné"],
    },
  },
]);
