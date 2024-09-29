import { useReducer } from "react";

// Define the reducer function
export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORY": {
      return { ...state, category: action.payload };
    }

    case "SET_COMPANY": {
      return { ...state, company: action.payload };
    }
    case "SORT": {
      return { ...state, sort: action.payload };
    }
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_MAX_PRICE":
      return { ...state, maxPrice: action.payload };

    case "RESET": {
      return {
        ...state,
        price: 0,
        category: "all",
        company: "all",
        sort: "a-z",
      };
    }
    default:
      return state;
  }
};
