import { Ora } from 'ora';
import { green } from 'chalk';
import { FileTypes } from '../enums/file-types.enum';
import { getResourceTranslation } from '../utils/get-resource-translations';
import { writeTranslations } from '../utils/write-translations';
import { IResourcesFileContentDataItem } from '../interfaces/resources-file-content.interface';
import { getOutputFile } from '../constants/get-output-file.constant';
import { deleteOutputFile } from '../utils/delete-output.file';

async function fourthWriteMissingStrings(spinner: Ora): Promise<void> {
  spinner.text = green('Write Missing Strings...');
  spinner.start();

  for (let i = 0; i < FileTypes.length; i++) {
    const type = FileTypes[i];
    const fileContent = getOutputFile(type);

    const resourcesTranslations = await getResourceTranslation(type);
    const createItem = (
      name: string,
      value: string
    ): IResourcesFileContentDataItem => ({
      $: { name },
      value: [value],
    });

    fileContent.en.forEach((item) => {
      resourcesTranslations.en.root.data.push(createItem(item[0], item[1]));
    });

    fileContent.ar.forEach((item) => {
      resourcesTranslations.ar.root.data.push(createItem(item[0], item[1]));
    });

    writeTranslations(type, resourcesTranslations);

    deleteOutputFile(type);
  }

  spinner.succeed();
}

export { fourthWriteMissingStrings };
