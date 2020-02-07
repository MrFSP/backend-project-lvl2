import fs from 'fs';
import genDiff from '../src';

const extensions = ['json', 'yaml', 'ini'];
const typeOfCall = [
  { formatOption: 'simple', changesOption: null, fileName: 'expected.simple.txt' },
  { formatOption: 'plain', changesOption: 'differ', fileName: 'expected.plain.txt' },
  { formatOption: 'plain', changesOption: 'complete', fileName: 'expected.plain.complete.txt' },
  { formatOption: 'plain', changesOption: 'added', fileName: 'expected.plain.added.txt' },
  { formatOption: 'plain', changesOption: 'deleted', fileName: 'expected.plain.deleted.txt' },
  { formatOption: 'plain', changesOption: 'common', fileName: 'expected.plain.common.txt' },
  { formatOption: 'json', changesOption: 'common', fileName: 'expected.json.txt' },
];

const types = extensions.reduce((extAcc, extension) => {
  const newItem = typeOfCall.reduce((typeAcc, type) => [...typeAcc, { extension, type }], []);
  return [...extAcc, ...newItem];
}, []);

test.each(types)(
  '%#  %j',
  (iter) => {
    const { extension, type } = iter;
    const { formatOption, changesOption, fileName } = type;
    const before = `${__dirname}/fixtures/before.${extension}`;
    const after = `${__dirname}/fixtures/after.${extension}`;
    const expected = fs.readFileSync(`${__dirname}/fixtures/${fileName}`, 'utf-8');
    expect(genDiff(before, after, formatOption, changesOption)).toBe(expected);
  },
);
