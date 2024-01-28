import * as diff from '../diff.js';

// Форматер результата сравнения в Stylish.
const getStylish = (ast, level = 1) => {
  const indent = ' ';
  const indentCount = 4;

  // Форматирует строку с отступами текущего уровня вложенности и спецсиволом.
  const fmtString = (node, lvl, char = ' ', attr = 'value') => {
    let result = '';
    result += `${indent.repeat(indentCount * lvl - 2)}${char} ${node.key}: `;
    result += ((node[attr] instanceof Object) ? getStylish(node[attr], lvl + 1) : node[attr]);
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

export default getStylish;
