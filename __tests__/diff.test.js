import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';

import getDiff from '../src/index.js';

// по-моему какая-то дичь, а что за import.meta.dirname ?
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('Diff flat JSON files in stylish output', () => {
  const result = readFileSync(getFixturePath('result_flat.stylish')).toString();
  expect(getDiff(getFixturePath('obj1.json'), getFixturePath('obj2.json'), 'stylish')).toEqual(result);
});

test('Diff flat YAML files in stylish output', () => {
  const result = readFileSync(getFixturePath('result_flat.stylish')).toString();
  expect(getDiff(getFixturePath('obj1.yaml'), getFixturePath('obj2.yml'), 'stylish')).toEqual(result);
});

test('Diff nested JSON files in stylish output', () => {
  const result = readFileSync(getFixturePath('result_nested.stylish')).toString();
  expect(getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(result);
});

test('Diff nested YAML files in stylish output', () => {
  const result = readFileSync(getFixturePath('result_nested.stylish')).toString();
  expect(getDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'stylish')).toEqual(result);
});

test('Diff nested files in plain output', () => {
  const result = readFileSync(getFixturePath('result_nested.plain')).toString();
  expect(getDiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'), 'plain')).toEqual(result);
});

test('Diff nested files in JSON output', () => {
  const result = readFileSync(getFixturePath('result_nested.json')).toString();
  const targetObject = JSON.parse(result);
  const sourceObject = JSON.parse(getDiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'), 'json'));

  expect(sourceObject).toMatchObject(targetObject);
});
