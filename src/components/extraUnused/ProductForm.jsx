const ProductForm = ({
  handleCreate,
  product,
  handleImage,
  onChange,
  categories,
}) => {
  return (
    <>
      <form onSubmit={handleCreate}>
        <div className='mb-3'>
          <select
            type='text'
            name='category'
            value={product.category}
            onChange={onChange}
            className='form-select'
          >
            <option value=''>Select a Category</option>
            {categories?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-3'>
          <label className='btn btn-outline-secondary col-md-12'>
            {product.photo ? product.photo.name : 'Upload Photo'}
            <input
              type='file'
              name='photo'
              accept='image/*'
              onChange={handleImage}
              hidden
            />
          </label>
          {product.photo && (
            <div className='text-center'>
              <img
                src={URL.createObjectURL(product.photo)}
                alt='product_photo'
                height={'200px'}
                className='img img-responsive my-3'
                style={{ borderRadius: '5px' }}
              />
            </div>
          )}
        </div>
        <div className='mb-3'>
          <input
            type='text'
            name='name'
            value={product.name}
            placeholder='write a name'
            className='form-control'
            onChange={onChange}
          />
        </div>

        <div className='mb-3'>
          <textarea
            type='text'
            name='description'
            value={product.description}
            placeholder='write a description'
            className='form-control'
            onChange={onChange}
          />
        </div>
        <div className='row mb-3'>
          <div className='col-12 col-md-4'>
            <input
              type='number'
              name='price'
              value={product.price}
              placeholder={`Product's Price`}
              className='form-control'
              onChange={onChange}
            />
          </div>
          <div className='col-12 col-md-4'>
            <input
              type='number'
              name='quantity'
              value={product.quantity}
              placeholder={`Product's Quantity`}
              className='form-control'
              onChange={onChange}
            />
          </div>
          <div className='col-12 col-md-4'>
            <input
              type='number'
              name='shipping'
              value={product.shipping}
              placeholder='Shipping Coast'
              className='form-control'
              onChange={onChange}
            />
          </div>
        </div>

        <div className='mb-3'>
          <button className='btn btn-primary' type='submit'>
            CREATE PRODUCT
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
