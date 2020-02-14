import fs from 'fs';
import genDiff from '../src';

const extensions = ['.json', '.yaml', '.ini'];

const typeOfCall = [
  { format: 'simple', fileName: 'expected.simple' },
  { format: 'plain', fileName: 'expected.plain' },
  { format: 'json', fileName: 'expected.json' },
];

const types = extensions.flatMap((extension) => typeOfCall
  .flatMap((type) => ({ extension, type })));

test.each(types)(
  '%#  %j',
  (iter) => {
    const { extension, type } = iter;
    const { format, fileName } = type;
    const getPathToFile = (name, _extension = '') => `${__dirname}/__fixtures__/${name}${_extension}`;
    const pathToBefore = getPathToFile('before', extension);
    const pathToAfter = getPathToFile('after', extension);
    const pathToExpected = getPathToFile(fileName, '.txt');
    const expectedData = fs.readFileSync(pathToExpected, 'utf-8');
    expect(genDiff(pathToBefore, pathToAfter, format)).toBe(expectedData);
  },
);
