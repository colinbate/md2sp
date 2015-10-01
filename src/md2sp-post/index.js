import pipeline from 'tuberia-core';
import dump from '../tuberia-module-dump';
import { frontmatter } from '../tuberia-module-core';
import { readFiles } from '../tuberia-module-io';
import markdown from '../tuberia-module-markdown';
import toml from '../tuberia-module-toml';
import groupMeta from '../tuberia-module-groupmeta';
import inlineCss from '../tuberia-module-inlinecss';
import metaweblogPost from '../tuberia-module-metaweblog';
import adaptDate from '../md2sp-module-adaptdate';
import where from '../tuberia-module-where';
import saveResults from './save-results';
import printResults from './print-results';

let getFrontmatter = frontmatter('+++', toml(), groupMeta('post'));

export default function makePost() {
  return pipeline('Make Post',
    readFiles((d,c) => c.config._[0]),
    getFrontmatter,
    markdown(),
    inlineCss((d,c) => d.meta.cssFile || c.config.cssFile),
    adaptDate(),
    //metaweblogPost(),
    where(x => x.meta.isNew, saveResults(getFrontmatter, toml.generate('+++'))),
    printResults()
  );
}