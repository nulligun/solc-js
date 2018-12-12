// https://solidity.readthedocs.io/en/v0.5.1/using-the-compiler.html?highlight=legacyAST#output-description

module.exports = format;

const R = /^(.*):(\d+):(\d+):(.*):/;

function format ({ version, url }, data) {
  print(data, version);

  try {
    let output = Object.keys(data.contracts).map(name => {
      let contract = data.contracts[name];
      var {
        functionHashes,
        runtimeBytecode,
        srcmapRuntime
      } = contract;

      console.log('=== data ====');
      console.log(data);
      const metadata = getMetadata(contract, version);

      var compilation = {
        name: getName(name, version),
        abi: getABI(contract, version),
        sources: getSource(data, metadata, version, name),
        compiler: getCompile(metadata, version, url),
        assembly: {
          assembly: getAssembly(contract, metadata, version),
          opcodes: getOpcodes(contract, metadata, version)
        },
        binary: {
          bytecodes: {
            bytecode: getBytecode(contract, version),
            runtimeBytecode
          },
          sourcemap: {
            srcmap: getSrcmap(contract, version),
            srcmapRuntime
          },
        },
        metadata: {
          ast: getAST(name, data, version),
          devdoc: getDevDoc(contract, metadata, version),
          userdoc: getUserDoc(contract, metadata, version),
          functionHashes,
          gasEstimates: getGasEstimates(contract, metadata, version),
          analysis: (() => {
            var result = { warnings: [], others: [] };
            for (var error in data.errors) {
              var message = data.errors[error];
              var type = R.exec(message)[4].trim().toLowerCase()
                ; (result[type] || (result[type] = [])).push(message)
            }
            return result;
          })()
        }
      };
      // console.log('=== stardard output ====');
      // console.log(compilation);
      
      return compilation;
    });
    return output;
  } catch (error) {
    console.error('[ERROR] parse error');
    throw error;
  }
}

function getName(name, version) {
  return (version.indexOf('v0.5.') != -1) ? name : name.substring(1);
}

function getSrcmap(contract, version) {
  try {
    if (version.indexOf('v0.5.') != -1) {
      let name = Object.keys(contract)[0];
      return contract[name].evm.bytecode.sourceMap;
    } else {
      return contract.srcmap;
    }
  } catch (error) {
    console.error('[ERROR] parse srcmap fail');
    throw error;
  }
}

function getBytecode(contract, version) {
  try {
    if (version.indexOf('v0.5.') != -1) {
      let name = Object.keys(contract)[0];
      return contract[name].evm.bytecode.object;
    } else {
      return contract.bytecode;
    }
  } catch (error) {
    console.error('[ERROR] parse bytecode fail');
    throw error;
  }
}

function getOpcodes(contract, metadata, version) {
  try {
    if (version.indexOf('v0.5.') != -1) {
      let name = Object.keys(contract)[0];
      return contract[name].evm.bytecode.opcodes;
    } else {
      return contract.opcodes;
    }
  } catch (error) {
    console.error('[ERROR] parse opcodes fail');
    throw error;
  }
}

function getAssembly(contract, metadata, version) {
  try {
    if (version.indexOf('v0.5.') != -1) {
      let name = Object.keys(contract)[0];
      return contract[name].evm.legacyAssembly;
    } else {
      return contract.assembly;
    }
  } catch (error) {
    console.error('[ERROR] parse assembly fail');
    throw error;
  }
}

function getGasEstimates(contract, metadata, version) {
  try {
    if (version.indexOf('v0.5.') != -1) {
      let name = Object.keys(contract)[0];
      return contract[name].evm.gasEstimates;
    } else {
      return contract.gasEstimates;
    }
  } catch (error) {
    console.error('[ERROR] parse gasEstimates fail');
    throw error;
  }
}

function getAST(name, data, version) {
  let ast;
  if (version.indexOf('v0.5.') != -1) {
    // NOT HAVE
    ast = data.sources[name].ast;
  } else {
    ast = data.sources[''].AST;    
  }
  // console.log('=== getAST ====');
  // console.log(ast);
  return ast;
}

function getUserDoc(contract, metadata, version) {
  try {
    if (version.indexOf('v0.5.') != -1) {
      let name = Object.keys(contract)[0];
      return contract[name].userdoc;
    } else {
      return metadata.output.userdoc;
    }
  } catch (error) {
    console.error('[ERROR] parse userdoc fail');
    throw error;
  }
}

function getDevDoc(contract, metadata, version) {
  try {
    if (version.indexOf('v0.5.') != -1) {
      let name = Object.keys(contract)[0];
      return contract[name].devdoc;
    } else {
      return metadata.output.devdoc;
    }
  } catch (error) {
    console.error('[ERROR] parse devdoc fail');
    throw error;
  }
}

function getABI(contract, version) {
  try {
    if (version.indexOf('v0.5.') != -1) {
      let name = Object.keys(contract)[0];
      return contract[name].abi;
    } else {
      return contract.abi;
    }
  } catch (error) {
    console.error('[ERROR] parse abi fail');
    throw error;
  }
}

function getMetadata(contract, version) {
  try {
    if (version.indexOf('v0.5.') != -1) {
      let name = Object.keys(contract)[0];
      // let { metadata, abi, evm } 
      let { metadata } = contract[name];
      metadata = JSON.parse(metadata);
      console.log('=== metadata ====');
      console.log(metadata);
      // console.log('=== old output ====');
      // console.log(contract[name]);
      
      return metadata;
    } else {
      return JSON.parse(contract.metadata);
    }  
  } catch (error) {
    console.error('[ERROR] parse metadata fail');
    throw error;
  }
}

function getCompile(metadata, version, url) {
  return {
    language: metadata.language.toLowerCase(),
    version: version,
    url: url,
    evmVersion: metadata.settings.evmVersion,
    optimizer: metadata.settings.optimizer.enabled,
    runs: metadata.settings.optimizer.runs,
  };
}

function getSource(data, metadata, version, name) {
  let sources = {};
  if (version.indexOf('v0.5.') != -1) {
    // console.log('=== metadata.settings ====');
    // console.log(metadata.settings);
    
    sources = {
      sourcecode: {
        keccak256: getKeccak256(metadata, version, name),
        urls: [] // DONT HAVE
      },
      compilationTarget: (metadata.settings.compilationTarget)[name],
      remappings: metadata.settings.remappings,
      libraries: metadata.settings.libraries,
      sourcelist: [''] // DONT HAVE
    };
  } else {
    sources = {
      sourcecode: metadata.sources[''],
      compilationTarget: metadata.settings.compilationTarget[''],
      remappings: metadata.settings.remappings,
      libraries: metadata.settings.libraries,
      sourcelist: data.sourceList
    };
  }
  return sources;
}

function getKeccak256(metadata, version, name) {
  try {
    if (version.indexOf('v0.5.') != -1) {
      return metadata.sources[name].keccak256;
    } else {
      return metadata.sources[''];
    }
  } catch (error) {
    console.error('[ERROR] parse source keccak256 fail');
    throw error;
  }
}

function print(data, version) {
  console.log('=== contract name ====');

  if (~version.indexOf('v0.5.')) {
    console.log('using 0.5+');
  }
  else if (~version.indexOf('v0.4.')) {
    console.log('using 0.4+');
  }

  console.log(Object.keys(data.contracts).reduce((agg, name) => {
    agg[name] = Object.keys(data.contracts[name]);
    return agg;
  }, {}));
}