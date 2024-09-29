const cart_reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      // Destructuring payload data
      const { id, selectedColor, product } = action.payload;
      console.log(selectedColor);

      const existingProduct = state.cart.find(
        (item) => item.id === id && item.color === selectedColor
      );

      if (existingProduct) {
        const updateCartAmount = state.cart.map((item) => {
          return item.id === id && item.color === selectedColor
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
        return { ...state, cart: updateCartAmount };
      } else {
        let cartProduct = {
          id: id,
          name: product.name,
          color: selectedColor,
          image: product.image,
          price: product.price,
          amount: 1,

          max: state.stock,
        };

        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }
    }

    case "INCREASE": {
      const updateCartAmount = state.cart.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            amount: item.amount < item.max ? item.amount + 1 : item.amount,
          };
        }
        return item;
      });
      return { ...state, cart: updateCartAmount };
    }

    case "DECREASE": {
      const updateCartAmount = state.cart.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            amount: item.amount > 1 ? item.amount - 1 : item.amount,
          };
        }
        return item;
      });
      return { ...state, cart: updateCartAmount };
    }

    case "REMOVE": {
      const removeItem = state.cart.filter((item) => {
        return item.id !== action.payload;
      });
      return { ...state, cart: removeItem };
    }

    case "UPDATE_TOTALS": {
      const { totalAmount, totalItems } = action.payload;
      return { ...state, totalAmount: totalAmount, totalItem: totalItems };
    }

    default:
      return state;
  }
};

export default cart_reducer;
