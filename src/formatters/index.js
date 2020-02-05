import renderSimple from './simple';
import renderPlain from './plain';
import renderJson from './json';

const format = {
  simple: renderSimple,
  plain: renderPlain,
  json: renderJson,
};

export default (option) => format[option];
