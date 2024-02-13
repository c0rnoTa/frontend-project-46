import yaml from 'js-yaml';

// Парсеры контента в объект.
const parseJson = (data) => JSON.parse(data);
const parseYaml = (data) => yaml.load(data);

// Читает файл и возвращает контент в виде объекта.
export default (data, dataType) => {
  switch (dataType) {
    case 'JSON':
      return parseJson(data);
    case 'YAML':
      return parseYaml(data);
    default:
      throw new Error(`Data type ${dataType} is unsupported by parser!`);
  }
};
