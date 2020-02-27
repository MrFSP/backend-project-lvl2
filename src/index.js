import fs from 'fs';
import path from 'path';
import parse from './parsers';
import compareData from './comparison';
import getFormatter from './formatters';

const getExtension = (pathToFile) => path.extname(pathToFile);
const getData = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

export default (firstConfig, secondConfig, format) => {
  try {
    const extension1 = getExtension(firstConfig);
    const extension2 = getExtension(secondConfig);
    const data1 = getData(firstConfig);
    const data2 = getData(secondConfig);
    const parsedData1 = parse(extension1, data1);
    const parsedData2 = parse(extension2, data2);
    const comparedData = compareData(parsedData1, parsedData2);
    const renderer = getFormatter(format);
    return renderer(comparedData);
  } catch (error) {
    return console.log(error);
  }
};
