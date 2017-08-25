'use strict'

const chai = require('chai')
const expect = chai.expect
const markerApi = require('../src/index.js')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const nock = require('nock')
const { URL } = require('url')
chai.use(chaiAsPromised)
chai.use(sinonChai)


describe('', function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('init should be able to populate username and password', function () {
    const creds = {
      username: 'test',
      password: 'password'
    }

    markerApi.init(creds)

    expect(markerApi.username).to.be.eql(creds.username)
    expect(markerApi.password).to.be.eql(creds.password)
  })

  it('init should throw error if either of username or password is not string', function () {
    const creds = {
      username: null,
      password: null
    }

    expect(function() {
      markerApi.init(creds)
    }).throw(TypeError)
  })

  it('should return url from _prepareUrl when search term is passed', function () {
    const creds = {
      username: 'test',
      password: 'password'
    }
    const searchQuery = 'Google'

    markerApi.init(creds)
    const url = markerApi._prepareUrl(searchQuery)

    expect(url).to.be.eql(`http://www.markerapi.com/api/v1/trademark/search/${searchQuery}/username/${creds.username}/password/${creds.password}`)
  })

  it('should throw error when getTradeMark search query is not string', function () {
    expect(function() {
      markerApi.getTradeMark(null)
    }).throw(TypeError)
  })

  it('getTradeMark should call _prepareUrl with searchQuery as argument', function () {
    const searchQuery = 'GOOGLE'
    const spy = sandbox.spy(markerApi, '_prepareUrl')
    sandbox.stub(markerApi, '_makeRequest').returns(new Promise(function() {}))

    markerApi.getTradeMark(searchQuery)

    expect(spy).to.have.been.calledWith(searchQuery)
  })

  it('getTradeMark should return body as string if request is successful', function () {
    const searchQuery = 'GOOGLE'
    markerApi.init({
      username: 'test',
      password: 'test'
    })
    const endpoint = markerApi._prepareUrl(searchQuery)
    const reply = {
      "count":1,
      "trademarks":[{
        "serialnumber":"73236080",
        "wordmark":"MICROSOFT",
        "code":"GS0091",
        "description":"Computer Programs",
        "registrationdate":"07\/06\/1982"
      }]
    }
    const url = new URL(endpoint)
    nock(url.host).get(url.path).reply(200, reply)

    expect(markerApi.getTradeMark(searchQuery)).to.eventually.eql(reply)
  })

  it('getTradeMark should return error if request is unsuccessful', function () {
    const searchQuery = 'GOOGLE'
    markerApi.init({
      username: 'test',
      password: 'test'
    })
    const endpoint = markerApi._prepareUrl(searchQuery)
    const error = 'Unauthorized'
    const url = new URL(endpoint)
    nock(url.host).get(url.path).replyWithError(error)

    expect(markerApi.getTradeMark(searchQuery)).to.be.rejectedWith(error)
  })
})
