import { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducer/productReducer';
import API from '../components/Api';

const AppContext = createContext();

const SERVER_API = `${API}/api/product/get-all`;

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  isSingleLoading: false,
  singleProduct: {},
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const { data } = await axios.get(url);
      const products = await data.products;
      dispatch({ type: 'SET_API_DATA', payload: products });
    } catch (error) {
      dispatch({ type: 'API_ERROR' });
    }
  };

  const getSingleProduct = async (url) => {
    dispatch({ type: 'SET_SINGLE_LOADING' });
    try {
      const res = await axios.get(url);
      const singleProduct = res.data;
      dispatch({ type: 'SET_SINGLE_PRODUCT', payload: singleProduct });
    } catch (error) {
      dispatch({ type: 'SET_SINGLE_ERROR' });
    }
  };

  useEffect(() => {
    getProducts(SERVER_API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useProductContext = () => {
  return useContext(AppContext);
};

// AppContext, AppProvider,
