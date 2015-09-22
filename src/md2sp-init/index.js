import pipeline from '../tuberia';
import { parseArguments } from '../tuberia-module-console';
import readConfig from '../tuberia-module-config';
import toml from '../tuberia-module-toml';
import dump from '../tuberia-module-dump';
import setupContext from './setup-context';

let configureArguments = function (yargs) {
  yargs.demand(1, 'You need to provide a file to post.');
};

export default function init() {
  return pipeline('Init',
    parseArguments(configureArguments),
    readConfig('md2sp.toml', toml()).optional(),
    setupContext()
  );
}