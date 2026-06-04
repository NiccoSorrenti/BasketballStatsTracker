import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div
      className="vh-100 bg-dark d-flex align-items-center justify-content-center"
      // style={{ backgroundColor: '#121212' }}
    >
      <div className="col-md-5">
        <div className="card bg-dark text-white shadow border-0 p-4">
          <div className="text-center mb-4">
            <h1 className="fw-bold text-warning mb-2">
              Basketball Stats Tracker
            </h1>
          </div>

          <h2 className="text-center mb-4">Login</h2>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
