import React from "react";
import { useCartContext } from "../context/CartContext";
import CartAmountToggle from "../components/CartAmountToggle ";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const isAuthenticated = localStorage.getItem("token");

  //const isAuthenticated = false;
  const {
    totalAmount,
    shipping_fee,
    cart,
    tax,
    removeItem,
    setIncrease,
    setDecrease,
  } = useCartContext();

  console.log(totalAmount);

  // Calculate total price
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  return (
    <div className="mx-auto max-w-6xl px-8 py-20">
      <div className="border-b border-blue-50 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize">
          Shopping Cart
        </h2>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {cart.map((item) => (
          <div className="lg:col-span-8" key={`${item.id}-${item.color}`}>
            <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
              />

              <div className="sm:ml-16 sm:w-48">
                <h3 className="capitalize font-medium">{item.name}</h3>
                <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                  Color:
                  <span
                    className="inline-block h-4 w-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: item.color }}
                  ></span>
                </p>
              </div>

              <div className="sm:ml-12">
                <CartAmountToggle
                  amount={item.amount}
                  setDecrease={() => setDecrease(item.id)}
                  setIncrease={() => setIncrease(item.id)}
                />
                <button
                  className="mt-4 px-5 py-1.5 text-xs font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>

              <p className="font-medium sm:ml-auto">
                ${(item.price * item.amount).toFixed(2)}
              </p>
            </article>
          </div>
        ))}

        <div className="lg:col-span-4 lg:pl-4 rounded-lg">
          <div className="relative flex flex-col rounded-lg bg-slate-200 opacity-100">
            <div className="flex flex-col flex-1 p-8 gap-2">
              <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                <span>Shipping</span>
                <span className="font-medium">${shipping_fee}</span>
              </p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                <span>Tax</span>
                <span className="font-medium">${tax}</span>
              </p>
              <p className="flex justify-between text-sm mt-4 pb-2">
                <span>Order Total</span>
                <span className="font-medium">${totalAmount}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {isAuthenticated ? (
          <NavLink
            to="/checkout"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Proceed to Checkout
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            PLEASE LOGIN
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Cart;
