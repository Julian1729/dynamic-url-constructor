/**
 * URLConstructor
 */

var URLConstructor = function(){

  return new URLConstructor.init();

};

URLConstructor.init = function(base){

  this.base = base || '',

  this.globals = {};

  this.routes = {};

};

URLConstructor.prototype = {

  setGlobal: setGlobal,

  setBase: setBase,

  addRoute: addRoute,

  getRoute: getRoute

};

/**
 * Expose private methods on
 * URLConstructor if in 'testing' mode
 */
if(process.env.NODE_ENV === 'testing'){
  // attach private methods to URLConstructor
  URLConstructor.prototype.renderURL = renderURL;
  URLConstructor.prototype.appendQueryParams = appendQueryParams;
}

/**
 * Route object
 * @param  {String} url URL to be rendered
 * @param {Object} parent Reference to parent URL Constructor
 * @return {Route} The newly constructed Route
 */
URLConstructor.Route = function(urlString, parent){

  /**
   * Reference to global parameters
   * @type {Object}
   */
  this.parent = parent;

  /**
   * URL to be rendered
   * @type {String}
   */
  this.urlString = urlString;

  /**
   * Route Params
   * @type {Object}
   */
  this.params = {};

};

URLConstructor.Route.prototype = {

  setParam: setParam,

  url: url

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
 * Set global parameter
 * @param {String} key   Key
 * @param {String} value Value
 */
function setGlobal(key, value){

  this.globals[key] = value;

}

/**
 * Add and return new Route to URLConstructor
 * @param {String} name Route identifier
 * @param {String} url  Route URL
 */
function addRoute(name, urlString){

  this.routes[name] = new URLConstructor.Route(urlString, this);
  return this.routes[name];

}

/**
 * Get route from parent object
 * @param  {String} name Route identifier
 * @return {Route}      Route object or null if doesnt exist
 */
function getRoute(name){

  return this.routes[name] || null;

}

/**
 * Get corresponding route and return
 * rendered string. Give option to override
 * params.
 * @param  {String} name   Name of route
 * @param  {[type]} params Params to include or override
 * @return {[type]}        [description]
 */
function url(overrideParams){

  overrideParams = overrideParams || {};
  return renderURL( (this.urlString || null), this.params,  this.parent.globals, overrideParams);

};

/**
 * Private Functions
 */

/**
 * Extract needed parameters from URL and inject
 * into url
 * @param  {String} url URL string to be parsed
 * @param {String} globalParams global
 * @return {Object} Rendered url
 */
function renderURL(url, routeParams, globalParams, overrideParams, queryParams){

  globalParams = globalParams || {};
  routeParams = routeParams || {};
  overrideParams = overrideParams || {};
  queryParams = queryParams || {};
  // param extract regex
  var regex = /:([\w+]*)*/ig;
  var match = null;
  var renderedURL = url;
  while( ( match = regex.exec(url) ) !== null  ){
    var name = match[1];
    var exactMatch = match[0];
    // WARNING: if a param is not found,
    // it is defaulted to empty string
    var value = overrideParams[name] || routeParams[name] || globalParams[name] || '';
    // replace in url
    renderedURL = renderedURL.replace(exactMatch, value);
  }

  // check for query params
  if(Object.keys(queryParams).length > 0){
    renderedURL = appendQueryParams(renderedURL, queryParams);
  }

  return renderedURL;

}

/**
 * Format and append query parameters to url
 * @param  {[type]} queryParams [description]
 * @return {[type]}             [description]
 */
function appendQueryParams(url, queryParams){

  var pairs = Object.entries(queryParams);

  if(!pairs.length) return;

  var queryString = '?';

  for(var i=0; i<pairs.length; i++){

    var key = pairs[i][0];
    var value = pairs[i][1];
    queryString += key + '=' + value;

    if( (i+1) !== pairs.length) queryString += '&';

  }

  return url + queryString;

}

module.exports = URLConstructor;
