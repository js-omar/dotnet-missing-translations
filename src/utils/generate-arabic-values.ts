import { FileTypesEnum } from '../enums/file-types.enum';
import { generateEnglishValue } from './generate-english-value';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const translatte = require('translatte');

async function generateArabicValue(
  type: FileTypesEnum,
  arItem: string,
  en?: [string, string][]
): Promise<string> {
  let enItem = en?.find((e) => e[0] === arItem[0]);

  if (enItem === undefined)
    enItem = [arItem, generateEnglishValue(type, arItem)];

  const { text } = await translatte(enItem[1], { to: 'ar' });

  console.log({ en: enItem[1], ar: text });

  return text;
}

export { generateArabicValue };
