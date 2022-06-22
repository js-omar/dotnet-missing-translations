import { IResourcesNames } from '../interfaces/resources-lang.interface';

function getMissingStrings(
  strings: string[],
  resourcesNames: IResourcesNames
): { ar: string[]; en: string[] } {
  const arMissingObj: { [key: string]: boolean } = {};
  const enMissingObj: { [key: string]: boolean } = {};

  strings.forEach((s) => {
    if (!resourcesNames.ar[s]) arMissingObj[s] = true;
    if (!resourcesNames.en[s]) enMissingObj[s] = true;
  });

  const both: { [key: string]: number } = {};

  [
    ...Object.keys(resourcesNames.en),
    ...Object.keys(resourcesNames.ar),
  ].forEach((i) => {
    both[i] = (both[i] || 0) + 1;
  });

  const allNotSynced = Object.entries(both)
    .filter((b) => b[1] === 1)
    .map((b) => b[0]);

  allNotSynced.forEach((i) => {
    if (!resourcesNames.ar[i]) arMissingObj[i] = true;
    if (!resourcesNames.en[i]) enMissingObj[i] = true;
  });

  return {
    ar: Object.keys(arMissingObj),
    en: Object.keys(enMissingObj),
  };
}

export { getMissingStrings };
