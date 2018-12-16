require('./utils/mock')();

const chai = require('chai');
chai.should();

const solcjs = require('../src/solc-js');

describe.skip('solcjs', () => {

  // ============= 0.5

  it('v0.5.1', async () => {
    let version = 'v0.5.1-stable-2018.12.03';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.5.0', async () => {
    let version = 'v0.5.0-stable-2018.11.13';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  // ============= 0.1

  it('v0.1.7', async () => {
    let version = 'v0.1.7-stable-2015.11.30';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.1.6', async () => {
    let version = 'v0.1.6-stable-2015.11.17';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.1.5', async () => {
    let version = 'v0.1.5-stable-2015.10.19';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.1.4', async () => {
    let version = 'v0.1.4-stable-2015.10.09';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.1.3', async () => {
    let version = 'v0.1.3-stable-2015.09.30';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

});