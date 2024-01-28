import getStylish from './stylish.js';
import getPlain from './plain.js';

export default (format) => {
  switch (format) {
    case 'plain':
      return getPlain;
    default:
      return getStylish;
  }
};
