import { useState } from "react";
import { useProductContext } from "../context/ProductContext";
import { NavLink } from "react-router-dom";

const ProductList = () => {
  //const { products } = useProductContext();
  const { products, pageNo, totalPages, setPageNo, handleClick } =
    useProductContext();

  return (
    <div className="pt-12">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <NavLink to={`/product/${product.id}`} key={product.id}>
            <div
              key={product.id}
              className="px-4 pt-4 shadow-md rounded-lg hover:shadow-lg duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="rounded-t-lg h-64 md:h-48 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-4 gap-2 items-center text-center">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <span className="text-gray-600">${product.price}</span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      <div className="mt-12 flex justify-end">
        <nav className="inline-flex items-center space-x-1">
          <a
            href="#"
            className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            &lt;
          </a>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              value={index}
              onClick={(e) => handleClick(e)}
              className="px-4 py-2 bg-white border border-gray-300 text-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {index + 1}
            </button>
          ))}
          <a
            href="#"
            className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            &gt;
          </a>
        </nav>
      </div>
    </div>
  );
};

export default ProductList;
