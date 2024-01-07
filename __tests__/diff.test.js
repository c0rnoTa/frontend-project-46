import * as diff from '../src/diff.js';

beforeEach(() => {
  const obj1 = {
    host: 'hexlet.io',
    // timeout: 50,
    // proxy: '123.234.53.22',
    // follow: false,
  };

  const obj2 = {
    // timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
});

test('Same', () => {
  expect(diff.genDiff(obj1, obj2).toEqual('bla'));
});
