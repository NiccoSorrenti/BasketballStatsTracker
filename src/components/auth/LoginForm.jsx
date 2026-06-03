import { useState } from 'react';
import { login } from '../../services/authService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(credentials);

      console.log('response:', response);
      console.log('response.data:', response?.data);
      console.log('token:', response?.data?.token);

      const token = response.data.token;

      localStorage.setItem('token', token);

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Email</label>

        <input
          type="email"
          name="email"
          className="form-control"
          value={credentials.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>

        <input
          type="password"
          name="password"
          className="form-control"
          value={credentials.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-warning w-100">
        Login
      </button>

      <p className="text-center mt-3 mb-0">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default LoginForm;
