# node-trademark 

API wrapper for getting trademark information from http://www.markerapi.com

[![Build Status][travis-image]][travis-url]

## Install

```bash
$ npm install node-trademark
```

## Node/OS Target

This repo is supposed to run fine on all major OS platforms and targets `Node.js >=7.0`

## Quick Start

You will need to sign up on http://www.markerapi.com and use credentials in the form of a set of username and password. You can get these from your markerapi profile.

```js
const markerApi = require('node-trademark')
markerApi.init({
    username: ''
    password: ''
})
```

## API

You now have the ability to search trademark against a string.

```js
markerApi
    .getTrademark(searchQuery /* 'Microsoft' */)
    .then(function (res) {
        /**
         *  Example JSON Response
         *
         *  {
         *    "count":1,
         *    "trademarks":[{
         *        "serialnumber":"73236080",
         *       "wordmark":"MICROSOFT",
         *        "code":"GS0091",
         *       "description":"Computer Programs",
         *       "registrationdate":"07\/06\/1982"
         *     }]
         *  }
         */
    })
    .catch(function (err) {
        /**
         * Handle error
         */
    })
```

## Development

### Test

```bash
npm test
```

## Issues

Please mention node and npm version while creating an issue.

[travis-image]: https://img.shields.io/travis/adonisjs/adonis-validation-provider/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/tushararora/node-trademark
