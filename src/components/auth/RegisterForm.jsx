import { useState } from 'react';
import { register } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!userData.username || !userData.email || !userData.password) {
      setError('Compila tutti i campi');
      return;
    }

    if (!passwordRegex.test(userData.password)) {
      setError(
        'Password non valida (min 8 char, maiuscola, minuscola, numero, simbolo)',
      );
      return;
    }

    try {
      setLoading(true);

      const response = await register(userData);

      console.log('REGISTER OK:', response.data);

      // NON salvare password in locale
      // eventualmente puoi salvare solo email o token (quando avrai JWT)

      alert('Registrazione completata! Ora fai login');

      navigate('/');
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || 'Errore durante la registrazione',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          name="username"
          className="form-control"
          value={userData.username}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={userData.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={userData.password}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="btn btn-warning w-100"
        disabled={loading}
      >
        {loading ? 'Registrazione...' : 'Register'}
      </button>

      <p className="text-center mt-3 mb-0">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
