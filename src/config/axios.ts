import axios from 'axios';
import { stringify } from 'qs';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  headers: { Accept: 'application/json' },
  paramsSerializer: {
    serialize: (params) => stringify(params, { arrayFormat: 'repeat' }),
  },
});

export default API;
