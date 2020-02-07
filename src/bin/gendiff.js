#!/usr/bin/env node

import program from 'commander';
import { version, description } from '../../package.json';
import genDiff from '..';
import printLine from './printline';

program
  .description(description)
  .version(`gendiff version: ${version}`, '-v, --version', 'output the version number')
  .option('-f, --format [type]',
    'Choose output format.\n\t\t        Types: simple, plain, json.\n\t\t       ', 'simple')
  .option('-c, --diff [changes]',
    ('Additional flag for plain format to display differences or commons.\n\t\t        Changes: differ, complete, common, added, deleted.\n\t\t       '),
    'differ')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, option) => {
    const result = genDiff(firstConfig, secondConfig, option.format, option.diff);
    console.log(printLine('gendiff', result));
    console.log(result);
    console.log(printLine('gendiff', result));
    return result;
  })
  .parse(process.argv);
