import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';

import parseToObject from '../src/parser.js';
import { genDiff } from '../src/diff.js';
import getStylish from '../src/formaters/stylish.js';

let obj1 = {};
let obj2 = {};
let result = '';
let ast = {};

// по-моему какая-то дичь, а что за import.meta.dirname ?
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const parseFileToObject = (fixtureName) => parseToObject(getFixturePath(fixtureName));

test('Diff flat JSON files in stylish output', () => {
  obj1 = parseFileToObject('obj1.json');
  obj2 = parseFileToObject('obj2.json');

  result = readFileSync(getFixturePath('result_flat.stylish')).toString();
  ast = genDiff(obj1, obj2);
  expect(getStylish(ast)).toEqual(result);
});

test('Diff flat YAML files in stylish output', () => {
  obj1 = parseFileToObject('obj1.yaml');
  obj2 = parseFileToObject('obj2.yml');

  result = readFileSync(getFixturePath('result_flat.stylish')).toString();
  ast = genDiff(obj1, obj2);

  expect(getStylish(ast)).toEqual(result);
});

test('Diff nested JSON files in stylish output', () => {
  obj1 = parseFileToObject('file1.json');
  obj2 = parseFileToObject('file2.json');

  result = readFileSync(getFixturePath('result_nested.stylish')).toString();
  ast = genDiff(obj1, obj2);
  expect(getStylish(ast)).toEqual(result);
});

test('Diff nested YAML files in stylish output', () => {
  obj1 = parseFileToObject('file1.yaml');
  obj2 = parseFileToObject('file2.yml');

  result = readFileSync(getFixturePath('result_nested.stylish')).toString();
  ast = genDiff(obj1, obj2);
  expect(getStylish(ast)).toEqual(result);
});
