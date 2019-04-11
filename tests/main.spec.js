/**
 * Main test file for URLConstructor
 */
const {expect} = require('chai');

const URLConstructor = require('../URLConstructor');

describe('URL Constructor Methods', () => {

  var TestURLConstructor = null;

  beforeEach(() => {

    TestURLConstructor = new URLConstructor();

  });

  it('should set base', () => {

    TestURLConstructor.setBase('http://localhost:3000');
    expect(TestURLConstructor.base).to.equal('http://localhost:3000');

  });

  it('should set param', () => {

    TestURLConstructor.setParam('userId', '12345');
    expect(TestURLConstructor.params.userId).to.equal('12345');

  });

  it('should add a route', () => {

    TestURLConstructor.addRoute('territory', '/rajax/territory');
    expect(TestURLConstructor.routes).to.exist;

  });

  it('should get a route', () => {

    TestURLConstructor.addRoute('territory', '/rajax/territory');
    var url = TestURLConstructor.getURL('territory');
    expect(url).to.equal('/rajax/territory');

  });

});

describe('Regex Pattern', () => {

    it('should capture all regex groups', () => {

      let url = '/territory/rajax/:fragment/street/:street/:block';
      let regex = /:([\w+]*)*/ig;
      let match;
      let params = [];
      while( ( match = regex.exec(url) ) !== null  ){
        params.push( match[1] );
      }
      expect(params).to.include('fragment', 'street', 'block');

    });

});

describe('Private Methods', () => {

  it('should render url', () => {

    TestURLConstructor = new URLConstructor();
    TestURLConstructor.setParam('street', 'Oakland');
    TestURLConstructor.setParam('block', '4500');
    let url = '/rajax/territory/street/:street/block/:block';
    let renderedUrl = TestURLConstructor.renderURL(url);
    expect(renderedUrl).to.equal('/rajax/territory/street/Oakland/block/4500');

  });

});
