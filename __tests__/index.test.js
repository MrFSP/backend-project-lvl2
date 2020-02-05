import fs from 'fs';
import genDiff from '../src';

const formats = [['json'], ['yml'], ['ini']];

test.each(formats)(
  '%p',
  (extension) => {
    const before = `${__dirname}/fixtures/before.${extension}`;
    const after = `${__dirname}/fixtures/after.${extension}`;
    const expectedSimple = fs.readFileSync(`${__dirname}/fixtures/expected.simple.txt`, 'utf-8');
    expect(genDiff(before, after, 'simple')).toBe(expectedSimple);
    const expectedPlain = fs.readFileSync(`${__dirname}/fixtures/expected.plain.txt`, 'utf-8');
    expect(genDiff(before, after, 'plain')).toBe(expectedPlain);
  },
);
