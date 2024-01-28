import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

export default (format) => {
  switch (format) {
    case 'json':
      return getJSON;
    case 'plain':
      return getPlain;
    default:
      return getStylish;
  }
};
