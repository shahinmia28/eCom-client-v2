import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import API from '../../components/Api';
import styled from 'styled-components';
import AdminMenu from './AdminMenu';

const DeliveryCharge = () => {
  const [deliveryCharge, setDeliveryCharge] = useState([]);

  const [insideDhaka, setInsideDhaka] = useState('');
  const [outsideDhaka, setOutsideDhaka] = useState('');

  const handleSubmit = async (e) => {
    try {
      const { data } = await axios.post(`${API}/api/other/delivery-charge`, {
        insideDhaka,
        outsideDhaka,
      });
      if (data?.success) {
        toast.success(data?.message);
        getDeliveryCharge();
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  const getDeliveryCharge = async () => {
    try {
      const { data } = await axios.get(`${API}/api/other/delivery-charge`);
      setDeliveryCharge(data.deliveryCharge);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDeliveryCharge();
  }, []);

  return (
    <Wrapper className='container-fluid p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9 my-3'>
          <div className='card p-4'>
            <form onSubmit={handleSubmit}>
              <h4 className='title text-center'>Delivery Charge</h4>
              <div className='input-item-box'>
                <label htmlFor='email' className='form-label'>
                  Inside Dhaka city:
                </label>
                <input
                  type='number'
                  value={insideDhaka}
                  onChange={(e) => setInsideDhaka(e.target.value)}
                  className='form-control'
                  placeholder={`Delivery Charge ${deliveryCharge[0]?.insideDhaka} Taka`}
                  required
                />
              </div>
              <div className='input-item-box'>
                <label htmlFor='email' className='form-label'>
                  Outside Dhaka city:
                </label>
                <input
                  type='number'
                  value={outsideDhaka}
                  onChange={(e) => setOutsideDhaka(e.target.value)}
                  className='form-control'
                  placeholder={`Delivery Charge ${deliveryCharge[0]?.outsideDhaka} Taka`}
                  required
                />
              </div>
              <button type='submit' className='btn btn-primary text-uppercase'>
                Update Delivery Charge
              </button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 90vh;
  .card {
    max-width: 700px;
    margin: auto;
    .input-item-box {
      display: flex;
      justify-content: start;
      align-items: center;
      margin: 15px 0;
      border-radius: 5px;
      border: 1px solid #d3d3d3;
      label {
        width: 50%;
        font-weight: 500;
        margin: 0;
        padding: 5px;
        text-transform: capitalize;
      }
      input {
        width: 50%;
        padding: 5px;
        margin: 0;
        border: none;
      }
    }
  }
  /* mobile */
  @media (max-width: 768px) {
    .card {
      .input-item-box {
        flex-direction: column;
        label {
          width: 100%;
        }
        input {
          width: 100%;
        }
      }
    }
  }
`;
export default DeliveryCharge;
