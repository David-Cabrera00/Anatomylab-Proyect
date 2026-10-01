import type { EducationalStructureBinding } from "../educationalCollection";
import { bilateralGroup } from "./binding";

export const upperLimbEntries: readonly EducationalStructureBinding[] = [
  bilateralGroup(
    [
      "Porción acromial del músculo deltoides",
      "Porción clavicular del músculo deltoides",
      "Porción espinal escapular del músculo deltoides",
    ],
    {
      id: "muscular.deltoid",
      name: "Músculo deltoides",
      type: "Músculo esquelético",
      description: "Músculo voluminoso y triangular que forma el contorno redondeado del hombro.",
      function: "Principal abductor del brazo (fibras medias). Sus fibras anteriores flexionan y rotan medialmente; sus fibras posteriores extienden y rotan lateralmente.",
      location: "Cubre la articulación del hombro (glenohumeral).",
    }
  ),
  bilateralGroup(
    [
      "Cabeza corta músculo del bíceps braquial",
      "Cabeza larga del músculo bíceps braquial",
    ],
    {
      id: "muscular.biceps-brachii",
      name: "Músculo bíceps braquial",
      type: "Músculo esquelético",
      description: "Músculo de dos cabezas (larga y corta) situado en el compartimento anterior del brazo.",
      function: "Supinador potente del antebrazo y flexor del codo.",
      location: "Compartimento anterior del brazo.",
    }
  ),
  bilateralGroup(
    [
      "Bolsa subtendinosa del músculo tríceps braquial",
      "Cabeza larga del músculo tríceps braquial",
      "Cabeza lateral del músculo tríceps braquial",
      "Cabeza medial del músculo tríceps braquial",
    ],
    {
      id: "muscular.triceps-brachii",
      name: "Músculo tríceps braquial",
      type: "Músculo esquelético",
      description: "Gran músculo de tres cabezas que ocupa todo el compartimento posterior del brazo.",
      function: "Principal extensor del antebrazo en la articulación del codo.",
      location: "Compartimento posterior del brazo.",
    }
  ),
  bilateralGroup(
    [
      "Músculo supraespinoso",
    ],
    {
      id: "muscular.supraspinatus",
      name: "Músculo supraespinoso",
      type: "Músculo esquelético",
      description: "Músculo del manguito de los rotadores situado en la fosa supraespinosa de la escápula.",
      function: "Inicia la abducción del brazo y estabiliza la articulación glenohumeral.",
      location: "Región posterior de la escápula, por encima de la espina.",
    }
  ),
  bilateralGroup(
    [
      "Bolsa subtendinosa del músculo infraespinoso",
      "Músculo infraespinoso",
    ],
    {
      id: "muscular.infraspinatus",
      name: "Músculo infraespinoso",
      type: "Músculo esquelético",
      description: "Músculo del manguito rotador situado en la fosa infraespinosa de la escápula.",
      function: "Rota lateralmente el brazo y estabiliza la articulación del hombro.",
      location: "Región posterior de la escápula, por debajo de la espina.",
    }
  ),
  bilateralGroup(
    [
      "Músculo subescapular",
    ],
    {
      id: "muscular.subscapularis",
      name: "Músculo subescapular",
      type: "Músculo esquelético",
      description: "Músculo del manguito rotador que ocupa la fosa subescapular.",
      function: "Rota medialmente y aduce el brazo; estabiliza la articulación glenohumeral.",
      location: "Cara anterior (costal) de la escápula.",
    }
  ),
  bilateralGroup(
    [
      "Bolsa subtendinosa del músculo redondo mayor",
      "Músculo redondo mayor",
    ],
    {
      id: "muscular.teres-major",
      name: "Músculo redondo mayor",
      type: "Músculo esquelético",
      description: "Músculo grueso que forma parte de la pared posterior de la axila.",
      function: "Aduce y rota medialmente el brazo.",
      location: "Borde lateral inferior de la escápula.",
    }
  ),
  bilateralGroup(
    [
      "Músculo braquial",
    ],
    {
      id: "muscular.brachialis",
      name: "Músculo braquial",
      type: "Músculo esquelético",
      description: "Músculo plano situado bajo el bíceps braquial.",
      function: "Principal flexor del antebrazo en cualquier posición.",
      location: "Compartimento anterior del brazo, profundo al bíceps.",
    }
  ),
  bilateralGroup(
    [
      "Músculo coracobraquial",
    ],
    {
      id: "muscular.coracobrachialis",
      name: "Músculo coracobraquial",
      type: "Músculo esquelético",
      description: "Músculo estrecho del brazo superior medial.",
      function: "Ayuda en la flexión y aducción del brazo.",
      location: "Compartimento anterior del brazo, parte proximal.",
    }
  ),
  bilateralGroup(
    [
      "Músculo braquiorradial",
    ],
    {
      id: "muscular.brachioradialis",
      name: "Músculo braquiorradial",
      type: "Músculo esquelético",
      description: "Músculo prominente del lado lateral del antebrazo.",
      function: "Flexiona el antebrazo, especialmente cuando está en semipronación.",
      location: "Compartimento posterior (lateral) del antebrazo.",
    }
  ),
];
