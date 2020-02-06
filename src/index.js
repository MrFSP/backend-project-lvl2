import parse from './parsers';
import { getDifference } from './getdifference';
import formatter from './formatters';

export default (firstConfig, secondConfig, formatOpt, plainOpt) => {
  const data1 = parse(firstConfig);
  const data2 = parse(secondConfig);
  const difference = getDifference(data1, data2);
  const render = formatter(formatOpt);
  return render(difference, plainOpt);
};
