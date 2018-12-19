///////////////////////////////////////////////////////////////
// var Compiler = require('./src/compiler/compiler')
// var CompilerInput = require('./src/compiler/compiler-input')
// module.exports = { Compiler, CompilerInput }
// => Provides:
//
//     {
//         InternalCallTree: InternalCallTree,
//         SolidityProxy: SolidityProxy,
//         localDecoder: localDecoder,
//         stateDecoder: stateDecoder,
//         CodeAnalysis: CodeAnalysis
//     }
// ///////////////////////////////////////////////////////////////

const remote = require('./lib/remote');
const pretest = require('./lib/pretest');
const api = require('./lib/solc-compiler');
const wrapper = require('./lib/solc-wrapper/wrapper');

// const CompilerImport = require('./lib/solc-wrapper/handle-imports.js');

module.exports = solcjs;

solcjs.versions = require('./lib/versions');
const version2url = require('./lib/version2url');
solcjs.version2url = version2url;
solcjs.ABI = require('./lib/versions');

function solcjs(version) {
  return new Promise(async (resolve, reject) => {

    if (typeof version !== 'string') {
      let select = await solcjs.versions();
      version = select.releases[0];
    }
    
    try {
      console.time('[fetch compiler]');
      let url = await version2url(version);
      let compilersource = await remote.getCompilersource(url);
      console.timeEnd('[fetch compiler]');

      console.time('[load compiler]');
      const solc = load(compilersource);
      console.timeEnd('[load compiler]');

      console.time('[wrap compiler]');
      let _compiler = wrapper(solc);
      _compiler.opts = { version, url };
      const solcjs = api(_compiler);
      solcjs.compile.version = { name: version, url };
      console.timeEnd('[wrap compiler]');

      try {
        // await pretest(solcjs, { version, url });
        resolve(solcjs.compile);
      } catch (err) {
        console.error(err);
        if (err) return reject(new Error('this version of solc is incompatible with your browser'));
      }
    } catch (error) {
      reject(error);
    }
  });

  // var zelf = instantiate()
  // var REMIX_SOLIDITY = new Compiler(_compiler, (url, cb) => zelf.importFileCb(url, cb))
  // console.log('REMIX_SOLIDITY', REMIX_SOLIDITY)
}

// HELPER
function load (sourcecode) {
  var script = window.document.createElement('script');
  if ('Module' in window) {
    var oldModule = window.Module;
    var exists = true;
  } else window.Module = {};
  script.text = `window.Module=((Module)=>{${sourcecode};return Module})()`;
  window.document.head.appendChild(script);
  window.document.head.removeChild(script);
  const compiler = window.Module;
  if (exists) window.Module = oldModule;
  else delete window.Module;
  return compiler;
}