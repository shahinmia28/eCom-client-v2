import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/authContext';
import { TbShoppingCart } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';

import { useCartContext } from '../context/cartContext';

const Header = () => {
  const [auth] = useAuth();
  const { cart } = useCartContext();

  let total_item = 0;

  cart.map((item) => {
    total_item = total_item + item.amount;
  });

  let logo = 'images/logo.png';
  let logoOnline =
    'https://res.cloudinary.com/dopxkndjf/image/upload/v1708077516/ra2aga1m0two1l79ifyn.png';
  return (
    <Wrapper>
      <nav className='navbar navbar-expand navbar-light bg-light'>
        <div className='container'>
          <Link to={'/'} className='navbar-brand'>
            <img src={logoOnline || logo} alt='logo' />
          </Link>
          <ul className='navbar-nav ms-auto'>
            {!auth.user ? (
              <>
                <li className='nav-item'>
                  <NavLink to={'/login'} className='nav-link'>
                    <CgProfile className='profile-icon icon' />
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? 'admin/profile' : 'user/profile'
                    }`}
                    className='nav-link'
                  >
                    {auth?.user?.image[0]?.url === undefined ? (
                      <CgProfile className='profile-icon icon' />
                    ) : (
                      <img
                        src={auth?.user?.image[0]?.url}
                        alt='user'
                        className='profile-img'
                      />
                    )}
                  </NavLink>
                </li>
              </>
            )}
            <li className='nav-item'>
              <NavLink to='/cart' className='nav-link'>
                <div className='cart-btn'>
                  <TbShoppingCart className='cart-icon icon' />
                  <span className='cart-total'>{total_item}</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  width: 100%;
  height: 80px;
  box-shadow: 0 8px 6px -6px #ffdbb9;
  .navbar {
    height: 100%;
    width: 100%;
    .navbar-brand {
      img {
        width: 200px;
        height: 100%;
      }
    }
    .navbar-nav {
      height: 80px;
      .nav-item {
        padding: 0;
        margin: auto 2px;
        .nav-link {
          .icon {
            font-size: 35px;
            padding: 7px;
            border-radius: 50%;
            transition: all 0.4s linear;
          }
          .profile-icon {
            color: #ff9736;
            stroke-width: 0.25;
            background: #ffe6cf;
          }
          .profile-img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            padding: 3px;
            border: 1px solid #ff9736;
            transition: all 0.4s linear;
          }

          .cart-btn {
            position: relative;
            .cart-icon {
              stroke-width: 2.2;
            }
            .cart-total {
              font-size: 10px;
              background: #ff5836;
              padding: 0px 5px;
              font-weight: 600;
              color: #fff;
              border-radius: 50%;
              position: absolute;
              top: -2px;
              right: -4px;
            }
          }

          &.active {
            .profile-icon {
              color: #ffe6cf;
              background: #ffae63;
            }
            .profile-img {
              background: #ffae63;
            }
            .cart-btn {
              .cart-icon {
                stroke-width: 2.5;
                color: #ff9c3e;
              }
            }
          }
          &:hover {
            .profile-icon {
              color: #ffe6cf;
              background: #ffae63;
            }
            .profile-img {
              background: #ffae63;
            }
            .cart-btn {
              .cart-icon {
                stroke-width: 2.5;
                color: #ff9c3e;
              }
            }
          }
        }
      }
    }
  }

  /* mobile responsive */
  @media (max-width: 768px) {
    height: 70px;
    .navbar {
      .navbar-brand {
        img {
          width: 150px;
        }
      }
      .navbar-nav {
        height: 70px;
        .nav-item {
          margin: auto 1px;
          .nav-link {
            .icon {
              margin: -3px;
            }
            .cart-btn {
              .cart-total {
                top: -6px;
                right: -6px;
              }
            }
          }
        }
      }
    }
  }
`;
export default Header;
