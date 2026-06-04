import { useState, useEffect } from 'react';

import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardCards from '../components/dashboard/DashboardCards';
import RecentGames from '../components/dashboard/RecentGames';
import PerformanceChart from '../components/charts/PerformanceChart';

import { getGames, getGamesSummary } from '../services/gameStatService';

const DashboardPage = () => {
  const [games, setGames] = useState([]);

  const [summary, setSummary] = useState({
    totalGames: 0,
    avgPoints: 0,
    avgAssists: 0,
    avgRebounds: 0,
    totalPoints: 0,
    totalAssists: 0,
    totalRebounds: 0,
    careerHighPoints: 0,
    careerHighAssists: 0,
    careerHighRebounds: 0,
    playerType: 'Rookie',
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const gamesResponse = await getGames();
        const summaryResponse = await getGamesSummary();

        setGames(gamesResponse.data);
        setSummary(summaryResponse.data);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-white mb-4">Dashboard</h1>

      <DashboardCards
        totalGames={summary.totalGames}
        avgPoints={summary.avgPoints}
        avgAssists={summary.avgAssists}
        avgRebounds={summary.avgRebounds}
        totalPoints={summary.totalPoints}
        totalAssists={summary.totalAssists}
        totalRebounds={summary.totalRebounds}
        careerHighPoints={summary.careerHighPoints}
        careerHighAssists={summary.careerHighAssists}
        careerHighRebounds={summary.careerHighRebounds}
        playerType={summary.playerType}
      />

      <PerformanceChart games={games} />

      <div className="mt-4">
        <RecentGames games={games} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
