import { Ora } from 'ora';
import { green } from 'chalk';
import { FileTypes } from '../enums/file-types.enum';
import { createOutputFile } from '../utils/create-output-file';
import { getMissingStrings } from '../utils/get-missing-strings';
import { getResourcesNames } from '../utils/get-resources-names';
import { getTranslationStrings } from '../utils/get-translation-strings';

async function firstGetMissingStrings(spinner: Ora): Promise<void> {
  spinner.text = green('Get Missing Strings...');
  spinner.start();

  const result = [];

  for (let i = 0; i < FileTypes.length; i++) {
    const type = FileTypes[i];

    const names = await getResourcesNames(type);
    const strings = getTranslationStrings(type);
    const missingStrings = getMissingStrings(strings.strings, names);

    result.push({ names, strings, missingStrings });

    createOutputFile(type, {
      en: missingStrings.en.map((m) => [m, '']),
      ar: missingStrings.ar.map((m) => [m, '']),
      other: strings.other,
    });
  }

  spinner.succeed();
  console.log({
    [FileTypes[0]]: {
      resources: {
        ar: Object.keys(result[0].names.ar).length,
        en: Object.keys(result[0].names.en).length,
      },
      strings: {
        strings: result[0].strings.strings.length,
        other: result[0].strings.other.length,
      },
      missing: {
        ar: result[0].missingStrings.ar.length,
        en: result[0].missingStrings.en.length,
      },
    },
    [FileTypes[1]]: {
      resources: {
        ar: Object.keys(result[1].names.ar).length,
        en: Object.keys(result[1].names.en).length,
      },
      strings: {
        strings: result[1].strings.strings.length,
        other: result[1].strings.other.length,
      },
      missing: {
        ar: result[1].missingStrings.ar.length,
        en: result[1].missingStrings.en.length,
      },
    },
  });
}

export { firstGetMissingStrings };
