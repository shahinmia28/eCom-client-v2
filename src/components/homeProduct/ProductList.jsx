import { useFilterContext } from '../../context/filter_context';
import { useProductContext } from '../../context/productcontex';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { filter_products } = useFilterContext();
  const { isLoading } = useProductContext();

  return (
    <>
      <div className='row'>
        {isLoading ? (
          <figure className='col-12 loading'>
            <img src='./images/loading.gif' alt='loading' />
          </figure>
        ) : (
          filter_products.map((p, i) => (
            <div key={i} className='col-12 col-md-4 col-lg-3'>
              <ProductCard p={p} />
            </div>
          ))
        )}
      </div>
    </>
  );
};
export default ProductList;
