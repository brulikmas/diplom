import { $authHost, $host } from './index.js';

export const updateLicense = async (postParams) => {
  const { data } = await $authHost.put('api/license/', { ...postParams });
  return data;
};

export const getAll = async (userId) => {
  const { data } = await $host.get(`api/license`, { 
    params: {
      userId,
    } 
  });

  return data;
};

export const getOne = async (licenseId) => {
  const { data } = await $host.get(`api/license/${licenseId}`);
  return data;
};