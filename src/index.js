import parseToObject from './parser.js';
import genDiff from './diff.js';
import getFormatter from './formatters/index.js';

const getDiff = (filepath1, filepath2, format) => {
  const ast = genDiff(parseToObject(filepath1), parseToObject(filepath2));
  const formatter = getFormatter(format);
  return formatter(ast);
};

export default getDiff;
