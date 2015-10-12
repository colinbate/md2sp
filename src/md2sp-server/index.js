import pipeline from 'tuberia-core';
import { frontmatter } from 'tuberia-metadata-module';
import markdown from 'tuberia-markdown-module';
import toml from 'tuberia-toml-module';
import inlineCss from 'tuberia-inlinecss-module';
//import { metaweblogApi } from 'tuberia-metaweblog-module';
//import { listen } from 'tuberia-server-module';


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