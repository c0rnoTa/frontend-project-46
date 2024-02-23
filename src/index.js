import parseToObject from './parser.js';
import genDiff from './diff.js';
import formatter from './formatters/index.js';
import * as file from './files.js';

const parseFileToObject = (filepath) => {
  const fileType = file.getType(filepath);
  const fileContent = file.getContent(filepath);
  return parseToObject(fileContent, fileType);
};

const getDiff = (filepath1, filepath2, format = 'stylish') => {
  const object1 = parseFileToObject(filepath1);
  const object2 = parseFileToObject(filepath2);
  const ast = genDiff(object1, object2);
  return formatter(ast, format);
};

export default getDiff;
