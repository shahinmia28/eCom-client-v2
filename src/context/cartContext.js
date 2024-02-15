import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducer/cartReducer';
const cartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem('userOrder');
  if (localCartData) {
    return JSON.parse(localCartData);
  } else {
    return [];
  }
};
const initialState = {
  cart: getLocalCartData(),
  total_price: '',
  total_item: 0,
  shipping_fee: 100,
};
export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = ({ id, amount, product }) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, amount, product } });
  };

  const setDecrement = (id) => {
    dispatch({ type: 'SET_DECREMENT', payload: id });
  };
  const setIncrement = (id) => {
    dispatch({ type: 'SET_INCREMENT', payload: id });
  };
  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  useEffect(() => {
    localStorage.setItem('userOrder', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <cartContext.Provider
      value={{
        ...state,
        addToCart,
        setDecrement,
        setIncrement,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
export const useCartContext = () => {
  return useContext(cartContext);
};
