import fs from 'node:fs';
import { Builder } from 'xml2js';
import { getResourcesFilePath } from '../constants/get-resources-file-path.constant';
import { FileTypesEnum } from '../enums/file-types.enum';
import { LangEnum } from '../enums/lang.enum';
import { IResourcesResult } from '../interfaces/resources-result.interface';

function writeTranslations(
  type: FileTypesEnum,
  resourcesTranslations: IResourcesResult
): void {
  const xmlBuilder = new Builder({
    xmldec: { version: '1.0', encoding: 'utf-8' }, // cspell:ignore xmldec
    renderOpts: { indent: '    ', pretty: true },
  });

  const xmlAr = xmlBuilder.buildObject(resourcesTranslations.ar);
  const xmlEn = xmlBuilder.buildObject(resourcesTranslations.en);

  const resourcesArFilePath = getResourcesFilePath(type, LangEnum.Ar);
  const resourcesEnFilePath = getResourcesFilePath(type, LangEnum.En);

  fs.writeFileSync(resourcesArFilePath, xmlAr);
  fs.writeFileSync(resourcesEnFilePath, xmlEn);
}

export { writeTranslations };
