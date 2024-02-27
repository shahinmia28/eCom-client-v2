import axios from 'axios';
import AdminMenu from './AdminMenu';
import API from '../../components/Api';
import { useEffect, useState } from 'react';

const Users = () => {
  const [allUser, setAllUser] = useState('');
  const getAllUser = async () => {
    const { data } = await axios.get(`${API}/api/auth/get-all`);
    setAllUser(data);
  };

  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <div className='container-fluid p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <div className=' w-75 p-3'>All users List</div>
          <div className='user-list'>{JSON.stringify(allUser, null, 2)}</div>
        </div>
      </div>
    </div>
  );
};

export default Users;
