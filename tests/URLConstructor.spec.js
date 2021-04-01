/**
 * Main test file for URLConstructor
 */
const { expect } = require("chai");

const URLConstructor = require("../src/URLConstructor");

describe("URL Constructor Methods", () => {
  var TestURLConstructor = null;

  beforeEach(() => {
    TestURLConstructor = new URLConstructor();
  });

  it("should set base", () => {
    TestURLConstructor.setBase("http://localhost:3000");
    expect(TestURLConstructor.base).to.equal("http://localhost:3000");
  });

  it("should set param", () => {
    TestURLConstructor.setGlobal("userId", "12345");
    expect(TestURLConstructor.globals.userId).to.equal("12345");
  });

  it("should add a route", () => {
    let newRoute = TestURLConstructor.addRoute("territory", "/rajax/territory");
    expect(newRoute).to.exist;
    expect(newRoute.setParam).to.be.a("function");
  });

  it("should get a route", () => {
    TestURLConstructor.addRoute("territory", "/rajax/territory");
    let route = TestURLConstructor.getRoute("territory");
    let url = route.url();
    expect(url).to.equal("/rajax/territory");
  });

  it("should get rendered url", () => {
    let route = TestURLConstructor.addRoute(
      "territory",
      "/rajax/:street/:block"
    );
    route.setParam("street", "Oakland");
    route.setParam("block", "4500");
    let url = route.url();
    expect(url).to.equal("/rajax/Oakland/4500");
  });

  it("should use override params in rendered url", () => {
    let route = TestURLConstructor.addRoute(
      "territory",
      "/rajax/:street/:block"
    );
    route.setParam("street", "Oakland");
    route.setParam("block", "4500");
    let url = route.url({ street: "Wakeling" });
    expect(url).to.equal("/rajax/Wakeling/4500");
  });

  it("should use global params in rendered url", () => {
    TestURLConstructor.setGlobal("street", "Oakland");
    TestURLConstructor.setGlobal("block", "4500");
    let route = TestURLConstructor.addRoute(
      "territory",
      "/rajax/:street/:block"
    );
    let url = route.url();
    expect(url).to.equal("/rajax/Oakland/4500");
  });

  it("should include base in renderURL", () => {
    TestURLConstructor.setGlobal("street", "Oakland");
    TestURLConstructor.setGlobal("block", "4500");
    TestURLConstructor.setBase("http://www.paulandbarnabas.com");
    let route = TestURLConstructor.addRoute(
      "territory",
      "/rajax/:street/:block"
    );
    let url = route.url();
    expect(url).to.equal("http://www.paulandbarnabas.com/rajax/Oakland/4500");
  });

  it("should render with query params", () => {
    TestURLConstructor.setBase("http://www.paulandbarnabas.com");
    let route = TestURLConstructor.addRoute("tester", "/unit?number=:number");
    route.setParam("number", "4500");
    let url = route.url();
    expect(url).to.equal("http://www.paulandbarnabas.com/unit?number=4500");
  });

  it("should append existing query string", () => {
    TestURLConstructor.setBase("http://www.paulandbarnabas.com");
    let route = TestURLConstructor.addRoute("tester", "/unit?number=:number");
    route.setParam("number", "4500");
    let url = route.url();
    expect(url).to.equal("http://www.paulandbarnabas.com/unit?number=4500");
  });

  it("should get url wo/ double slashes", () => {
    TestURLConstructor.setBase("http://www.paulandbarnabas.com/");
    let route = TestURLConstructor.addRoute("tester", "/unit?number=:number");
    route.setParam("number", "4500");
    let url = route.url();
    expect(url).to.equal("http://www.paulandbarnabas.com/unit?number=4500");
  });
});

describe("Regex Pattern", () => {
  it("should capture all regex groups", () => {
    let url = "/territory/rajax/:fragment/street/:street/:block";
    let regex = /:([\w+]*)*/gi;
    let match;
    let params = [];
    while ((match = regex.exec(url)) !== null) {
      params.push(match[1]);
    }
    expect(params).to.include("fragment", "street", "block");
  });
});
