import fs from 'fs';
import path from 'path';
import parse from './parsers';
import prepareData from './process';
import getFormatter from './formatters';

const getFormat = (pathToFile) => path.extname(pathToFile);
const getRaw = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

export default (firstConfig, secondConfig, format) => {
  const [format1, raw1] = [getFormat(firstConfig), getRaw(firstConfig)];
  const [format2, raw2] = [getFormat(secondConfig), getRaw(secondConfig)];
  const data1 = parse(format1, raw1);
  const data2 = parse(format2, raw2);
  const difference = prepareData(data1, data2);
  const render = getFormatter(format);
  return render(difference);
};
