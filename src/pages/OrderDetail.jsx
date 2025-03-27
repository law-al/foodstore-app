import { useEffect, useState } from "react";
import { useParams } from "react-router";

function OrderDetail() {
  const [orderDetails, setOrderDetails] = useState(null);
  const { orderId } = useParams();
  console.log(orderId);

  useEffect(() => {
    const mockOrderDetails = {
      _id: orderId,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",
      shippingAddress: { city: "New York", country: "USA" },
      orderItems: [
        {
          productId: "1",
          name: "Jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/150?random=1",
        },
        {
          productId: "2",
          name: "Shirt",
          price: 150,
          quantity: 2,
          image: "https://picsum.photos/150?random=1",
        },
      ],
    };
    setOrderDetails(mockOrderDetails);
  }, [orderId]);

  return (
    <div className="px-[150px] py-[100px]">
      {!orderDetails ? (
        <div>No order found</div>
      ) : (
        <div className="">
          <div className="flex items-center justify-between mb-6">
            <div className="">
              <p className="font-semibold text-xl">
                Order ID: {orderDetails._id}{" "}
              </p>
              <span>
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="">
              <div className="flex items-center gap-2">
                <p>Payment status: </p>
                <span>Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <p>Delivery status: </p>
                <span>Pending</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 mb-5">
            <div className="">
              <h2 className="font-semibold text-xl mb-2">Payment Info</h2>

              <div className="">
                <div className="">
                  <p className="inline-block mr-1">Payment method: </p>
                  <span>{orderDetails.paymentMethod}</span>
                </div>

                <div className="">
                  <p className="inline-block mr-1">Status: </p>
                  <span>{orderDetails.isPaid ? "Paid" : "Not Paid"}</span>
                </div>
              </div>
            </div>
            <div className="">
              <h2 className="font-semibold text-xl mb-2">Shipping Info</h2>

              <div className="">
                <div className="">
                  <p className="inline-block mr-1">shipping method: </p>
                  <span>{orderDetails.shippingMethod}</span>
                </div>

                <div className="">
                  <p className="inline-block mr-1">Address: </p>
                  <span>
                    {orderDetails.shippingAddress.city},
                    {orderDetails.shippingAddress.country}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <h2 className="font-semibold mb-4 text-xl">Products</h2>

            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F9FA]">
                  <th className="p-2">NAME</th>
                  <th className="p-2">UNIT PRICE</th>
                  <th className="p-2">QUANTITY</th>
                  <th className="p-2">TOTAL</th>
                </tr>
              </thead>

              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr className="cursor-pointer border-b border-gray-400 hover:border-gray-300">
                    <th className="p-2 font-medium">{item.name}</th>
                    <th className="p-2 font-medium">{item.price}</th>
                    <th className="p-2 font-medium">{item.quantity}</th>
                    <th className="p-2 font-medium">
                      ${item.quantity * item.price}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;
