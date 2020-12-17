import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

export const loginUser = async (email) => {
  const loginResult = await api.post('/login', { email });
  return loginResult.data;
}

export const loadStandartFeed = async (userId) => {
  const standartResult = await api.post('/load-standart', { userId });
  return standartResult.data;
}

export const loadNasaFeed = async () => {
  const nasaResult = await api.get('/load-nasa');
  return nasaResult.data;
}

export const createUserFeed = async (userId, title, feedBody) => {
  const createdFeedResult = await api.post('/create', { userId, title, feedBody });
  return createdFeedResult.data;
}

export const deleteUserFeed = async (feedId) => {
  const deletedFeedResult = await api.delete('/delete', { feedId });
  return deletedFeedResult.data;
}
