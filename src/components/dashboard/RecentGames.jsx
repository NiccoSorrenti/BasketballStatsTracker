const RecentGames = ({ games }) => {
  const recentGames = [...games].reverse().slice(0, 5);

  return (
    <div className="card bg-dark text-white border-0 shadow p-4">
      <h4 className="mb-4">Recent Games</h4>

      {recentGames.length === 0 ? (
        <p className="text-secondary mb-0">No recent games.</p>
      ) : (
        <ul className="list-group list-group-flush">
          {recentGames.map((game) => (
            <li
              key={game.id}
              className="list-group-item bg-dark text-white border-secondary"
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>vs {game.opponentTeam}</strong>

                  <span
                    className={`ms-2 fw-bold ${
                      game.result === 'WIN' ? 'text-success' : 'text-danger'
                    }`}
                  >
                    {game.result}
                  </span>
                </div>

                <span>
                  {game.points} PTS • {game.assists} AST • {game.rebounds} REB
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentGames;
