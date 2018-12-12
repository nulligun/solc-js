const remote = require('./remote');
const processList = require('./processList');
module.exports = versions;

function removeAllZeroPointFiveVersion(select) {
  select.nightly = select.nightly.filter(x => !~x.indexOf('v0.5.'));
  select.all = select.all.filter(x => !~x.indexOf('v0.5.'));
  select.releases = select.releases.filter(x => !~x.indexOf('v0.5.'));
}

function groupByVersion(data) {
  const { releases, nightly, all } = data;
  let select = {};
  select.nightly = Object.keys(nightly).reverse();
  select.all = Object.keys(all).reverse();
  select.releases = Object.keys(releases).reverse();
  // @TODO: remove it soon...
  removeAllZeroPointFiveVersion(select);
  return select;
}

function versions() {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await remote.getlist();
      let select = groupByVersion(processList(data));
      resolve(select);
    } catch (error) {
      reject(error);
    }
  });
}