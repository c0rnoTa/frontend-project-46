import * as diff from '../diff.js';

const fmtValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const fmtKey = (children, parent = undefined) => ((parent === undefined) ? children : `${parent}.${children}`);

// Форматер результата сравнения в Plain.
const getPlain = (ast, parent = undefined) => {
  const result = ast.map(
    (node) => {
      let str = '';
      switch (node.state) {
        case diff.stateAdd:
          str = `Property '${fmtKey(node.key, parent)}' was added with value: ${fmtValue(node.value)}`;
          break;
        case diff.stateRemove:
          str = `Property '${fmtKey(node.key, parent)}' was removed`;
          break;
        case diff.stateChanged:
          str = `Property '${fmtKey(node.key, parent)}' was updated. From ${fmtValue(node.oldData)} to ${fmtValue(node.newData)}`;
          break;
        default:
          if (node.value instanceof Object) {
            str = getPlain(node.value, fmtKey(node.key, parent));
          }
      }
      return str;
    },
  ).filter((str) => str !== '').join('\n');
  return result;
};

export default getPlain;
