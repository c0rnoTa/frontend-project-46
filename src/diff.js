import _ from 'lodash';

const stateAdd = 'added';
const stateRemove = 'remove';
const stateUnchanged = 'unchanged';
const stateChanged = 'changed';

const typeNested = 'nested';
const typeLeaf = 'leaf';

const newLeafKey = (state, key, value) => ({
  state,
  name: key,
  data: {
    type: typeLeaf,
    value,
  },
});

const newNestedKey = (state, key, value) => ({
  state,
  name: key,
  data: {
    type: typeNested,
    value: genDiff(value, value),
  },
});

const newKey = (state, key, value) => {
  if (value instanceof Object) {
    return newNestedKey(state, key, value);
  }
  return newLeafKey(state, key, value);
};

const compareValues = (key, beforeValue, afterValue) => {
  if (afterValue === beforeValue) {
    return newKey(stateUnchanged, key, beforeValue);
  }
  return {
    state: stateChanged,
    name: key,
    oldData: {
      type: typeLeaf,
      value: beforeValue,
    },
    newData: {
      type: typeLeaf,
      value: afterValue,
    },
  };
};

const genDiff = (obj1, obj2) => {
  const res = _.entries({ ...obj1, ...obj2 });
  // const res = _.entries(_.merge(obj1, obj2));
  res.sort();
  const diff = res.map(([key, value]) => {
    if (!(key in obj1)) {
      return newKey(stateAdd, key, value);
    }
    if (!(key in obj2)) {
      return newKey(stateRemove, key, value);
    }

    return compareValues(key, obj1[key], value);
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
