"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function(data) {
  let ret = '';
  for(const k in data) {
    ret += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
  }
  return ret;
}];

var hostname = window.location.hostname

// console.log("wqqqqqqq",protocol, hostname)
// var name = `http://${hostname}:8218`
// console.log("namenamenamenamename",name)

let config = {
  baseURL: process.env.NODE_ENV === 'development'
    // env for development
    ? '/api'
    // env for production

    // : `http://219.139.193.50:8218`,
    : `http://${hostname}:8218`
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response.data;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
