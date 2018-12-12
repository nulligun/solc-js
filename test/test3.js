require('./utils/mock')();

const chai = require('chai');
chai.should();

const solcjs = require('../src/solc-js');

describe('compiler', () => {

  it('0.4.25', async () => {
    let version = 'v0.4.25-stable-2018.09.13';
    let compiler = await solcjs(version);

    const sourceCode =`
    pragma solidity ^0.4.25;

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
    let result = await compiler({ version }, sourceCode);
    console.log('=== output ====');
    console.dir(result);
    result[0].compiler.version.should.be.a('string');
  });

});