import { $authHost, $host } from './index.js';

export const updateLicense = async (postParams) => {
  const { data } = await $authHost.put('api/license/', { ...postParams });
  return data;
};

export const getAll = async () => {
  const { data } = await $authHost.get(`api/basketTrackLicense`);

  return data;
};

export const addToBasket = async (trackLicense) => {
  const { data } = await $authHost.post(`api/basketTrackLicense`, { trackLicense });

  return data;
};

export const deleteFromBasket = async (id) => {
  const { data } = await $authHost.delete(`api/basketTrackLicense`, { params: {
    id,
  }});

  return data;
};