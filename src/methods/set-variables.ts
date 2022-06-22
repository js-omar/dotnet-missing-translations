function setVariables(text: string): string {
  if (typeof text !== 'string' || !text.trim()) return text;

  const numbers = text.match(/\b(\d)\b/g) || [];

  let result = numbers.length ? `${text}.` : text;

  numbers.forEach((n) => {
    result = result.replace(new RegExp(`\\b${n}\\b`, 'g'), `{${n}}`);
  });

  return result;
}

export { setVariables };
