'use strict'

const httpRequestPlus = require('http-request-plus').default

/**
 * node-markerapi
 *
 * This class exposes the marker API
 *
 * @class MarkerApi
 * @constructor
 */
class MarkerApi {
  constructor() {
    /**
     * Username to be used to authenticate
     * marker API
     *
     * @attribute _username
     * @type {String}
     * @private
     */
    this._username = ''

    /**
     * Password to be used to authenticate
     * marker API
     *
     * @attribute _uuid
     * @type {String}
     * @private
     */
    this._password = ''
  }

  /**
   * Get username for markerapi account
   *
   * @attribute username
   *
   * @return {String}
   */
  get username () {
    return this._username
  }

  /**
   * Get password for markerapi account
   *
   * @attribute password
   *
   * @returns {String}
   */
  get password () {
    return this._password
  }

  /**
   * Create markerapi url from searchQuery, username
   * and password
   *
   * @method _prepareUrl
   *
   * @param  {String} searchQuery
   *
   * @returns {String}
   */
  _prepareUrl (searchQuery) {
    return `http://www.markerapi.com/api/v1/trademark/search/${searchQuery}/username/${this._username}/password/${this._password}`
  }

  /**
   * Calls http request and returns the promise
   *
   * @method _makeRequest
   *
   * @param  {String} url
   *
   * @returns {Promise}
   */
  _makeRequest (url) {
    return httpRequestPlus(url).readAll('utf8')
  }

  /**
   * Initialise username and password
   *
   * @method init
   *
   * @param {String} username
   * @param {String} password
   */
  init ({ username, password }) {
    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new TypeError(`username and password should be of type 'string'`)
      return
    }
    this._username = username
    this._password = password
  }

  /**
   * Makes request to markerapi to get
   * trademark result
   *
   * @method _makeRequest
   *
   * @param  {String} url
   *
   * @returns {Promise}
   */
  getTradeMark (searchQuery) {
    if (typeof searchQuery !== 'string') {
      throw new TypeError(`${searchQuery} should be of type string`)
      return
    }
    const url = this._prepareUrl(searchQuery)
    return this
      ._makeRequest(url)
      .then((body) => {
        /**
         * body is received as a string, that is
         * why it needs to be parsed as json
         */
        let result
        try {
          result = JSON.parse(body)
        } catch (err) {
          result = {}
        }
        return result
      })
  }
}

module.exports = new MarkerApi
