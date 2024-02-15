import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const PageNotFound = () => {
  return (
    <Wrapper className='underConstruction'>
      <Helmet>
        <meta charSet='UTF-8' />
        <meta name='description' content={`shahin optical's Page not found `} />
        <meta
          name='keywords'
          content='ecommerce, sungalss, chosma, eye glass'
        />
        <meta name='author' content='shahin mia' />
        <title>Go Back -- Page not found</title>
      </Helmet>
      <div className='container text-center'>
        <div className='text'>
          <h1>Opsss!</h1>
          <h3>404! Page not found</h3>
          <Link to={'/'}>Back to home</Link>
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
export default PageNotFound;
