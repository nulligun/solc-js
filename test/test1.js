require('./utils/mock')();
var fetchMock = require('fetch-mock');

const chai = require('chai');
chai.should();

const solcjs = require('../src/solc-js');

describe('test1', () => {

  before(() => {
    fetchMock.get('https://solc-bin.ethereum.org/bin/list.json', require('./utils/list.json'));
  });

  it('versions', async() => {
    let select = await solcjs.versions();
    const { releases, nightly, all } = select;
    releases.should.be.a('Array');
    nightly.should.be.a('Array');
    all.should.be.a('Array');
    // console.log('releases: \n\n', releases);
    releases[0].should.be.a('string');
    releases[0].should.be.equal('v0.4.25-stable-2018.09.13');
  });

  it('version2url', async () => {
    let version = 'v0.4.25-stable-2018.09.13';
    let url = await solcjs.version2url(version);
    url.should.be.a('string');
    url.should.match(/solc-bin.ethereum.org/);
  });

  after(() => {
    fetchMock.restore();
  });
});