import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { readFileSync } from 'fs';

const getFileFormat = (filename) => {
  const extensionPosition = filename.lastIndexOf('.');
  if (extensionPosition === -1) {
    return '';
  }
  const fileExtension = filename.slice(extensionPosition + 1).toLowerCase();
  switch (fileExtension) {
    case 'json':
      return 'JSON';
    case 'yaml':
    case 'yml':
      return 'YAML';
    default:
      return '';
  }
};

const getAbsoluteFilePath = (filepath) => resolve(cwd(), filepath);

export default (filepath1, filepath2) => {
  console.log(`${getAbsoluteFilePath(filepath1)} - ${getFileFormat(filepath1)}`);
  console.log(readFileSync(getAbsoluteFilePath(filepath1)).toString());
  console.log(`${getAbsoluteFilePath(filepath2)} - ${getFileFormat(filepath2)}`);
  console.log(readFileSync(getAbsoluteFilePath(filepath2)).toString());
};
