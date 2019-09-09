import pipeline from 'tuberia-core';
import { frontmatter } from 'tuberia-metadata-module';
import { readFiles } from 'tuberia-io-module';
import markdown from 'tuberia-markdown-module';
import toml from 'tuberia-toml-module';
import {groupMeta} from 'tuberia-metadata-module';
import inlineCss from 'tuberia-inlinecss-module';
import * as metaweblog from 'tuberia-metaweblog-module';
import adaptDate from '../md2sp-module-adaptdate';
import {where} from 'tuberia-flowcontrol-module';
import saveResults from './save-results';
import printResults from './print-results';
import dump from 'tuberia-debug-module';

let getFrontmatter = frontmatter('+++', toml(), groupMeta('post'));

export default function makePost() {
  return pipeline('Make Post',
    readFiles((d,c) => c.argv._[0]),
    getFrontmatter,
    markdown().highlight(),
    inlineCss((d,c) => d.meta.cssFile || c.config.cssFile),
    adaptDate(),
    dump(),
    //metaweblog.post(),
    where(x => x.meta.isNew, saveResults(getFrontmatter, toml.generate('+++'))),
    printResults()
  );
}