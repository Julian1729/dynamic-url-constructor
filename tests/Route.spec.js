const { expect } = require("chai");
const rewire = require("rewire");

const Route = rewire("../src/Route");
const renderURL = Route.__get__("renderURL");
const appendQueryParams = Route.__get__("appendQueryParams");
const hasQueryString = Route.__get__("hasQueryString");

describe("Route", () => {
  describe("appendQueryParams", () => {
    it("should append query params to string", () => {
      let url = appendQueryParams("this/url", {
        dnc: "true",
        meta: "true",
      });
      expect(url).to.equal("this/url?dnc=true&meta=true");
    });

    it("should omit & in query string", () => {
      let url = appendQueryParams("this/url", {
        dnc: "true",
      });
      expect(url).to.equal("this/url?dnc=true");
    });

    it("should append to query string", () => {
      let url = appendQueryParams("this/url?param1=true", {
        param2: "true",
        param3: "true",
      });
      expect(url).to.equal("this/url?param1=true&param2=true&param3=true");
    });
  });

  describe("hasQueryString", () => {
    it("should detect a query string", () => {
      let url = "http://paulandbarnabas.com/rajax/meta?queryString=true";
      expect(hasQueryString(url)).to.be.true;
    });

    it("should detect a query string", () => {
      let url = "http://paulandbarnabas.com/rajax/meta";
      expect(hasQueryString(url)).to.be.false;
    });
  });

  describe("renderURL", () => {
    it("should render URL", () => {
      let url = renderURL(
        "/this/url/should/have/query/param",
        {},
        {},
        {},
        {},
        ""
      );
      expect(url).to.equal("/this/url/should/have/query/param");
    });

    it("should render URL w/ query params", () => {
      let url = renderURL(
        "/this/url/should/have/query/param",
        {},
        {},
        {},
        { queryParam: "thisone" },
        ""
      );
      expect(url).to.equal(
        "/this/url/should/have/query/param?queryParam=thisone"
      );
    });
  });
});
