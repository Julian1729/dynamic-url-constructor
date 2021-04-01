const { REGEX } = require("./constants.js");
const Route = require("./Route.js");

class URLConstructor {
  constructor(base) {
    this.base = base || "";

    this.globals = {};

    this.routes = {};
  }

  /**
   * Set global parameter
   * @param {String} key   Key
   * @param {String} value Value
   */
  setGlobal(key, value) {
    this.globals[key] = value;
  }

  /**
   * Set base that all URLs will be prefixed with
   * @param {String} base Base url
   */
  setBase(base) {
    this.base = base;
  }

  /**
   * Add and return new Route to URLConstructor
   * @param {String} name Route identifier
   * @param {String} url  Route URL
   */
  addRoute(name, urlString) {
    this.routes[name] = new Route(urlString, this);
    return this.routes[name];
  }

  /**
   * Get route from parent object
   * @param  {String} name Route identifier
   * @return {Route}      Route object or null if doesnt exist
   */
  getRoute(name) {
    return this.routes[name] || null;
  }
}

module.exports = URLConstructor;
