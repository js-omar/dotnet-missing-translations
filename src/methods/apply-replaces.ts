function applyReplaces(text: string, replaces: [RegExp, string][]): string {
  if (typeof text !== 'string' || !text.trim() || !Array.isArray(replaces))
    throw new Error('Invalid Or Missing Arguments Types');

  let result = text;

  replaces.forEach((r) => {
    result = result.replace(r[0], r[1]);
  });

  return result;
}

export { applyReplaces };
