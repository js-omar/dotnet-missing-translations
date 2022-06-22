function addQuestionMarkIfIsAsking(text: string): string {
  if (typeof text !== 'string' || !text.trim()) return '';
  const regex = /^(is|should|has|can|did|will) /gi;
  return regex.test(text) ? `${text}?` : text;
}

export { addQuestionMarkIfIsAsking };
