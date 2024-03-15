import axios from 'axios';
import { Store } from '@reduxjs/toolkit';
import { RootState } from './app/store.ts';
import { BASE_URL } from './constants.ts';

const axiosApi = axios.create({
	baseURL: BASE_URL
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().users.user?.token;
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  });
};

export default axiosApi;