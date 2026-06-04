import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
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

          <h2 className="text-center mb-4">Register</h2>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
