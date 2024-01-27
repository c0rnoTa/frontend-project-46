import parseToObject from './parser.js';
import * as diff from './diff.js';

const getStylish = (ast) => {
  const result = ast.map(
    (node) => {
      let str = '';
      switch (node.state) {
        case diff.stateAdd:
          str = `  + ${node.key}: ${node.data.value}`;
          break;
        case diff.stateRemove:
          str = `  - ${node.key}: ${node.data.value}`;
          break;
        case diff.stateChanged:
          str = `  - ${node.key}: ${node.oldData.value}`;
          str += '\n';
          str += `  + ${node.key}: ${node.newData.value}`;
          break;
        default:
          str = `    ${node.key}: ${node.data.value}`;
      }
      return str;
    },
  ).join('\n');
  return `{\n${result}\n}`;
};

const printDiff = (filepath1, filepath2) => {
  const ast = diff.genDiff(parseToObject(filepath1), parseToObject(filepath2));
  // console.log(JSON.stringify(ast, null, 2));
  console.log(getStylish(ast));
};

export { getStylish };
export default printDiff;
