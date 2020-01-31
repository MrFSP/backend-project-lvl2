#!/usr/bin/env node

import { version, description } from '../../package.json';
const program = require('commander');

const printLineWith = (name) => console.log(`___________________________________${name}___________________________________`);

program
  .description(description)  
  .version(`gendiff version: ${version}`, '-V, --version', 'output the version number')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    printLineWith('gendiff');
    console.log(firstConfig + secondConfig);
    printLineWith('gendiff');
  })
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
