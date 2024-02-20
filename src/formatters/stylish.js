import _ from 'lodash';
import * as diff from '../diff.js';

const indent = ' ';
const indentCount = 4;

const fmtKey = (key, char = ' ', level = 1) => {
  const prefix = indent.repeat(indentCount * level - 2);
  return `${prefix}${char} ${key}`;
};

const fmtValue = (value, level = 1) => {
  // Вывод значения типа объект
  if (_.isPlainObject(value)) {
    const result = Object.keys(value).map((key) => {
      const prefix = indent.repeat(indentCount * (level + 1));
      const suffix = fmtValue(value[key], level + 1);
      return `${prefix}${key}: ${suffix}`;
    }).join('\n');
    return `{\n${result}\n${indent.repeat(indentCount * (level))}}`;
  }

  // Вывод значения типа массив
  if (_.isArray(value)) {
    const result = value.map((element) => {
      const prefix = indent.repeat(indentCount * (level + 1));
      const suffix = fmtValue(element, level + 1);
      return `${prefix}${suffix}`;
    }).join('\n');
    return `[\n${result}\n${indent.repeat(indentCount * (level))}]`;
  }

  return value;
};

const getStylish = (ast, level = 1) => {
  const result = ast.map((node) => {
    switch (node.state) {
      case diff.stateAdd:
        return `${fmtKey(node.key, '+', level)}: ${fmtValue(node.value, level)}`;
      case diff.stateRemove:
        return `${fmtKey(node.key, '-', level)}: ${fmtValue(node.value, level)}`;
      case diff.stateChanged: {
        const removed = `${fmtKey(node.key, '-', level)}: ${fmtValue(node.oldData, level)}`;
        const added = `${fmtKey(node.key, '+', level)}: ${fmtValue(node.newData, level)}`;
        return `${removed}\n${added}`;
      }
      case diff.stateNested:
        return `${fmtKey(node.key, ' ', level)}: ${getStylish(node.children, level + 1)}`;
      default:
        return `${fmtKey(node.key, ' ', level)}: ${fmtValue(node.value, level)}`;
    }
  }).join('\n');
  return `{\n${result}\n${indent.repeat(indentCount * (level - 1))}}`;
};

export default getStylish;
