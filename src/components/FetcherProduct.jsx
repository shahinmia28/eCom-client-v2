import { useFilterContext } from '../context/filter_context';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const FetcherProduct = () => {
  const { all_products } = useFilterContext();

  const fetcherProduct = all_products.filter((curElem) => {
    return curElem.fetcher === true;
  });
  const sortedFetcherProduct = fetcherProduct?.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const firstProduct = sortedFetcherProduct?.slice(0, 1)[0];

  return (
    <Wrapper>
      {firstProduct === undefined ? (
        <>
          <figure className='loading'>
            <img src='./images/loading.gif' alt='loading' />
          </figure>
        </>
      ) : (
        <>
          <NavLink
            to={`/product-details/${firstProduct?.slug}`}
            className='fetcher'
          >
            <img src={firstProduct?.images[0].url} alt={firstProduct?.name} />
          </NavLink>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 300px;
  border: 1px solid #f68821;
  border-radius: 10px;
  overflow: hidden;
  /* Small Screen */
  @media (max-width: 768px) {
    height: 150px;
  }
  .fetcher {
    img {
      width: 100%;
      height: 100%;
      transition: all 0.4s linear;
      :hover {
        transform: scale(1.1);
      }
    }
  }
`;
export default FetcherProduct;
