import SummaryCard from './SummaryCard';

const DashboardCards = ({ totalGames, avgPoints, avgAssists, avgRebounds }) => {
  return (
    <div className="row g-4 mb-4">
      <SummaryCard title="Games Played" value={totalGames} />

      <SummaryCard title="Avg Points" value={avgPoints} />

      <SummaryCard title="Avg Assists" value={avgAssists} />

      <SummaryCard title="Avg Rebounds" value={avgRebounds} />
    </div>
  );
};

export default DashboardCards;
