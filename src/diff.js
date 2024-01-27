import _ from 'lodash';

// Состояния узлов в AST.
const stateAdd = 'added';
const stateRemove = 'remove';
const stateUnchanged = 'unchanged';
const stateChanged = 'changed';

// Типы узлов в AST.
const typeNested = 'nested';
const typeLeaf = 'leaf';

// const isObject = (value) => value instanceof Object;

const newNode = (state, key, data) => ({
  state,
  key,
  data,
});

const compareValues = (key, beforeValue, afterValue) => {
  if (afterValue === beforeValue) {
    return newNode(stateUnchanged, key, { type: typeLeaf, value: beforeValue });
  }

  return {
    state: stateChanged,
    key,
    oldData: { type: typeLeaf, value: beforeValue },
    newData: { type: typeLeaf, value: afterValue },
  };
};

const genDiff = (obj1, obj2) => {
  const res = _.entries({ ...obj1, ...obj2 });
  res.sort();
  const diff = res.map(([key, value]) => {
    if (!(key in obj1)) {
      return newNode(stateAdd, key, { type: typeLeaf, value });
    }
    if (!(key in obj2)) {
      return newNode(stateRemove, key, { type: typeLeaf, value });
    }

    return compareValues(key, obj1[key], obj2[key]);
  });
  return diff;
};

export {
  genDiff,
  stateAdd,
  stateRemove,
  stateUnchanged,
  stateChanged,
  typeNested,
  typeLeaf,
};
