const ajax = require('./ajax-cache');
const baseURL = 'https://solc-bin.ethereum.org/bin';

module.exports = {
  getlist, getCompilersource
};

async function getlist() {
  try {
    const opts = {
      url: `${baseURL}/list.json`,
      cache: true,
      // transform: processList
    };
    return await promiseAjax(opts);
  } catch (error) {
    throw error;
  }
}

async function getCompilersource(compilerURL) {
  try {
    const opts = { url: compilerURL, cache: true };
    return await promiseAjax(opts);
  } catch (error) {
    throw error;
  }
}

function promiseAjax(opts) {
  return new Promise(function (resolve, reject) {
    try {
      ajax(opts, (error, data) => {
        if (error) return reject(error);
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}