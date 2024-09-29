import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";
import { useCartContext } from "../context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  const { addToCart } = useCartContext();

  // Handle color click, update selectedColor
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${parseInt(id)}`
        );
        const data = await response.data;

        setProduct(data);

        // Set default color from product colors if available
        if (data.colors.length > 0) {
          setSelectedColor(data.colors[0].color); // Set first color as default
        }
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="bg-slate-50 bg-opacity-50">
      <div className="pt-20 pb-20 mx-auto max-w-6xl px-8">
        <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
          <img
            src={product.image}
            // src={`http://localhost:8080${product.image}`}
            alt={product.name}
            className="w-96 h-96 object-cover rounded-lg lg:w-full"
          />
          <div className="">
            <h1 className="capitalize text-3xl font-bold">{product.name}</h1>
            <h4 className="text-xl text-neutral-content opacity-50 font-bold mt-2">
              {product.company}
            </h4>
            <p className="mt-3 text-xl">${product.price}</p>
            <p className="mt-6 leading-8">{product.description}</p>

            {/* Color selection */}
            <div className="mt-6">
              <h2 className="mb-4 font-bold">Colors</h2>
              <div className="flex space-x-3">
                {Array.isArray(product.colors) && product.colors.length > 0 ? (
                  product.colors.map(({ id, color }) => (
                    <button
                      key={id}
                      onClick={() => handleColorClick(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))
                ) : (
                  <p>No colors available</p>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-10">
              <NavLink
                to="/cart"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => addToCart(product.id, selectedColor, product)} // Pass selectedColor or default
              >
                Add Cart
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
