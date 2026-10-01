import { axialEntries } from "./src/data/skeletal/axial";
import { appendicularEntries } from "./src/data/skeletal/appendicular";
import { getSkeletalStructureName } from "./src/utils/skeletal/skeletalNames";

const allEntries = [...axialEntries, ...appendicularEntries];

let totalCount = 0;

for (const entry of allEntries) {
  const origs = entry.originalNames || [entry.originalName];
  for (const orig of origs) {
    if (orig && (orig.endsWith(".l") || orig.endsWith(".r"))) {
      totalCount++;
      const res = getSkeletalStructureName(orig);
      console.log(`${orig} -> ${res}`);
    }
  }
}
console.log(`\nTotal lateralized names audited: ${totalCount}`);
