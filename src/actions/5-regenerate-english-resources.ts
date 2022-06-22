import { Ora } from 'ora';
import { green } from 'chalk';
import { FileTypes } from '../enums/file-types.enum';
import { generateEnglishValue } from '../utils/generate-english-value';
import { getResourceTranslation } from '../utils/get-resource-translations';
import { writeTranslations } from '../utils/write-translations';

async function fifthReGenerateEnglishResources(spinner: Ora): Promise<void> {
  spinner.text = green('Regenerating English Resources...');
  spinner.start();

  for (let i = 0; i < FileTypes.length; i++) {
    const type = FileTypes[i];
    const resourcesTranslations = await getResourceTranslation(type);

    for (let x = 0; x < resourcesTranslations.en.root.data.length; x++) {
      const item = resourcesTranslations.en.root.data[x];
      // eslint-disable-next-line no-param-reassign
      item.value[0] = generateEnglishValue(type, item.$.name);
    }

    writeTranslations(type, resourcesTranslations);
  }

  spinner.succeed();
}

export { fifthReGenerateEnglishResources };
