import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const Spinner = ({ path = 'login' }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <div
      style={{ height: '90vh' }}
      className='d-flex justify-content-center align-items-center flex-column'
    >
      <h2 className='text-center text-muted'>
        Redirecting to you in {count} second
      </h2>
      <div>
        <figure className='loading'>
          <img
            src='../../images/loading.gif'
            alt='loading'
            style={{ width: '150px' }}
          />
        </figure>
      </div>
    </div>
  );
};

export default Spinner;
