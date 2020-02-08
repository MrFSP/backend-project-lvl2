import fs from 'fs';
import genDiff from '../src';

const extensions = ['json', 'yaml', 'ini'];
const typeOfCall = [
  { formatOption: 'simple', changesOption: null, fileName: 'expected.simple.txt' },
  { formatOption: 'plain', changesOption: 'complete', fileName: 'expected.plain.complete.txt' },
  { formatOption: 'json', changesOption: null, fileName: 'expected.json.txt' },
];

const types = extensions.flatMap((extension) => {
  const newItem = typeOfCall.flatMap((type) => ({ extension, type }));
  return newItem;
});

test.each(types)(
  '%#  %j',
  (iter) => {
    const { extension, type } = iter;
    const { formatOption, changesOption, fileName } = type;
    const before = `${__dirname}/__fixtures__/before.${extension}`;
    const after = `${__dirname}/__fixtures__/after.${extension}`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/${fileName}`, 'utf-8');
    expect(genDiff(before, after, formatOption, changesOption)).toBe(expected);
  },
);
