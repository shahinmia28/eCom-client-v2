import styled from 'styled-components';
import ProductCard from '../homeProduct/ProductCard';

const GridView = ({ products }) => {
  return (
    <>
      <div className='row'>
        {products.map((p, i) => (
          <div key={i} className='col-6 col-md-3 col-lg-2'>
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </>
  );
};

export default GridView;
