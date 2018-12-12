module.exports = protest;

async function protest(solcjs, opts) {
  try {
    let { url, version } = opts;
    let content = getContent(version);
    await solcjs.compile({ version, url }, content);  
  } catch (error) {
    throw error;
  }
}

function getContent(version) {
  console.log('=== version ====');
  console.log(version);
  
  let content;
  if (version.indexOf('v0.5.') != -1) {
    content = `
    pragma solidity >0.4.99 <0.6.0;

    library OldLibrary {
      function someFunction(uint8 a) public returns(bool);
    }

    contract NewContract {
      function f(uint8 a) public returns (bool) {
          return OldLibrary.someFunction(a);
      }
    }`;
  } else if (version.indexOf('v0.4.') != -1) {
    content = `
    contract Mortal {
      address public owner;
      constructor() public { owner = msg.sender; }
      function kill() public { if (msg.sender == owner) selfdestruct(owner); }
    }

    contract Greeter is Mortal {
      string public greeting;
      constructor(string memory _greeting) public {
        greeting = _greeting;
      }
    }`;
  } else {
    content = 'contract x { function g() public {} }';
  }
  return content;
}