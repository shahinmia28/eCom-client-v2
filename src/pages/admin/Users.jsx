import AdminMenu from './AdminMenu';

const Users = () => {
  return (
    <div className='container-fluid p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <div className=' w-75 p-3'>All users List</div>
        </div>
      </div>
    </div>
  );
};

export default Users;
