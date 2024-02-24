import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaChevronUp } from 'react-icons/fa';
const GoTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Wrapper>
      <a
        data-aos='zoom-in-up'
        href='#top'
        className={scrollPosition > 400 ? 'go-top active' : 'go-top '}
      >
        <FaChevronUp className='icon' />
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: fixed;
  right: 30px;
  bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s linear;
  z-index: 110;

  .go-top {
    display: none;
    opacity: 0;
    text-decoration: none;
    .icon {
      color: #ff9736;
      background: #fff;
      padding: 10px;
      font-size: 45px;
      box-shadow: 0 0 8px -2px #ff9736;
      border-radius: 3px;
      transition: all 0.4s linear;
      &:hover {
        color: #ff7b00;
        box-shadow: 0 0 15px -2px #ff7b00;
      }
    }
    &.active {
      display: block;
      opacity: 1;
    }
  }
`;
export default GoTop;
