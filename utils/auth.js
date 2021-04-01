import Axios from "axios"

const querystring = require('querystring')

// TODO: switch between staging and production apis
const API_ROOT = 'https://staging.vibemap.xyz/api'


export const register = async (data) => {
  const endpoint = '/auth/register'
  const config = {
    method: 'post',
    url: API_ROOT + endpoint,
    headers: { 
        'Content-Type': 'application/json'
    },
    data : JSON.stringify(data)
  }

  Axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      return response
    })
    .catch(function (error) {
      console.log('Problem with request: ', error);
    });

}
