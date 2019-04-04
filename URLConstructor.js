/**
 * URLConstructor
 */

var URLConstructor = function(){

  return new URLConstructor.init();

};

URLConstructor.init = function(){

  this.base = '',

  this.params = {};

  this.routes = {};

};

URLConstructor.prototype = {

  routes: {},

  setParam: setParam,

  setBase: setBase,

  addRoute: addRoute,

  getURL: getURL

};

URLConstructor.init.prototype = URLConstructor.prototype;

/**
 * Set URL parameter
 * @param  {String} key Name of param, to be used in url
 * @param  {String} value Value to be injected into string
 * @return {void}
 */
function setParam(key, value){

  this.params[key] = value;

}

/**
 * Set base that all URLs will be prefixed with
 * @param {String} base Base url
 */
function setBase(base){

  this.base = base;

}

/**
 * Add route to
 * @param {[type]} name [description]
 * @param {[type]} url  [description]
 */
function addRoute(name, url){

  this.routes[name] = url;

}

function getURL(name, params){

  var route = this.routes[name] || null;
  return route;

};

function extractParams(url){

  // param regex
  var regex = /:[a-z]*/;
  return url.match(regex);

}

module.exports = URLConstructor;
