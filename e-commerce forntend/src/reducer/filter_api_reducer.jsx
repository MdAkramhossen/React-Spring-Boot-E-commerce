const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "UPDATE_FILTERS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
