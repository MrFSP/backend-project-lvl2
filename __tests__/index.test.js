import fs from 'fs';
import genDiff from '../src';
import { getFilteredData } from '../src/formatters/plain';

const extensions = ['.json', '.yaml', '.ini'];
const typeOfCall = [
  { formatOption: 'simple', changesOption: null, fileName: 'expected.simple.txt' },
  { formatOption: 'plain', changesOption: null, fileName: 'expected.plain.txt' },
  { formatOption: 'plain', changesOption: 'differ', fileName: 'expected.plain.txt' },
  { formatOption: 'plain', changesOption: 'added', fileName: 'expected.plain.txt' },
  { formatOption: 'plain', changesOption: 'deleted', fileName: 'expected.plain.txt' },
  { formatOption: 'plain', changesOption: 'common', fileName: 'expected.plain.txt' },
  { formatOption: 'json', changesOption: null, fileName: 'expected.json.txt' },
];

const types = extensions.flatMap((extension) => typeOfCall
  .flatMap((type) => ({ extension, type })));

test.each(types)(
  '%#  %j',
  (iter) => {
    const { extension, type } = iter;
    const { formatOption, changesOption, fileName } = type;
    const getPathToFile = (name, _extension = '') => `${__dirname}/__fixtures__/${name}${_extension}`;
    const getExpectedData = (_fileName, option) => {
      const data = fs.readFileSync(getPathToFile(_fileName), 'utf-8');
      return option === null ? data : getFilteredData(data, option);
    };
    const before = getPathToFile('before', extension);
    const after = getPathToFile('after', extension);
    const expected = getExpectedData(fileName, changesOption);
    expect(genDiff(before, after, formatOption, changesOption)).toBe(expected);
  },
);
