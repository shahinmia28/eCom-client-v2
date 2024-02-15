import styled from 'styled-components';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

const Amount = ({ amount, setDecrement, setIncrement }) => {
  return (
    <Wrapper>
      <button onClick={() => setDecrement()}>
        <FaMinusCircle />
      </button>
      <p className='amount'>{amount}</p>
      <button onClick={() => setIncrement()}>
        <FaPlusCircle />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    border: none;
    font-size: 25px;
    color: #f68821;
    padding: 0px;
    margin: 0px;
    text-align: center;
    opacity: 0.7;
    background: transparent;
    &:hover {
      opacity: 1;
    }
  }
  .amount {
    padding: 0px !important;
    margin: 0 15px;
    margin-bottom: -7px;
    font-size: 18px;
    font-weight: 700;
    color: #f68821;
  }
  /* 400px Screen */
  @media (max-width: 400px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      font-size: 15px;
    }

    .amount {
      margin: 0 5px;
      margin-bottom: -3px;
      font-size: 15px !important;
    }
  }
`;

export default Amount;
