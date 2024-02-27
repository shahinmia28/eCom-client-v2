import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import API from '../../components/Api';
import { Radio } from 'antd';
import styled from 'styled-components';

const UpdateProduct = ({ selected, setVisible, getAllProducts }) => {
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    shipping: '',
    color: '',
    fetcher: '',
    photo: '',
    photo2: '',
    img: '',
    img2: '',
  });

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/get-single/${selected}`
      );
      setProduct({
        ...product,
        id: data.product._id,
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        discount: data.product.discount,
        category: data.product.category._id,
        quantity: data.product.quantity,
        shipping: data.product.shipping,
        color: data.product.color,
        fetcher: data.product.fetcher ? data.product.fetcher : false,
        photo: '',
        photo2: '',
        img: data?.product?.images[0]?.url,
        img2: data?.product?.images[1]?.url,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(product.img);
  // console.log(product.img2);

  const handleImage = (e) => {
    setProduct({ ...product, photo: e.target.files[0] });
  };
  const handleImage2 = (e) => {
    setProduct({ ...product, photo2: e.target.files[0] });
  };
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/api/category/get-all`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting category');
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
    //eslint-disable-next-line
  }, [selected]);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('name', product.name);
      productData.append('description', product.description);
      productData.append('price', product.price);
      productData.append('quantity', product.quantity);
      productData.append('discount', product.discount);
      productData.append('color', product.color);
      productData.append('category', product.category);
      productData.append('fetcher', product.fetcher);

      if (product.photo) {
        productData.append('image', product.photo);
      }
      if (product.photo2) {
        productData.append('image', product.photo2);
      }
      const { data } = await axios.put(
        `${API}/api/product/update/${product.id}`,
        productData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (data?.success) {
        toast.success(data.message);
        setVisible(false);
        getAllProducts();
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Wrapper className='container p-3'>
      <div className='row'>
        <h2 className='form-title'>Update Product</h2>
        <form onSubmit={handleUpdate}>
          <div className='mb-3'>
            <label htmlFor='category' className='form-label'>
              Select category :
            </label>
            <select
              type='text'
              name='category'
              value={product.category}
              onChange={onChange}
              className='form-select'
              required
            >
              <option value=''>Select a Category</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-3 row'>
            <span
              className='text-danger text-center'
              style={{ fontSize: '13px' }}
            >
              If you want to change images then select both images otherwise the
              selected image is only uploaded.
            </span>
            <div className='col-12 col-md-6'>
              <label className='photo-btn'>
                {product.photo ? (
                  <img
                    src={URL.createObjectURL(product.photo)}
                    alt='Product Image'
                  />
                ) : product.img === undefined ? (
                  <span>Product Image 1</span>
                ) : (
                  <img src={product.img} alt='1' />
                )}
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  onChange={handleImage}
                  hidden
                />
              </label>
            </div>
            <div className='col-12 col-md-6'>
              <label className='photo-btn'>
                {product.photo2 ? (
                  <img
                    src={URL.createObjectURL(product.photo2)}
                    alt='Product Photo2'
                  />
                ) : product.img2 === undefined ? (
                  <span>Product Image 2</span>
                ) : (
                  <img src={product.img2} alt='2' />
                )}
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  onChange={handleImage2}
                  hidden
                />
              </label>
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Write Product Name :
            </label>
            <input
              type='text'
              name='name'
              value={product.name}
              placeholder='write a name'
              className='form-control'
              onChange={onChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              write a Description :
            </label>
            <textarea
              type='text'
              name='description'
              rows={5}
              value={product.description}
              placeholder='write a description'
              className='form-control'
              onChange={onChange}
              required
            />
          </div>
          <div className='row mb-3'>
            <div className='col-12 col-md-3'>
              <label htmlFor='price' className='form-label'>
                Price :
              </label>

              <input
                type='number'
                name='price'
                value={product.price}
                placeholder={`Product's Price`}
                className='form-control'
                onChange={onChange}
                required
              />
            </div>
            <div className='col-12 col-md-3'>
              <label htmlFor='discount' className='form-label'>
                Discount %:
              </label>

              <input
                type='number'
                name='discount'
                value={product.discount}
                placeholder={`Discount in %`}
                className='form-control'
                onChange={onChange}
                required
              />
            </div>

            <div className='col-12 col-md-3'>
              <label htmlFor='quantity' className='form-label'>
                Quantity :
              </label>

              <input
                type='number'
                name='quantity'
                value={product.quantity}
                placeholder={`Product's Quantity`}
                className='form-control'
                onChange={onChange}
                required
              />
            </div>

            <div className='col-12 col-md-3'>
              <label htmlFor='color' className='form-label'>
                Color Picker :
              </label>
              <input
                type='color'
                name='color'
                value={product.color}
                placeholder='Color'
                className='form-control form-control-color'
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className='mb-3'>
            <div className='d-flex justify-content-start align-items-center'>
              <label htmlFor='price' className='form-label me-3'>
                Fetcher Product:
              </label>
              <Radio.Group
                name='fetcher'
                onChange={onChange}
                value={product.fetcher}
                required
              >
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
              </Radio.Group>
            </div>
          </div>
          <div className='mb-3'>
            <button className='btn btn-primary' type='submit'>
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .photo-btn {
    border: 1px solid #878787;
    height: 150px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 5px;
    margin: 10px 5px;
    cursor: pointer;
    transition: all 0.4s linear;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    :hover {
      background: #ffe1c5;
    }
  }
`;

export default UpdateProduct;
