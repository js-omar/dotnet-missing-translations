import { join } from 'node:path';
import { FileTypesEnum } from '../enums/file-types.enum';
import { LangEnum } from '../enums/lang.enum';

const getResourcesFilePath = (type: FileTypesEnum, lang: LangEnum): string => {
  const titleCase = type[0].toUpperCase() + type.toLowerCase().slice(1);

  return join(
    process.cwd(),
    'Resources',
    titleCase,
    `${titleCase}Resource.${lang}.resx` // cspell:ignore resx
  );
};

export { getResourcesFilePath };
