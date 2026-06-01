import { useState, useEffect } from 'react';

import DashboardLayout from '../components/layout/DashboardLayout';

import DashboardCards from '../components/dashboard/DashboardCards';

import RecentGames from '../components/dashboard/RecentGames';

import PerformanceChart from '../components/charts/PerformanceChart';

const DashboardPage = () => {
  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem('games');

    console.log('Games caricati dal localStorage:', savedGames);

    return savedGames ? JSON.parse(savedGames) : [];
  });

  // Salva automaticamente ogni modifica
  useEffect(() => {
    localStorage.setItem('games', JSON.stringify(games));
  }, [games]);

  const totalGames = games.length;

  const avgPoints =
    games.length > 0
      ? (
          games.reduce((sum, game) => sum + Number(game.points), 0) /
          games.length
        ).toFixed(1)
      : 0;

  const avgAssists =
    games.length > 0
      ? (
          games.reduce((sum, game) => sum + Number(game.assists), 0) /
          games.length
        ).toFixed(1)
      : 0;

  const avgRebounds =
    games.length > 0
      ? (
          games.reduce((sum, game) => sum + Number(game.rebounds), 0) /
          games.length
        ).toFixed(1)
      : 0;

  return (
    <DashboardLayout>
      <h1 className="text-white mb-4">Dashboard</h1>

      <DashboardCards
        totalGames={totalGames}
        avgPoints={avgPoints}
        avgAssists={avgAssists}
        avgRebounds={avgRebounds}
      />

      <PerformanceChart games={games} />

      <div className="mt-4">
        <RecentGames games={games} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
