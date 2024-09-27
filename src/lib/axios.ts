import axios from 'axios';

import {ENV} from '../constants';

export const axiosAuth = axios.create();

axiosAuth.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + ENV.accessToken;

    return config;
  },
  error => Promise.reject(error),
);
