import getStylish from './stylish.js';
import getPlain from './plain.js';

export default {
  json: JSON.stringify,
  plain: getPlain,
  stylish: getStylish,
};
