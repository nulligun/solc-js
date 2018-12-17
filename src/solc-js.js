// //////////////////////////////////////////////////////////////////
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
// //////////////////////////////////////////////////////////////////
const remote = require('./lib/remote');
const pretest = require('./lib/pretest');
const api = require('./lib/solc-compiler');
const wrapper = require('./lib/solc-wrapper/wrapper');

// const solcABI = require('./lib/solc-wrapper/abi-patcher.js');
// const CompilerImport = require('./lib/solc-wrapper/handle-imports.js');

module.exports = solcjs;

solcjs.versions = require('./lib/versions');

const version2url = require('./lib/version2url');
solcjs.version2url = version2url;

function solcjs(version) {
  return new Promise(async (resolve, reject) => {
    // TODO: if version is empty, fetch latest version.
    if (typeof version !== 'string') return reject(new Error('`version` must be string'));
    
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
        await pretest(solcjs, { version, url });
        resolve(solcjs.compile);
      } catch (err) {
        console.error(err);
        if (err) return reject(new Error('this version of solc is incompatible with your browser'));
      }

      /*
      function start(v, url) {
        // ----------------------------------------------------
        // try {
        //   // @NOTE: compiling a simple contract dummy seems to
        //   // warm up the compiler, so that it compiles faster later on
        //   // @TODO: also it somehow throws the first time ?!?
        //   var content = 'contract x { function g() public {} }'
        //   solcjs.compile(content)
        // } catch (e) {
        //   // console.error('wtf - first compile?!?', e)
        // }
        // console.timeEnd('load compiler')
        // // console.log(Object.keys(solc).length)
        // ----------------------------------------------------
        const source = 'contract x { function g() public {} }';
        // @NOTE: compiling a simple contract dummy seems to
        // warm up the compiler, so that it compiles faster later on
        solcjs.compile({ version: v, url }, source, (err, data) => {
          if (err) return done(new Error('this version of solc is incompatible with your browser'));
          // console.log(Object.keys(solc).length)
          // ----------------------------------------------------
          done(null, (s, ...args) => {
            if (typeof s === 'string') {
              s = [s];
              args = [];
            }
            const source = args.map((a, i) => s[i] + a).join('') + s[s.length - 1];
            var x, done, listener = [];
            // ----------------------------------------------------
            // var data = solcjs.compile(source)
            // var err = data.errors.length === 1 ? data.errors[0] : void 0
            // if (catcher && err) catcher(data.errors[0])
            // else if (thener) thener(data)
            // listener.forEach(done => done(err, data))
            // listener = []
            // x = [err, data]
            // ----------------------------------------------------
            solcjs.compile({ version: v, url }, source, (err, data) => {
              console.log('CONTRACTS', source);
              // @TODO: trigger error listener
              if (err) console.log('ERROR', err);
              else console.log('OUTPUT', data);
              if (err && done) done[0](err);
              else if (done) done[1](data);
              listener.forEach(done => done(err, data));
              listener = [];
              x = [err, data];
            });
            // ----------------------------------------------------
            const output = done => (x && done(...x) || listener.push(done));
            output.then = (ok, ko) => x ? x[0] && ko(x[0]) || ok(x[1]) : (done = [ko, ok]);
            return output;
          });
        });
      }
      */




      
    
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