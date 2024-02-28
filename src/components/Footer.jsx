import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/authContext';
import {
  TbCurrentLocation,
  TbMail,
  TbPhoneCall,
  TbBrandFacebook,
} from 'react-icons/tb';
import { BsWhatsapp } from 'react-icons/bs';
import { useCartContext } from '../context/cartContext';
const Footer = () => {
  const [auth] = useAuth();
  const { cart } = useCartContext();

  let total_item = 0;

  cart.map((item) => {
    total_item = total_item + item.amount;
  });

  return (
    <Wrapper id='footer'>
      <div className='container'>
        <div className='footer'>
          <div className='row'>
            <div className='col-12 col-md-4'>
              <div className='useful-link'>
                <h3 className='footer-title'>Useful Link</h3>
                <nav className='navbar'>
                  <div className='nav-group'>
                    <ul className='navbar-nav'>
                      <li className='nav-item'>
                        <NavLink to={'/'} className='nav-link'>
                          Home
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink to={'/cart'} className='nav-link'>
                          Cart ({total_item})
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink to={'/policy'} className='nav-link'>
                          Privacy Policy
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink to={'/return'} className='nav-link'>
                          Return Policy
                        </NavLink>
                      </li>
                    </ul>
                    <ul className='navbar-nav'>
                      <li className='nav-item'>
                        {auth?.user?.role === 0 ? (
                          <NavLink
                            to={`/dashboard/user/orders`}
                            className='nav-link'
                          >
                            My Orders
                          </NavLink>
                        ) : (
                          <NavLink
                            to='/dashboard/admin/orders'
                            className='nav-link'
                          >
                            All Orders
                          </NavLink>
                        )}
                      </li>
                      <li className='nav-item'>
                        <NavLink to={'/contact'} className='nav-link'>
                          Contact
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink to={'/about'} className='nav-link'>
                          About
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <div className='col-12 col-md-4'>
              <div className='contact-details'>
                <h3 className='footer-title'>Contact Info</h3>
                <ul className='info'>
                  <li>
                    <span className='icon-wrap'>
                      <TbCurrentLocation className='icon location' />
                    </span>
                    <span>Bhuapur, Tangail, Dhaka, Bangladesh </span>
                  </li>
                  <li>
                    <span className='icon-wrap'>
                      <TbMail className='icon' />
                    </span>
                    <span> store003@gmail.com </span>
                  </li>
                  <li>
                    <span className='icon-wrap'>
                      <TbPhoneCall className='icon' />
                    </span>
                    <span>0177-7296933 </span>
                  </li>
                  <li>
                    <span className='icon-wrap'>
                      <BsWhatsapp className='icon' />
                    </span>
                    <span>0177-7296933</span>
                  </li>
                  <li>
                    <span className='icon-wrap'>
                      <TbBrandFacebook className='icon' />
                    </span>
                    <span>Facebook.com/storepage</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-12 col-md-4'>
              <div className='help text-light'>
                <div className='info'>
                  <form action='#' className='form p-2'>
                    <h3>QUICK RESPONSE</h3>
                    <input
                      type='email'
                      className='form-control my-1'
                      placeholder='Email'
                      required
                    />
                    <input
                      type='number'
                      className='form-control my-1'
                      placeholder='Phone'
                      required
                    />
                    <textarea
                      name='problem'
                      rows='5'
                      className='form-control my-1'
                      placeholder='Write Your Problem'
                    ></textarea>
                    <button className='sent my-1'>SENT</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='copy-right'>
        <h6 className='text-center'>All Right Reserved by &copy; Store</h6>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: #000;
  .footer {
    .footer-title {
      color: #ffffff;
      text-transform: uppercase;
      text-align: center;
      width: 100%;
      padding-top: 30px;
    }
    .useful-link {
      padding-bottom: 40px;
      .navbar {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        .nav-group {
          display: flex;
          justify-content: space-between;
          width: 100%;
          .navbar-nav {
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            width: 50%;
            .nav-item {
              .nav-link {
                margin: 5px;
                padding: 5px;
                background: #ff9736;
                text-decoration: none;
                color: inherit;
                transition: all 0.4s linear;
                &:hover {
                  color: #ffffff;
                  border-bottom: 1px solid #fff;
                }
                &.active {
                  color: #ffffff;
                  border-bottom: 1px solid #fff;
                }
              }
            }
          }
        }
      }
    }

    .contact-details {
      padding-bottom: 40px;
      ul {
        list-style: none;
        color: #ffffff;
        li {
          padding: 3px;
          margin: 4px 0;
          display: flex;
          justify-content: flex-start;
          align-content: center;
          cursor: pointer;
          .icon-wrap {
            padding: 5px;
            background: #ff9736;
            margin: auto 0;
            .icon {
              margin: auto 0;
              font-size: 22px;
            }
          }
          span {
            margin: auto 0;
            padding: 0px 5px;
          }
          &:hover {
            span {
              text-decoration: underline;
            }
          }
        }
      }
    }
    .help {
      padding-bottom: 40px;
      .info {
        padding-top: 30px;
        .form {
          background: #ff9736;
          border-radius: 5px;
          border: 1px solid #ff9736;
          h3 {
            color: #fff;
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 20px;
            padding: 15px 0;
          }
          .form-control,
          .sent {
            border: 1px solid #fff;
            font-size: 14px;
          }
          .sent {
            background-color: #ffffff;
            color: #ff9736;
            text-align: center;
            border-radius: 5px;
            padding: 5px;
            font-weight: bold;
            width: 100%;
            transition: all 0.4s linear;
            &:hover {
              color: #ffffff;
              background: #ff9736ca;
            }
          }
        }
      }
    }
  }
  .copy-right {
    border-top: 1px solid #8c8c8c;
    background: #1f1f1f;
    color: #b5b5b5;
    padding: 15px 0;
  }
`;
export default Footer;
