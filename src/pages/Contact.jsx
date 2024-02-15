import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const Contact = () => {
  const form = useRef();
  const [confirm, setConfirm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_k3ramw9',
        'template_a3bkxmc',
        form.current,
        'jkYs_JR56BJQ6vazO'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setName('');
    setEmail('');
    setMessage('');
    setConfirm('Thanks for Your massage');
  };

  return (
    <Wrapper className='contact bg-d-color' id='contact'>
      <Helmet>
        <meta charSet='UTF-8' />
        <meta name='description' content='ecommerce website contact' />
        <meta name='keywords' content='contact, sungalss, chosma, eye glass' />
        <meta name='author' content='shahin mia' />
        <title>Contact us</title>
      </Helmet>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-6 form-container'>
            <div className='form-box p-3'>
              <div className='my-title'>
                <h2>Contact</h2>
                <div className='title-underLine'></div>
              </div>
              <form ref={form} onSubmit={sendEmail}>
                <input
                  type='name'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Full Name'
                  className='form-control'
                  required
                />
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email@example.com'
                  className='form-control'
                  required
                />
                <textarea
                  name='message'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  cols='90'
                  rows='4'
                  className='form-control'
                  placeholder='Write your comments'
                  required
                ></textarea>

                <input type='submit' value='Send' className='btn contact-btn' />
                <span className='mx-2'>{confirm}</span>
              </form>
            </div>
          </div>

          <div className='col-12 col-md-6 map-container'>
            <div className='mapouter'>
              <div className='gmap_canvas'>
                <iframe
                  id='gmap_canvas'
                  src='https://maps.google.com/maps?q=bhuapur,%20tangail,%20dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed'
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding-top: 80px;
  /* background: linear-gradient(to bottom, #bffbff 0%, #ecfeff 90%); */
  .container {
    .row {
      .form-container {
        .form-box {
          margin-bottom: 20px;
          background: #fff;
          height: 500px;
          width: 100%;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 20px -10px #333;
          form {
            padding: 10px;
            input,
            textarea {
              border: 2px solid #0097602a;
              margin: 10px 0;
              color: #009760;
              &::placeholder {
                color: #00976098;
              }
            }
            .contact-btn {
              color: #00976098;
              &:hover {
                background: #0097602a;
              }
            }
            span {
              color: #009760;
            }
          }
        }
      }
      .map-container {
        margin-bottom: 20px;
        .mapouter {
          position: relative;
          text-align: right;
          height: 500px;
          width: 100%;
          .gmap_canvas {
            overflow: hidden;
            background: none !important;
            height: 500px;
            width: 100%;
            border-radius: 10px;
            box-shadow: 0 0 20px -10px #333;
            iframe {
              width: 100%;
              height: 500px;
            }
          }
        }
      }
    }
  }
`;

export default Contact;
