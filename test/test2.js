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

  // ============= 0.4

  it('v0.4.25', async() => {
    let version = 'v0.4.25-stable-2018.09.13';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.4.24', async () => {
    let version = 'v0.4.24-stable-2018.05.16';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.4.23', async () => {
    let version = 'v0.4.23-stable-2018.04.19';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.4.22', async () => {
    let version = 'v0.4.22-stable-2018.04.16';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.4.21', async () => {
    let version = 'v0.4.23-stable-2018.04.19';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  // ============= 0.3

  it('v0.3.6', async () => {
    let version = 'v0.3.6-stable-2016.09.08';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.3.5', async () => {
    let version = 'v0.3.5-stable-2016.08.10';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.3.4', async () => {
    let version = 'v0.3.4-stable-2016.06.11';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.3.3', async () => {
    let version = 'v0.3.3-stable-2016.06.02';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.3.2', async () => {
    let version = 'v0.3.2-stable-2016.05.27';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  // ============= 0.2

  it('v0.2.2', async () => {
    let version = 'v0.2.2-stable-2016.03.10';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.2.1', async () => {
    let version = 'v0.2.1-stable-2016.02.15';
    let compiler = await solcjs(version);
    compiler.should.be.a('function');
  });

  it('v0.2.0', async () => {
    let version = 'v0.2.0-stable-2016.01.31';
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