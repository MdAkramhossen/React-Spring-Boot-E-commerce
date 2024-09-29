import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { reducer } from "../reducers/filter_action";
import { useProductContext } from "../context/ProductContext";

const initialState = {
  price: 0,
  maxPrice: 100000,
  category: "all",
  company: "all",
  sort: "a-z",
};

const Filters = () => {
  const { setProducts, getAllProducts, clickPageNo, resetPageNo } =
    useProductContext();
  const [freeShipping, setFreeShipping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [unicCompanies, setUnicCompanies] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleFilterChange = () => {
    resetPageNo();
  };
  // Fetch data from the backend when filters are updated
  const fetchFilteredData = async () => {
    const { price, category, company, sort } = state;

    // Set default values for pagination and sorting if no filters are selected
    // let pageNo = 0;
    let pageSize = 10;

    // Build the query parameters dynamically
    const params = new URLSearchParams();

    if (category && category !== "all") {
      params.append("category", category);
    }
    if (company && company !== "all") {
      params.append("company", company);
    }
    if (price > 0) {
      params.append("maxPrice", price);
    }
    if (sort && sort !== "asc") {
      if (sort === "z-a") {
        params.append("sortDir", "desc");
      } else if (sort === "low-high") {
        params.append("sortBy", "price");
      } else if (sort === "high-low") {
        params.append("sortBy", "price");
        params.append("sortDir", "desc");
      }
    }
    if (freeShipping) {
      // console.log(freeShipping);
      params.append("shipping", "true");
    }

    params.append("pageSize", pageSize);

    // Make the API request using Axios
    try {
      params.append("pageNo", clickPageNo);
      const unicFilter = await axios.get("http://localhost:8080/api/filters");

      const unicData = await unicFilter.data;
      console.log(params.toString());

      setUnicCompanies(unicData.companies);
      setUniqueCategories(unicData.categories);
      const response = await axios.get(
        `http://localhost:8080/api/getproduct?${params.toString()}`
      );
      const data = await response.data;
      dispatch({ type: "SET_MAX_AMOUNT", payload: data.maxPrice });
      //setData(data);
      setProducts(data.productList);
      getAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchFilteredData();
  }, [
    state.category,
    state.company,

    freeShipping === true ? freeShipping : "",
    state.sort,
    state.price,
    clickPageNo,
  ]);
  useEffect(() => {
    handleFilterChange();
  }, [state.category, state.company, state.price, state.sort, freeShipping]);

  // Handle changes for each filter
  const handlePriceChange = (event) => {
    dispatch({ type: "SET_PRICE", payload: event.target.value });
  };

  const handleSearch = () => {
    axios
      .get(`http://localhost:8080/api/search`, {
        params: { name: searchQuery },
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };
  function handleCategory(e) {
    dispatch({ type: "SET_CATEGORY", payload: e.target.value });
  }
  function handleCompany(e) {
    dispatch({ type: "SET_COMPANY", payload: e.target.value });
  }

  function setSortBy(e) {
    dispatch({ type: "SORT", payload: e.target.value });
  }
  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="bg-blue-50 p-2 rounded-md shadow-md">
      <div className="px-8 py-4 grid lg:grid-cols-4 gap-x-4 gap-y-8 items-center ">
        {/* Search Product */}
        <div className="flex flex-row">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search Product"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-2/3"
          />
        </div>

        {/* Select Category */}

        <div className="flex flex-row">
          <select
            value={state.category}
            onChange={(e) => handleCategory(e)}
            className="border border-gray-300 p-2 rounded-md w-2/3"
          >
            <option value="all">all categories</option>
            {uniqueCategories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Select Company */}

        <div className="flex flex-row">
          <select
            value={state.company}
            onChange={(e) => handleCompany(e)}
            className="border border-gray-300 p-2 rounded-md w-2/3"
          >
            <option value="all">all companies</option>
            {unicCompanies.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="flex flex-row">
          <select
            value={state.sort}
            onChange={(e) => setSortBy(e)}
            className="border border-gray-300 p-2 rounded-md w-2/3"
          >
            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
            <option value="high-low">high</option>
            <option value="low-high">low</option>
          </select>
        </div>

        {/* Price Slider */}
        <div className="flex flex-col space-y-4 w-2/3">
          <label className="flex items-center justify-between text-sm font-medium">
            <span>Select Price</span>
            <span>${state.price}</span>
          </label>

          <input
            type="range"
            name="price"
            min="0"
            max={state.maxPrice}
            step="1000"
            value={state.price}
            onChange={handlePriceChange}
            className="w-full h-4 cursor-pointer appearance-none bg-gray-300 rounded-lg overflow-hidden"
          />

          <div className="flex justify-between text-sm">
            <span className="font-bold">$0</span>
            <span className="font-bold">Max: ${state.maxPrice}</span>
          </div>
        </div>

        {/* Free Shipping Checkbox */}
        <div className="flex flex-col">
          <label className="text-sm">
            <span className="flex items-center justify-center p-2 ">
              Free Shipping
            </span>
          </label>
          <input
            type="checkbox"
            checked={freeShipping}
            onChange={(e) => setFreeShipping(e.target.checked)}
            className="mr-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 ">
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-2/3"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="bg-pink-500 text-white py-2 px-4 rounded-md w-2/3"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
