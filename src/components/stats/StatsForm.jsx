import { useState, useEffect } from 'react';

const nbaTeams = [
  'Atlanta Hawks',
  'Boston Celtics',
  'Brooklyn Nets',
  'Charlotte Hornets',
  'Chicago Bulls',
  'Cleveland Cavaliers',
  'Dallas Mavericks',
  'Denver Nuggets',
  'Detroit Pistons',
  'Golden State Warriors',
  'Houston Rockets',
  'Indiana Pacers',
  'LA Clippers',
  'Los Angeles Lakers',
  'Memphis Grizzlies',
  'Miami Heat',
  'Milwaukee Bucks',
  'Minnesota Timberwolves',
  'New Orleans Pelicans',
  'New York Knicks',
  'Oklahoma City Thunder',
  'Orlando Magic',
  'Philadelphia 76ers',
  'Phoenix Suns',
  'Portland Trail Blazers',
  'Sacramento Kings',
  'San Antonio Spurs',
  'Toronto Raptors',
  'Utah Jazz',
  'Washington Wizards',
];

const StatsForm = ({
  addGame,
  saveEditedGame,
  games,
  editingIndex,
  setEditingIndex,
}) => {
  const [formData, setFormData] = useState({
    points: 0,
    assists: 0,
    rebounds: 0,
    opponentTeam: '',
    result: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (editingIndex !== null) {
      const gameToEdit = games[editingIndex];

      setFormData({
        points: gameToEdit.points,
        assists: gameToEdit.assists,
        rebounds: gameToEdit.rebounds,
        opponentTeam: gameToEdit.opponentTeam || '',
        result: gameToEdit.result || '',
      });

      setErrorMessage('');
      setSuccessMessage('');
    }
  }, [editingIndex, games]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrorMessage('');
    setSuccessMessage('');

    if (name === 'points' || name === 'assists' || name === 'rebounds') {
      const numericValue = Math.max(0, Number(value));

      setFormData({
        ...formData,
        [name]: numericValue,
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      points: 0,
      assists: 0,
      rebounds: 0,
      opponentTeam: '',
      result: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    if (formData.opponentTeam === '' || formData.result === '') {
      setErrorMessage('Please select opponent team and result.');
      return;
    }

    if (
      Number(formData.points) < 0 ||
      Number(formData.assists) < 0 ||
      Number(formData.rebounds) < 0
    ) {
      setErrorMessage('Stats cannot be negative.');
      return;
    }

    if (editingIndex !== null) {
      await saveEditedGame(formData);
      setSuccessMessage('Game stats updated successfully.');
    } else {
      await addGame(formData);
      setSuccessMessage('Game stats added successfully.');
    }

    resetForm();
  };

  return (
    <div className="card bg-dark text-white p-4 border-0 shadow mb-4">
      <h3 className="mb-4">
        {editingIndex !== null ? 'Edit Game Stats' : 'Add Game Stats'}
      </h3>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Points</label>

            <input
              type="number"
              name="points"
              className="form-control"
              value={formData.points}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Assists</label>

            <input
              type="number"
              name="assists"
              className="form-control"
              value={formData.assists}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Rebounds</label>

            <input
              type="number"
              name="rebounds"
              className="form-control"
              value={formData.rebounds}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Opponent Team</label>

            <select
              name="opponentTeam"
              className="form-select"
              value={formData.opponentTeam}
              onChange={handleChange}
            >
              <option value="">Select Team</option>

              {nbaTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Result</label>

            <select
              name="result"
              className="form-select"
              value={formData.result}
              onChange={handleChange}
            >
              <option value="">Select Result</option>
              <option value="WIN">Win</option>
              <option value="LOSS">Loss</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button className="btn btn-warning">
            {editingIndex !== null ? 'Update Stats' : 'Add Stats'}
          </button>

          {editingIndex !== null && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingIndex(null);
                resetForm();
                setErrorMessage('');
                setSuccessMessage('');
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StatsForm;
