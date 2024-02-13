import yaml from 'js-yaml';

import * as file from './files.js';

// Парсеры контента в объект.
const parseJsonFile = (filepath) => JSON.parse(file.getContent(filepath));
const parseYamlFile = (filepath) => yaml.load(file.getContent(filepath));

// Читает файл и возвращает контент в виде объекта.
export default (filepath) => {
  const fileType = file.getType(filepath);
  switch (fileType) {
    case 'JSON':
      return parseJsonFile(filepath);
    case 'YAML':
      return parseYamlFile(filepath);
    default:
      throw new Error(`File type ${fileType} is unsupported by parser!`);
  }
};
