import DashboardLayout from '../components/layout/DashboardLayout';

const ProfilePage = () => {
  const username = localStorage.getItem('username') || 'User';

  const email = localStorage.getItem('email') || 'No email available';

  return (
    <DashboardLayout>
      <h1 className="text-white mb-4">Profile</h1>

      <div className="card bg-dark text-white border-0 shadow p-4">
        <div className="text-center mb-4">
          <img
            src="https://i.pravatar.cc/120"
            alt="avatar"
            className="rounded-circle"
          />
        </div>

        <h3 className="text-center">{username}</h3>

        <p className="text-center text-secondary">{email}</p>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
