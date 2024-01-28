import _ from 'lodash';

// Состояния узлов в AST.
const stateAdd = 'added';
const stateRemove = 'remove';
const stateUnchanged = 'unchanged';
const stateChanged = 'changed';

const isObject = (value) => value instanceof Object;
const newNode = (state, key, value) => ({ state, key, value });

const genDiff = (obj1, obj2) => {
  const res = _.entries({ ...obj1, ...obj2 });
  const sortedRes = _.sortBy(res);
  const diff = sortedRes.map(([key, value]) => {
    // Был ли добавлен ключ
    if (!(key in obj1)) {
      return newNode(stateAdd, key, (isObject(value) ? genDiff(value, value) : value));
    }
    // Был ли удалён ключ
    if (!(key in obj2)) {
      return newNode(stateRemove, key, (isObject(value) ? genDiff(value, value) : value));
    }

    // Ключ есть в исходном и в целевом объекте
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return newNode(stateUnchanged, key, genDiff(obj1[key], obj2[key]));
    }

    // Изменился тип ключа или его значение
    if (obj1[key] !== obj2[key]) {
      const beforeValue = obj1[key];
      const afterValue = obj2[key];
      return {
        state: stateChanged,
        key,
        oldData: (isObject(beforeValue) ? genDiff(beforeValue, beforeValue) : beforeValue),
        newData: (isObject(afterValue) ? genDiff(afterValue, afterValue) : afterValue),
      };
    }

    // Ключ не объект и его значние не изменилось
    return newNode(stateUnchanged, key, value);
  });
  return diff;
};

export {
  stateAdd,
  stateRemove,
  stateUnchanged,
  stateChanged,
};

export default genDiff;
