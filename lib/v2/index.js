import init from './md2sp-init';
//import makePost from './md2sp-post';
//import server from './md2sp-server';
//import generator from './md2sp-generator';
//import setup from './md2sp-setup';

init().run().catch(function (err) {
  console.log('ERROR:', err);
});

// let app = pipeline('App'
//   init,
//   if((x,c) => c.runMode === RunMode.Setup, setup)
//     .elseif((x,c) => c.runMode === RunMode.Generator, generator)
//     .elseif((x,c) => c.runMode === RunMode.Server, server)
//     .else(makePost())
// );

// app.run();
