import { join } from 'node:path';
import { FileTypesEnum } from '../enums/file-types.enum';
import { IOutputFileContent } from '../interfaces/output-file-content.interface';

const getOutputFile = (type: FileTypesEnum): IOutputFileContent => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  return require(join(process.cwd(), `missing-${type}-strings.json`));
};

export { getOutputFile };
