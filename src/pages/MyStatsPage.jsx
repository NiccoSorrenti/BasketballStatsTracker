import { useState, useEffect } from 'react';

import DashboardLayout from '../components/layout/DashboardLayout';

import StatsForm from '../components/stats/StatsForm';
import StatsTable from '../components/stats/StatsTable';

const MyStatsPage = () => {
  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem('games');

    return savedGames ? JSON.parse(savedGames) : [];
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('games', JSON.stringify(games));

    //notifica altre pagine
    window.dispatchEvent(new Event('gamesUpdated'));
  }, [games]);

  const addGame = (newGame) => {
    setGames([...games, newGame]);
  };

  const deleteGame = (indexToDelete) => {
    const updatedGames = games.filter((_, index) => index !== indexToDelete);

    setGames(updatedGames);
  };

  const editGame = (index) => {
    setEditingIndex(index);
  };

  return (
    <DashboardLayout>
      <h1 className="text-white mb-4">My Stats</h1>

      <StatsForm
        addGame={addGame}
        games={games}
        setGames={setGames}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
      />

      <StatsTable games={games} deleteGame={deleteGame} editGame={editGame} />
    </DashboardLayout>
  );
};

export default MyStatsPage;
