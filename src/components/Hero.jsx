import axios from 'axios';
import { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import API from './Api';
import { useEffect } from 'react';

const Hero = () => {
  const [sliderImg, setSliderImg] = useState([]);

  const getSliderImg = async () => {
    const { data } = await axios.get(`${API}/api/other/get-hero-img`);
    setSliderImg(data?.heroImg[0]?.images);
  };

  const settings = {
    dots: true,
    arrow: false,
    infinite: true,
    fade: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
  };
  useEffect(() => {
    getSliderImg();
  }, []);
  return (
    <Wrapper>
      <Slider {...settings} className='slider'>
        {sliderImg?.length === 0 ? (
          <div className='slide-item'>
            <figure className='loading'>
              <img src='./images/loading.gif' alt='loading' />
            </figure>
          </div>
        ) : (
          sliderImg?.map((curElem, i) => (
            <div className='slide-item' key={i}>
              <img src={curElem?.url} alt={i} className='slide-img' />
            </div>
          ))
        )}
      </Slider>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .slider {
    border-radius: 10px;
    overflow: hidden;
    height: 300px;
    .slide-item {
      height: 300px;
      padding: 0;
      margin: 0;
      cursor: grab;
      border-radius: 10px;
      overflow: hidden;
      .slide-img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        border: 1px solid #f68821;
      }
    }
    /* Small Screen */
    @media (max-width: 768px) {
      height: 150px;
      .slide-item {
        height: 150px;
      }
    }
    .slick-dots {
      bottom: 15px;
    }
  }
`;

export default Hero;
