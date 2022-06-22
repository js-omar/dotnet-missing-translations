import { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { FileTypesEnum } from '../enums/file-types.enum';
import { getOutputFilePath } from '../constants/get-output-file-path.constant';
import { IOutputFileContent } from '../interfaces/output-file-content.interface';

function createOutputFile(
  type: FileTypesEnum,
  outputFileContent: IOutputFileContent
): void {
  const outputPath = getOutputFilePath(type);

  writeFileSync(outputPath, JSON.stringify(outputFileContent));

  execSync(`npx prettier --write "${outputPath}"`);
}

export { createOutputFile };
