import Sort from '../components/homeProduct/Sort';
import ProductList from '../components/homeProduct/ProductList';
import { Helmet } from 'react-helmet';
import Hero from '../components/Hero';
import FetcherProduct from '../components/FetcherProduct';

const AllProductPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet='UTF-8' />
        <meta name='description' content='ecommerce website' />
        <meta
          name='keywords'
          content='ecommerce, sungalss, chosma, eye glass'
        />
        <meta name='author' content='shahin mia' />
        <title>Best Offer -- Purchases Now</title>
      </Helmet>
      <div className='container'>
        <div className='hero-section my-3'>
          <div className='row'>
            <div className='col-4'>
              <FetcherProduct />
            </div>
            <div className='col-8'>
              <Hero />
            </div>
          </div>
        </div>

        <Sort />
        <h2>Best Offer -- Purchases Now</h2>
        <hr />
        <ProductList />
      </div>
    </>
  );
};

export default AllProductPage;
