import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import AdminMenu from './AdminMenu';
import API from '../../components/Api';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateHeroImg = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [sliderImg, setSliderImg] = useState({
    photo: '',
    photo2: '',
    photo3: '',
  });

  const handleImage = (e) => {
    setSliderImg({
      ...sliderImg,
      photo: e.target.files[0],
    });
  };
  const handleImage2 = (e) => {
    setSliderImg({
      ...sliderImg,
      photo2: e.target.files[0],
    });
  };
  const handleImage3 = (e) => {
    setSliderImg({
      ...sliderImg,
      photo3: e.target.files[0],
    });
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const sliderImgData = new FormData();
      if (sliderImg.photo) {
        sliderImgData.append('image', sliderImg.photo);
      }
      if (sliderImg.photo2) {
        sliderImgData.append('image', sliderImg.photo2);
      }
      if (sliderImg.photo3) {
        sliderImgData.append('image', sliderImg.photo3);
      }
      const { data } = await axios.post(
        `${API}/api/other/hero-img`,
        sliderImgData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (data?.success) {
        toast.success('slider images set successfully');
        navigate('/');
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Wrapper>
      <div className='container-fluid p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <div className='p-3 w-100'>
              <form onSubmit={handleCreate}>
                <div className='my-3 row'>
                  <div className='col-12 col-md-4'>
                    <label className='photo-btn'>
                      {sliderImg.photo ? (
                        <img
                          src={URL.createObjectURL(sliderImg.photo)}
                          alt='slider_photo'
                        />
                      ) : (
                        <span>Slider Image 1</span>
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
                      {sliderImg.photo2 ? (
                        <img
                          src={URL.createObjectURL(sliderImg.photo2)}
                          alt='slider_photo2'
                        />
                      ) : (
                        <span>Slider Image 2</span>
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
                  <div className='col-12 col-md-4'>
                    <label className='photo-btn'>
                      {sliderImg.photo3 ? (
                        <img
                          src={URL.createObjectURL(sliderImg.photo3)}
                          alt='slider_photo3'
                        />
                      ) : (
                        <span>Slider Image 3</span>
                      )}
                      <input
                        type='file'
                        name='image'
                        accept='image/*'
                        onChange={handleImage3}
                        hidden
                      />
                    </label>
                  </div>
                </div>
                <div className='mb-3'>
                  <button
                    className='btn btn-primary text-uppercase'
                    type='submit'
                    onClick={() => setAlert(true)}
                  >
                    Upload image
                  </button>
                  <span
                    className={alert ? 'd-block text-danger my-2' : 'd-none'}
                  >
                    Do not refresh the page. It will take some to upload images.
                    <br /> After upload you will redirected to Home page.
                  </span>
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
  min-height: 80vh;
  .photo-btn {
    border: 1px solid #f68821;
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

export default CreateHeroImg;
