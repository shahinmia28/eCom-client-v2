import styled from 'styled-components';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='form-control'
          placeholder='Enter new category Name'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type='submit' className='btn btn-primary'>
          Create Category
        </button>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 0;
    input {
      width: 65%;
    }
    button {
      width: 30%;
    }
    @media (max-width: 768px) {
      input {
        width: 55%;
      }
      button {
        width: 40%;
      }
    }
  }
`;
export default CategoryForm;
