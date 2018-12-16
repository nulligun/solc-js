const baseURL = 'https://solc-bin.ethereum.org/bin';

const processList = require('./processList');
const remote = require('./remote');

module.exports = version2url;

function version2url(version) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await remote.getlist();
      let select = processList(data);
      const { all, releases } = select;
      if (version === 'latest') version = Object.keys(releases)[0];
      if (version === 'nightly') version = Object.keys(all)[0];
      var path = all[version];
      if (!path) return reject(new Error(`unknown version: ${version}`));
      resolve(`${baseURL}/${path}`);
    } catch (error) {
      reject(error);
    }
  });
}