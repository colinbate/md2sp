import pipeline from '../tuberia';
import dump from '../tuberia-module-dump';
import { frontmatter } from '../tuberia-module-core';
import { readFiles } from '../tuberia-module-io';
//import markdown from '../tuberia-module-markdown';
import toml from '../tuberia-module-toml';
//import { inlineCss } from './tuberia-module-inlinecss';
//import { metaweblogApi } from './tuberia-module-metaweblog';
//import { listen } from './tuberia-module-server';

export default function makePost() {
  return pipeline('Make Post',
    readFiles((d,c) => c.config._[0]),
    frontmatter('+++', dump({noContext: true}), toml(), dump({noContext: true})),
//   markdown(),
//   inlineCss(),
    dump()
//   metaweblogApi(),
//   if(x => x.meta.postid, saveResults(toml.generate())),
//   printResults()
  );
}