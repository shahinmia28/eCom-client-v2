import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import API from '../../components/Api';
import toast from 'react-hot-toast';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../context/authContext';

const Login = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    email: '',
    address: '',
  });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${API}/api/auth/login`, {
        email: user.email,
        password: user.password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.userData,
          token: res.data.accessToken,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Something wants wrong');
      console.log(error);
    }
  };
  return (
    <>
      <Helmet>
        <meta charSet='UTF-8' />
        <meta name='description' content='login form shahin Optical' />
        <meta
          name='keywords'
          content='ecommerce, sungalss, chosma, eye glass, shahin optical'
        />
        <meta name='author' content='shahin mia' />
        <title>Login form</title>
      </Helmet>
      <Wrapper className='auth'>
        <form onSubmit={handleSubmit}>
          <h3 className='title'>Login</h3>
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
                type='password'
                name='password'
                value={user.password}
                onChange={onChange}
                className='form-control'
                placeholder='password *'
                required
              />
            </div>

            <div className='col-12 my-2'>
              <button type='submit' className='btn btn-dark login'>
                Login
              </button>
            </div>
            <div className='col-12 my-2 button-group'>
              <NavLink to={'/forget-password'}>Forget Password</NavLink>
              <NavLink to={'/register'}>Create Account</NavLink>
            </div>
          </div>
        </form>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  form {
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    width: 40%;
    box-shadow: 0 0px 10px -2px #727272;
    .title {
      color: #333;
      text-align: center;
      text-transform: uppercase;
      padding: 15px;
      font-weight: 700;
    }
    .form-control,
    .form-select,
    .btn {
      outline: none;
      border-bottom: 2px solid #f68821;
      padding: 8px;
    }

    .button-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
      .button-group {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
`;
export default Login;
