import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrapper id='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-8'>
            <h6 className='text-center text-md-start'>
              All Right Reserved &copy; Store
            </h6>
          </div>
          <div className='col-12 col-md-4'>
            <div className='footer-menu'>
              <NavLink to={'/about'}>About</NavLink>
              <span>|</span>
              <NavLink to={'/contact'}>Contact</NavLink>
              <span>|</span>
              <NavLink to={'/policy'}>Privacy</NavLink>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: #1f1f1f;
  color: #b5b5b5;
  padding: 15px 0;
  .footer-menu {
    display: flex;
    justify-content: end;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    a {
      margin: 0 5px;
      text-decoration: none;
      color: inherit;
      transition: all 0.4s linear;
      &:hover {
        color: #ffffff;
        border-bottom: 1px solid #fff;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 10px 0;

    .footer-menu {
      justify-content: center;
    }
  }
`;
export default Footer;
