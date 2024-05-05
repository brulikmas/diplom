import { $authHost, $host } from './index.js';
import { jwtDecode }  from 'jwt-decode';

export const registration = async (email, password, nickname, role) => {
  const { data } = await $host.post('api/user/registration', { email, password, nickname, role });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const getUser = async (userId) => {
  const { data } = await $host.get(`api/user/${userId}`);
  return data;
};

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const updateUser = async (user) => {
  const { data } = await $authHost.put('api/user/', user);
  return data;
};

export const getBalance = async () => {
  const { data } = await $authHost.get('api/user');
  return data;
};

export const createMoneyRequest = async (moneyRequest) => {
  const { data } = await $authHost.post('api/user/moneyRequest', moneyRequest);
  return data;
};