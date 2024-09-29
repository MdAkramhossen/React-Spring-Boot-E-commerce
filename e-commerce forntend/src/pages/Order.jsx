import { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const jwtToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/order", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Orders</h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <div className="grid grid-cols-6 gap-4 font-semibold border-b pb-2">
          <div>Order Date</div>
          <div>User Name</div>
          <div>Quantity</div>
          <div>Total Price</div>
          <div>Payment Type</div>
          <div>Order Status</div>
        </div>

        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 py-4 border-b">
              <div>{new Date(order.orderDate).toLocaleDateString()}</div>
              <div>{order.userName}</div>
              <div>{order.quantity}</div>
              <div>${order.totalPrice.toFixed(2)}</div>
              <div>{order.paymentType}</div>
              <div
                className={`${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : order.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {order.status}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">No orders found</div>
        )}
      </div>
    </div>
  );
};

export default Order;
