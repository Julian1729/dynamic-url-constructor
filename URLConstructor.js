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

/**
 * Expose private methods on
 * URLConstructor if in 'testing' mode
 */
if(process.env.NODE_ENV === 'testing'){
  // attach private methods to URLConstructor
  URLConstructor.prototype.renderURL = renderURL;
}

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

/**
 * Get corresponding route and return
 * rendered string. Give option to override
 * params.
 * @param  {String} name   Name of route
 * @param  {[type]} params Params to include or override
 * @return {[type]}        [description]
 */
function getURL(name, params){

  params = params || {};
  var route = this.routes[name] || null;
  if(!route) throw new Error('No route with name ' + name);
  var renderedURL = renderURL(route, this.params, params);
  return renderedURL;

};

/**
 * Private Functions
 */

/**
 * Extract needed parameters from URL and inject
 * into url
 * @param  {String} url URL string to be parsed
 * @return {Object} Rendered url
 */
function renderURL(url, ogParams, overrideParams){

  overrideParams = overrideParams || {};
  ogParams = ogParams || {};
  // param regex
  var regex = /:([\w+]*)*/ig;
  var match = null;
  var renderedURL = url;
  while( ( match = regex.exec(url) ) !== null  ){
    var name = match[1];
    var exactMatch = match[0];
    // WARNING: if a param is not found,
    // it is defaulted to empty string
    var value = overrideParams[name] || ogParams[name] || '';
    // replace in url
    renderedURL = renderedURL.replace(exactMatch, value);
  }
  return renderedURL;

}

module.exports = URLConstructor;
