import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import FormatPrice from '../homeProduct/FormatPrice';

const ListView = ({ products }) => {
  return (
    <Wrapper>
      <div className='container'>
        {products?.map((p, i) => (
          <div className='card' key={i}>
            <div className='figure'>
              <img src={p?.images[0].url} alt={p?.name} />
            </div>

            <div className='card-data'>
              <h3>{p?.name}</h3>
              <p>
                <FormatPrice price={p?.price} />
              </p>
              <p>{p?.description.slice(0, 90)}...</p>

              <NavLink to={`/singleproduct/${p?._id}`} className='btn-main'>
                <button className='btn btn-info'>Read More</button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* background: #bf8b8b; */
    margin: 10px 0;

    .figure {
      position: relative;
      overflow: hidden;
      transition: all 0.5s linear;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: #00000080;
        transition: all 0.2s linear;
        cursor: pointer;
      }
      &:hover::after {
        width: 100%;
      }
      &:hover img {
        transform: scale(1.2);
      }
      img {
        width: 20rem;
        height: 17rem;
        transition: all 0.2s linear;
      }
    }

    .card-data {
      padding: 0 2rem;

      h3 {
        margin: 2rem 0;
        font-weight: 300;
        font-size: 2.4rem;
        text-transform: capitalize;
      }

      .btn {
        margin: 2rem 0;
        background-color: #fff;
        border: 0.1rem solid rgb(98 84 243);
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(98 84 243);

        &:hover {
          background-color: rgb(98 84 243);
        }

        &:hover a {
          color: #fff;
        }
        a {
          color: rgb(98 84 243);
          font-size: 1.4rem;
        }
      }

      .btn-main .btn:hover {
        color: #fff;
      }
    }
  }
`;

export default ListView;
