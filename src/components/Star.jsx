import React from 'react';
import { FaStarHalfAlt, FaStar } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import styled from 'styled-components';

const Star = ({ stars }) => {
  return (
    <Wrapper>
      {Array.from({ length: 5 }, (elem, index) => {
        return (
          <div key={index} className='star-style'>
            {stars >= index + 1 ? (
              <FaStar className='icon' />
            ) : stars >= index + 0.5 ? (
              <FaStarHalfAlt className='icon' />
            ) : (
              <AiOutlineStar className='icon-outline icon' />
            )}
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: flex;
  padding: 0.5rem 0;
  .star-style {
    color: #ffbb00;
    /* .icon {
      width: 2rem;
      height: 2rem;
      margin-right: 0.5rem;
    }*/
    /* .icon-outline {
      width: 2.3rem;
      height: 2.3rem;
    } */
  }
`;

export default Star;
