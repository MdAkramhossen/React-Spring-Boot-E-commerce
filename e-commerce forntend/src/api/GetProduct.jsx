import { products_url as url } from "../utils/constants";

import axios from "axios";

export const fetchProducts = async () => {
  try {
    const res = await axios.get(url);
    const products = res.data;

    return products;
  } catch (error) {
    console.log(error);
  }
};
