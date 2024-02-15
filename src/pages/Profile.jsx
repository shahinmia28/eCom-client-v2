import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import API from '../components/Api';
import { Modal } from 'antd';
import { useAuth } from '../context/authContext';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Profile = () => {
  // update password
  const [visible, setVisible] = useState(false);
  const [changeEmailBoxVisible, setChangeEmailBoxVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${API}/api/auth/profile-update`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.success) {
        setAuth({ ...auth, userData: data?.updatedUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.userData = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success(data?.message);
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  // handle update password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${API}/api/auth/password-update`, {
        email,
        oldPassword,
        newPassword,
      });
      if (data?.success) {
        toast.success(data?.message);
        setVisible(false);
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${API}/api/auth/email-change`, {
        email,
        password,
        newEmail,
      });
      if (data?.success) {
        setAuth({ ...auth, userData: data?.updatedUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.userData = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success(data?.message);
        setChangeEmailBoxVisible(false);
        window.location.reload();
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  const HandleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  };

  return (
    <Wrapper className='profile'>
      <div className='container'>
        <div className='m-auto p-3 profile-container'>
          <div className='card p-4'>
            <div className='form-container'>
              <form>
                <h4 className='form-title'>Profile</h4>
                <div className='input-item-box'>
                  <label htmlFor='name' className='form-label '>
                    Full Name:
                  </label>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='form-control'
                    placeholder='Enter Your Name'
                  />
                </div>
                <div className='input-item-box'>
                  <label htmlFor='email' className='form-label'>
                    Email:
                  </label>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='form-control'
                    placeholder='Enter Your Email '
                    disabled
                  />
                  <span
                    className='change-email link-primary'
                    onClick={() => setChangeEmailBoxVisible(true)}
                  >
                    Change
                  </span>
                </div>
                <div className='input-item-box'>
                  <label htmlFor='phone' className='form-label'>
                    Phone:
                  </label>
                  <input
                    type='text'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className='form-control'
                    placeholder='Enter Your Phone'
                  />
                </div>
                <div className='input-item-box'>
                  <label htmlFor='address' className='form-label'>
                    Address:
                  </label>
                  <input
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className='form-control'
                    placeholder='Enter Your Address'
                  />
                </div>
              </form>

              <div className='mt-3 d-flex justify-content-between'>
                <button
                  type='submit'
                  onClick={handleSubmit}
                  className='btn btn-outline-secondary '
                >
                  UPDATE
                </button>
                <button
                  className='btn btn-outline-secondary'
                  onClick={() => setVisible(true)}
                >
                  RESET PASSWORD
                </button>
              </div>
              <div className='mt-4 d-flex justify-content-right'>
                <NavLink
                  to={'/login'}
                  onClick={HandleLogout}
                  className='btn btn-outline-danger'
                >
                  Logout
                </NavLink>
              </div>
              {/* Password Change box */}

              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                open={visible}
                width={500}
              >
                <>
                  <form onSubmit={handleUpdatePassword}>
                    <h4 className='form-title'>Reset Password</h4>
                    <div className='mb-3'>
                      <label htmlFor='email' className='form-label'>
                        Email:
                      </label>
                      <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='form-control'
                        placeholder='Enter Your Email'
                        required
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='password' className='form-label'>
                        Old Password:
                      </label>
                      <input
                        name='old password'
                        type='password'
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className='form-control'
                        placeholder='Old Password'
                        required
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='address' className='form-label'>
                        New Password:
                      </label>
                      <input
                        type='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className='form-control'
                        placeholder='New Password'
                        required
                      />
                    </div>
                    <button type='submit' className='btn btn-primary'>
                      Update
                    </button>
                  </form>
                </>
              </Modal>
              {/* Email Change box */}
              <Modal
                onCancel={() => setChangeEmailBoxVisible(false)}
                footer={null}
                open={changeEmailBoxVisible}
                width={500}
              >
                <>
                  <form onSubmit={handleChangeEmail}>
                    <h4 className='form-title'>Change Email</h4>
                    <div className='mb-3'>
                      <label htmlFor='email' className='form-label'>
                        New Email:
                      </label>
                      <input
                        type='email'
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className='form-control'
                        placeholder='New Email'
                        required
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='password' className='form-label'>
                        Password:
                      </label>
                      <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='form-control'
                        placeholder='Password'
                        required
                      />
                    </div>

                    <button type='submit' className='btn btn-primary'>
                      Change
                    </button>
                  </form>
                </>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 90vh;
  .profile-container {
    max-width: 800px;
    .card {
      .form-container {
        .input-item-box {
          display: flex;
          justify-content: start;
          align-items: center;
          margin: 15px 0;
          border-radius: 5px;
          border: 1px solid #d3d3d3;
          label {
            width: 120px;
            font-weight: 500;
            margin: 0;
            padding: 5px;
          }
          input {
            padding: 5px;
            margin: 0;
            border: none;
          }
          .change-email {
            cursor: pointer;
            padding: 5px;
          }
        }
      }
    }
  }
`;
export default Profile;
