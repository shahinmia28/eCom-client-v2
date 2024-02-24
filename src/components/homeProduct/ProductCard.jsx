import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProductPrice from '../ProductPrice';
import { useCartContext } from '../../context/cartContext';
import { LiaCartPlusSolid } from 'react-icons/lia';
import toast from 'react-hot-toast';
import Star from '../Star';

const ProductCard = ({ p }) => {
  // console.log(p);
  const { addToCart } = useCartContext();
  const navigate = useNavigate();

  let totalRating;

  if (p?.reviews?.length !== 0) {
    totalRating = p?.reviews
      ?.map((curElem) => curElem.rating)
      .reduce((a, b) => a + b);
  }

  const totalReviews = p?.reviews?.length;
  const stars = totalRating / totalReviews;

  return (
    <Wrapper className='card' data-aos='flip-left'>
      <NavLink to={`/product-details/${p.slug}`} className='navLink-cart'>
        <div className='card-img'>
          <img src={p.images[0].url} alt={p.name} />
        </div>

        <div className='card-body'>
          <ProductPrice
            price={p.price}
            discount={p.discount}
            sell_price={p.sell_price}
          />
          <div className='review-wrap'>
            <Star stars={stars} />
            <span className='totalReviews'>({totalReviews} Reviews)</span>
          </div>
          {/* <p className='title'>{p.name.substring(0, 50)}</p> */}
          <p className='card-title'>{p.name}</p>
        </div>
      </NavLink>
      <div className='card-button'>
        <button
          className='order-btn'
          onClick={() => {
            addToCart({ id: p._id, amount: 1, product: p });
            navigate('/cart');
          }}
        >
          buy now
        </button>
      </div>
      <div className='add-cart'>
        <button
          className='button'
          onClick={() => {
            addToCart({ id: p._id, amount: 1, product: p });
            toast.success('Product Added To Cart Successfully');
          }}
        >
          <LiaCartPlusSolid />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10px 5px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: #fff;
  border: 1px solid #fea95a6b;
  overflow: hidden;
  transition: all 0.4s linear;
  &:hover {
    box-shadow: 0 0 15px -7px #f68821;
  }
  .navLink-cart {
    text-decoration: none;
    .card-img {
      position: relative;
      img {
        height: 180px;
        width: 100%;
        border-radius: 15px;
        border: 1px solid #fea95a2c;
      }
    }
    .card-body {
      height: 100px;
      display: flex;
      padding: 0;
      margin: 20px 0;
      justify-content: start;
      flex-direction: column;
      align-items: start;
      background: #fff;
      color: #333;
      .card-title {
        font-size: 16px;
        font-weight: 500;
        text-transform: capitalize;
      }
      .review-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .star-style {
          .icon {
            width: 14px;
            height: 14px;
            margin-right: 3px;
          }
          .icon-outline {
            width: 16px;
            height: 16px;
          }
        }
        .totalReviews {
          margin-left: 5px;
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  }
  .card-button {
    height: 60px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    button {
      width: 100%;
    }
  }
  .add-cart {
    background: #fff;
    width: 60px;
    height: 60px;
    padding: 10px;
    position: absolute;
    border-bottom-left-radius: 37px;
    border-top-left-radius: 37px;
    right: 0;
    top: 0;
  }
  .button {
    background: transparent;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 1px solid #f62121;
    color: #f62121;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    transition: all 0.4s linear;
    &:hover {
      opacity: 0.7;
      background: #f62121;
      color: #fff;
    }
  }
`;
export default ProductCard;
