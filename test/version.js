require('./utils/mock')();
var fetchMock = require('fetch-mock');

const chai = require('chai');
chai.should();

const solcjs = require('../src/solc-js');

describe('versions', () => {

  before(() => {
    fetchMock.get('https://solc-bin.ethereum.org/bin/list.json', require('./utils/list.json'));
  });

  it('case 1', async() => {
    let select = await solcjs.versions();
    const { releases, nightly, all } = select;
    // console.log(releases[0]);
    releases.should.be.a('Array');
    nightly.should.be.a('Array');
    all.should.be.a('Array');
    releases[0].should.be.a('string');
    releases[0].should.be.equal('v0.4.25-stable-2018.09.13');
  });

  after(() => {
    fetchMock.restore();
  });
});