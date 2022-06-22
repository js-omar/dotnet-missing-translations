function addDotToTheEndOfLine(text: string): string {
  if (typeof text !== 'string' || !text.trim()) return '';

  const isAQuestionOrContainsLessThan2Words =
    /(?:^(is|should|has|can|did|will) )|(?:\.$)/gi.test(text) ||
    text.split(' ').length < 2;

  return isAQuestionOrContainsLessThan2Words ? text : `${text}.`;
}

export { addDotToTheEndOfLine };
