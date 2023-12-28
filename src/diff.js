import _ from 'lodash';

const stateAdd = 'add';
const stateRemove = 'remove';
const stateSame = 'same';
const stateChange = 'change';

const addKey = (key, value) => [stateAdd, [key, value]];

const removeKey = (key, value) => [stateRemove, [key, value]];

const compareValues = (key, newValue, oldValue) => {
  if (newValue === oldValue) {
    return [stateSame, [key, newValue]];
  }
  return [stateChange, [key, [oldValue, newValue]]];
};

const genDiff = (obj1, obj2) => {
  const res = _.entries({ ...obj1, ...obj2 });
  // const res = _.entries(_.merge(obj1, obj2));
  res.sort();
  const diff = res.map(([key, value]) => {
    if (!(key in obj1)) {
      return addKey(key, value);
    }
    if (!(key in obj2)) {
      return removeKey(key, value);
    }
    return compareValues(key, value, obj1[key]);
  });
  return diff;
};

export {
  genDiff,
  stateAdd,
  stateRemove,
  stateSame,
  stateChange,
}