import React, { useEffect, useReducer } from "react";
import { reducer } from "../reducer/filter_api_reducer";

import axios from "axios";
const initialState = {
  product: [],
  loading: true,
  pageNo: 0,
  pageSize: 10,
  isLast: "",
  sortBy: "name",
  sortDir: "asc",
  company: "",
  category: "",
  minPrice: 1,
  maxPrice: "",
  shipping: false,
};

const FilterApi = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await axios.get("/getproduct", {
        params: {
          pageNo: state.pageNo,
          pageSize: state.pageSize,
          isLast: state.isLast,
          sortBy: state.sortBy,
          sortDir: state.sortDir,
          company: state.company,
          category: state.category,
          minPrice: state.minPrice,
          maxPrice: state.maxPrice,
          shipping: state.shipping,
        },
      });
      dispatch({ type: "SET_PRODUCTS", payload: response.data.content });
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [
    state.pageNo,
    state.pageSize,
    state.sortBy,
    state.sortDir,
    state.company,
    state.category,
    state.minPrice,
    state.maxPrice,
    state.shipping,
  ]);

  if (state.loading) return <p>Loading...</p>;
  return <div></div>;
};

export default FilterApi;
