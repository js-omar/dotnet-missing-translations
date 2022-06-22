import { getResourceTranslation } from './get-resource-translations';
import { FileTypesEnum } from '../enums/file-types.enum';
import { IResourcesNames } from '../interfaces/resources-lang.interface';

async function getResourcesNames(
  type: FileTypesEnum
): Promise<IResourcesNames> {
  const resources = await getResourceTranslation(type);

  const ar: { [key: string]: boolean } = {};
  const en: { [key: string]: boolean } = {};

  resources.ar.root.data.forEach((d: any) => {
    ar[d.$.name] = true;
  });

  resources.en.root.data.forEach((d: any) => {
    en[d.$.name] = true;
  });

  return { ar, en };
}

export { getResourcesNames };
