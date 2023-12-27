import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { readFileSync } from 'fs';

const getFileExtension = (filename) => {
  const extensionPosition = filename.lastIndexOf('.');
  if (extensionPosition === -1) {
    return '';
  }
  return filename.slice(extensionPosition + 1).toLowerCase();
};

const getAbsoluteFilePath = (filepath) => resolve(cwd(), filepath);

const parseJsonFile = (filepath) => {
  const content = readFileSync(getAbsoluteFilePath(filepath)).toString();
  return JSON.parse(content);
};

export default (filepath) => {
  const fileExtension = getFileExtension(filepath);
  switch (fileExtension) {
    case 'json':
      return parseJsonFile(filepath);
    case 'yaml':
    case 'yml':
      return readFileSync(getAbsoluteFilePath(filepath)).toString();
    default:
      throw new Error(`Format of file ${filepath} is unsupported!`);
  }
};
