import fs from 'node:fs';
import { FileTypesEnum } from '../enums/file-types.enum';
import { allFilesPath } from './get-all-files-path';

function getTranslationStrings(type: FileTypesEnum): {
  strings: string[];
  other: string[];
} {
  const stringsKeys: { [key: string]: boolean } = {};

  const regex =
    type === 'shared'
      ? /localizer\[\s*(.*)\s*\]/g
      : /(\[Display\(Name = "(\w*)"|\[Required\(ErrorMessage = "(\w*)")/g;

  const removePrefixAndPostfix = (r: string): string =>
    type === 'shared'
      ? r.replace(/(^localizer|\s)*/g, '').replace(/(^\[|\]$)/g, '')
      : r.replace(/(^\[Display\(Name = |^\[Required\(ErrorMessage = )/g, '');

  allFilesPath.forEach((filePath) => {
    if (!filePath.endsWith('.cs')) return;
    const text = fs.readFileSync(filePath, { encoding: 'utf8' });
    const result = text.match(regex);
    if (!result) return;
    result.forEach((r) => {
      stringsKeys[removePrefixAndPostfix(r)] = true;
    });
  });

  const strings: string[] = [];
  const other: string[] = [];

  Object.keys(stringsKeys).forEach((key) => {
    if (/^"[^"]*"$/g.test(key)) strings.push(key.replace(/(^"|"$)/g, ''));
    else other.push(key);
  });

  return { strings, other };
}

export { getTranslationStrings };
