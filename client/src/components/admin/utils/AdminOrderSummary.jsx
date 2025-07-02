import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function AdminOrderSummary() {
  const [orderSummary, setOrderSummary] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const orders = [
      {
        createdAt: Date.now(),
        orderId: 13425,
        items: 3,
        totalAmount: 120,
        status: "Paid",
      },
      {
        createdAt: Date.now(),
        orderId: 13225,
        items: 1,
        totalAmount: 320,
        status: "Refund",
      },
      {
        createdAt: Date.now(),
        orderId: 13725,
        items: 5,
        totalAmount: 120,
        status: "Paid",
      },
      {
        createdAt: Date.now(),
        orderId: 13125,
        items: 7,
        totalAmount: 520,
        status: "Paid",
      },
      {
        createdAt: Date.now(),
        orderId: 13495,
        items: 4,
        totalAmount: 100,
        status: "Cancel",
      },
    ];

    const timeoutId = setTimeout(() => {
      setOrderSummary(orders);
    }, 1000);

    return () => clearTimeout(timeoutId); // cleanup on unmount
  }, []);

  return (
    <div className="bg-white p-6 shadow-sm rounded-md">
      <p>Order</p>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-400">
            <th className="p-4 text-gray-900 font-medium">Date</th>
            <th className="p-4 text-gray-900 font-medium">orderID</th>
            <th className="p-4 text-gray-900 font-medium">Items</th>
            <th className="p-4 text-gray-900 font-medium">Amount</th>
            <th className="p-4 text-gray-900 font-medium">Status</th>
          </tr>
        </thead>

        <tbody>
          {orderSummary?.length === 0 ? (
            <tr>
              <th className="w-full p-4 font-light text-center">No order</th>
            </tr>
          ) : (
            orderSummary.map((order) => (
              <tr
                key={order.orderId}
                onClick={() => navigate(`/admin/order/${order.orderId}`)}
                className="border-b border-gray-200 cursor-pointer hover:border-gray-300 transition-all duration-100"
              >
                <th className="p-4 text-gray-700 font-light">
                  {new Date(order.createdAt).toLocaleDateString()}
                </th>
                <th className="p-4 text-gray-700 font-light">
                  {order.orderId}
                </th>
                <th className="p-4 text-gray-700 font-light">{order.items}</th>
                <th className="p-4 text-gray-700 font-light">
                  ${order.totalAmount}
                </th>
                <th className={`p-4 font-light text-white`}>
                  <span
                    className={`p-2 text-sm rounded-md ${
                      order.status === "Paid"
                        ? "text-green-500"
                        : order.status === "Refund"
                        ? "text-orange-500"
                        : order.status === "Cancel"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {order.status}
                  </span>
                </th>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrderSummary;
