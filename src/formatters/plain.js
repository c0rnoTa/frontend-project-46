import _ from 'lodash';
import * as diff from '../diff.js';

const fmtValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isArray(value)) {
    return `'[${value.join(',')}]'`;
  }
  return value;
};

const fmtKey = (children, parent = undefined) => ((parent === undefined) ? children : `${parent}.${children}`);

// Форматер результата сравнения в Plain.
const getPlain = (ast, parent = undefined) => {
  const result = ast
    .filter((node) => (node.state !== diff.stateUnchanged))
    .map((node) => {
      switch (node.state) {
        case diff.stateAdd:
          return `Property '${fmtKey(node.key, parent)}' was added with value: ${fmtValue(node.value)}`;
        case diff.stateRemove:
          return `Property '${fmtKey(node.key, parent)}' was removed`;
        case diff.stateChanged:
          return `Property '${fmtKey(node.key, parent)}' was updated. From ${fmtValue(node.oldData)} to ${fmtValue(node.newData)}`;
        default:
          return getPlain(node.children, fmtKey(node.key, parent));
      }
    }).join('\n');
  return result;
};

export default getPlain;
