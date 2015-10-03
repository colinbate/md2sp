import pipeline from 'tuberia-core';
import { frontmatter } from '../tuberia-module-core';
import markdown from '../tuberia-module-markdown';
import toml from '../tuberia-module-toml';
import inlineCss from '../tuberia-module-inlinecss';
//import { metaweblogApi } from './tuberia-module-metaweblog';
//import { listen } from './tuberia-module-server';


export default function server() {
// return pipeline('Server'
//   listen(4000,
//     frontmatter(toml()),
//     markdown(),
//     inlineCss(),
//     metaweblogApi(),
//   )
// );
}