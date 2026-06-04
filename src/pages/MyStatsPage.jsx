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
  const [selectedOpponent, setSelectedOpponent] = useState('ALL');
  const [selectedResult, setSelectedResult] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadGames = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getGames();
      setGames(response.data);
    } catch (error) {
      console.error('Error loading games:', error);
      setError('Unable to load your stats. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  const addGame = async (newGame) => {
    try {
      setError('');

      const response = await createGame(newGame);
      setGames([...games, response.data]);
    } catch (error) {
      console.error('Error creating game:', error);
      setError('Unable to add this game. Please try again.');
    }
  };

  const saveEditedGame = async (updatedGame) => {
    try {
      setError('');

      const gameToUpdate = games[editingIndex];

      const response = await updateGame(gameToUpdate.id, updatedGame);

      const updatedGames = [...games];
      updatedGames[editingIndex] = response.data;

      setGames(updatedGames);
      setEditingIndex(null);
    } catch (error) {
      console.error('Error updating game:', error);
      setError('Unable to update this game. Please try again.');
    }
  };

  const deleteGameByIndex = async (indexToDelete) => {
    try {
      setError('');

      const gameToDelete = filteredGames[indexToDelete];

      await deleteGame(gameToDelete.id);

      const updatedGames = games.filter((game) => game.id !== gameToDelete.id);

      setGames(updatedGames);
    } catch (error) {
      console.error('Error deleting game:', error);
      setError('Unable to delete this game. Please try again.');
    }
  };

  const editGame = (index) => {
    const gameToEdit = filteredGames[index];
    const realIndex = games.findIndex((game) => game.id === gameToEdit.id);

    setEditingIndex(realIndex);
  };

  const opponents = [
    ...new Set(games.map((game) => game.opponentTeam).filter(Boolean)),
  ].sort();

  const filteredGames = games.filter((game) => {
    const matchesOpponent =
      selectedOpponent === 'ALL' || game.opponentTeam === selectedOpponent;

    const matchesResult =
      selectedResult === 'ALL' || game.result === selectedResult;

    return matchesOpponent && matchesResult;
  });

  const wins = filteredGames.filter((game) => game.result === 'WIN').length;
  const losses = filteredGames.filter((game) => game.result === 'LOSS').length;

  const winPercentage =
    filteredGames.length > 0
      ? ((wins / filteredGames.length) * 100).toFixed(1)
      : 0;

  const bestGame =
    filteredGames.length > 0
      ? filteredGames.reduce((best, game) =>
          Number(game.points) > Number(best.points) ? game : best,
        )
      : null;

  return (
    <DashboardLayout>
      <h1 className="text-white mb-4">My Stats</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="card bg-dark text-white border-0 shadow p-4">
          Loading stats...
        </div>
      ) : (
        <>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card bg-dark text-white border-0 shadow p-3">
                <h6>Wins</h6>
                <h2 className="text-success">{wins}</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-dark text-white border-0 shadow p-3">
                <h6>Losses</h6>
                <h2 className="text-danger">{losses}</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-dark text-white border-0 shadow p-3">
                <h6>Win Percentage</h6>
                <h2 className="text-warning">{winPercentage}%</h2>
              </div>
            </div>
          </div>

          {bestGame && (
            <div className="card bg-dark text-white border-0 shadow p-4 mb-4">
              <h5 className="mb-3">Best Game</h5>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="text-warning mb-1">{bestGame.points} PTS</h3>

                  <p className="mb-0 text-secondary">
                    vs {bestGame.opponentTeam}{' '}
                    <span
                      className={
                        bestGame.result === 'WIN'
                          ? 'text-success'
                          : 'text-danger'
                      }
                    >
                      {bestGame.result}
                    </span>
                  </p>
                </div>

                <div className="text-end">
                  <p className="mb-1">{bestGame.assists} AST</p>
                  <p className="mb-0">{bestGame.rebounds} REB</p>
                </div>
              </div>
            </div>
          )}

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="card bg-dark text-white border-0 shadow p-3">
                <label className="form-label">Filter by Opponent</label>

                <select
                  className="form-select"
                  value={selectedOpponent}
                  onChange={(e) => setSelectedOpponent(e.target.value)}
                >
                  <option value="ALL">All opponents</option>

                  {opponents.map((opponent) => (
                    <option key={opponent} value={opponent}>
                      {opponent}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card bg-dark text-white border-0 shadow p-3">
                <label className="form-label">Filter by Result</label>

                <select
                  className="form-select"
                  value={selectedResult}
                  onChange={(e) => setSelectedResult(e.target.value)}
                >
                  <option value="ALL">All results</option>
                  <option value="WIN">Wins</option>
                  <option value="LOSS">Losses</option>
                </select>
              </div>
            </div>
          </div>

          <StatsForm
            addGame={addGame}
            saveEditedGame={saveEditedGame}
            games={games}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
          />

          <StatsTable
            games={filteredGames}
            deleteGame={deleteGameByIndex}
            editGame={editGame}
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default MyStatsPage;
