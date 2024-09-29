const products_reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ALL_PRODUCT": {
      const { hasMore, pageNo, totalPages, productList } = action.payload;

      return {
        ...state,
        products: productList,
        pageNo: pageNo,
        isLast: hasMore,
        totalPages: totalPages,
      };
    }
    case "CLICKD_PAGE": {
      return { ...state, clickPageNo: action.payload };
    }
    case "RESET_PAGE_NO": {
      return { ...state, clickPageNo: 0 };
    }
    default:
      break;
  }
};
export default products_reducer;
