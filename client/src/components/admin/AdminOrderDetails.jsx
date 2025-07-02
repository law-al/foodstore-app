import AdminOrderCard from "./utils/AdminOrderCard";

function AdminOrderDetails() {
  const orderSummary = [
    {
      image: "https://picsum.photos/200/300?random=27",
      product: "Tea",
      items: 3,
      total: 120,
      subTotal: 120,
    },
    {
      image: "https://picsum.photos/200/300?random=27",
      product: "Beverage",
      items: 1,
      total: 320,
      subTotal: 320,
    },
    {
      image: "https://picsum.photos/200/300?random=27",
      product: "Sauce",
      items: 5,
      total: 120,
      subTotal: 120,
    },
  ];

  console.log(orderSummary.length > 0);

  return (
    <div>
      <div className="">
        <div className="mb-5">
          <p>Order details</p>
          <div className=""></div>
        </div>

        <div className="grid grid-cols-[3fr_1fr]">
          <div className="">
            <div className=" w-full h-[150px] mb-5 bg-white rounded shadow-sm p-4">
              Track order
            </div>

            <div className="w-full mb-5 bg-white rounded shadow-sm p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="text-left">Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {orderSummary?.length > 0 ? (
                    orderSummary.map((order, id) => (
                      <tr key={id} className="text-left">
                        <th className="flex gap-2 items-center  p-2">
                          <img
                            src={order.image}
                            alt="order image"
                            className="w-15 h-10 object-cover "
                          />
                          <p className="font-normal text-sm">{order.product}</p>
                        </th>
                        <th className="font-normal text-sm p-2">
                          {order.total}
                        </th>
                        <th className="font-normal text-sm p-2">
                          {order.items}
                        </th>
                        <th className="font-normal text-sm p-2">
                          {order.subTotal}
                        </th>
                      </tr>
                    ))
                  ) : (
                    <tr>No order</tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="">2</div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetails;
