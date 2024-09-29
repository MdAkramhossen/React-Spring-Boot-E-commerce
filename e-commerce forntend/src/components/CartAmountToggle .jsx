import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
  return (
    <div className="flex items-center">
      <button
        onClick={() => setDecrease()}
        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        <FaMinus />
      </button>
      <div className="mx-3 text-sm font-medium">{amount}</div>
      <button
        onClick={() => setIncrease()}
        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default CartAmountToggle;
