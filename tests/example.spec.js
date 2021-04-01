/**
 * Test Examples
 */
const { expect } = require("chai");

describe("example/routes.js", () => {
  let routes = require("../example/routes");

  // Example User Variables
  const user = {
    name: "Michael Scott",
    dob: "1962-04-15",
    username: "littlekidlover",
  };

  it("should export routes", () => {
    expect(routes).to.have.property("dashboard");
    expect(routes.dashboard.url).to.be.a("function");
  });

  it("should render correct URLs", () => {
    routes.dashboard.setParam("username", user.username);
    expect(routes.dashboard.url({})).to.equal(
      "http://examplesite.org/littlekidlover/dashboard"
    );
  });
});
