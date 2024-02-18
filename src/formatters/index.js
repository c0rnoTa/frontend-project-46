import getStylish from './stylish.js';
import getPlain from './plain.js';

const formatters = {
  json: JSON.stringify,
  plain: getPlain,
  stylish: getStylish,
};

export default (data, format) => formatters[format](data);
