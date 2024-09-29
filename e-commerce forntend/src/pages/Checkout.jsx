import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

const Checkout = () => {
  const {
    totalAmount,
    shipping_fee,
    cart,
    tax,
    removeItem,
    setIncrease,
    setDecrease,
  } = useCartContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  const [cartData, setCartData] = useState({
    cart: [],
    totalItem: 0,
    totalAmount: 0,
    stock: 20,
    shipping_fee: 50,
    tax: 0,
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || {};
    setCartData(cartFromStorage);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      cartItems: cartData.cart,
      totalItem: cartData.totalItem,
      totalAmount: cartData.totalAmount,
      stock: cartData.stock,
      shippingFee: cartData.shipping_fee,
      tax: cartData.tax,
      shippingInfo: formData,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order placed successfully", response.data);

      navigate("/order");
    } catch (error) {
      console.error("Error placing order", error);
      alert("Failed to place order, please try again.");
    }
  };
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  return (
    <div className="flex justify-center items-center max-h-screen bg-gray-100 py-20">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6">Place Your Order</h1>
        <div className="flex flex-col lg:flex-row justify-between">
          <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
            >
              PLACE YOUR ORDER
            </button>
          </form>

          <div className="w-full lg:w-1/3 bg-gray-50 p-6 mt-6 h-56 lg:mt-0 lg:ml-8 rounded-md shadow-sm">
            <ul className="text-sm space-y-4">
              <li className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping_fee}</span>
              </li>
              <li className="flex justify-between">
                <span>Tax</span>
                <span>${tax}</span>
              </li>
              <li className="flex justify-between font-bold text-lg">
                <span>Order Total</span>
                <span>${totalAmount}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
