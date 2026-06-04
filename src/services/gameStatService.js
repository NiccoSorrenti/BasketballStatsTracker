import api from './api';

export const getGames = () => {
  return api.get('/games');
};

export const createGame = (gameData) => {
  return api.post('/games', gameData);
};

export const updateGame = (id, gameData) => {
  return api.put(`/games/${id}`, gameData);
};

export const deleteGame = (id) => {
  return api.delete(`/games/${id}`);
};

export const getGamesSummary = () => {
  return api.get('/games/summary');
};