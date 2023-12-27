import _ from 'lodash';

export default (obj1, obj2) => {
  const src = Object.entries(obj1);
  const dst = Object.entries(obj2);
  src.sort();
  dst.sort();
  return `${src[0]}\n${dst[0]}`;
};
