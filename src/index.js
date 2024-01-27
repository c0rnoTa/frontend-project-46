import parseToObject from './parser.js';
import { genDiff } from './diff.js';
import getStylish from './formaters/stylish.js';

const printDiff = (filepath1, filepath2) => {
  const ast = genDiff(parseToObject(filepath1), parseToObject(filepath2));
  // console.log(JSON.stringify(ast, null, 2));
  console.log(getStylish(ast));
};

export default printDiff;
