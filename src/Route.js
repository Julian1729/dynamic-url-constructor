const { REGEX } = require("./constants");

/**
 * Extract needed parameters from URL and inject
 * into url
 * @param  {String} url URL string to be parsed
 * @param {String} globalParams global
 * @return {Object} Rendered url
 */
function renderURL(
  url,
  routeParams,
  globalParams,
  overrideParams,
  queryParams,
  base
) {
  globalParams = globalParams || {};
  routeParams = routeParams || {};
  overrideParams = overrideParams || {};
  queryParams = queryParams || {};
  base = base || "";
  // param extract regex
  var match = null;
  var renderedURL = url;
  while ((match = REGEX.FIND_PARAM.exec(url)) !== null) {
    var name = match[1];
    var exactMatch = match[0];
    // WARNING: if a param is not found,
    // it is defaulted to empty string
    var value =
      overrideParams[name] || routeParams[name] || globalParams[name] || "";
    // replace in url
    renderedURL = renderedURL.replace(exactMatch, value);
  }

  // check for query params
  if (Object.keys(queryParams).length > 0) {
    renderedURL = appendQueryParams(renderedURL, queryParams);
  }

  // remove trailing slash from base if exists
  if (base[base.length - 1] === "/") {
    base = base.slice(0, -1);
  }

  // add leading slash if doesn't exist
  if (renderedURL[0] !== "/") {
    renderedURL = "/" + renderedURL;
  }

  // prefix with base
  renderedURL = base + renderedURL;

  return renderedURL;
}

/**
 * Format and append query parameters to url
 * @param  {[type]} queryParams [description]
 * @return {[type]}             [description]
 */
function appendQueryParams(url, queryParams) {
  var pairs = Object.entries(queryParams);

  if (!pairs.length) return;

  var queryString = "";
  // discern whether a query string exists
  if (hasQueryString(url)) {
    queryString = "&";
  } else {
    queryString = "?";
  }

  for (var i = 0; i < pairs.length; i++) {
    var key = pairs[i][0];
    var value = pairs[i][1];
    value = encodeURIComponent(value);
    queryString += key + "=" + value;

    if (i + 1 !== pairs.length) queryString += "&";
  }

  return url + queryString;
}

/**
 * Detect whether a URL string contains a
 * query string, and return query string.
 * @param  {String}  url Query string
 * @return {Boolean} True if has string
 */
function hasQueryString(url) {
  return url.match(REGEX.DETECT_QUERY_STRING) ? true : false;
}

class Route {
  constructor(urlString, parent) {
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
  }

  /**
   * Set URL parameter
   * @param  {String} key Name of param, to be used in url
   * @param  {String} value Value to be injected into string
   * @return {void}
   */
  setParam(key, value) {
    this.params[key] = value;
  }

  /**
   * Get corresponding route and return
   * rendered string. Give option to override
   * params.
   * @param  {String} name   Name of route
   * @param  {[type]} params Params to include or override
   * @return {[type]}        [description]
   */
  url(overrideParams, queryParams) {
    overrideParams = overrideParams || {};
    return renderURL(
      this.urlString || null,
      this.params,
      this.parent.globals,
      overrideParams,
      queryParams,
      this.parent.base
    );
  }
}

module.exports = Route;
