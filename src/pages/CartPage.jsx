import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import API from '../components/Api';
import toast from 'react-hot-toast';
import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Radio, Checkbox } from 'antd';
import { useCartContext } from '../context/cartContext';
import Amount from '../components/Amount';
import { RxCross2 } from 'react-icons/rx';
import ProductPrice from '../components/ProductPrice';

const CartPage = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const { cart } = useCartContext();
  const { setDecrement, setIncrement, removeItem } = useCartContext();
  const [deliveryCharge, setDeliveryCharge] = useState([]);

  const [shippingFee, setShippingFee] = useState('');

  // selected Product for order
  const handleSelectProduct = (value, p) => {
    let all = [...selectedProduct];
    if (value) {
      all.push(p);
    } else {
      all = all.filter((c) => {
        return c !== p;
      });
    }
    setSelectedProduct(all);
  };

  // get delivery charge data
  const getDeliveryCharge = async () => {
    try {
      const { data } = await axios.get(`${API}/api/other/delivery-charge`);
      await setDeliveryCharge(data?.deliveryCharge);
      await setShippingFee(data?.deliveryCharge[0]?.insideDhaka);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDeliveryCharge();
  }, []);

  // find selected product for price calculate
  let selectedProductForOrder = [];
  selectedProduct?.map((item) => {
    if (item) {
      return cart.filter((p) => {
        if (p.id === item) {
          return selectedProductForOrder.push(p);
        }
      });
    }
  });

  // total item selected
  let total_item_selected = 0;

  selectedProductForOrder.map((item) => {
    total_item_selected = total_item_selected + item.amount;
  });
  // total item
  let total_item = 0;
  cart.map((item) => {
    total_item = total_item + item.amount;
  });

  // sub total Price
  let subtotal = [];
  selectedProductForOrder.map((item) => {
    subtotal.push(item.product.sell_price * item.amount);
  });
  // final Price calculate
  let finalPrice = 0;
  subtotal.map((item) => {
    finalPrice = finalPrice + item;
  });

  // shipping Fee
  let shipping_fee = selectedProduct?.length < 1 ? 0 : shippingFee;

  // total price
  let totalPrice = finalPrice + shipping_fee;

  // handle check out
  const handleCheckOutWithPayment = async () => {
    try {
      const { data } = await axios.post(`${API}/api/product/order-checkout`, {
        product: selectedProductForOrder,
        user: auth.user,
        totalPrice: totalPrice,
      });
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
          product: selectedProductForOrder,
          user: auth.user,
          totalPrice: totalPrice,
        }
      );
      if (data?.success) {
        // clearCart();
        navigate(
          auth.user.role === 1
            ? '/dashboard/admin/orders'
            : '/dashboard/user/orders'
        );
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(cart);
  return (
    <Wrapper>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            <div className='border card my-3 p-2'>
              {total_item ? (
                <span>
                  Total {total_item} item{total_item > 1 ? 's are ' : ' is '}
                  available in your cart | ({total_item_selected} item
                  {total_item_selected > 1 ? 's are ' : ' is '} selected)
                </span>
              ) : (
                <span>Your Cart Is Empty</span>
              )}
            </div>
            {cart
              ?.map((item, i) => {
                return (
                  <Checkbox
                    key={i}
                    onChange={(e) =>
                      handleSelectProduct(e.target.checked, item.id)
                    }
                    className='check-box border my-2'
                    id={item?._id}
                  >
                    <div className='image-holder'>
                      <img
                        src={item?.product?.images[0].url}
                        alt={item?.product?.name}
                        className='border'
                      />
                    </div>

                    <div className='body-holder'>
                      <h5 className='title'>{item?.product?.name}</h5>
                      <div className='price-div'>
                        <ProductPrice
                          price={item?.product?.price}
                          discount={item?.product?.discount}
                          sell_price={item?.product?.sell_price}
                        />
                      </div>
                      <div className='price-total'>
                        <p>৳{item?.product?.sell_price}</p>
                        <p>x</p>
                        <p>{item?.amount}</p>
                        <p>=</p>
                        <p className='t-price'>
                          ৳{item?.product?.sell_price * item?.amount}
                        </p>
                      </div>

                      <div className='fw-bold color'>
                        Color:
                        <div
                          className='color-bg'
                          style={{ background: item?.product?.color }}
                        ></div>
                      </div>
                      <div className='count-amount'>
                        <Amount
                          amount={item?.amount}
                          setDecrement={() => setDecrement(item?.id)}
                          setIncrement={() => setIncrement(item?.id)}
                        />
                      </div>
                    </div>
                    <button
                      className='btn cancel btn-outline-danger'
                      onClick={() => removeItem(item?.id)}
                    >
                      <RxCross2 />
                    </button>
                  </Checkbox>
                );
              })
              .reverse()}
          </div>
          <div className='col-md-4 '>
            <div className='card p-3 my-3'>
              <h5>Order Summary</h5>
              <hr />
              <div>
                <p className='d-flex justify-content-between bangla'>
                  <span>
                    Subtotal
                    <span className='fw-bold'>
                      ({total_item_selected} item
                      {total_item_selected > 1 && 's'}):
                    </span>
                  </span>
                  <span>৳{finalPrice}</span>
                </p>
                <p className='d-flex justify-content-between bangla'>
                  <span>Shipping Fee: </span> <span>৳{shipping_fee}</span>
                </p>
                <hr />
                <p className='d-flex justify-content-between'>
                  <span className='fw-bold'>Total Price :</span>
                  <span className='fw-bold bangla'>৳{totalPrice}</span>
                </p>
              </div>
              <hr />
              <div className='payment-option'>
                <h4>Delivery Charge</h4>
                <Radio.Group
                  onChange={(e) => setShippingFee(e.target.value)}
                  value={shippingFee}
                  className='d-flex flex-column justify-content-between align-items-start '
                >
                  <Radio
                    value={deliveryCharge[0]?.insideDhaka}
                    className='my-2 bangla'
                  >
                    Inside Dhaka ৳{deliveryCharge[0]?.insideDhaka}
                  </Radio>

                  <Radio
                    value={deliveryCharge[0]?.outsideDhaka}
                    className='bangla'
                  >
                    Outside Dhaka ৳{deliveryCharge[0]?.outsideDhaka}
                  </Radio>
                </Radio.Group>
              </div>
              <hr />
              <div className='payment-option'>
                <h4>Payment Option</h4>
                <Radio.Group
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  value={paymentMethod}
                  className='d-flex flex-column justify-content-between align-items-start'
                >
                  <Radio value={1} className='my-2'>
                    Cash On Delivery
                  </Radio>
                  <Radio value={0}>Payment Online</Radio>
                </Radio.Group>
              </div>
              <hr />
              {auth?.user?.address ? (
                <div className='mt-3'>
                  <div className='checkOut d-flex justify-content-between'>
                    <div className='button-to-order m-auto'>
                      <button
                        className='btn btn-primary text-uppercase'
                        onClick={() =>
                          paymentMethod === 1
                            ? handleCheckOutWithOutPayment()
                            : handleCheckOutWithPayment()
                        }
                        disabled={
                          !auth?.user?.address ||
                          selectedProductForOrder?.length < 1
                        }
                      >
                        Place Order
                      </button>
                    </div>
                  </div>

                  <span className='text-center mt-3  d-block text-danger'>
                    {selectedProductForOrder?.length === 0 &&
                      'Select product to order'}
                  </span>
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
              <div className='my-3'>
                <div className='delivered-to '>
                  <span className='fw-bold'>Delivered To: </span>
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
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .ant-checkbox-wrapper {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 0 15px -10px #555;
    transition: all 0.4s linear;
    position: relative;
    &:hover {
      box-shadow: 0 0 15px -5px #555;
    }
    .ant-checkbox {
      width: 18px;
    }
    span {
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
      .image-holder {
        min-width: 15%;
        border-radius: 5px;
        img {
          width: 100%;
          height: 120px;
        }
      }
      .body-holder {
        margin-left: 15px;
        padding: 10px;
        min-width: 85%;
        text-transform: capitalize;
        .title {
          font-size: 20px;
        }
        .price-div {
          max-width: fit-content;
          display: flex;
          text-align: start;
        }
        .price-total {
          font-family: 'Noto Sans Bengali', sans-serif;
          max-width: fit-content;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #f68821;
          font-size: 17px;
          font-weight: 700;
          border: 1px solid #f68821;
          border-radius: 5px;
          padding: 0 8px;

          p {
            margin: 0;
            padding: 4px 2px;
            padding-bottom: 0px;
          }
          .t-price {
            color: red;
          }
        }
        .color {
          display: flex;
          align-items: center;
          text-align: start;
          margin: 5px 0;
          .color-bg {
            width: 30px;
            height: 20px;
            border-radius: 5px;
            margin-left: 5px;
          }
        }
        .count-amount {
          width: 100px;
        }
      }
      .cancel {
        position: absolute;
        right: 10px;
        top: 10px;
        border: none;
      }
    }
  }

  /* Small Screen */
  @media (max-width: 772px) {
    span {
      flex-direction: column;
      .body-holder {
        min-width: 100%;
        margin-left: 0 !important;
        padding: 5px !important;
        .title {
          font-size: 15px !important;
        }
      }
    }
  }
`;
export default CartPage;
