import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API from '../../components/Api';
import { Modal } from 'antd';
import UpdateProduct from './UpdateProduct';
import AdminMenu from './AdminMenu';
import { NavLink } from 'react-router-dom';
import ProductPrice from '../../components/ProductPrice';
import styled from 'styled-components';
import Star from '../../components/Star';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/product/get-all`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error('Someething Went Wrong');
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  const handleClick = (slug) => {
    setVisible(true);
    setSelected(slug);
  };
  //delete a product
  const handleDelete = async (pId) => {
    try {
      let answer = window.prompt(
        'If You want to delete this product, Write "yes".'
      );
      if (!answer) return;
      const { data } = await axios.delete(`${API}/api/product/delete/${pId}`);
      if (data?.success) {
        toast.success('Product Deleted Successfully');
        getAllProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  return (
    <Wrapper className='container-fluid p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <div className='row'>
            {products.length === 0 ? (
              <>
                <figure className='loading'>
                  <img src='../../images/loading.gif' alt='loading' />
                </figure>
              </>
            ) : (
              products?.map((p, i) => {
                let totalRating;
                const totalReviews = p?.reviews?.length;

                if (totalReviews !== 0) {
                  totalRating = p?.reviews
                    ?.map((curElem) => curElem.rating)
                    .reduce((a, b) => a + b);
                }
                const stars = totalRating / totalReviews;

                return (
                  <div key={i} className='col-12 col-md-4'>
                    <div className='card'>
                      <NavLink
                        to={`/product-details/${p.slug}`}
                        className='navLink-cart'
                      >
                        <div className='card-img'>
                          <img src={p.images[0].url} alt={p.name} />
                        </div>

                        <div className='card-body'>
                          <ProductPrice
                            price={p.price}
                            discount={p.discount}
                            sell_price={p.sell_price}
                          />

                          <p className='card-title'>{p.name}</p>
                          <p className='card-disc text-muted'>
                            {p?.description.substring(0, 65)}...
                          </p>
                          <div className='review-wrap'>
                            <Star stars={stars} />
                            <span className='totalReviews text-muted'>
                              ({totalReviews})
                            </span>
                          </div>
                          <div className='color fw-bold'>
                            Color :
                            <div
                              className='color-bg'
                              style={{ background: p?.color }}
                            ></div>
                          </div>
                          <p className='category'>
                            <span className='fw-bold'>Category: </span>
                            <span>{p?.category.name}</span>
                          </p>
                        </div>
                      </NavLink>
                      <div className='d-flex justify-content-between'>
                        <button
                          className='order-btn'
                          style={{ width: '45%' }}
                          onClick={() => handleClick(p.slug)}
                        >
                          Edit
                        </button>

                        <button
                          className='add-to-cart-btn'
                          style={{ width: '45%' }}
                          onClick={() => {
                            handleDelete(p._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
            width={700}
          >
            <UpdateProduct
              selected={selected}
              setVisible={setVisible}
              getAllProducts={getAllProducts}
            />
          </Modal>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 90vh;
  .card {
    margin: 10px 5px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background: #fff;
    border: 1px solid #fea95a6b;
    overflow: hidden;
    transition: all 0.4s linear;
    &:hover {
      box-shadow: 0 0 15px -7px #f68821;
    }
    .navLink-cart {
      text-decoration: none;
      .card-img {
        position: relative;
        img {
          height: 180px;
          width: 100%;
          border-radius: 15px;
          border: 1px solid #fea95a2c;
        }
      }
      .card-body {
        height: 200px;
        display: flex;
        padding: 0;
        margin: 20px 0;
        justify-content: start;
        flex-direction: column;
        align-items: start;
        background: #fff;
        color: #333;
        .card-title {
          font-size: 16px;
          font-weight: 500;
          text-transform: capitalize;
        }
        .card-disc {
          font-size: 14px;
        }
        .review-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          .star-style {
            font-size: 13px;
            .icon-outline {
              font-size: 14px;
            }
          }
          .totalReviews {
            margin-left: 5px;
            font-size: 14px;
            font-weight: 400;
          }
        }
        .color {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .color-bg {
            margin-left: 5px;
            width: 30px;
            height: 20px;
            border-radius: 10%;
          }
        }
        .category {
          font-size: 14px;
        }
      }
    }
  }
`;
export default Products;
