import React from 'react';
import styled from 'styled-components';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaRetweet } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';
const Trust = () => {
  return (
    <Wrapper>
      <div className='container'>
        <div className='trust'>
          <div className='row'>
            <div className='col-12 col-sm-4'>
              <div className='fast-delivery div-wrap'>
                <span className='icon-wrap'>
                  <TbTruckDelivery className='icon' />
                </span>
                <div className='info'>
                  <h3>Fast Delivery</h3>
                  <p>Product delivery within 3-5 days</p>
                </div>
              </div>
            </div>
            <div className='col-12 col-sm-4'>
              <div className='safe-payment div-wrap'>
                <span className='icon-wrap'>
                  <BiDollar className='icon' />
                </span>
                <div className='info'>
                  <h3>Safe Payment</h3>
                  <p>payment information will be secure</p>
                </div>
              </div>
            </div>
            <div className='col-12 col-sm-4'>
              <div className='easy-return div-wrap'>
                <span className='icon-wrap'>
                  <FaRetweet className='icon' />
                </span>
                <div className='info'>
                  <h3>Easy Return</h3>
                  <p>3 days returns are available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #fff4ea;
  .container {
    .trust {
      padding: 50px 0;
      .row {
        .div-wrap {
          margin: 10px 0;
          display: flex;
          justify-content: start;
          align-items: center;
          .icon-wrap {
            margin-right: 10px;
            .icon {
              width: 100px;
              height: 100px;
              padding: 15px;
              background: #ffffff;
              border-radius: 100%;
              color: #ff9736;
            }
          }
          .info {
            h3 {
              text-transform: uppercase;
              font-size: 20px;
              font-weight: bold;
            }
            p {
              color: #555;
              font-weight: 500;
              font-size: 14px;
              text-transform: uppercase;
            }
          }
        }
        @media (max-width: 992px) {
          .div-wrap {
            .icon-wrap {
              margin-right: 7px;
              .icon {
                width: 70px;
                height: 70px;
                padding: 10px;
              }
            }
            .info {
              h3 {
                font-size: 17px;
              }
              p {
                font-size: 12px;
              }
            }
          }
        }
        @media (max-width: 768px) {
          .div-wrap {
            .icon-wrap {
              margin-right: 7px;
              .icon {
                width: 70px;
                height: 70px;
                padding: 10px;
              }
            }
            .info {
              h3 {
                font-size: 17px;
              }
              p {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
`;
export default Trust;
