import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex dashboard-container">
      <Sidebar />

      <div className="main-content flex-grow-1">
        <Navbar />

        <div className="container-fluid p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
