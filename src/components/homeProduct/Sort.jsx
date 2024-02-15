import styled from 'styled-components';
import { TbFilterDown } from 'react-icons/tb';
import { useFilterContext } from '../../context/filter_context';
import { useState } from 'react';
import FilterSection from './FilterSection';

const Sort = () => {
  const [showFilter, setShowFilter] = useState(false);
  const {
    filters: { text },
    updateFilterValue,
    sorting,
  } = useFilterContext();

  return (
    <Wrapper>
      <div className='sort-section row'>
        {/* 1st column  */}
        <div className='filter-btn col-2'>
          <button
            className={showFilter ? 'active sort-btn' : 'sort-btn'}
            onClick={() => setShowFilter(!showFilter)}
          >
            <TbFilterDown className='icon' />
          </button>
        </div>
        {/* 2nd column  */}
        <div className='filter-search col-6 col-lg-7 m-auto'>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type='text'
              name='text'
              placeholder='Search'
              value={text}
              onChange={updateFilterValue}
              className='form-control'
            />
          </form>
        </div>
        {/* 3rd column  */}
        <div className='sort-selection m-auto col-4 col-lg-3'>
          <form action='#'>
            <select
              name='sort'
              id='sort'
              className='form-control'
              onClick={sorting}
            >
              <option value='lowest'>Price(lowest)</option>
              <option value='#' disabled></option>
              <option value='highest'>Price(highest)</option>
              <option value='#' disabled></option>
              <option value='a-z'>Price(a-z)</option>
              <option value='#' disabled></option>
              <option value='z-a'>Price(z-a)</option>
            </select>
          </form>
        </div>
      </div>
      <div className={showFilter ? 'd-block' : 'd-none'}>
        <FilterSection />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 2rem 0;
  .sort-section {
    .filter-btn {
      .sort-btn {
        padding: 0.6rem 0.8rem;
        border: none;
        cursor: pointer;
        background-color: #ffe6d0;
        border-radius: 5px;
      }
      .icon {
        font-size: 1.6rem;
      }
      .active {
        background-color: #f68821;
        color: #fff;
      }
    }

    .form-control {
      border: 1px solid #f68821;
      outline: none;
    }
  }
`;

export default Sort;
