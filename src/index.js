import parseToObject from './parser.js';
import * as diff from './diff.js';

const getStylish = (ast, lvl = 1) => {
  const indent = ' ';
  const indentCount = 4;
  const result = ast.map(
    (node) => {
      let str = '';
      switch (node.state) {
        case diff.stateAdd:
          str = `${indent.repeat(indentCount * lvl - 2)}+ ${node.key}: ${(node.data.type === diff.typeNested) ? getStylish(node.data.value, lvl + 1) : node.data.value}`;
          break;
        case diff.stateRemove:
          str = `${indent.repeat(indentCount * lvl - 2)}- ${node.key}: ${(node.data.type === diff.typeNested) ? getStylish(node.data.value, lvl + 1) : node.data.value}`;
          break;
        case diff.stateChanged:
          str = `${indent.repeat(indentCount * lvl - 2)}- ${node.key}: ${(node.oldData.type === diff.typeNested) ? getStylish(node.oldData.value, lvl + 1) : node.oldData.value}`;
          str += '\n';
          str += `${indent.repeat(indentCount * lvl - 2)}+ ${node.key}: ${(node.newData.type === diff.typeNested) ? getStylish(node.newData.value, lvl + 1) : node.newData.value}`;
          break;
        default:
          str = `${indent.repeat(indentCount * lvl)}${node.key}: ${(node.data.type === diff.typeNested) ? getStylish(node.data.value, lvl + 1) : node.data.value}`;
      }
      return str;
    },
  ).join('\n');
  return `{\n${result}\n${indent.repeat(indentCount * (lvl - 1))}}`;
};

const printDiff = (filepath1, filepath2) => {
  const ast = diff.genDiff(parseToObject(filepath1), parseToObject(filepath2));
  // console.log(JSON.stringify(ast, null, 2));
  console.log(getStylish(ast));
};

export { getStylish };
export default printDiff;
