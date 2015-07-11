import { pipeline, dump } from './tuberia';
import { parseArguments, frontmatter } from './tuberia-module-core';
import { readFiles, readConfig } from './tuberia-module-io';
import { markdown, toml } from './tuberia-module-parse';
import { inlineCss } from './tuberia-module-inlinecss';
import { metaweblogApi } from './tuberia-module-metaweblog';
import { listen } from './tuberia-module-server';
import { setupContext } from './md2sp-init';
import { setupContext } from './md2sp-init';


let init = pipeline('Init',
  parseArguments(),
  readConfig(toml()),
  setupContext(),
  dump()
);

init.run();

// let makePost = pipeline(
//   readFiles(),
//   frontmatter(toml()),
//   markdown(),
//   inlineCss(),
//   dump(),
//   metaweblogApi(),
//   if(x => x.meta.postid, saveResults()),
//   printResults()
// );

// let server = pipeline(
//   listen(4000,
//     frontmatter(toml()),
//     markdown(),
//     inlineCss(),
//     metaweblogApi(),
//   )
// );

// let generator = pipeline();
// let setup = pipeline();

// let app = pipeline('App'
//   init,
//   if((x,c) => c.runMode === RunMode.Setup, setup)
//     .elseif((x,c) => c.runMode === RunMode.Generator, generator)
//     .elseif((x,c) => c.runMode === RunMode.Server, server)
//     .else(makePost)
// );

// app.run();
