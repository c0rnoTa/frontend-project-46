/* eslint-disable no-underscore-dangle, import/no-extraneous-dependencies */

import { fileURLToPath } from 'url';
import * as path from 'path';

import parseToObject from '../src/parser.js';
import * as diff from '../src/diff.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let obj1 = {};
let obj2 = {};

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

beforeEach(() => {
  obj1 = parseToObject(getFixturePath('obj1.json'));
  obj2 = parseToObject(getFixturePath('obj2.json'));
});

test('Same', () => {
  expect(diff.genDiff(obj1, obj2)).toEqual(
    [
      [diff.stateRemove, ['follow', false]],
      [diff.stateSame, ['host', 'hexlet.io']],
      [diff.stateChange, ['timeout', [50, 20]]],
      [diff.stateAdd, ['verbose', true]],
    ],
  );
});
