import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import API from '../components/Api';
import toast from 'react-hot-toast';

const About = () => {
  const [user2, setUser2] = useState([]);
  //getall products
  const getAllUser2 = async () => {
    try {
      const { data } = await axios.get(`${API}/api/product/get-img`);
      setUser2(data.user2);
    } catch (error) {
      console.log(error);
      toast.error('Someething Went Wrong');
    }
  };
  useEffect(() => {
    getAllUser2();
  }, []);
  console.log(user2);
  return (
    <div>
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
        <ul>
          {user2?.map((u, i) => {
            return (
              <li key={i}>
                <h4>{u.name}</h4>
                {u?.img_url?.map((img, i) => (
                  <img key={i} src={img.url} alt='1' width={'100px'} />
                ))}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default About;
