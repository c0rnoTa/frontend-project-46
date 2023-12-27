import parseToString from './parser.js';

export default (filepath1, filepath2) => {
  console.log(parseToString(filepath1));
  console.log(parseToString(filepath2));
};
