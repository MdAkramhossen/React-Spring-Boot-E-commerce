// import {

//   GET_PRODUCTS_SUCCESS,

// } from "../actions";

// const products_reducer = (state, action) => {
//   switch (action.type) {

//     case GET_PRODUCTS_SUCCESS: {
//       const featuredProducts = action.payload.filter(
//         (product) => product.featured === true
//       );

//       return {
//         ...state,
//         products_loading: false,
//         products: action.payload,
//         featured_products: featuredProducts,
//       };
//     }

// };

// export default products_reducer;
