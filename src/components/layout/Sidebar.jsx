import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column p-4">
      <h2 className="text-orange fw-bold mb-5">BST</h2>

      <ul className="nav flex-column gap-3">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? 'nav-link text-warning fw-bold' : 'nav-link text-white'
            }
          >
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/mystats"
            className={({ isActive }) =>
              isActive ? 'nav-link text-warning fw-bold' : 'nav-link text-white'
            }
          >
            My Stats
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? 'nav-link text-warning fw-bold' : 'nav-link text-white'
            }
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
