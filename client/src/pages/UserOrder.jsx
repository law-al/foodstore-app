import { getUserOrder } from "@/redux/slices/orderSlice";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// An order can multiple products.

function UserOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getUserOrder());
  }, [dispatch]);

  //     const mockOrder = [
  //       {
  //         _id: "12345",
  //         createdAt: new Date(),
  //         shippingAddress: { city: "New York", country: "USA" },
  //         orderItems: [
  //           {
  //             name: "Product 1",
  //             image: "https://picsum.photos/500/600/?random=2",
  //             quantity: 1,
  //           },
  //         ],
  //         totalPrice: 100,
  //         isPaid: true,
  //       },

  //       {
  //         _id: "12645",
  //         createdAt: new Date(),
  //         shippingAddress: { city: "New York", country: "USA" },
  //         orderItems: [
  //           {
  //             name: "Product 1",
  //             image: "https://picsum.photos/500/600/?random=2",
  //             quantity: 1,
  //           },
  //         ],
  //         totalPrice: 100,
  //         isPaid: true,
  //       },
  //     ];

  //     setOrders(mockOrder);
  //   }, 1000);
  // }, []);

  function handleOrderDetailPage(id) {
    navigate(`/order/${id}`);
  }

  if (loading)
    return (
      <div className="px-[150px] py-[100px] flex items-center justify-center">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#aacb22"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );

  if (error)
    return (
      <div className="px-[150px] py-[100px] flex items-center justify-center">
        <p className="text-4xl text-red-500">Error loading page!</p>
      </div>
    );

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
                <th className="p-2 font-medium">
                  {order._id.toString().slice(-5)}
                </th>
                <th className="p-2 font-medium">{order.totalPrice}</th>
                <th className="p-2 font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </th>
                <th className="p-2 font-medium">{order.orderItems.length}</th>
                <th className="p-2 font-medium">
                  {order.isPaid ? "Paid" : "Pending"}
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
