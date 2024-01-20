import _ from 'lodash';

const stateAdd = '+';
const stateRemove = '-';
const stateSame = '=';
const stateChange = 'change';

const typeNode = 'node';
const typeLeaf = 'leaf';

// const getAstNode = (name, state, oldType, oldValue, newType, newValue) => {
//   const getAstValue = (type, value) => (
//     {
//       type,
//       value,
//     });

//   return {
//     name,
//     state,
//     old: getAstValue(oldType, oldValue),
//     new: getAstValue(newType, newValue),
//   };
// }

// Узел добавлен
const newSimpleKey = (state, key, value) => ({
  state,
  name: key,
  data: {
    type: typeLeaf,
    value,
  },
});

// Узел присутствует в исходном и целевом объекте
const compareValues = (key, beforeValue, afterValue) => {
  if (afterValue === beforeValue) {
    return newSimpleKey(stateSame, key, beforeValue);
  }
  return {
    state: stateChange,
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
      return newSimpleKey(stateAdd, key, value);
    }
    if (!(key in obj2)) {
      return newSimpleKey(stateRemove, key, value);
    }

    return compareValues(key, obj1[key], value);
  });
  return diff;
};

export {
  genDiff,
  stateAdd,
  stateRemove,
  stateSame,
  stateChange,
  typeNode,
  typeLeaf,
};
