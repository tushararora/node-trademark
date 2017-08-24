'use strict'

const tinyreq = require("tinyreq")

/**
 * node-markerapi
 *
 * This class exposes the marker API
 *
 * @class MarkerApi
 */

class MarkerApi {
  constructor() {
    this._url = ''
    this._username = ''
    this._password = ''
  }

  get username () {
    return this._username
  }

  get password () {
    return this._password
  }

  init ({ username, password }) {
    this._username = username
    this._password = password
  }
}

module.exports = new MarkerApi
