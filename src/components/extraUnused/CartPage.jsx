import { useCart } from '../../context/cartContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import API from '../Api';
import toast from 'react-hot-toast';
import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';
import { Radio } from 'antd';
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [paymentValue, setPaymentValue] = useState(1);

  const onChange = (e) => {
    setPaymentValue(e.target.value);
  };
  // sub total Price
  let subtotal = 0;
  cart?.map((item) => {
    subtotal = subtotal + item.price;
  });

  // shipping Fee
  let shippingFee = 60;
  // total price
  let totalPrice = subtotal + shippingFee;

  // handle check out
  const handleCheckOutWithPayment = async () => {
    try {
      const { data } = await axios.post(`${API}/api/product/order-checkout`, {
        product: cart,
        user: auth.user,
        totalPrice: totalPrice,
      });
      // console.log(data);
      if (data) {
        window.location.replace(data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // handle check out
  const handleCheckOutWithOutPayment = async () => {
    try {
      const { data } = await axios.post(
        `${API}/api/product/order-checkout-without-payment`,
        {
          product: cart,
          user: auth.user,
          totalPrice: totalPrice,
        }
      );
      // console.log(data);
      if (data?.success) {
        localStorage.removeItem('cart');
        setCart([]);
        navigate('/dashboard/user/orders');
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //delate item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            <div className='border card my-3 p-2'>
              {cart?.length
                ? `(Total ${cart.length} item${
                    cart.length > 1 ? 's are ' : ' is '
                  }available in your cart )${
                    auth?.token ? '' : ' Please login to checkout'
                  }`
                : ' Your Cart Is Empty'}
            </div>

            {cart?.map((p, i) => (
              <div key={i} className='card my-2 p-2'>
                <div className='row'>
                  <div className='col-md-2 m-auto'>
                    <img
                      src={`${API}/api/product/product-photo/${p._id}`}
                      width='100px'
                      height='100px'
                      alt={p.name}
                      className='border'
                    />
                  </div>
                  <div className='col-md-7 m-auto'>
                    <div className='card-body p-1'>
                      <h5 className='text-capitalize'>{p.name}</h5>
                      <p>{p.description.substring(0, 30)}...</p>
                      <p className='price text-danger fw-bold'>
                        {p.price.toLocaleString('bn-bd', {
                          style: 'currency',
                          currency: 'BDT',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className='col-md-3 m-auto'>
                    <button
                      className='btn btn-danger w-100'
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='col-md-4 '>
            <div className='card p-3 my-3'>
              <h4>Order Summary</h4>
              <hr />
              <div>
                <p className='d-flex justify-content-between'>
                  <span>
                    Subtotal{' '}
                    {`(${cart.length} item${cart.length > 1 ? 's' : ''})`}
                  </span>{' '}
                  <span>
                    {subtotal.toLocaleString('bn-bd', {
                      style: 'currency',
                      currency: 'BDT',
                    })}
                  </span>
                </p>
                <p className='d-flex justify-content-between'>
                  <span>Shipping Fee </span>{' '}
                  <span>
                    {shippingFee.toLocaleString('bn-bd', {
                      style: 'currency',
                      currency: 'BDT',
                    })}
                  </span>
                </p>
                <hr />
                <p className='d-flex justify-content-between'>
                  <span>Total Price</span>
                  <span>
                    {totalPrice.toLocaleString('bn-bd', {
                      style: 'currency',
                      currency: 'BDT',
                    })}
                  </span>
                </p>
              </div>
              <hr />
              <div className='payment-option'>
                <Radio.Group
                  onChange={onChange}
                  value={paymentValue}
                  className='d-flex flex-column justify-content-between align-items-start'
                >
                  <Radio value={0} className='my-2'>
                    Cash On Delivery
                  </Radio>
                  <Radio value={1}>Payment Online</Radio>
                </Radio.Group>
              </div>
              {auth?.user?.address ? (
                <div className='my-3'>
                  <div className='checkOut d-flex justify-content-between'>
                    <div className='button-to-order' style={{ width: '38%' }}>
                      <button
                        className='btn btn-info'
                        onClick={() =>
                          paymentValue === 0
                            ? handleCheckOutWithOutPayment()
                            : handleCheckOutWithPayment()
                        }
                        disabled={!auth?.user?.address || cart?.length < 1}
                      >
                        Place Order
                      </button>
                    </div>

                    <div className='delivered-to ' style={{ width: '60%' }}>
                      <span>Delivered To: </span>
                      <div className='text-muted d-flex flex-column'>
                        <span>
                          {auth?.user?.name} | {auth?.user?.phone}
                        </span>
                        <span>{auth?.user?.address}</span>
                        <span
                          onClick={() => navigate('/dashboard/user/profile')}
                          style={{ cursor: 'pointer' }}
                          className='link-danger'
                        >
                          Change
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='my-3'>
                  {auth?.token ? (
                    <button
                      className='btn btn-warning'
                      onClick={() => navigate('/dashboard/user/profile')}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className='btn btn-warning'
                      onClick={() =>
                        navigate('/login', {
                          state: '/cart',
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section``;
export default CartPage;
{
  /* <button
className='btn btn-warning'
onClick={() => navigate('/dashboard/user/profile')}
>
Update User Data
</button> */
}
