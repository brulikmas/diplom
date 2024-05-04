import { $authHost, $host } from './index.js';

export const createTrack = async (track) => {
  const { data } = await $authHost.post('api/track', track);
  return data;
};

export const updateTrack = async (track) => {
  const { data } = await $authHost.put('api/track', track);
  return data;
};

export const getAll = async (params) => {
  const { data } = await $host.get(`api/track`, { params });
  return data;
};

export const getOne = async (trackId) => {
  const { data } = await $host.get(`api/track/${trackId}`);
  return data;
};

export const getOneWithAuth = async (trackId) => {
  const { data } = await $authHost.get(`api/track/withAuth/${trackId}`);
  return data;
};

export const deleteTrack = async (trackId) => {
  const { data } = await $authHost.delete('api/track', {
    params: {
      id: trackId,
    }
  });

  return data;
};
