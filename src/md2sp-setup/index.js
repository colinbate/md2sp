import pipeline from '../tuberia';
import dump from '../tuberia-module-dump';

let checkAccess = pipeline('Check Access',
  //resolveUrl(),
  //metaweblogGetUsersBlogs()
);

export default function setup() {
// readConfig('md2sp.toml', toml()).optional(),
// where((d,c) => c.config.url), print('There is already a blog here!')),
// yesNo('Do you want to setup a blog here?').key('setupHere')
// stop('Quitting').when(d => !d.meta.setupHere)
// yesNo('Is it a sharepoint blog?').key('isSharepoint'),
// askString(d => d.meta.isSharepoint ? 'Enter blog URL:' : 'Enter metaweblog endpoint:').key('url'),
// normalizeUrl(),
// askString('Username:'),
// askPassword('Password:'),
// askString('Stylesheet (blank for none):').key('cssFile'),
// askString('Enter cert file (blank for none):').key('cert'),
// yesNo('Save password to config file (will be plain text)').key('savePwd'),
// // Setup Context (Set no NTLM, load cert, etc)
// setupContext(false), // no NTLM
// checkAccess(),
// where(d => !d.meta.blogName, setupContext(true), checkAccess()),
// stop('Could not fetch blog information.').when(d => !d.meta.blogName),
// writeConfig('md2sp.toml', removeSensitiveInfo(), toml.generate())
}