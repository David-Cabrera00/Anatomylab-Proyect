import { createEducationalCollection } from "./educationalCollection";

export const muscularStructures = createEducationalCollection([
  {
    originalName: "Músculo esternocleidomastoideo.r",
    data: {
      id: "sternocleidomastoid-right",
      name: "Músculo esternocleidomastoideo derecho",
      type: "Músculo esquelético",
      description: "Músculo superficial del cuello con cabezas esternal y clavicular que convergen hacia la apófisis mastoides.",
      function: "Flexiona el cuello cuando actúa junto con el músculo opuesto; de forma unilateral inclina la cabeza hacia su lado y la rota hacia el lado contrario.",
      location: "Se extiende por la cara anterolateral derecha del cuello, entre el esternón, la clavícula y la apófisis mastoides.",
      relationships: ["Esternón", "Clavícula derecha", "Apófisis mastoides"],
    },
  },
  {
    originalName: "Músculo recto del abdomen.l",
    data: {
      id: "rectus-abdominis-left",
      name: "Músculo recto del abdomen izquierdo",
      type: "Músculo esquelético",
      description: "Músculo longitudinal de la pared abdominal anterior, situado a un lado de la línea alba.",
      function: "Flexiona el tronco y contribuye a comprimir el contenido abdominal.",
      location: "Se extiende desde el pubis hasta los cartílagos costales superiores y la apófisis xifoides, a la izquierda de la línea alba.",
      relationships: ["Línea alba", "Pubis", "Vaina del recto del abdomen"],
    },
  },
]);
