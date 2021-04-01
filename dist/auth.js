'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Axios__default = /*#__PURE__*/_interopDefaultLegacy(Axios);

const querystring = require('querystring');

// TODO: switch between staging and production apis
const API_ROOT = 'https://staging.vibemap.xyz/api';


const register = async (data) => {
  const endpoint = '/auth/register';
  const config = {
    method: 'post',
    url: API_ROOT + endpoint,
    headers: { 
        'Content-Type': 'application/json'
    },
    data : JSON.stringify(data)
  };

  Axios__default['default'](config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response
    })
    .catch(function (error) {
      console.log('Problem with request: ', error);
    });

};

exports.register = register;
