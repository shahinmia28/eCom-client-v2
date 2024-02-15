import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <>
      <div className='text-center'>
        <div className='list-group'>
          <h4>Admin Panel</h4>
          <NavLink
            to='/dashboard/admin/profile'
            className='list-group-item list-group-item-action'
          >
            Profile
          </NavLink>
          <NavLink
            to='/dashboard/admin/orders'
            className='list-group-item list-group-item-action'
          >
            All Orders
          </NavLink>
          <NavLink
            to='/dashboard/admin/create-category'
            className='list-group-item list-group-item-action'
          >
            Manage Category
          </NavLink>
          <NavLink
            to='/dashboard/admin/create-product'
            className='list-group-item list-group-item-action'
          >
            Create Product
          </NavLink>
          <NavLink
            to='/dashboard/admin/all-products'
            className='list-group-item list-group-item-action'
          >
            All Products
          </NavLink>
          <NavLink
            to='/dashboard/admin/users'
            className='list-group-item list-group-item-action'
          >
            All Users
          </NavLink>
          <NavLink
            to='/dashboard/admin/create-hero-img'
            className='list-group-item list-group-item-action'
          >
            Slider Images
          </NavLink>
          <NavLink
            to='/dashboard/admin/delivery-charge'
            className='list-group-item list-group-item-action'
          >
            Delivery Charge
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
