import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');

    navigate('/');
  };

  return (
    <nav className="navbar navbar-dark custom-navbar px-4">
      <div className="container-fluid d-flex justify-content-between">
        <span className="navbar-brand mb-0 h1 text-orange">
          Basketball Stats Tracker
        </span>

        <div className="d-flex align-items-center gap-3">
          <span className="text-white">Welcome, User</span>

          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="rounded-circle"
          />

          <button
            className="btn btn-outline-warning btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
