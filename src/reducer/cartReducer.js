const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      let { id, amount, product } = action.payload;

      let existingProduct = state.cart.find((curElem) => curElem.id === id);
      if (existingProduct) {
        let updatedProduct = state.cart.map((curElem) => {
          if (curElem.id === id) {
            let newAmount = curElem.amount + amount;

            if (newAmount >= curElem.quantity) {
              newAmount = curElem.quantity;
            }

            return {
              ...curElem,
              amount: newAmount,
            };
          } else {
            return curElem;
          }
        });
        return {
          ...state,
          cart: updatedProduct,
        };
      } else {
        let cartProduct = {
          id: id,
          product: product,
          amount: amount,
        };

        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }
    // set Decrement
    case 'SET_DECREMENT':
      let decrementedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let decAmount = curElem.amount - 1;
          if (decAmount < 1) {
            decAmount = 1;
          }
          return {
            ...curElem,
            amount: decAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: decrementedProduct,
      };
    // SET Increment
    case 'SET_INCREMENT':
      let incrementedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let incProduct = curElem.amount + 1;
          if (incProduct >= curElem.quantity) {
            incProduct = curElem.quantity;
          }
          return {
            ...curElem,
            amount: incProduct,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: incrementedProduct,
      };

    // remove item
    case 'REMOVE_ITEM':
      let updateITem = state.cart.filter(
        (curElem) => curElem.id !== action.payload
      );
      return {
        ...state,
        cart: updateITem,
      };

    // CLEAR_CART
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
