import { useState } from 'react';
import { register } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    if (!userData.username || !userData.email || !userData.password) {
      setErrorMessage('Please fill all fields.');
      return;
    }

    if (!passwordRegex.test(userData.password)) {
      setErrorMessage(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.',
      );
      return;
    }

    try {
      await register(userData);

      setSuccessMessage('Account created successfully. You can now log in.');

      setUserData({
        username: '',
        email: '',
        password: '',
      });

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      const backendMessage = error.response?.data?.message;

      if (backendMessage === 'Username already exists') {
        setErrorMessage('Username already exists.');
      } else if (backendMessage === 'Email already exists') {
        setErrorMessage('Email already exists.');
      } else {
        setErrorMessage('Unable to create account. Please try again.');
      }
    }
  };

  return (
    <>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-3">
          <label className="form-label">Username</label>

          <input
            type="text"
            name="username"
            className="form-control"
            value={userData.username}
            onChange={handleChange}
            required
            autoComplete="off"
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
            required
            autoComplete="off"
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
            required
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="btn btn-warning w-100">
          Register
        </button>

        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
