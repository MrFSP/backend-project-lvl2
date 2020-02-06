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
    expect(genDiff(before, after, 'plain', 'differ')).toBe(expectedPlain);
    const expectedPlainComplete = fs.readFileSync(`${__dirname}/fixtures/expected.plain.complete.txt`, 'utf-8');
    expect(genDiff(before, after, 'plain', 'complete')).toBe(expectedPlainComplete);
    const expectedPlainAdded = fs.readFileSync(`${__dirname}/fixtures/expected.plain.added.txt`, 'utf-8');
    expect(genDiff(before, after, 'plain', 'added')).toBe(expectedPlainAdded);
    const expectedPlainDeleted = fs.readFileSync(`${__dirname}/fixtures/expected.plain.deleted.txt`, 'utf-8');
    expect(genDiff(before, after, 'plain', 'deleted')).toBe(expectedPlainDeleted);
    const expectedPlainCommon = fs.readFileSync(`${__dirname}/fixtures/expected.plain.common.txt`, 'utf-8');
    expect(genDiff(before, after, 'plain', 'common')).toBe(expectedPlainCommon);
    const expectedJson = fs.readFileSync(`${__dirname}/fixtures/expected.json.txt`, 'utf-8');
    expect(genDiff(before, after, 'json')).toBe(expectedJson);
  },
);
