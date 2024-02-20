import _ from 'lodash';

// Состояния узлов в AST.
const stateAdd = 'added';
const stateRemove = 'remove';
const stateUnchanged = 'unchanged';
const stateChanged = 'changed';
const stateNested = 'nested';

const genDiff = (obj1, obj2) => {
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(uniqKeys);

  const diff = sortedKeys.map((key) => {
    // Ключ был добавлен
    if (!(key in obj1)) {
      const value = obj2[key];
      return { state: stateAdd, key, value };
    }
    // Ключ был удалён
    if (!(key in obj2)) {
      const value = obj1[key];
      return { state: stateRemove, key, value };
    }

    // Ключ и в исходном и в целевом объекте является объектом
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { state: stateNested, key, children: genDiff(obj1[key], obj2[key]) };
    }

    // Ключ и в исходном и в целевом объекте
    if (!_.isEqual(obj1[key], obj2[key])) {
      const beforeValue = obj1[key];
      const afterValue = obj2[key];
      return {
        state: stateChanged,
        key,
        oldData: beforeValue,
        newData: afterValue,
      };
    }

    // Значение ключа не изменилось
    return { state: stateUnchanged, key, value: obj1[key] };
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
