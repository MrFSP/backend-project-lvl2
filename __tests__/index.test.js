import fs from 'fs';
import genDiff from '../src';

const expected = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf-8');

test('json files difference', () => {
  const before = `${__dirname}/__fixtures__/before.json`;
  const after = `${__dirname}/__fixtures__/after.json`;
  expect(genDiff(before, after)).toBe(expected);
});
