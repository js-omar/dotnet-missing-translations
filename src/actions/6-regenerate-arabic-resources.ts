import { green } from 'chalk';
import { Ora } from 'ora';
import { FileTypes } from '../enums/file-types.enum';
import { generateArabicValue } from '../utils/generate-arabic-values';
import { getResourceTranslation } from '../utils/get-resource-translations';
import { writeTranslations } from '../utils/write-translations';

async function sixthReGenerateArabicResources(spinner: Ora): Promise<void> {
  spinner.text = green('Regenerating Arabic Resources...');
  spinner.start();

  for (let i = 0; i < FileTypes.length; i++) {
    const type = FileTypes[i];
    const resourcesTranslations = await getResourceTranslation(type);

    for (let x = 0; x < resourcesTranslations.ar.root.data.length; x++) {
      const item = resourcesTranslations.ar.root.data[x];
      // eslint-disable-next-line no-param-reassign
      item.value[0] = await generateArabicValue(type, item.$.name);
    }

    writeTranslations(type, resourcesTranslations);
  }

  spinner.succeed();
}

export { sixthReGenerateArabicResources };
