import yaml from 'js-yaml';

// Парсеры контента в объект.
const parsers = {
  JSON: JSON.parse,
  YAML: yaml.load,
};

export default (data, dataType) => parsers[dataType](data);
