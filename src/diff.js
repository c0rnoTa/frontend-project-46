import _ from 'lodash';

// Состояния узлов в AST.
const stateAdd = 'added';
const stateRemove = 'remove';
const stateUnchanged = 'unchanged';
const stateChanged = 'changed';
const stateNested = 'nested';

const isObject = (value) => _.isObject(value) && !_.isArray(value);
const newNode = (state, key, value) => ({ state, key, value });

const newNestedValue = (obj) => {
  const keys = Object.keys(obj);
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    if (isObject(obj[key])) {
      return newNode(stateUnchanged, key, newNestedValue(obj[key]));
    }
    return newNode(stateUnchanged, key, obj[key]);
  });
};

const genDiff = (obj1, obj2) => {
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(uniqKeys);

  const diff = sortedKeys.map((key) => {
    // Ключ был добавлен
    if (!(key in obj1)) {
      const value = obj2[key];
      return newNode(stateAdd, key, value);
    }
    // Ключ был удалён
    if (!(key in obj2)) {
      const value = obj1[key];
      return newNode(stateRemove, key, value);
    }

    // Ключ есть в исходном и в целевом объекте
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return newNode(stateNested, key, genDiff(obj1[key], obj2[key]));
    }

    // Изменился тип ключа или его значение
    if (obj1[key] !== obj2[key]) {
      const beforeValue = obj1[key];
      const afterValue = obj2[key];
      return {
        state: stateChanged,
        key,
        oldData: beforeValue,
        newData: afterValue,
      };
    }

    // Ключ не объект и его значние не изменилось
    return newNode(stateUnchanged, key, obj1[key]);
  });
  return diff;
};

export {
  stateAdd,
  stateRemove,
  stateUnchanged,
  stateChanged,
  stateNested,
};

export default genDiff;
