function convertCamelCaseToSentenceCase(text: string): string {
  if (typeof text !== 'string' || !text.trim()) return text;

  const camelCaseWords = text.match(/(\b[a-z0-9_-]+[A-Z]+\w*\b)/g) || [];
  let result = text;

  camelCaseWords.forEach((camelCaseWord) => {
    let indexOfCapitalLetter = camelCaseWord.search(/[A-Z]/g);
    let sentenceCaseWord = camelCaseWord;

    if (indexOfCapitalLetter < 1) return;

    while (indexOfCapitalLetter > 0) {
      sentenceCaseWord = [
        sentenceCaseWord.slice(0, indexOfCapitalLetter),
        ' ',
        sentenceCaseWord.slice(indexOfCapitalLetter)[0].toLowerCase(),
        sentenceCaseWord.slice(indexOfCapitalLetter + 1),
      ].join('');
      indexOfCapitalLetter = sentenceCaseWord.search(/[A-Z]/g);
    }

    result = result.replace(
      new RegExp(`\\b${camelCaseWord}\\b`, 'g'),
      sentenceCaseWord
    );
  });

  result = result.charAt(0).toUpperCase() + result.substring(1);

  return result;
}

export { convertCamelCaseToSentenceCase };
