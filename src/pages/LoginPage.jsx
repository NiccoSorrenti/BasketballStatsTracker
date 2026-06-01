import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="col-md-5">
        <div className="card bg-dark text-white shadow border-0 p-4">
          <h2 className="text-center mb-4">Login</h2>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
