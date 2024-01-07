import parseToObject from './parser.js';
import * as diff from './diff.js';

export default (filepath1, filepath2) => {
  const result = diff.genDiff(parseToObject(filepath1), parseToObject(filepath2));
  console.log('{');
  result.forEach(([state, [key, value]]) => {
    switch (state) {
      case diff.stateAdd:
        console.log(`  + ${key}: ${value}`);
        break;
      case diff.stateRemove:
        console.log(`  - ${key}: ${value}`);
        break;
      case diff.stateChange:
        console.log(`  - ${key}: ${value[0]}`);
        console.log(`  + ${key}: ${value[1]}`);
        break;
      default:
        console.log(`    ${key}: ${value}`);
    }
  });
  console.log('}');
};
