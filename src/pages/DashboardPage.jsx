import { useState, useEffect } from 'react';

import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardCards from '../components/dashboard/DashboardCards';
import RecentGames from '../components/dashboard/RecentGames';
import PerformanceChart from '../components/charts/PerformanceChart';

import { getGames } from '../services/gameStatService';

const DashboardPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const response = await getGames();
        setGames(response.data);
      } catch (error) {
        console.error('Error loading games:', error);
      }
    };

    loadGames();
  }, []);

  const totalGames = games.length;

  const avgPoints =
    totalGames > 0
      ? (
          games.reduce((sum, game) => sum + Number(game.points), 0) / totalGames
        ).toFixed(1)
      : 0;

  const avgAssists =
    totalGames > 0
      ? (
          games.reduce((sum, game) => sum + Number(game.assists), 0) /
          totalGames
        ).toFixed(1)
      : 0;

  const avgRebounds =
    totalGames > 0
      ? (
          games.reduce((sum, game) => sum + Number(game.rebounds), 0) /
          totalGames
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
