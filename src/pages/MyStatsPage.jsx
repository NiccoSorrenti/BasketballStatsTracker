import { useState, useEffect } from 'react';

import DashboardLayout from '../components/layout/DashboardLayout';

import StatsForm from '../components/stats/StatsForm';
import StatsTable from '../components/stats/StatsTable';

import {
  getGames,
  createGame,
  updateGame,
  deleteGame,
} from '../services/gameStatService';

const MyStatsPage = () => {
  const [games, setGames] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const loadGames = async () => {
    try {
      const response = await getGames();
      setGames(response.data);
    } catch (error) {
      console.error('Error loading games:', error);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  const addGame = async (newGame) => {
    try {
      const response = await createGame(newGame);
      setGames([...games, response.data]);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  const saveEditedGame = async (updatedGame) => {
    try {
      const gameToUpdate = games[editingIndex];

      const response = await updateGame(gameToUpdate.id, updatedGame);

      const updatedGames = [...games];
      updatedGames[editingIndex] = response.data;

      setGames(updatedGames);
      setEditingIndex(null);
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  const deleteGameByIndex = async (indexToDelete) => {
    try {
      const gameToDelete = games[indexToDelete];

      await deleteGame(gameToDelete.id);

      const updatedGames = games.filter((_, index) => index !== indexToDelete);

      setGames(updatedGames);
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  const editGame = (index) => {
    setEditingIndex(index);
  };

  return (
    <DashboardLayout>
      <h1 className="text-white mb-4">My Stats</h1>

      <StatsForm
        addGame={addGame}
        saveEditedGame={saveEditedGame}
        games={games}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
      />

      <StatsTable
        games={games}
        deleteGame={deleteGameByIndex}
        editGame={editGame}
      />
    </DashboardLayout>
  );
};

export default MyStatsPage;
