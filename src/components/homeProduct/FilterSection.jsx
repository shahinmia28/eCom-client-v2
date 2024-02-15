import styled from 'styled-components';
import { useFilterContext } from '../../context/filter_context';
import API from '../Api';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AiOutlineClear } from 'react-icons/ai';
import { IoRemoveOutline } from 'react-icons/io5';
import { TbCurrencyTaka } from 'react-icons/tb';

const FilterSection = () => {
  const [categories, setCategories] = useState([]);

  const {
    filters: { category, price, maxPrice, minPrice },
    updateFilterValue,
    clearFilters,
  } = useFilterContext();

  //get all Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/api/category/get-all`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Wrapper>
      <div className='row'>
        <div className='filter-category col-12 col-md-6 py-2'>
          <div className='category-row '>
            <button
              type='button'
              name='category'
              value={'all'}
              className={'all' === category ? 'active' : ''}
              onClick={updateFilterValue}
            >
              all
            </button>
            {categories.map((curElem, index) => {
              return (
                <button
                  key={index}
                  type='button'
                  name='category'
                  value={curElem?._id}
                  className={curElem?._id === category ? 'active' : ''}
                  onClick={updateFilterValue}
                >
                  {curElem?.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className='filter_price col-12 col-md-4 py-2'>
          <input
            type='range'
            name='price'
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={updateFilterValue}
            className='range'
          />
          <div className='price-div'>
            <span className='text-muted'>Price: </span>
            <span className='taka'>
              <TbCurrencyTaka className='icon' />
              {minPrice}
            </span>
            <span>
              <IoRemoveOutline className='line-icon' />
            </span>
            <span className='taka'>
              <TbCurrencyTaka className='icon' />
              {price}
            </span>
          </div>
        </div>

        <div className='filter-clear col-12 col-md-2 py-2'>
          <button className='btn' onClick={clearFilters}>
            <AiOutlineClear className='icon' />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #f68821;
  border-radius: 5px;

  .filter-category {
    .category-row {
      button {
        margin: 5px;
        padding: 2px 5px;
        border: 1px solid #f68821;
        border-radius: 3px;
        overflow: hidden;
        background-color: #fff;
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: #f68821;
        }
      }

      .active {
        border-bottom: 3px solid #f68821;
        color: #f68821;
      }
    }
  }

  .filter_price {
    padding: 10px;
    .range {
      -webkit-appearance: none;
      outline: none;
      width: 100%;
      height: 7px;
      border-radius: 5px;
      background: #ffe0c3;
      box-shadow: none;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      ::before {
        content: '';
        width: 10px;
        height: 7px;
        background: #a04d00;
        position: absolute;
        top: 0;
        left: 0;
      }
      ::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 10px;
        height: 7px;
        background: #a04d00;
        box-shadow: -400px 0 0 400px #f68821;
        cursor: e-resize;
      }
    }
    .price-div {
      span {
        font-weight: bold;
      }
      .taka {
        .icon {
          font-size: 18px;
        }
      }
    }
  }

  .filter-clear {
    margin: auto;
    display: flex;
    justify-content: end;
    .btn {
      padding: 0.6rem 0.8rem;
      border: none;
      cursor: pointer;
      background-color: #f68821;
      color: #fff;
      border-radius: 5px;
      .icon {
        font-size: 1.6rem;
      }
    }
  }
`;

export default FilterSection;
