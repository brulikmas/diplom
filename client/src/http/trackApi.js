import { $authHost, $host } from './index.js';
import { jwtDecode }  from 'jwt-decode';

export const registration = async (email, password, nickname, role) => {
  const { data } = await $host.post('api/user/registration', { email, password, nickname, role });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

// export const create = async (email, password) => {
//   const { data } = await $host.post('api/user/login', { email, password });
//   localStorage.setItem('token', data.token);
//   return jwtDecode(data.token);
// };

export const getAll = async (params) => {
  const { data } = await $host.get(`api/track`, { params });
  console.log(data)
  return data;
};

export const getOne = async (trackId) => {
  console.log(trackId)
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