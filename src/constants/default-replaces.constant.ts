const defaultReplaces: [RegExp, string][] = [
  [/_/g, ' '],
  [/\ben\b/g, 'in English'],
  [/\bar\b/g, 'in Arabic'],
  [/\benglish\b/g, 'English'],
  [/\barabic\b/g, 'Arabic'],
  [/\bid\b/g, 'ID'],
  [/\bkpi\b/g, 'KPI'], // cspell:ignore bkpi
  [/\bkpis\b/g, 'KPIs'], // cspell:ignore bkpis
];

export { defaultReplaces };
