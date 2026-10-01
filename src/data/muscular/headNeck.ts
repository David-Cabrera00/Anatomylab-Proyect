import type { EducationalStructureBinding } from "../educationalCollection";
import { bilateralGroup } from "./binding";

export const headNeckEntries: readonly EducationalStructureBinding[] = [
  bilateralGroup(
    [
      "Músculo esternocleidomastoideo",
    ],
    {
      id: "muscular.sternocleidomastoid",
      name: "Músculo esternocleidomastoideo",
      type: "Músculo esquelético",
      description: "Músculo superficial del cuello con cabezas esternal y clavicular que convergen hacia la apófisis mastoides.",
      function: "Flexiona el cuello cuando actúa junto con el músculo opuesto; de forma unilateral inclina la cabeza hacia su lado y la rota hacia el lado contrario.",
      location: "Región anterolateral del cuello.",
    }
  ),
  bilateralGroup(
    [
      "Porción profunda del masétero",
      "Porción superficial del masétero",
    ],
    {
      id: "muscular.masseter",
      name: "Músculo masetero",
      type: "Músculo esquelético",
      description: "Músculo cuadrangular fuerte de la masticación que cubre la cara lateral de la rama de la mandíbula.",
      function: "Eleva la mandíbula, cerrando la boca, y participa de forma secundaria en la protrusión.",
      location: "Región parotídeomaseterina de la cara.",
    }
  ),
  bilateralGroup(
    [
      "Músculo temporal",
    ],
    {
      id: "muscular.temporalis",
      name: "Músculo temporal",
      type: "Músculo esquelético",
      description: "Músculo en forma de abanico que ocupa la fosa temporal y forma parte del grupo de la masticación.",
      function: "Eleva y retrae la mandíbula.",
      location: "Fosa temporal del cráneo, insertándose en la apófisis coronoides de la mandíbula.",
    }
  ),
  bilateralGroup(
    [
      "Parte palpebral del múculo orbicular del ojo",
      "Porción orbitaria del músculo orbicular del ojo",
    ],
    {
      id: "muscular.orbicularis-oculi",
      name: "Músculo orbicular del ojo",
      type: "Músculo esquelético",
      description: "Músculo esfinteriano de la expresión facial que rodea la órbita.",
      function: "Cierra los párpados.",
      location: "Rodea la órbita ocular en la región facial superior.",
    }
  ),
  bilateralGroup(
    [
      "Músculo orbicular de la boca",
    ],
    {
      id: "muscular.orbicularis-oris",
      name: "Músculo orbicular de la boca",
      type: "Músculo esquelético",
      description: "Músculo esfinteriano complejo que rodea el orificio bucal.",
      function: "Comprime, protruye y da forma a los labios.",
      location: "Alrededor del orificio bucal.",
    }
  ),
  bilateralGroup(
    [
      "Tendón intermedio del músculo digástrico",
      "Vientre anterior del músculo digástrico",
      "Vientre posterior del músculo digástrico",
    ],
    {
      id: "muscular.digastric",
      name: "Músculo digástrico",
      type: "Músculo esquelético",
      description: "Músculo suprahioideo compuesto por dos vientres (anterior y posterior) unidos por un tendón intermedio.",
      function: "Eleva el hueso hioides o deprime la mandíbula.",
      location: "Región suprahioidea del cuello.",
    }
  ),
  bilateralGroup(
    [
      "Músculo milohioideo",
    ],
    {
      id: "muscular.mylohyoid",
      name: "Músculo milohioideo",
      type: "Músculo esquelético",
      description: "Músculo plano y triangular que forma el suelo de la cavidad bucal.",
      function: "Eleva el suelo de la boca y el hueso hioides durante la deglución.",
      location: "Región suprahioidea.",
    }
  ),
  bilateralGroup(
    [
      "Platisma",
    ],
    {
      id: "muscular.platysma",
      name: "Músculo platisma",
      type: "Músculo esquelético",
      description: "Lámina muscular superficial y delgada que recubre la parte anterior del cuello.",
      function: "Tensa la piel del cuello y deprime la mandíbula y la comisura labial.",
      location: "Tejido subcutáneo del cuello.",
    }
  ),
];
