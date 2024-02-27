import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import API from '../../components/Api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminMenu from './AdminMenu';
import { Radio } from 'antd';

const CreateProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    category: '',
    quantity: '',
    fetcher: false,
    color: '',
    photo: '',
    photo2: '',
  });
  const [categories, setCategories] = useState([]);
  const handleImage = (e) => {
    setProduct({
      ...product,
      photo: e.target.files[0],
    });
  };
  const handleImage2 = (e) => {
    setProduct({
      ...product,
      photo2: e.target.files[0],
    });
  };
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/api/category/get-all`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something wwent wrong in getting catgeory');
    }
  };
  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('name', product.name);
      productData.append('description', product.description);
      productData.append('price', product.price);
      productData.append('discount', product.discount);
      productData.append('quantity', product.quantity);
      productData.append('color', product.color);
      productData.append('category', product.category);
      productData.append('fetcher', product.fetcher);

      if (product.photo) {
        productData.append('image', product.photo);
      }
      if (product.photo2) {
        productData.append('image', product.photo2);
      }
      const { data } = await axios.post(
        `${API}/api/product/create`,
        productData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (data?.success) {
        toast.success('Product Created Successfully');
        navigate('/dashboard/admin/all-products');
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Wrapper>
      <div className='container-fluid p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <div className='p-3 w-100 w-lg-75'>
              <h1 className='title'>Create Product</h1>
              <form onSubmit={handleCreate}>
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
                  <div className='col-12 col-md-4'>
                    <label className='photo-btn'>
                      {product.photo ? (
                        <img
                          src={URL.createObjectURL(product.photo)}
                          alt='Product Image'
                        />
                      ) : (
                        <span>Product Image 1</span>
                      )}
                      <input
                        type='file'
                        name='image'
                        accept='image/*'
                        onChange={handleImage}
                        hidden
                        required
                      />
                    </label>
                  </div>
                  <div className='col-12 col-md-4'>
                    <label className='photo-btn'>
                      {product.photo2 ? (
                        <img
                          src={URL.createObjectURL(product.photo2)}
                          alt='slider_photo2'
                        />
                      ) : (
                        <span>Product Image 2</span>
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
                      Regular Price :
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
                    CREATE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
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
  .title {
    text-transform: uppercase;
    color: #333;
    text-align: center;
    padding: 15px;
  }
`;
export default CreateProduct;
