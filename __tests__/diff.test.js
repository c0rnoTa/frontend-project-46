import { fileURLToPath } from 'url';
import path from 'path';

import parseToObject from '../src/parser.js';
import * as diff from '../src/diff.js';

// по-моему какая-то дичь, а что за import.meta.dirname ?
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let obj1 = {};
let obj2 = {};

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const parseFileToObject = (fixtureName) => parseToObject(getFixturePath(fixtureName));

test('JSON diiff', () => {
  // Чтение объектов, а не сами объекты - это нормально?
  obj1 = parseFileToObject('obj1.json');
  obj2 = parseFileToObject('obj2.json');

  expect(diff.genDiff(obj1, obj2)).toEqual(
    [
      {
        state: diff.stateRemove,
        name: 'follow',
        data: {
          type: diff.typeLeaf,
          value: false,
        },
      },
      {
        state: diff.stateSame,
        name: 'host',
        data: {
          type: diff.typeLeaf,
          value: 'hexlet.io',
        },
      },
      {
        state: diff.stateChange,
        name: 'timeout',
        oldData: {
          type: diff.typeLeaf,
          value: 50,
        },
        newData: {
          type: diff.typeLeaf,
          value: 20,
        },
      },
      {
        state: diff.stateAdd,
        name: 'verbose',
        data: {
          type: diff.typeLeaf,
          value: true,
        },
      },
    ],
  );
});

test('YAML diiff', () => {
  // Чтение объектов, а не сами объекты - это нормально?
  obj1 = parseFileToObject('obj1.yaml');
  obj2 = parseFileToObject('obj2.yml');

  expect(diff.genDiff(obj1, obj2)).toEqual(
    [
      {
        state: diff.stateRemove,
        name: 'follow',
        data: {
          type: diff.typeLeaf,
          value: false,
        },
      },
      {
        state: diff.stateSame,
        name: 'host',
        data: {
          type: diff.typeLeaf,
          value: 'hexlet.io',
        },
      },
      {
        state: diff.stateChange,
        name: 'timeout',
        oldData: {
          type: diff.typeLeaf,
          value: 50,
        },
        newData: {
          type: diff.typeLeaf,
          value: 20,
        },
      },
      {
        state: diff.stateAdd,
        name: 'verbose',
        data: {
          type: diff.typeLeaf,
          value: true,
        },
      },
    ],
  );
});
