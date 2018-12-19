require('./utils/mock')();
var fetchMock = require('fetch-mock');

const chai = require('chai');
chai.should();

const solcjs = require('../src/solc-js');

describe('version2url', () => {

  before(() => {
    fetchMock.get('https://solc-bin.ethereum.org/bin/list.json', require('./utils/list.json'));
  });

  it('0.4.25', async () => {
    let version = 'v0.4.25-stable-2018.09.13';
    let url = await solcjs.version2url(version);
    url.should.be.a('string');
    url.should.match(/solc-bin.ethereum.org/);
  });

  it('nightly', async () => {
    let version = 'nightly';
    let url = await solcjs.version2url(version);
    url.should.be.a('string');
    url.should.match(/solc-bin.ethereum.org/);
  });

  it('latest', async () => {
    let version = 'latest';
    let url = await solcjs.version2url(version);
    console.log(url);
    
    url.should.be.a('string');
    url.should.match(/solc-bin.ethereum.org/);
  });

  after(() => {
    fetchMock.restore();
  });
});