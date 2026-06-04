import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-white"
      style={{ backgroundColor: '#121212' }}
    >
      <h1 className="display-1 fw-bold">404</h1>

      <h3 className="mb-3">Page Not Found</h3>

      <p className="text-secondary mb-4">
        The page you are looking for does not exist.
      </p>

      <Link to="/dashboard" className="btn btn-warning">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
