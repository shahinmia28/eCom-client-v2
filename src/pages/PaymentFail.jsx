import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PaymentFail = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className='container'>
        <div className='text text-center'>
          <h3>Ops! Payment Fail </h3>
          <p>Please Try Again</p>
          <button
            className='btn btn-outline-secondary'
            onClick={() => navigate('/cart')}
          >
            Back to Cart Page
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  background: linear-gradient(to bottom, #bffbff 0%, #ecfeff 90%);
  .container {
    .text {
      height: 85vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      a {
        color: #666666;
        &:hover {
          color: #111;
        }
      }
    }
  }
`;
export default PaymentFail;
