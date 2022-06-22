import { existsSync } from 'node:fs';
import { join } from 'node:path';

function isDotnetProject(): boolean {
  const directories = ['Controllers', 'Resources', 'Dtos']; // cspell:ignore Dtos

  return directories
    .map((d) => existsSync(join(process.cwd(), d)))
    .every((v) => v === true);
}

export { isDotnetProject };
