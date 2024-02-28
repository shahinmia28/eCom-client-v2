import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../components/Api';
import styled from 'styled-components';
import ProductCard from '../components/homeProduct/ProductCard';
import Amount from '../components/Amount';
import { useCartContext } from '../context/cartContext';
import ProductPrice from '../components/ProductPrice';
import toast from 'react-hot-toast';
import { useAuth } from '../context/authContext';
import Star from '../components/Star';
import { RxCross2 } from 'react-icons/rx';
import { FaStar } from 'react-icons/fa';

const ProductDetails = () => {
  const [auth] = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState({});

  const { addToCart } = useCartContext();

  const [mainImg, setMainImg] = useState('');

  const [amount, setAmount] = useState(1);
  const [more, setMore] = useState(false);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const setDecrement = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };
  const setIncrement = () => {
    amount < product?.quantity
      ? setAmount(amount + 1)
      : setAmount(product?.quantity);
  };

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/get-single/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  // review handleReview
  const handleReview = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${API}/api/product/review/${product._id}`,
      {
        user: auth.user.name,
        user_email: auth.user.email,
        rating,
        comment,
      }
    );
    if (data?.success) {
      toast.success(data?.message);
      getProduct();
    }
  };

  let totalRating;
  const totalReviews = product?.reviews?.length;

  if (totalReviews !== 0) {
    totalRating = product?.reviews
      ?.map((curElem) => curElem.rating)
      .reduce((a, b) => a + b);
  }

  let stars = totalRating / totalReviews;

  const rating5 = [];
  const rating4 = [];
  const rating3 = [];
  const rating2 = [];
  const rating1 = [];

  if (totalReviews !== 0) {
    product?.reviews?.map((curElem) => {
      switch (curElem.rating) {
        case 5:
          return rating5.push(curElem.rating);
        case 4:
          return rating4.push(curElem.rating);
        case 3:
          return rating3.push(curElem.rating);
        case 2:
          return rating2.push(curElem.rating);
        case 1:
          return rating1.push(curElem.rating);
      }
    });
  }

  // const per = (rating2.length / totalReviews) * 100;

  // delete review only for admin
  const handleDeleteReviews = async (comment_id) => {
    const product_id = product?._id;
    const { data } = await axios.post(`${API}/api/product/delete_review`, {
      comment_id,
      product_id,
    });
    if (data?.success) {
      toast.success(data?.message);
      getProduct();
    }
  };

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //initial main ing
  useEffect(() => {
    if (product.images) {
      setMainImg(product?.images[0].url);
    }
  }, [product]);

  return (
    <Wrapper className='mt-1 mt-md-3'>
      {product._id !== undefined ? (
        <div className='container'>
          {/* Product Details */}
          <div className='row'>
            <div className='col-md-6 image'>
              <div className='main-img-container'>
                <img src={mainImg} alt='main-img' className='main-img shadow' />
              </div>
              <div className='all-img-container'>
                {product?.images?.map((img, i) => (
                  <img
                    key={i}
                    src={img?.url}
                    className='all-img shadow'
                    alt={product?.name}
                    onClick={() => setMainImg(img?.url)}
                  />
                ))}
              </div>
            </div>
            <div className='col-md-6 product-info'>
              <h3 className='title'> {product?.name}</h3>
              <div className='review-wrap'>
                <span className='rating'>
                  {totalReviews !== 0
                    ? stars - Math.floor(stars) === 0
                      ? stars + '.00'
                      : stars.toString().slice(0, 4)
                    : '0.00'}
                </span>
                <Star stars={stars} />
                <span className='totalReviews text-muted'>
                  ({totalReviews})
                </span>
              </div>

              <div className='price-section'>
                <ProductPrice
                  price={product?.price}
                  discount={product?.discount}
                  sell_price={product?.sell_price}
                />
              </div>
              <hr />
              <p className='text-muted'>
                {!more
                  ? product?.description?.substring(0, 150)
                  : product?.description}
                <span
                  onClick={() => {
                    setMore(!more);
                  }}
                  className='more ms-1'
                >
                  {!more ? 'show more...' : 'show less'}
                </span>
              </p>
              <div className='color fw-bold'>
                Color :
                <div
                  className='color-bg'
                  style={{ background: product?.color }}
                ></div>
              </div>
              <div className='count-price-section d-flex justify-content-between align-items-center'>
                <div className='count-amount'>
                  <Amount
                    amount={amount}
                    setDecrement={setDecrement}
                    setIncrement={setIncrement}
                  />
                </div>
                <div className='price-total'>
                  <p>৳{product?.sell_price}</p>
                  <p>x</p>
                  <p>{amount}</p>
                  <p>=</p>
                  <p className='t-price'>৳{product?.sell_price * amount}</p>
                </div>
              </div>

              <hr />
              <div className='button-group d-flex justify-content-between'>
                <button
                  className='order-btn'
                  style={{ width: '45%' }}
                  onClick={() => {
                    addToCart({ id: product._id, amount, product });
                    navigate('/cart');
                  }}
                >
                  Buy Now
                </button>

                <button
                  className='add-to-cart-btn'
                  style={{ width: '45%' }}
                  onClick={() => {
                    addToCart({ id: product._id, amount, product });
                    toast.success('Product Added To Cart Successfully');
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
          {/* rating chart */}
          <div className='rating-chart my-5'>
            <h4 className='review-title'>Rating Chart ({totalReviews}) :</h4>
            <hr />

            <div className='chart-wrap'>
              <div className='chart chart-5'>
                <div className='star'>
                  <Star stars={5} />
                </div>
                <div className='percentage'>
                  <div className='p-back'>
                    <div
                      className='p-up'
                      style={{
                        width:
                          totalReviews !== 0
                            ? `${(rating5.length / totalReviews) * 100}%`
                            : '0%',
                      }}
                    ></div>
                  </div>
                </div>
                <div className='star-count'>
                  <div>({rating5?.length})</div>
                </div>
              </div>
              <div className='chart chart-5'>
                <div className='star'>
                  <Star stars={4} />
                </div>
                <div className='percentage'>
                  <div className='p-back'>
                    <div
                      className='p-up'
                      style={{
                        width:
                          totalReviews !== 0
                            ? `${(rating4.length / totalReviews) * 100}%`
                            : '0%',
                      }}
                    ></div>
                  </div>
                </div>
                <div className='star-count'>
                  <div>({rating4?.length})</div>
                </div>
              </div>
              <div className='chart chart-5'>
                <div className='star'>
                  <Star stars={3} />
                </div>
                <div className='percentage'>
                  <div className='p-back'>
                    <div
                      className='p-up'
                      style={{
                        width:
                          totalReviews !== 0
                            ? `${(rating3.length / totalReviews) * 100}%`
                            : '0%',
                      }}
                    ></div>
                  </div>
                </div>
                <div className='star-count'>
                  <div>({rating3?.length})</div>
                </div>
              </div>
              <div className='chart chart-5'>
                <div className='star'>
                  <Star stars={2} />
                </div>
                <div className='percentage'>
                  <div className='p-back'>
                    <div
                      className='p-up'
                      style={{
                        width:
                          totalReviews !== 0
                            ? `${(rating2.length / totalReviews) * 100}%`
                            : '0%',
                      }}
                    ></div>
                  </div>
                </div>
                <div className='star-count'>
                  <div>({rating2?.length})</div>
                </div>
              </div>
              <div className='chart chart-5'>
                <div className='star'>
                  <Star stars={1} />
                </div>
                <div className='percentage'>
                  <div className='p-back'>
                    <div
                      className='p-up'
                      style={{
                        width:
                          totalReviews !== 0
                            ? `${(rating1.length / totalReviews) * 100}%`
                            : '0%',
                      }}
                    ></div>
                  </div>
                </div>
                <div className='star-count'>
                  <div>({rating1?.length})</div>
                </div>
              </div>
            </div>
          </div>
          {/* Show review section */}

          <div className='show-review my-5'>
            <h4 className='review-title'>
              Total <span>({totalReviews})</span> Review for{' '}
              <span>({product?.name}) :</span>
            </h4>
            {totalReviews !== 0 ? (
              product?.reviews?.map((review, i) => {
                return (
                  <div key={i} className='review-card card my-2 p-3'>
                    <div className='user-img'>
                      <img src='/images/user.png' alt='user.default' />
                    </div>
                    <div className='review-info'>
                      <span className='delete-button'>
                        {auth?.user?.role === 1 && (
                          <RxCross2
                            className='btn btn-outline-danger'
                            onClick={() => handleDeleteReviews(review._id)}
                          />
                        )}
                      </span>
                      <h6 className='user'>
                        <span className='fw-bold'>User:</span> {review.user}
                      </h6>
                      <div className='rating d-flex align-items-center'>
                        <span className='fw-bold me-2'>Rating: </span>
                        <Star stars={review.rating} />
                      </div>
                      <p className='comment'>
                        <span className='fw-bold'>Comment: </span>
                        {review.comment}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No Review Found</p>
            )}
          </div>

          {/* rete this product section */}
          <div className='review-form my-5'>
            <form className='form p-3' onSubmit={(e) => handleReview(e)}>
              <h4 className='review-title'>Add Your Review:</h4>

              {/* star icon ratting */}
              <div className='star-rating-creator'>
                <span className='rating-title'>
                  <span className='text-danger fs-4'>*</span> Your Rating:
                </span>
                <span>
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type='radio'
                          name='rating'
                          value={currentRating}
                          onClick={() => setRating(currentRating)}
                          required
                        />
                        <FaStar
                          size={20}
                          color={
                            currentRating <= (hover || rating)
                              ? '#ffbb00'
                              : '#777'
                          }
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                          className='star'
                        />
                      </label>
                    );
                  })}
                </span>
              </div>

              <label htmlFor='review' className='form-label'>
                <span className='text-danger fs-4'>*</span> Write Your Comments:
              </label>
              <textarea
                name='review'
                rows='5'
                className='form-control'
                placeholder={`This ${product?.name} ...`}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>

              <button
                type='submit'
                className={
                  auth?.user ? `order-btn my-3` : `btn btn-outline-dark my-3`
                }
                disabled={auth?.user ? false : true}
              >
                Submit
              </button>
              <br />
              {!auth?.user && (
                <span className='text-danger my-2'>
                  (* You have to login for submitting Review)
                </span>
              )}
            </form>
          </div>
          {/* similar product */}
          <div className='similar-products'>
            <div>
              <h4>Similar Products:</h4>
              <hr />
              {relatedProducts.length < 1 && (
                <p className='text-center'>No Similar Products found</p>
              )}
            </div>

            <div className='row'>
              {relatedProducts?.map((p) => (
                <div key={p._id} className='col-12 col-md-4 col-lg-3'>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <figure className='loading' style={{ minHeight: '80vh' }}>
            <img src='../../images/loading.gif' alt='loading' />
          </figure>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .image {
    padding: 10px;
    .main-img-container {
      margin: auto;
      max-width: 600px;
      height: 300px;
      margin: 10px;
      .main-img {
        width: 100%;
        height: 300px;
        border-radius: 5px;
      }
    }
    .all-img-container {
      max-width: 600px;
      margin: 0 10px;
      .all-img {
        margin-right: 10px;
        width: 80px;
        height: 80px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.4s linear;
        &:hover {
          box-shadow: 0 0 15px -5px #444 !important;
        }
      }
    }
  }
  /* product info */
  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      font-weight: 500;
      font-size: 22px;
      color: #f68821;
      text-transform: uppercase;
    }
    .color {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .color-bg {
        margin-left: 5px;
        width: 30px;
        height: 30px;
        border-radius: 100%;
      }
    }
    .more {
      color: #f68821;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .review-wrap {
      max-width: fit-content;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .rating {
        font-weight: bold;
        font-size: 22px;
        margin-right: 5px;
      }
      .star-style {
        font-size: 25px;

        .icon-outline {
          font-size: 27px;
        }
      }
      .totalReviews {
        margin-left: 10px;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .price-section {
      max-width: fit-content;
    }
    .category {
      text-transform: capitalize;
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
  }
  .review-title {
    text-transform: uppercase;
    margin: 15px 0;
    font-size: 18px;
    color: #444;
  }
  /* rating chart section */
  .rating-chart {
    .chart-wrap {
      max-width: 660px;
      margin: auto;
      .chart {
        margin: 5px;
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        .star {
          padding: 0;
          padding-bottom: 3px;
          width: fit-content;
          span {
            margin: 0;
            .star-style {
              font-size: 20px;
              .icon-outline {
                font-size: 22px;
              }
            }
          }
        }
        .percentage {
          margin: auto;
          width: 450px;
          min-width: auto;
          margin: 0 5px;
          .p-back {
            width: 100%;
            background: #e9e9e9;
            height: 13px;
            border-radius: 5px;
            .p-up {
              background: #ffbb00;
              height: 13px;
              border-radius: 5px;
            }
          }
        }
        .star-count {
          width: fit-content;
          margin: auto;
          font-weight: bold;
          color: #6e6e6e;
          padding-bottom: 3px;
        }
      }
    }
  }
  /* show review section */
  .show-review {
    .review-card {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      .user-img {
        width: fit-content;
        margin-right: 10px;
        img {
          width: 80px;
          border-radius: 100%;
        }
      }
      .review-info {
        width: fit-content;
        .delete-button {
          position: absolute;
          right: 10px;
          top: 10px;
          .btn {
            border: none;
            padding: 5px;
            font-size: 25px;
          }
        }
      }
    }
  }
  /* review form */
  .review-form {
    .form {
      border-radius: 5px;
      border: 1px solid #f68821;
      .star-rating-creator {
        display: flex;
        align-items: center;
        justify-content: start;
        .rating-title {
          font-size: 15px;
          margin-right: 10px;
          font-weight: 400;
          color: #444;
        }
        input {
          display: none;
        }

        .star {
          margin-bottom: 1px;
          cursor: pointer;
        }
      }
      .form-label {
        font-size: 15px;
        font-weight: 400;
        color: #444;
      }
      .order-btn {
        border-radius: 5px;
      }
    }
  }
`;
export default ProductDetails;
