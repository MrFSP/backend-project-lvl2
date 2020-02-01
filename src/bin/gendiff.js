#!/usr/bin/env node

import { version, description } from '../../package.json';
import genDiff from '..';
import program from 'commander';

const printLineWith = (name) => console.log(`___________________________________${name}___________________________________`);

program
  .description(description)  
  .version(`gendiff version: ${version}`, '-V, --version', 'output the version number')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    printLineWith('gendiff');
    const result = genDiff(firstConfig, secondConfig);
    console.log(result);
    printLineWith('gendiff');
    return result;
  })
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
