import pipeline from '../tuberia';
import { parseArguments } from '../tuberia-module-console';
import { readConfig } from '../tuberia-module-io';
import toml from '../tuberia-module-toml';
import dump from '../tuberia-module-dump';
import setupContext from './setup-context';

export default function init() {
  return pipeline('Init',
    parseArguments(),
    readConfig('config.toml', toml()).optional(),
    setupContext(),
    dump()
  );
}