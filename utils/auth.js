import Axios from "axios"

const querystring = require('querystring')

// TODO: switch between staging and production apis
const API_ROOT = 'https://staging.vibemap.xyz/api'

const axiosInstance = Axios.create({
  timeout: 15000,
  headers: {'Content-Type': 'application/json'}
});

//Interceptor and RefreshToken function is a work in progress.
//I need to find a way to return the new accessToken and refreshToken to the client
//to update the values in there.
// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log("Response is:", response);
//     return response;
//   },
//   (error) => {
//     console.log("Status: ", error.response.status,"Error is: ", error);;
//     const originalRequest = error.config;
//     if (error.response.status === 401) {
//       originalRequest._retry = true;

//       return refreshToken(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

//Call this method when the app is initialize to set the refreshToken
//Note: If there is a better or correct way to have/set a global value do it.
//Maybe create a class?
export const setRefreshToken = (token) => {
  refreshToken = token;
}

export const register = async (data, apiRoot = API_ROOT) => {
  const endpoint = '/auth/register'
  const config = {
    method: 'post',
    url: apiRoot + endpoint,
    data : JSON.stringify(data)
  }

  console.log('Register with: ', data, config)
  axiosInstance(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
      return response
    })
    .catch(function (error) {
      console.log('Problem with request: ', error);
    });

}

export const logIn = async (data, apiRoot = API_ROOT) => {
  const endpoint = '/auth/login'
  const config = {
    method: 'post',
    url: apiRoot + endpoint,
    data : JSON.stringify(data)
  }

  axiosInstance(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
      return {response: response , error: undefined}
    })
    .catch(function (error) {
      console.log('Problem with request: ', error);
      return {response: undefined , error: error}
    });

}

export const resetPassword = async (data, apiRoot = API_ROOT) => {
  const endpoint = apiRoot === API_ROOT ? '/auth/password-reset' : '/auth/reset-password'
  const config = {
    method: 'post',
    url: apiRoot + endpoint,
    data : JSON.stringify(data),
  }

  axiosInstance(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      return {response: response , error: undefined}
    })
    .catch(function (error) {
      console.log('Problem with request: ', error);
      return {response: undefined , error: error}
    });

}

export const changePassword = async (data, token, apiRoot = API_ROOT) => {
  const endpoint = '/auth/change-password'
  const config = {
    method: 'post',
    url: apiRoot + endpoint,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data : JSON.stringify(data)
  }

  axiosInstance(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      return {response: response , error: undefined}
    })
    .catch(function (error) {
      console.log('Problem with request: ', error);
      return {response: undefined , error: error}
    });

}

export const logOut = async (data, apiRoot = API_ROOT) => {
  const endpoint = '/auth/logout'
  const config = {
    method: 'post',
    url: apiRoot + endpoint,
    data : JSON.stringify(data)
  }

  axiosInstance(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      return {response: response , error: undefined}
    })
    .catch(function (error) {
      console.log('Problem with request: ', error);
      return {response: undefined , error: error}
    });

}

export const oauthLogin = async (data, apiRoot = API_ROOT) => {
  const endpoint = '/auth/oauth'
  const config = {
    method: 'post',
    url: apiRoot + endpoint,
    data : JSON.stringify(data)
  }

  axiosInstance(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
      return {response: response , error: undefined}
    })
    .catch(function (error) {
      console.log('Problem with request: ', error);
      return {response: undefined , error: error}
    });

}

// export const refreshToken = async (
//     originalRequest, 
//     data = {'refreshToken': refreshToken}, 
//     apiRoot = API_ROOT
//   ) => {
//   const endpoint = '/auth/logout'
//   const config = {
//     method: 'post',
//     url: apiRoot + endpoint,
//     data : JSON.stringify(data)
//   }

//   axiosInstance(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data))
//       axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
//       originalRequest.headers['Authorization'] =  `Bearer ${response.data.accessToken}`;
//       return axiosInstance(originalRequest);
//     })
//     .catch(function (error) {
//       console.log('Problem with request: ', error);
//       return {response: undefined , error: error}
//     });

// }