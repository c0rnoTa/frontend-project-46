import parseToObject from './src/parser.js';
import genDiff from './src/diff.js';
import getFormatter from './src/formatters/index.js';

const getDiff = (filepath1, filepath2, format) => {
  const ast = genDiff(parseToObject(filepath1), parseToObject(filepath2));
  const formatter = getFormatter(format);
  return formatter(ast);
};

export default getDiff;
