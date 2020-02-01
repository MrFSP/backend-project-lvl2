import fs from 'fs';
import genDiff from '../src';

const expected = fs.readFileSync(`${__dirname}/fixtures/expected.txt`, 'utf-8');

test('json files difference', () => {
  const before = `${__dirname}/fixtures/before.json`;
  const after = `${__dirname}/fixtures/after.json`;
  expect(genDiff(before, after)).toBe(expected);
});
