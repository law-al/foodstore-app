import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Orange Beverage",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid commodi esse magnam quaerat quam. Amet aperiam sint vel dignissimos molestias! Ratione voluptate, cupiditate ea quod assumenda unde quaerat saepe amet modi dolore. Natus fugit odio temporibus veniam in delectus libero?",
    onSale: true,
    price: 15,
    discountPrice: 7.5,
    images: [
      "https://picsum.photos/100/100?random=1",
      "https://picsum.photos/100/100?random=2",
      "https://picsum.photos/100/100?random=3",
    ],
    rating: 5,
    comments: [],
    category: "Beverages",
    brand: "Sunny Grove",
    stock: 80,
    sku: "12LF",
    dietary: ["Vegan", "Gluten-Free"],
    size: "1 Liter",
    promotionId: 1,
    quantity: 1,
  },
];

function CheckoutPage() {
  const [shippingAddress, setShippingAddress] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postal: "",
    country: "",
    phone: "",
  });

  return (
    <section className="relative z-[50] px-[150px] py-[100px]">
      <div className="grid grid-cols-2 gap-5">
        <form action="" className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-full">
              <label htmlFor="firstname" className="mb-2 block">
                Firstname
              </label>
              <input
                required
                type="name"
                value={shippingAddress.firstname}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstname: e.target.value,
                  })
                }
                id="firstname"
                className="w-full p-3 text-sm ring ring-[var(--color-main)] rounded-xl focus:outline-0"
              />
            </div>

            <div className="w-full">
              <label htmlFor="lastname" className="mb-2 block">
                Lastname
              </label>
              <input
                required
                type="name"
                value={shippingAddress.lastname}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastname: e.target.value,
                  })
                }
                id="lastname"
                className="w-full p-3 text-sm ring ring-[var(--color-main)] rounded-xl focus:outline-0"
              />
            </div>
          </div>

          <div className="w-full mb-3">
            <label htmlFor="address" className="mb-2 block">
              Address
            </label>
            <input
              required
              type="name"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              id="address"
              className="w-full p-3 text-sm ring ring-[var(--color-main)] rounded-xl focus:outline-0"
            />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="w-full">
              <label htmlFor="city" className="mb-2 block">
                City
              </label>
              <input
                required
                type="name"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                id="city"
                className="w-full p-3 text-sm ring ring-[var(--color-main)] rounded-xl focus:outline-0"
              />
            </div>

            <div className="w-full">
              <label htmlFor="postal" className="mb-2 block">
                Postal code
              </label>
              <input
                required
                type="name"
                value={shippingAddress.postal}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postal: e.target.value,
                  })
                }
                id="postal"
                className="w-full p-3 text-sm ring ring-[var(--color-main)] rounded-xl focus:outline-0"
              />
            </div>
          </div>

          <div className="w-full mb-3">
            <label htmlFor="country" className="mb-2 block">
              Country
            </label>
            <input
              required
              type="name"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              id="country"
              className="w-full p-3 text-sm ring ring-[var(--color-main)] rounded-xl focus:outline-0"
            />
          </div>

          <div className="w-full mb-5">
            <label htmlFor="phone" className="mb-2 block">
              Phone
            </label>
            <input
              required
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              id="phone"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full p-3 text-sm ring ring-[var(--color-main)] rounded-xl focus:outline-0"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-[var(--color-main)] text-white rounded-xl hover:opacity-85"
          >
            Continue to payment
          </button>
        </form>

        <div className="bg-[#F5F9FA] p-6 rounded-md">
          <p className="pb-3 border-b border-b-gray-500">Order Summary</p>
          <div className="p-3 border-b border-b-gray-300">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-2 w-full 
            flex items-center justify-between gap-2"
              >
                <div className="">
                  <img src={product.images[0]} alt="Product Image" />
                </div>

                <div className=" w-full flex flex-col">
                  <div className="flex justify-between mb-3">
                    <p className="font-semibold">{product.name}</p>
                    <span className="text-gray-600 font-semibold">
                      ${product.price}
                    </span>
                  </div>

                  <span className="">
                    Category:
                    <p className="text-[var(--color-main)] inline-block ml-2">
                      {product.category}
                    </p>
                  </span>
                  <span className="">
                    Quantity:
                    <p className="text-[var(--color-main)] inline-block ml-2">
                      {product.quantity}
                    </p>
                  </span>

                  <div className="flex items-center justify-between"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-b border-b-black">
            <div className="flex justify-between mb-3 font-semibold">
              <p>Subtotal</p>
              <span>$55</span>
            </div>

            <div className="flex justify-between font-semibold">
              <p>Shipping</p>
              <span>FREE</span>
            </div>
          </div>

          <div className="p-3 text-xl flex justify-between font-bold">
            <p>Total</p>
            <p>$55</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
