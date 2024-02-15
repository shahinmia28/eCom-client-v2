import styled from 'styled-components';
const ProductPrice = ({ price, discount, sell_price }) => {
  return (
    <Wrapper>
      <p className='sell_price me-2'>৳{sell_price}</p>
      <p className='regular-price text-muted'>
        <del>৳{price} </del>
      </p>
      <p className='discount text-muted ms-2'> -{discount}%</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: 'Noto Sans Bengali', sans-serif;
  display: flex;
  justify-content: start;
  align-items: center;
  .sell_price {
    color: red;
    font-size: 20px;
    font-weight: 700;
    margin: auto;
  }
  .regular-price,
  .discount {
    font-weight: 400;
    font-size: 15px;
    margin: auto;
  }
`;
export default ProductPrice;
