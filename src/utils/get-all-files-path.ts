import fs from 'node:fs';
import { join } from 'node:path';

const allFilesPath: string[] = [];

function getAllFilesOrCatchIfIsNotDir(path: string): string[] | null {
  try {
    return fs.readdirSync(join(path));
  } catch (error: any) {
    if (error?.code !== 'ENOTDIR') throw error;
    return null;
  }
}

function loopAndPushChildFiles(filePath: string): void {
  const childFiles = getAllFilesOrCatchIfIsNotDir(filePath);

  if (childFiles === null) {
    allFilesPath.push(filePath);
    return;
  }

  for (let i = 0; i < childFiles.length; i++) {
    const childFilePath = join(filePath, childFiles[i]);
    loopAndPushChildFiles(childFilePath);
  }
}

loopAndPushChildFiles(process.cwd());

export { allFilesPath };
