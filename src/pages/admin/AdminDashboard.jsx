import AdminMenu from './AdminMenu';
import Profile from '../Profile';

const AdminDashboard = () => {
  return (
    <div className='container-fluid p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
