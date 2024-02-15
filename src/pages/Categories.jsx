import { Link } from 'react-router-dom';
import useCategory from '../components/hooks/useCategories';
const Categories = () => {
  const categories = useCategory();
  return (
    <div className='container'>
      <div className='row my-3'>
        {categories.map((c) => (
          <div className='col-6 col-md-2 my-3 ' key={c._id}>
            <Link
              to={`/category/${c.slug}`}
              className='btn btn-outline-dark w-100'
            >
              {c.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
