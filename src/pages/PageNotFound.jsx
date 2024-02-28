import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageNotFound = () => {
  return (
    <Wrapper className='page-not-found auth'>
      <h1>Opsss!</h1>
      <h3>404! Page not found</h3>
      <Link to={'/'}>Back to home</Link>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  text-align: center;
  flex-direction: column;
  a {
    color: #666666;
    &:hover {
      color: #111;
    }
  }
`;
export default PageNotFound;
