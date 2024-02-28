import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <div className='auth'>
      <Helmet>
        <meta charSet='UTF-8' />
        <meta name='description' content='about shahin Optical' />
        <meta
          name='keywords'
          content='ecommerce, sungalss, chosma, eye glass, shahin optical'
        />
        <meta name='author' content='shahin mia' />
        <title>About Shahin Optical</title>
      </Helmet>
      <div className='container'>
        <h1>about</h1>
      </div>
    </div>
  );
};

export default About;
