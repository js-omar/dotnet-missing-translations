import { Ora } from 'ora';
import { green } from 'chalk';
import { createOutputFile } from '../utils/create-output-file';
import { generateEnglishValue } from '../utils/generate-english-value';
import { FileTypes } from '../enums/file-types.enum';
import { getOutputFile } from '../constants/get-output-file.constant';

function secondGenerateEnglishValue(spinner: Ora): void {
  spinner.text = green('Generating English Values...');
  spinner.start();

  for (let i = 0; i < FileTypes.length; i++) {
    const type = FileTypes[i];
    const outputFileContent = getOutputFile(type);

    outputFileContent.en.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item[1] = generateEnglishValue(type, item[0]);
    });

    createOutputFile(type, outputFileContent);
  }

  spinner.succeed();
}

export { secondGenerateEnglishValue };
