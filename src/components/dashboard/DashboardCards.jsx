const DashboardCards = ({
  totalGames,
  avgPoints,
  avgAssists,
  avgRebounds,
  totalPoints,
  totalAssists,
  totalRebounds,
  careerHighPoints,
  careerHighAssists,
  careerHighRebounds,
  playerType,
}) => {
  return (
    <div className="row g-4 mb-4">
      <div className="col-md-12">
        <div className="card bg-dark text-white border-0 shadow p-4 text-center">
          <h6>Player Type</h6>
          <h2 className="text-warning">{playerType}</h2>
        </div>
      </div>

      {/* MEDIE */}

      <div className="col-md-3">
        <div className="card bg-dark text-white border-0 shadow p-3">
          <h6>Total Games</h6>
          <h2>{totalGames}</h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card bg-dark text-white border-0 shadow p-3">
          <h6>Avg Points</h6>
          <h2>{avgPoints}</h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card bg-dark text-white border-0 shadow p-3">
          <h6>Avg Assists</h6>
          <h2>{avgAssists}</h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card bg-dark text-white border-0 shadow p-3">
          <h6>Avg Rebounds</h6>
          <h2>{avgRebounds}</h2>
        </div>
      </div>

      {/* TOTALI */}

      <div className="col-md-4">
        <div className="card bg-dark text-white border-0 shadow p-3">
          <h6>Total Points</h6>
          <h2>{totalPoints}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card bg-dark text-white border-0 shadow p-3">
          <h6>Total Assists</h6>
          <h2>{totalAssists}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card bg-dark text-white border-0 shadow p-3">
          <h6>Total Rebounds</h6>
          <h2>{totalRebounds}</h2>
        </div>
      </div>

      {/* CAREER HIGHS */}

      <div className="col-md-4">
        <div className="card bg-dark text-white border-0 shadow p-3">
          <h6>Career High Points</h6>
          <h2>{careerHighPoints}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card bg-dark text-white border-0 shadow p-3">
          <h6>Career High Assists</h6>
          <h2>{careerHighAssists}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card bg-dark text-white border-0 shadow p-3">
          <h6>Career High Rebounds</h6>
          <h2>{careerHighRebounds}</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
