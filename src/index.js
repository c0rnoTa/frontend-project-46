import parseToObject from './parser.js';
import { genDiff } from './diff.js';
import getStylish from './formaters/stylish.js';
import getPlain from './formaters/plain.js';

const printDiff = (filepath1, filepath2, opts) => {
  const ast = genDiff(parseToObject(filepath1), parseToObject(filepath2));
  // console.log(JSON.stringify(ast, null, 2));
  switch (opts.format) {
    case 'plain':
      console.log(getPlain(ast));
      break;
    case 'stylish':
    default:
      console.log(getStylish(ast));
  }
};

export default printDiff;
