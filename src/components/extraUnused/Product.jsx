import React from 'react';
import { NavLink } from 'react-router-dom';
import FormatPrice from '../homeProduct/FormatPrice';

const Product = ({ curElem }) => {
  console.log(curElem);
  return (
    <NavLink to={`/singleproduct/${curElem._id}`}>
      <div className='card'>
        <figure>
          <img src={curElem?.images[0].url} alt={curElem.name} />
          {/* <figcaption className='caption'>{category}</figcaption> */}
        </figure>

        <div className='card-data'>
          <div className='card-data-flex'>
            <h3>{curElem.name}</h3>
            <p className='card-data--price'>
              {<FormatPrice price={curElem.price} />}
            </p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
