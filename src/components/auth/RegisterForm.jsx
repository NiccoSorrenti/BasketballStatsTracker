import { useState } from 'react';
import { register } from '../../services/authService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await register(userData);

  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    // localStorage.setItem('username', userData.username);
    // localStorage.setItem('email', userData.email);

    if (!userData.username || !userData.email || !userData.password) {
      alert('Please fill all fields');

      return;
    }

    if (!passwordRegex.test(userData.password)) {
      alert(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.',
      );

      return;
    }

    localStorage.setItem('registeredUser', JSON.stringify(userData));

    alert('Registration successful');

    setUserData({
      username: '',
      email: '',
      password: '',
    });

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit" className="btn btn-warning w-100">
        Register
      </button>

      <p className="text-center mt-3 mb-0">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
