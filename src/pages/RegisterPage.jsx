import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="col-md-5">
        <div className="card bg-dark text-white shadow border-0 p-4">
          <h2 className="text-center mb-4">Register</h2>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
