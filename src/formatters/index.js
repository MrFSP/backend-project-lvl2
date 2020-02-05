import renderSimple from './simple';
import renderPlain from './plain';

const format = {
  simple: renderSimple,
  plain: renderPlain,
};

export default (option) => format[option];
