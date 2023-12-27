import parseToString from './parser.js';
import genDiff from './diff.js';

export default (filepath1, filepath2) => {
  console.log(genDiff(parseToString(filepath1), parseToString(filepath2)));
};
