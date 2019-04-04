/**
 * Main test file for URLConstructor
 */
const {expect} = require('chai');

const URLConstructor = require('../URLConstructor');

describe('Configure Constructor', () => {

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
