import { $authHost, $host } from './index.js';

export const getAll = async (params) => {
  const { data } = await $authHost.get(`api/purchaseItem`, { params });

  return data;
};

export const createPurchaseItem = async (postParams) => {
  const { data } = await $authHost.post(`api/purchaseItem`, postParams);

  return data;
};