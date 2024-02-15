import { Helmet } from 'react-helmet';
const Policy = () => {
  return (
    <div>
      <Helmet>
        <meta charSet='UTF-8' />
        <meta name='description' content={`shahin optical's privacy policy `} />
        <meta
          name='keywords'
          content='ecommerce, sungalss, chosma, eye glass'
        />
        <meta name='author' content='shahin mia' />
        <title>Privacy Policy</title>
      </Helmet>
      <div className='container'>
        <h1>Privacy Policy</h1>
      </div>
    </div>
  );
};

export default Policy;
