'use strict'

const chai = require('chai')
const expect = chai.expect
const markerApi = require('../src/index.js')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)


describe('', function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('markerApi should be able to initialize the API', function () {
    const creds = {
      username: 'test',
      password: 'password'
    }

    markerApi.init(creds)

    expect(markerApi.username).to.be.eql(creds.username)
    expect(markerApi.password).to.be.eql(creds.password)
  })
})
