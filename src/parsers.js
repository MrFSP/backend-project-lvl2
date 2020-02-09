import fs from 'fs';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';

const getFormat = (pathToFile) => path.extname(pathToFile);

const getData = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const parse = (data, format) => {
  switch (format) {
    case '.json': {
      return JSON.parse(data);
    }
    case '.yaml': {
      return yaml.safeLoad(data);
    }
    default: {
      return ini.parse(data);
    }
  }
};

export default (pathToFile) => {
  const format = getFormat(pathToFile);
  const data = getData(pathToFile);
  return parse(data, format);
};
