import yaml from 'js-yaml';

// Парсеры контента в объект.
const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
};

export default (data, dataType) => {
  if (parsers[dataType] === undefined) {
    throw new Error(`Data type '${dataType}' is unsupported`);
  }
  return parsers[dataType](data);
};
