import { useEffect, useState } from 'react';
import { getMe } from '../../services/userService';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Basketball Stats Tracker</span>

      <div className="d-flex align-items-center gap-3">
        {user && <span className="text-white">Welcome, {user.username}</span>}

        <button
          className="btn btn-outline-warning btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
