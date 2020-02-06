import fs from 'fs';
import genDiff from '../src';

const formats = [['json'], ['yaml'], ['ini']];

test.each(formats)(
  '%p',
  (extension) => {
    const before = `${__dirname}/fixtures/before.${extension}`;
    const after = `${__dirname}/fixtures/after.${extension}`;
    const expectedSimple = fs.readFileSync(`${__dirname}/fixtures/expected.simple.txt`, 'utf-8');
    expect(genDiff(before, after, 'simple')).toBe(expectedSimple);
    const expectedPlain = fs.readFileSync(`${__dirname}/fixtures/expected.plain.txt`, 'utf-8');
    expect(genDiff(before, after, 'plain', 'complete')).toBe(expectedPlain);
    const expectedPlainDiff = fs.readFileSync(`${__dirname}/fixtures/expected.plain.diff.txt`, 'utf-8');
    expect(genDiff(before, after, 'plain', 'diff')).toBe(expectedPlainDiff);
    const expectedPlainCommon = fs.readFileSync(`${__dirname}/fixtures/expected.plain.common.txt`, 'utf-8');
    expect(genDiff(before, after, 'plain', 'common')).toBe(expectedPlainCommon);
    const expectedJson = fs.readFileSync(`${__dirname}/fixtures/expected.json.txt`, 'utf-8');
    expect(genDiff(before, after, 'json')).toBe(expectedJson);
  },
);
