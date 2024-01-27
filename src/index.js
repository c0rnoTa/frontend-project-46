import parseToObject from './parser.js';
import * as diff from './diff.js';

// Форматер результата сравнения в Stylish.
const getStylish = (ast, level = 1) => {
  const indent = ' ';
  const indentCount = 4;

  // Форматирует строку с отступами текущего уровня вложенности и спецсиволом.
  const fmtString = (node, lvl, char = ' ', keyName = 'data') => {
    let result = '';
    result += `${indent.repeat(indentCount * lvl - 2)}${char} ${node.key}: `;
    if (node[keyName].type === diff.typeNested) {
      result += getStylish(node[keyName].value, lvl + 1);
    } else {
      result += node[keyName].value;
    }
    return result;
  };

  const result = ast.map(
    (node) => {
      let str = '';
      switch (node.state) {
        case diff.stateAdd:
          str = fmtString(node, level, '+');
          break;
        case diff.stateRemove:
          str = fmtString(node, level, '-');
          break;
        case diff.stateChanged:
          str = fmtString(node, level, '-', 'oldData');
          str += '\n';
          str += fmtString(node, level, '+', 'newData');
          break;
        default:
          str = fmtString(node, level);
      }
      return str;
    },
  ).join('\n');
  return `{\n${result}\n${indent.repeat(indentCount * (level - 1))}}`;
};

const printDiff = (filepath1, filepath2) => {
  const ast = diff.genDiff(parseToObject(filepath1), parseToObject(filepath2));
  // console.log(JSON.stringify(ast, null, 2));
  console.log(getStylish(ast));
};

export { getStylish };
export default printDiff;
