const StatsTable = ({ games, deleteGame, editGame }) => {
  if (games.length === 0) {
    return (
      <div className="card bg-dark text-white p-4">
        <h3>My Games</h3>

        <p className="text-secondary mb-0">No games added yet.</p>
      </div>
    );
  }
  return (
    <div className="card bg-dark text-white p-4 border-0 shadow">
      <h3 className="mb-4">My Games</h3>

      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>Points</th>
            <th>Assists</th>
            <th>Rebounds</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {games.map((game, index) => (
            <tr key={index}>
              <td>{game.points}</td>
              <td>{game.assists}</td>
              <td>{game.rebounds}</td>

              <td className="d-flex gap-2">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => editGame(index)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteGame(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;
