import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Checkbox } from 'antd';
import API from '../Api';
import ProductCard from '../homeProduct/ProductCard';
import styled from 'styled-components';
import Hero from '../Hero';
import { TbFilterPause } from 'react-icons/tb';
import SearchForm from '../form/SearchForm';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();
  const [filterOpen, setFilterOpen] = useState(false);

  //get all cat
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

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${API}/api/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${API}/api/product/product-filters`, {
        checked,
        maxPrice,
        minPrice,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePriceSearch = (e) => {
    e.preventDefault();
    filterProduct();
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) loadMore();
  }, [page]);

  useEffect(() => {
    if (!checked.length) getAllProducts();
  }, [checked.length]);

  useEffect(() => {
    if (checked.length) filterProduct();
  }, [checked]);

  return (
    <Wrapper>
      <Helmet>
        <meta charSet='UTF-8' />
        <meta name='description' content='ecommerce website' />
        <meta
          name='keywords'
          content='ecommerce, sungalss, chosma, eye glass'
        />
        <meta name='author' content='shahin mia' />
        <title>সেরা অফার -- এখনই কেনাকাটা করুন</title>
      </Helmet>
      <div className='Home-page'>
        <div className='container'>
          <div className='row m-3'>
            <div className='filter-button d-block'>
              <TbFilterPause
                className='filter-icon'
                onClick={() => setFilterOpen(!filterOpen)}
              />
            </div>
            <div
              className={
                filterOpen
                  ? 'col-12 col-lg-3 d-block'
                  : 'col-12 col-lg-3 d-none'
              }
            >
              <div className='filter-product p-3 border shadow'>
                {/* search filter */}
                <div className='search my-1'>
                  <SearchForm />
                </div>
                {/* category filter */}
                <div className='category my-1'>
                  <h5>Category</h5>
                  <div className='d-flex flex-column'>
                    {categories?.map((c, i) => (
                      <Checkbox
                        key={i}
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      >
                        {c.name}
                      </Checkbox>
                    ))}
                  </div>
                </div>
                {/* price filter */}
                <div className='price my-1'>
                  <h5>Price</h5>
                  <div className='row'>
                    <div className='col-4'>
                      <input
                        type='number'
                        name='minPrice'
                        className='form-control'
                        value={minPrice}
                        onChange={(e) =>
                          e.target.value < 0
                            ? setMinPrice(0)
                            : setMinPrice(e.target.value)
                        }
                        placeholder='Min'
                      />
                    </div>
                    <div className='col-4'>
                      <input
                        type='number'
                        name='maxPrice'
                        className='form-control'
                        value={maxPrice}
                        onChange={(e) =>
                          e.target.value < 0
                            ? setMaxPrice(0)
                            : setMaxPrice(e.target.value)
                        }
                        placeholder='Max'
                      />
                    </div>
                    <div className='col-4 '>
                      <button
                        onClick={handlePriceSearch}
                        className='btn btn-light text-muted'
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                {/* reset filter */}
                <div className='reset my-1'>
                  <p
                    className='btn btn-outline-danger'
                    onClick={() => window.location.reload()}
                  >
                    FILTER RESET
                  </p>
                </div>
              </div>
            </div>
            <div
              className={
                !filterOpen
                  ? 'col-12 col-lg-9 d-block d-lg-block'
                  : 'col-12 col-lg-9 d-none d-lg-block'
              }
            >
              <Hero />
            </div>
          </div>
        </div>

        <div className=' all-product-list'>
          <div className='container'>
            <h3 className='text-start just-for-you'>Just For You</h3>
            <div className='row'>
              {products?.map((p, i) => (
                <div key={i} className='col-6 col-md-3 col-lg-2'>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
            <div className='m-2 p-3'>
              {products && products.length < total && (
                <button
                  className='btn btn-warning'
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? 'Loading ...' : 'More Products'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .Home-page {
    .filter-button {
      padding: 10px;
      margin: 5px;
      .filter-icon {
        cursor: pointer;
        color: #696969;
        font-size: 35px;
        font-weight: 600;
        border: 2px solid #696969;
        padding: 2px;
        border-radius: 3px;
        transition: all 0.4s linear;
        &:hover {
          color: #121212;
          border: 2px solid #121212;
        }
      }
    }
    .filter-product {
      height: 350px;
      overflow-y: scroll;
      overflow-x: hidden;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .reset {
        display: flex;
        justify-content: center;
        align-items: end;
        padding-top: 10px;
      }
    }

    .all-product-list {
      .just-for-you {
        font-weight: 400;
        border-bottom: 1px solid #878787;
        padding: 10px 0;
      }
    }
  }
`;
export default HomePage;
