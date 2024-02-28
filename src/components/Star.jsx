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
  padding: 5px 0;
  .star-style {
    color: #ffbb00;
    line-height: 0.9;
    margin-right: 3px;
    .icon-outline {
      color: #737373;
      margin-bottom: -2px;
    }
  }
`;

export default Star;
