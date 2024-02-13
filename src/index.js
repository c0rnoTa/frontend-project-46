import parseToObject from './parser.js';
import genDiff from './diff.js';
import getFormatter from './formatters/index.js';
import * as file from './files.js';

const getDiff = (filepath1, filepath2, format) => {
  const fileType1 = file.getType(filepath1);
  const fileContent1 = file.getContent(filepath1);
  const fileType2 = file.getType(filepath2);
  const fileContent2 = file.getContent(filepath2);
  const object1 = parseToObject(fileContent1, fileType1);
  const object2 = parseToObject(fileContent2, fileType2);
  const ast = genDiff(object1, object2);
  const formatter = getFormatter(format);
  return formatter(ast);
};

export default getDiff;
