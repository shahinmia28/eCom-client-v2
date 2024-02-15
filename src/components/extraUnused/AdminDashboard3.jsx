import { useState } from 'react';
import CreateCategory from '../../pages/admin/CreateCategory';
import Products from '../../pages/admin/Products';
import Users from '../../pages/admin/Users';
import Profile from '../../pages/user/Profile';
import CreateProduct from '../../pages/admin/CreateProduct';

const AdminDashboard = () => {
  const [data, setData] = useState('profile-data');

  return (
    <div className='container-fluid p-3'>
      <div className='row m-3'>
        <div className='col-12 col-md-3'>
          <div className='text-center'>
            <div className='list-group'>
              <h4>Admin Panel</h4>
              <button
                onClick={() => setData('profile-data')}
                className='list-group-item list-group-item-action'
              >
                Profile
              </button>
              <button
                onClick={() => setData('createcategory')}
                className='list-group-item list-group-item-action'
              >
                Create Category
              </button>
              <button
                onClick={() => setData('createproduct')}
                className='list-group-item list-group-item-action'
              >
                Create Product
              </button>
              <button
                onClick={() => setData('products')}
                className='list-group-item list-group-item-action'
              >
                All Products
              </button>
              <button
                onClick={() => setData('users')}
                className='list-group-item list-group-item-action'
              >
                All Users
              </button>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-9'>
          <div className='admin-page'>
            {data === 'profile-data' ? <Profile /> : ''}
            {data === 'createcategory' ? <CreateCategory /> : ''}
            {data === 'createproduct' ? <CreateProduct /> : ''}
            {data === 'products' ? <Products /> : ''}
            {data === 'users' ? <Users /> : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
