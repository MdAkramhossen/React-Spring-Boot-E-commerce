import React, { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cart_reducer";

const CartContext = createContext();
const initialState = {
  cart: JSON.parse(localStorage.getItem("cart"))?.cart || [],
  totalItem: JSON.parse(localStorage.getItem("cart"))?.totalItem || 0,
  totalAmount: JSON.parse(localStorage.getItem("cart"))?.totalAmount || 0,
  stock: 20,
  shipping_fee: 50,
  tax: 0,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Add to Cart
  const addToCart = (id, selectedColor, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, selectedColor, product } });
  };

  // Remove Item
  const removeItem = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  // Increase Quantity
  const setIncrease = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };

  // Decrease Quantity
  const setDecrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  useEffect(() => {
    const subtotal = state.cart.reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    );
    const totalItems = state.cart.reduce((acc, item) => acc + item.amount, 0);

    state.tax = (subtotal * 0.1).toFixed(2);
    const shippingFee = state.shipping_fee;
    const totalAmount = (
      parseFloat(subtotal) +
      parseFloat(shippingFee) +
      parseFloat(state.tax)
    ).toFixed(2);
    dispatch({ type: "UPDATE_TOTALS", payload: { totalAmount, totalItems } });
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        setIncrease,
        setDecrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use Cart Context
const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
