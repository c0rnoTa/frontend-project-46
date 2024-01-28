#!/usr/bin/env node

import { program } from 'commander';
import parser from '../index.js';

program
  .name('gendiff')
  .version('', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f --format <type>', 'output format: stylish, plain, json', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(parser(filepath1, filepath2, options?.format));
  });

program.parse();
