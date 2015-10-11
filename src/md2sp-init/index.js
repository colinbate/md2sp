import pipeline from 'tuberia-core';
import {args} from 'tuberia-commandline-module';
import readConfig from '../tuberia-module-config';
import toml from 'tuberia-toml-module';
import setupContext from './setup-context';

let configureArguments = function (yargs) {
  yargs.demand(1, 'You need to provide a file to post.');
};

export default function init() {
  return pipeline('Init',
    args(configureArguments),
    readConfig('md2sp.toml', toml()).optional(),
    setupContext()
  );
}