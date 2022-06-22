import { join } from 'node:path';
import { FileTypesEnum } from '../enums/file-types.enum';

const getOutputFilePath = (type: FileTypesEnum): string =>
  join(process.cwd(), `missing-${type}-strings.json`);

export { getOutputFilePath };
