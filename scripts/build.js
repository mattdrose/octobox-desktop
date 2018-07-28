const nativefier = require('nativefier').default;
const zip = require('./zip');
const version = require('../package.json').version;

const options = {
  name: 'Octobox',
  appVersion: version,
  targetUrl: 'https://octobox.io',
  platform: 'osx',
  arch: 'x64',
  icon: './icon.png',
  counter: true,
  out: './build',
};

nativefier(options, (error, appPath) => {
  if (error) { throw error; }

  console.log(`App has been built to ${appPath}`);

  zip(appPath, `build/shopify-octobox-${version}.zip`)
    .catch((err) => { throw err; });
});
