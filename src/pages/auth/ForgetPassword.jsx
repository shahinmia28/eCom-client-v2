import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import API from '../../components/Api';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    answer: '',
    newPassword: '',
  });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${API}/api/auth/forget-password`, {
        email: user.email,
        answer: user.answer,
        newPassword: user.newPassword,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error('Something wants wrong');
      console.log(error);
    }
  };
  return (
    <Wrapper className='auth'>
      <form onSubmit={handleSubmit}>
        <h2 className='title'>Reset Password </h2>
        <div className='mb-3 row'>
          <div className='col-12 my-2'>
            <input
              type='email'
              name='email'
              value={user.email}
              onChange={onChange}
              className='form-control'
              placeholder={`example@gmail.com *`}
              required
            />
          </div>

          <div className='col-12 my-2'>
            <input
              type='text'
              name='answer'
              value={user.answer}
              onChange={onChange}
              className='form-control'
              placeholder='What is your favorite sport?'
              required
            />
          </div>

          <div className='col-12 my-2'>
            <input
              type='password'
              name='newPassword'
              value={user.newPassword}
              onChange={onChange}
              className='form-control'
              placeholder='newPassword *'
              required
            />
          </div>

          <div className='col-12 my-2'>
            <button type='submit' className='btn btn-dark login'>
              Reset
            </button>
          </div>
          <div className='col-12 my-2 button-group'>
            <NavLink to={'/login'}>Back</NavLink>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  form {
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    width: 40%;
    box-shadow: 0 0px 10px -2px #333;
    .title {
      text-transform: uppercase;
      color: #333;
      text-align: center;
      padding: 15px;
    }
    .form-control,
    .form-select,
    .btn {
      outline: none;
      border-bottom: 2px solid #f68821;
      padding: 8px;
    }
    .button-group {
      text-align: center;
      a {
        color: #333;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  /* small screen */
  @media (max-width: 772px) {
    form {
      width: 85%;
      padding: 15px;
    }
  }
  /* extra small screen */
  @media (max-width: 400px) {
    form {
      width: 85%;
      padding: 10px 15px;
    }
  }
`;
export default ForgetPassword;
