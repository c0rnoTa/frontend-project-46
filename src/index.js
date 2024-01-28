import parseToObject from './parser.js';
import genDiff from './diff.js';
import getFormatter from './formatters/index.js';

const printDiff = (filepath1, filepath2, opts) => {
  const ast = genDiff(parseToObject(filepath1), parseToObject(filepath2));
  const formatter = getFormatter(opts?.format);
  console.log(formatter(ast));
};

export default printDiff;
