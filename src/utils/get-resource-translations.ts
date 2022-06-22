import fs from 'node:fs';
import { parseStringPromise } from 'xml2js';
import { getResourcesFilePath } from '../constants/get-resources-file-path.constant';
import { FileTypesEnum } from '../enums/file-types.enum';
import { LangEnum } from '../enums/lang.enum';
import { IResourcesFileContent } from '../interfaces/resources-file-content.interface';
import { IResourcesResult } from '../interfaces/resources-result.interface';

async function getResourceTranslation(
  type: FileTypesEnum
): Promise<IResourcesResult> {
  const result: any = {};

  [LangEnum.Ar, LangEnum.En].forEach(async (lang) => {
    const resourcesPath = getResourcesFilePath(type, lang);
    const content = fs.readFileSync(resourcesPath, { encoding: 'utf8' });
    result[lang] = (await parseStringPromise(content)) as IResourcesFileContent;
  });

  return result;
}

export { getResourceTranslation };
