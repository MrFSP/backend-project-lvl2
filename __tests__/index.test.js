import fs from 'fs';
import genDiff from '../src';

const formats = [['json'], ['yml'], ['ini']];

test.each(formats)(
  '%p',
  (extension) => {
    const before = `${__dirname}/fixtures/before.${extension}`;
    const after = `${__dirname}/fixtures/after.${extension}`;
    const expected = fs.readFileSync(`${__dirname}/fixtures/expected.txt`, 'utf-8');
    expect(genDiff(before, after)).toBe(expected);
  },
);
