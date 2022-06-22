import { FileTypesEnum } from '../enums/file-types.enum';
import { defaultReplaces } from '../constants/default-replaces.constant';
import { addDotToTheEndOfLine } from '../methods/add-dot-to-the-end-of-line';
import { addQuestionMarkIfIsAsking } from '../methods/add-question-mark-if-asking';
import { applyReplaces } from '../methods/apply-replaces';
import { convertCamelCaseToSentenceCase } from '../methods/convert-camel-case-to-sentence-case';
import { setVariables } from '../methods/set-variables';

const commonMethods = [
  (text: string) => applyReplaces(text, defaultReplaces),
  convertCamelCaseToSentenceCase,
  setVariables,
  addQuestionMarkIfIsAsking,
] as const;
const modelsMethods = [] as const;
const sharedMethods = [addDotToTheEndOfLine] as const;

const methods = (type: FileTypesEnum) =>
  [
    ...commonMethods,
    ...(type === 'shared' ? sharedMethods : modelsMethods),
  ] as const;

function generateEnglishValue(type: FileTypesEnum, text: string): string {
  let value = text;

  methods(type).forEach((m) => {
    value = m(value);
  });

  return value;
}

export { generateEnglishValue };
