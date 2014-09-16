/**
 * Creates a deterministic hash of a JS object
 *
 * @author Jordan Garcia
 */
var _ = require('lodash');

/**
 * Creates a deterministic stringified JSON of a JS
 * object by ensuring deterministic key ordering
 *
 * @param {object} obj
 * @return {string}
 */
function stringifyObject(obj) {
  function flatten(obj) {
    if (!_.isObject(obj)) {
      return obj;
    }
    return _.chain(obj)
      .pairs()
      .map(function(p) {
        return [p[0], flatten(p[1])];
      })
      .sortBy(function(p) {
        return p[0]
      })
      .valueOf()
  }

  return JSON.stringify(flatten(obj));
}

/**
 * Basic hash function
 * @param {string} str
 * @return {number}
 */
function hash(str) {
  var res = 0, i, chr, len;
  if (str.length == 0) return res;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    res  = ((res << 5) - res) + chr;
    res |= 0; // Convert to 32bit integer
  }
  return res;
}

/**
 * Object hashing function
 * @param {object} obj
 * @return {string}
 */
function hashObject(obj) {
  return String(hash(stringifyObject(obj)));
}

module.exports = hashObject
