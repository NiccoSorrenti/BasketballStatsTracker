import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMe } from '../services/userService';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <h3 className="text-white">Loading profile...</h3>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <h3 className="text-white">No user data available</h3>
      </DashboardLayout>
    );
  }

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

        <h3 className="text-center">{user.username}</h3>

        <p className="text-center text-secondary">{user.email}</p>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
