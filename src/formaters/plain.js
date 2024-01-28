import * as diff from '../diff.js';

const fmtValue = (data) => {
  if (data.type === diff.typeNested) {
    return '[complex value]';
  }
  if (typeof data.value === 'string') {
    return `'${data.value}'`;
  }
  return data.value;
};

const fmtKey = (children, parent = undefined) => ((parent === undefined) ? children : `${parent}.${children}`);

// Форматер результата сравнения в Plain.
const getPlain = (ast, parent = undefined) => {
  const result = ast.map(
    (node) => {
      let str = '';
      switch (node.state) {
        case diff.stateAdd:
          str = `Property '${fmtKey(node.key, parent)}' was added with value: ${fmtValue(node.data)}`;
          break;
        case diff.stateRemove:
          str = `Property '${fmtKey(node.key, parent)}' was removed`;
          break;
        case diff.stateChanged:
          str = `Property '${fmtKey(node.key, parent)}' was updated. From ${fmtValue(node.oldData)} to ${fmtValue(node.newData)}`;
          break;
        default:
          if (node.data.type === diff.typeNested) {
            str = getPlain(node.data.value, fmtKey(node.key, parent));
          }
      }
      return str;
    },
  ).filter((str) => str !== '').join('\n');
  return result;
};

export default getPlain;
