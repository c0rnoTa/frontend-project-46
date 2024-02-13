import { cwd } from 'node:process';
import path from 'path';
import { resolve } from 'node:path';
import { readFileSync } from 'fs';

// Работа с файлами.
const getAbsoluteFilePath = (filepath) => resolve(cwd(), filepath);
const getContent = (filepath) => readFileSync(getAbsoluteFilePath(filepath)).toString();

const getType = (filename) => {
  const extension = path.extname(filename).slice(1).toLowerCase();
  switch (extension) {
    case 'yaml':
    case 'yml':
      return 'YAML';
    default:
      return extension.toUpperCase();
  }
};

export { getType, getContent };
