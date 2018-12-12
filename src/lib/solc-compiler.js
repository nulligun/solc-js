const format = require('./solc-wrapper/format.js');

module.exports = compiler;

function compiler(_compiler) {
  const newCompiler = {};
  Object.keys(_compiler).forEach(key => {
    // console.log('key:', key);
    
    if (key === 'compile') {
      // @TODO: allow to pass FILE_PATH instead of SOURCE_CODE
      newCompiler.compile = function (version, sourcecode = '') {
        // console.error(`[on:compile:start] solc.compile(sourcecode)`)
        return new Promise(function (resolve, reject) {
          var data = _compiler.compile(sourcecode, 1);

          compileLog(data);

          if (!Object.keys(data.contracts).length) {
            var err = data.errors[0];
            if (typeof err === 'string') err = getStandardError(err);
            return reject(err);
            // return resolve(err);
          }
          var output = format(version, data);
          resolve(output);
        });
      };
    }
    else if (typeof _compiler[key] === 'function') {
      newCompiler[key] = function (...args) {
        console.error(`compiler.${key}(...args)`, args);
        return _compiler[key].apply(_compiler, args);
      };
    } else {
      Object.defineProperty(newCompiler, key, {
        get() {
          var currentValue = _compiler[key];
          console.error(`compiler.${key} === `, currentValue);
          return currentValue;
        },
        set(newValue) {
          console.error(`compiler.${key} = `, newValue);
          return _compiler[key] = newValue;
        },
        enumerable: true,
        configurable: true
      });
    }
  });
  // console.log('newCompiler:\n', newCompiler);
  return newCompiler;
}

function getStandardError(err) {
  console.log('=== getStandardError ===');
  var R = /^(.*):(\d+):(\d+):(.*):/;
  var type = R.exec(err);
  return {
    component: 'general',
    formattedMessage: err,
    message: err,
    type: type ? type[4].trim() : 'Error'
  };
}

function compileLog(data) {
  console.log('=== compileLog ===');
  // console.log('data:\n', data);
  var fs = require('fs');
  var util = require('util');
  // fs.writeFileSync('./compile.json', util.inspect(data), 'utf-8');
  fs.writeFileSync('./compile.json', util.inspect(data, true, 10), 'utf-8');
}

// 0.4.25
// key: version
// key: semver
// key: license
// key: compile
// key: compileStandard
// key: compileStandardWrapper
// key: linkBytecode
// key: supportsMulti
// key: supportsImportCallback
// key: supportsStandard