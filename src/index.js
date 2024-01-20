import parseToObject from './parser.js';
import * as diff from './diff.js';

const printStylish = (ast) => {
  console.log('{');
  ast.forEach((node) => {
    switch (node.state) {
      case diff.stateAdd:
        console.log(`  + ${node.name}: ${node.data.value}`);
        break;
      case diff.stateRemove:
        console.log(`  - ${node.name}: ${node.data.value}`);
        break;
      case diff.stateChanged:
        console.log(`  - ${node.name}: ${node.oldData.value}`);
        console.log(`  + ${node.name}: ${node.newData.value}`);
        break;
      default:
        console.log(`    ${node.name}: ${node.data.value}`);
    }
  });
  console.log('}');
};

export default (filepath1, filepath2) => {
  const result = diff.genDiff(parseToObject(filepath1), parseToObject(filepath2));
  console.log(JSON.stringify(result, null, 2));
  // printStylish(result);
};
