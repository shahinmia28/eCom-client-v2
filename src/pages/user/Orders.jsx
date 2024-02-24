import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import API from '../../components/Api';
import moment from 'moment';
import toast from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import styled from 'styled-components';
import ProductPrice from '../../components/ProductPrice';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  console.log(orders);
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${API}/api/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelOrder = async (_id) => {
    try {
      const { data } = await axios.delete(
        `${API}/api/product/cancel-order/${_id}`
      );
      toast.success(data?.message);
      if (auth?.token) getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Wrapper>
      <div className='container'>
        {orders?.length === 0 ? (
          <div className='item-not-found text-muted'>
            <h4>No Order Found </h4>
          </div>
        ) : (
          <>
            {orders?.map((o, i) => {
              return (
                <div
                  key={i}
                  className='border shadow my-4 p-3'
                  style={{ borderRadius: '5px' }}
                >
                  <div className='container'>
                    <div className='row'>
                      <div className='col-12 col-lg-4'>
                        <div className='mb-3'>
                          <div className='my-2 text-center border'>
                            <h5>Order Details</h5>
                          </div>
                          <div className='d-flex my-2  align-items-center justify-content-start border'>
                            <span className='p-2 fw-bold'>Status:</span>
                            <span className='p-2 text-capitalize'>
                              {o?.status}
                            </span>
                          </div>

                          <div className='d-flex my-2  align-items-center justify-content-start border'>
                            <span className='p-2 fw-bold'>Order Date :</span>
                            <span className='p-2'>
                              <span>{moment(o?.createdAt).fromNow()} </span>
                              {' / '}
                              <span className='fw-bold text-primary fst-italic'>
                                {o?.createdAt.slice(0, 10)}
                              </span>
                            </span>
                          </div>
                          <div className='d-flex my-2  align-items-center justify-content-start border'>
                            <span className='p-2 fw-bold'>Total Price:</span>
                            <span className='price text-danger fw-bold bangla'>
                              ৳{o?.totalPrice}
                            </span>
                          </div>
                          <div className='d-flex my-2  align-items-center justify-content-start border'>
                            <span className='p-2 fw-bold'>Payment:</span>
                            <span className='p-2'>
                              {o?.payment ? (
                                <>
                                  <span style={{ fontSize: '12px' }}>
                                    SUCCESS
                                  </span>
                                  <br />
                                  <span style={{ fontSize: '12px' }}>
                                    TRX_ID: {o?.transaction_id}
                                  </span>
                                </>
                              ) : (
                                'Cash On Delivery'
                              )}
                            </span>
                          </div>
                          <div className='d-flex my-2  align-items-center justify-content-start border'>
                            <span className='p-2 fw-bold'>Address :</span>
                            <span className='p-2 '>{auth?.user?.address} </span>
                          </div>
                          <div className='cancel-btn'>
                            <RxCross2
                              className='cancel'
                              onClick={() => handleCancelOrder(o?._id)}
                              disabled={
                                o?.status === 'Shipped' ||
                                o?.status === 'Delivered'
                              }
                            />
                            <br />
                            <span>
                              {o?.status === 'Shipped' ||
                              o?.status === 'Delivered'
                                ? `You can't cancel this order right now. Your product is already ${o?.status}. Now you can return from your door. Thanks `
                                : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-8 '>
                        {o?.products?.map((p, i) => {
                          return (
                            <div className='card my-2' key={i}>
                              <div className='row'>
                                <div className='col-4 col-md-3'>
                                  <img
                                    src={p?.product?.images[0]?.url}
                                    alt={p?.product.name}
                                    width='100px'
                                    height='100px'
                                    className='m-1 border'
                                  />
                                </div>
                                <div className='col-8 col-md-9'>
                                  <div className='card-body'>
                                    <h6 className='text-capitalize'>
                                      {p?.product.name}
                                    </h6>
                                    <div className='py-2 d-flex justify-content-between align-items-center fw-bold text-capitalize'>
                                      <div className='price-div'>
                                        <ProductPrice
                                          price={p?.product?.price}
                                          discount={p?.product?.discount}
                                          sell_price={p?.product?.sell_price}
                                        />
                                      </div>
                                      <span>color: {p?.product.color}</span>
                                      <span>QTY: {p?.amount}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 90vh;
  .item-not-found {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .price-div {
    max-width: fit-content;
    display: flex;
    text-align: start;
  }
  .cancel-btn {
    width: 100%;
    text-align: start;
    .cancel {
      color: red;
      border-radius: 3px;
      padding: 5px;
      font-size: 30px;
      cursor: pointer;
      transition: all 0.4s linear;
      &:hover {
        background: red;
        color: #fff;
      }
    }
  }
`;
export default Orders;
