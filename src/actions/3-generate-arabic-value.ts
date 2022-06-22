import { Ora } from 'ora';
import { green } from 'chalk';
import { generateArabicValue } from '../utils/generate-arabic-values';
import { createOutputFile } from '../utils/create-output-file';
import { FileTypes } from '../enums/file-types.enum';
import { getOutputFile } from '../constants/get-output-file.constant';

async function thirdGenerateArabicValue(spinner: Ora): Promise<void> {
  spinner.text = green('Generating Arabic Values...');
  spinner.start();

  for (let i = 0; i < FileTypes.length; i++) {
    const type = FileTypes[i];
    const fileContent = getOutputFile(type);

    const ar: { [key: string]: string } = {};

    for (let x = 0; x < fileContent.ar.length; x++) {
      const item = fileContent.ar[x];
      ar[item[0]] = await generateArabicValue(type, item[0], fileContent.en);
    }

    fileContent.ar = Object.entries(ar);
    createOutputFile(type, fileContent);
  }

  spinner.succeed();
}

export { thirdGenerateArabicValue };
