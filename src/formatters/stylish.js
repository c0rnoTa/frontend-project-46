import * as diff from '../diff.js';

const indent = ' ';
const indentCount = 4;

const getStylish = (ast, level = 1) => {
  const fmtString = (node, lvl, char = ' ', attr = 'value') => {
    const prefix = `${indent.repeat(indentCount * lvl - 2)}${char}`;
    const value = `${(node[attr] instanceof Object) ? getStylish(node[attr], lvl + 1) : node[attr]}`;
    return `${prefix} ${node.key}: ${value}`;
  };

  const result = ast.map(
    (node) => {
      switch (node.state) {
        case diff.stateAdd:
          return fmtString(node, level, '+');
        case diff.stateRemove:
          return fmtString(node, level, '-');
        case diff.stateChanged:
          return `${fmtString(node, level, '-', 'oldData')}\n${fmtString(node, level, '+', 'newData')}`;
        default:
          return fmtString(node, level);
      }
    },
  ).join('\n');
  return `{\n${result}\n${indent.repeat(indentCount * (level - 1))}}`;
};

export default getStylish;
