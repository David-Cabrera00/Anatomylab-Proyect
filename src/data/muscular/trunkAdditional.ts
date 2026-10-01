import type { EducationalStructureBinding } from "../educationalCollection";
import { bilateralGroup, grouped } from "./binding";

export const trunkAdditionalEntries: readonly EducationalStructureBinding[] = [
  bilateralGroup(["Músculo oblicuo interno del abdomen"], {
    id: "muscular.internal-oblique", name: "Músculo oblicuo interno del abdomen", type: "Músculo esquelético",
    description: "Músculo plano intermedio de la pared anterolateral abdominal.",
    function: "Comprime las vísceras, flexiona el tronco y rota el tronco hacia el mismo lado.", location: "Pared anterolateral del abdomen."
  }),
  bilateralGroup(["Músculo transverso del abdomen"], {
    id: "muscular.transversus-abdominis", name: "Músculo transverso del abdomen", type: "Músculo esquelético",
    description: "Capa muscular profunda de la pared anterolateral del abdomen.",
    function: "Comprime el contenido abdominal y contribuye a la estabilidad del tronco.", location: "Pared profunda del abdomen."
  }),
  bilateralGroup(["Músculos intercostales externos", "Músculos intercostales internos", "Músculos intercostales íntimos"], {
    id: "muscular.intercostals", name: "Músculos intercostales", type: "Músculo esquelético",
    description: "Tres capas musculares que ocupan los espacios entre las costillas.",
    function: "Estabilizan la pared torácica y participan en los movimientos respiratorios.", location: "Pared torácica entre las costillas."
  }),
  grouped(["Diafragma"], {
    id: "muscular.diaphragm", name: "Diafragma", type: "Músculo esquelético",
    description: "Lámina musculotendinosa que separa las cavidades torácica y abdominal.",
    function: "Es el principal músculo inspiratorio; su contracción aumenta el volumen torácico.", location: "Base de la cavidad torácica."
  }),
  bilateralGroup(["Músculo multifido del cuello", "Músculo multifido del tórax", "Músculo multifido lumbar"], {
    id: "muscular.multifidus", name: "Músculos multífidos", type: "Músculo esquelético",
    description: "Músculos profundos transversoespinosos que unen apófisis transversas y espinosas vertebrales.",
    function: "Estabilizan la columna y colaboran en su extensión y rotación contralateral.", location: "Región profunda posterior de la columna."
  })
];
