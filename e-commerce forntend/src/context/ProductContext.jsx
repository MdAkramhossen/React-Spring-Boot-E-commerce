import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import PropTypes from "prop-types";
import { products_url as url } from "../utils/constants";
import axios from "axios";
import reducer from "../reducer/products_reducer";
const ProductContext = createContext();

const initialState = {
  products: [],
  pageNo: 0,
  isLast: "",
  totalPages: 0,
  clickPageNo: 0,
};
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllProducts = (setProducts) => {
    dispatch({ type: "FETCH_ALL_PRODUCT", payload: setProducts });
  };
  const handleClick = (e) => {
    dispatch({ type: "CLICKD_PAGE", payload: e.target.value });
  };
  const resetPageNo = () => {
    dispatch({ type: "RESET_PAGE_NO" });
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        products,
        handleClick,
        setProducts,
        getAllProducts,
        resetPageNo,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductProvider, useProductContext };
