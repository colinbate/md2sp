import init from './md2sp-init';
import makePost from './md2sp-post';
//import server from './md2sp-server';
//import generator from './md2sp-generator';
//import setup from './md2sp-setup';
//import { RunMode } from './md2sp-common';
import pipeline from './tuberia';

let app = pipeline('App',
  init(),
  makePost()
);
let debug = false;
app.run({}, {debug}).catch(function (err) {
  console.log('ERROR:', err);
});

// let app = pipeline('App'
//   init(),
//   where((x,c) => c.runMode === RunMode.setup, setup())
//     .otherwise((x,c) => c.runMode === RunMode.generator, generator())
//     .otherwise((x,c) => c.runMode === RunMode.server, server())
//     .otherwise(makePost())
// );

// app.run();