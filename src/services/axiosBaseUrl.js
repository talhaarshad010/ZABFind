import axios from 'axios';

export const AxiosBaseUrl = axios.create({
  baseURL: 'http://192.168.147.238:6000',
  headers: {
    'Content-Type': 'application/json',
  },
});
