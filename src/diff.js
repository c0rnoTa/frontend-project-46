import _ from 'lodash';

// Состояния узлов в AST.
const stateAdd = 'added';
const stateRemove = 'remove';
const stateUnchanged = 'unchanged';
const stateChanged = 'changed';

// Типы узлов в AST.
const typeNested = 'nested';
const typeLeaf = 'leaf';

const isObject = (value) => value instanceof Object;

const newNode = (state, key, value) => ({
  state,
  key,
  data: {
    type: ((isObject(value)) ? typeNested : typeLeaf),
    value,
  },
});

const genDiff = (obj1, obj2) => {
  const res = _.entries({ ...obj1, ...obj2 });
  res.sort();
  const diff = res.map(([key, value]) => {
    // Был ли добавлен ключ
    if (!(key in obj1)) {
      if (isObject(value)) {
        return newNode(stateAdd, key, genDiff(value, value));
      }
      return newNode(stateAdd, key, value);
    }
    // Был ли удалён ключ
    if (!(key in obj2)) {
      if (isObject(value)) {
        return newNode(stateRemove, key, genDiff(value, value));
      }
      return newNode(stateRemove, key, value);
    }

    // Ключ есть в исходном и в целевом объекте
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return newNode(stateUnchanged, key, genDiff(obj1[key], obj2[key]));
    }

    // Изменился тип ключа или его значение
    if (obj1[key] !== obj2[key]) {
      const beforeValue = obj1[key];
      const afterValue = obj2[key];
      let oldData = {};
      let newData = {};

      if (isObject(beforeValue)) {
        oldData = { type: typeNested, value: genDiff(beforeValue, beforeValue) };
      } else {
        oldData = { type: typeLeaf, value: beforeValue };
      }

      if (isObject(afterValue)) {
        newData = { type: typeNested, value: genDiff(afterValue, afterValue) };
      } else {
        newData = { type: typeLeaf, value: afterValue };
      }

      return {
        state: stateChanged,
        key,
        oldData,
        newData,
      };
    }

    // Ключ не объект и его значние не изменилось
    return newNode(stateUnchanged, key, value);
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
