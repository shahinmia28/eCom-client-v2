import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import API from '../components/Api';
import { Modal } from 'antd';
import { useAuth } from '../context/authContext';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { spaceChildren } from 'antd/es/button';
import { FaCamera } from 'react-icons/fa';

const Profile = () => {
  // update password
  const [visible, setVisible] = useState(false);
  const [changeEmailBoxVisible, setChangeEmailBoxVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  //context
  const [auth, setAuth] = useAuth();
  const [userImg, setUserImg] = useState('');

  //state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState('');

  //get user data
  useEffect(() => {
    const { email, name, phone, address, image } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
    setUserImg(image[0]?.url);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.append('name', name);
      userData.append('phone', phone);
      userData.append('address', address);

      if (photo) {
        userData.append('image', photo);
      }

      const { data } = await axios.put(
        `${API}/api/auth/profile-update`,
        userData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
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
                <div className='photo-section'>
                  <label className='photo-btn'>
                    {photo ? (
                      <img src={URL.createObjectURL(photo)} alt='user_photo' />
                    ) : userImg !== undefined ? (
                      <img src={userImg} alt='user' />
                    ) : (
                      <span>
                        <FaCamera size={25} />
                      </span>
                    )}
                    <input
                      type='file'
                      name='image'
                      accept='image/*'
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                      required
                    />
                    <span className='camera'>
                      <FaCamera size={25} />
                    </span>
                  </label>
                </div>
                <div className='input-item-box'>
                  <label htmlFor='name' className='form-label '>
                    User Name:
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
              <div className='button-container'>
                <button
                  className='btn btn-outline-secondary'
                  onClick={() => setVisible(true)}
                >
                  RESET PASSWORD
                </button>
                <NavLink
                  to={'/login'}
                  onClick={HandleLogout}
                  className='btn btn-outline-danger'
                >
                  Logout
                </NavLink>
              </div>
              <div className='mt-4 d-flex justify-content-end'>
                <button
                  type='submit'
                  onClick={handleSubmit}
                  className='order-btn'
                >
                  SAVE
                </button>
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
        .photo-section {
          .photo-btn {
            border: 1px solid #f68821;
            height: 150px;
            width: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            padding: 5px;
            margin: auto;
            cursor: pointer;
            transition: all 0.4s linear;
            border-radius: 100%;
            overflow: hidden;
            position: relative;
            .camera {
              position: absolute;
              opacity: 0;
              transition: all 0.4s linear;
            }
            img {
              border-radius: 100%;
              width: 100%;
              height: 100%;
              opacity: 1;
              transition: all 0.4s linear;
            }
            :hover {
              background: #ffe1c5;
              .camera {
                opacity: 1;
              }
              img {
                opacity: 0.5;
              }
            }
          }
        }
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
        .button-container {
          display: flex;
          flex-direction: column;
          .btn {
            margin: 5px 0;
            text-transform: uppercase;
            width: 200px;
          }
        }
      }
    }
  }
`;
export default Profile;
