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

test('JSON diff', () => {
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
        state: diff.stateUnchanged,
        name: 'host',
        data: {
          type: diff.typeLeaf,
          value: 'hexlet.io',
        },
      },
      {
        state: diff.stateChanged,
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

test('YAML diff', () => {
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
        state: diff.stateUnchanged,
        name: 'host',
        data: {
          type: diff.typeLeaf,
          value: 'hexlet.io',
        },
      },
      {
        state: diff.stateChanged,
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

test('Simple recursion diff', () => {
  // Чтение объектов, а не сами объекты - это нормально?
  obj1 = parseFileToObject('obj2.json');
  obj2 = parseFileToObject('rec2.json');

  expect(diff.genDiff(obj1, obj2)).toEqual(
    [
      {
        state: diff.stateAdd,
        name: 'complexKey',
        data: {
          type: diff.typeNested,
          value: [
            {
              state: diff.stateUnchanged,
              name: 'doo',
              data: {
                type: diff.typeNested,
                value: [
                  {
                    state: diff.stateUnchanged,
                    name: 'id',
                    data: {
                      type: diff.typeLeaf,
                      value: 2,
                    },
                  },
                ],
              },
            },
            {
              state: diff.stateUnchanged,
              name: 'foo',
              data: {
                type: diff.typeLeaf,
                value: 'bar',
              },
            },
          ],
        },
      },
      {
        state: diff.stateUnchanged,
        name: 'host',
        data: {
          type: diff.typeLeaf,
          value: 'hexlet.io',
        },
      },
      {
        state: diff.stateUnchanged,
        name: 'timeout',
        data: {
          type: diff.typeLeaf,
          value: 20,
        },
      },
      {
        state: diff.stateUnchanged,
        name: 'verbose',
        data: {
          type: diff.typeLeaf,
          value: true,
        },
      },
    ],
  );
});
