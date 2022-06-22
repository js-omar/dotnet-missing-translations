import { unlinkSync } from 'node:fs';
import { FileTypesEnum } from '../enums/file-types.enum';
import { getOutputFilePath } from '../constants/get-output-file-path.constant';

function deleteOutputFile(type: FileTypesEnum): void {
  const outputPath = getOutputFilePath(type);
  unlinkSync(outputPath);
}

export { deleteOutputFile };
