import { useState, useEffect } from 'react';

const StatsForm = ({
  addGame,
  saveEditedGame,
  games,
  editingIndex,
  setEditingIndex,
}) => {
  const [formData, setFormData] = useState({
    points: '',
    assists: '',
    rebounds: '',
  });

  useEffect(() => {
    if (editingIndex !== null) {
      const gameToEdit = games[editingIndex];

      setFormData({
        points: gameToEdit.points,
        assists: gameToEdit.assists,
        rebounds: gameToEdit.rebounds,
      });
    }
  }, [editingIndex, games]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.points === '' ||
      formData.assists === '' ||
      formData.rebounds === ''
    ) {
      alert('Please fill all fields');
      return;
    }

    if (editingIndex !== null) {
      await saveEditedGame(formData);
    } else {
      await addGame(formData);
    }

    setFormData({
      points: '',
      assists: '',
      rebounds: '',
    });
  };

  return (
    <div className="card bg-dark text-white p-4 border-0 shadow mb-4">
      <h3 className="mb-4">
        {editingIndex !== null ? 'Edit Game Stats' : 'Add Game Stats'}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="number"
              name="points"
              placeholder="Points"
              className="form-control"
              value={formData.points}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              name="assists"
              placeholder="Assists"
              className="form-control"
              value={formData.assists}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              name="rebounds"
              placeholder="Rebounds"
              className="form-control"
              value={formData.rebounds}
              onChange={handleChange}
            />
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

                setFormData({
                  points: '',
                  assists: '',
                  rebounds: '',
                });
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
