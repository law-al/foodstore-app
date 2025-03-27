import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// An order can multiple products.

function UserOrder() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const mockOrder = [
        {
          _id: "12345",
          createdAt: new Date(),
          shippingAddress: { city: "New York", country: "USA" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/600/?random=2",
              quantity: 1,
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },

        {
          _id: "12645",
          createdAt: new Date(),
          shippingAddress: { city: "New York", country: "USA" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/600/?random=2",
              quantity: 1,
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
      ];

      setOrders(mockOrder);
    }, 1000);
  }, []);

  function handleOrderDetailPage(id) {
    navigate(`/order/${id}`);
  }

  return (
    <div className="">
      <p className="mb-10 text-xl font-semibold">My Orders</p>

      <table className="w-full">
        <thead className="bg-[#F5F9FA]">
          <tr>
            <th className="p-3 font-semibold text-sm">ORDER ID</th>
            <th className="p-3 font-semibold text-sm">PRICE</th>
            <th className="p-3 font-semibold text-sm">CREATED</th>
            <th className="p-3 font-semibold text-sm">QUANTITY</th>
            <th className="p-3 font-semibold text-sm">STATUS</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr
                key={order._id}
                onClick={() => handleOrderDetailPage(order._id)}
                className="cursor-pointer border-b border-gray-400 hover:border-gray-300"
              >
                <th className="p-2 font-medium">{order._id}</th>
                <th className="p-2 font-medium">{order.totalPrice}</th>
                <th className="p-2 font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </th>
                <th className="p-2 font-medium">{order.orderItems.length}</th>
                <th className="p-2 font-medium">
                  {order.isPaid ? "paid" : "pending"}
                </th>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserOrder;
