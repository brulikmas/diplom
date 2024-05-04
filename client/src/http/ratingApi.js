import { $authHost, $host } from './index.js';

export const createRating = async (trackId) => {
  const { data } = await $authHost.post('api/rating', { trackId });
  return data;
};

export const getOne = async (trackId) => {
  const { data } = await $authHost.get(`api/rating/${trackId}`);

  return data;
};

export const deleteRating = async (trackId) => {
  const { data } = await $authHost.delete(`api/rating`, {
    params: {
      trackId
    }
  });
  
  return data;
};