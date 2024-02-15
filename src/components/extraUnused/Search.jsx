import { useSearch } from './searchContext';
// import ProductCard from '../components/ProductCard';

const Search = () => {
  const [values] = useSearch();
  return (
    <div className='container'>
      {/* <div className='text-center'>
        <h1>Search Results</h1>
        <h6>
          {values?.results.length < 1
            ? 'No Products Found'
            : `Found ${values?.results.length} items`}
        </h6>
        <div className='d-flex flex-wrap mt-4'>
          {values?.results.map((p, i) => (
            <div key={i} className='col-6 col-md-4 col-lg-3'>
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Search;
