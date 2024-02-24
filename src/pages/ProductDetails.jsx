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

const ProductDetails = () => {
  const [auth] = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImg, setMainImg] = useState('');
  const { addToCart } = useCartContext();
  const [amount, setAmount] = useState(1);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const setDecrement = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };
  const setIncrement = () => {
    amount < product?.quantity
      ? setAmount(amount + 1)
      : setAmount(product?.quantity);
  };

  const [product, setProduct] = useState({});
  // console.log(product);
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

  if (product?.reviews?.length !== 0) {
    totalRating = product?.reviews
      ?.map((curElem) => curElem.rating)
      .reduce((a, b) => a + b);
  }

  const totalReviews = product?.reviews?.length;
  const stars = totalRating / totalReviews;

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
                <Star stars={stars} />
                <span className='totalReviews'>
                  ({totalReviews} customer reviews)
                </span>
              </div>

              <div className='price-section'>
                <h6 className='price-title'>Deal Of The Day: </h6>
                <ProductPrice
                  price={product?.price}
                  discount={product?.discount}
                  sell_price={product?.sell_price}
                />
              </div>

              <hr />
              <p className='text-muted'>{product?.description}</p>
              <h6 className='category'>
                Category : <span>{product?.category?.name}</span>
              </h6>
              <h6 className='color'>
                Color : <span>{product?.color}</span>
              </h6>
              <div className='price-total'>
                <p>৳{product?.sell_price}</p>
                <p>x</p>
                <p>{amount}</p>
                <p>=</p>
                <p className='t-price'>৳{product?.sell_price * amount}</p>
              </div>
              <div className='count-amount'>
                <Amount
                  amount={amount}
                  setDecrement={setDecrement}
                  setIncrement={setIncrement}
                />
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
          <hr />
          {/* rete this product section */}
          <div className='review'>
            <div className='container'>
              <div className='form-wrap '>
                <form className='form p-3 m-3 bg-info'>
                  <h3>Review Product</h3>
                  <input
                    type='number'
                    className='form-control my-3'
                    placeholder='Rate the product'
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <textarea
                    name='review'
                    rows='5'
                    className='form-control my-3'
                    placeholder='Write Review'
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button
                    type='submit'
                    className='btn btn-light'
                    onClick={(e) => handleReview(e)}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Show review section */}
          <div className='show-review'>
            <div className='wrap'>
              {product?.reviews?.length !== 0 ? (
                <>
                  {product?.reviews?.map((curReview, i) => {
                    return (
                      <div key={i} className='review-section card my-2 p-3'>
                        <h6 className='user'>User Name: {curReview.user}</h6>
                        <div className='rating d-flex align-items-center'>
                          <span className='r-t me-2'>Rating: </span>
                          <Star stars={curReview.rating} />
                        </div>
                        <p className='comment'>Comment: {curReview.comment}</p>
                        {auth?.user?.role === 1 ? (
                          <button
                            className='btn btn-danger'
                            onClick={() => handleDeleteReviews(curReview._id)}
                          >
                            delete
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    );
                  })}
                </>
              ) : (
                <p>No Review Found</p>
              )}
            </div>
          </div>

          <hr />
          <div className='similar-products'>
            <div>
              <h4>Similar Products ➡️</h4>
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
  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      font-weight: 400;
      font-size: 30px;
      color: #444;
      text-transform: capitalize;
    }
    .review-wrap {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .star-style {
        .icon {
          width: 2rem;
          height: 2rem;
          margin-right: 0.5rem;
        }
        .icon-outline {
          width: 2.3rem;
          height: 2.3rem;
        }
      }
      .totalReviews {
        margin-left: 10px;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .price-section {
      display: flex;
      justify-content: start;
      align-items: center;
      .price-title {
        font-weight: 600;
        font-size: 20px;
        color: #f68821;
        margin-right: 5px;
      }
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
    .count-amount {
      width: 100px;
    }
  }
  .form-wrap {
    max-width: 700px;
    margin: auto;
    background: #000;
    padding: 20px;
    .form {
      border-radius: 5px;
    }
  }
`;
export default ProductDetails;
