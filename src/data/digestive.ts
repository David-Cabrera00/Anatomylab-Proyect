import { createEducationalCollection } from "./educationalCollection";

export const digestiveStructures = createEducationalCollection([
  {
    originalName: "Glándula parótida.l",
    data: {
      id: "parotid-gland-left",
      name: "Glándula parótida izquierda",
      type: "Glándula salival",
      description: "Glándula salival mayor situada en la región lateral de la cara, por delante y debajo de la oreja.",
      function: "Produce saliva serosa que llega a la cavidad oral por el conducto parotídeo y contribuye a la lubricación y al inicio de la digestión.",
      location: "Se sitúa en la región parotídea izquierda, próxima a la rama de la mandíbula.",
      relationships: ["Conducto parotídeo izquierdo", "Rama de la mandíbula", "Nervio facial"],
    },
  },
  {
    originalName: "Estómago",
    data: {
      id: "stomach",
      name: "Estómago",
      type: "Órgano del tubo digestivo",
      description: "Órgano muscular del tubo digestivo situado entre el esófago y el duodeno.",
      function: "Almacena y mezcla el alimento con jugo gástrico antes de transferirlo al duodeno.",
      location: "Se encuentra principalmente en la región superior izquierda del abdomen, debajo del diafragma.",
      relationships: ["Esófago", "Duodeno", "Diafragma"],
    },
  },
]);
