import { cwd } from 'node:process';
import path from 'path';
import { resolve } from 'node:path';
import { readFileSync } from 'fs';

import yaml from 'js-yaml';

// Работа с файлами.
const getFileExtension = (filename) => path.extname(filename).slice(1).toLowerCase();
const getAbsoluteFilePath = (filepath) => resolve(cwd(), filepath);
const getFileContent = (filepath) => readFileSync(getAbsoluteFilePath(filepath)).toString();

// Парсеры контента в объект.
const parseJsonFile = (filepath) => JSON.parse(getFileContent(filepath));
const parseYamlFile = (filepath) => yaml.load(getFileContent(filepath));

// Читает файл и возвращает контент в виде объекта.
export default (filepath) => {
  const fileExtension = getFileExtension(filepath);
  switch (fileExtension) {
    case 'json':
      return parseJsonFile(filepath);
    case 'yaml':
    case 'yml':
      return parseYamlFile(filepath);
    default:
      throw new Error(`Format of file ${filepath} is unsupported!`);
  }
};
