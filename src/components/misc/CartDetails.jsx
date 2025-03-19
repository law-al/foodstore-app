import { Button } from "@/components/ui/button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

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

function CartDetails() {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="mt-8 w-full border border-black p-4">
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
                <span className="text-gray-600">${product.price}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer font-extralight"
                  >
                    <AiOutlineMinus />
                  </Button>
                  <p>{product.quantity}</p>
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer font-extralight"
                  >
                    <AiOutlinePlus />
                  </Button>
                </div>

                <div className="">
                  <MdDelete className="text-2xl cursor-pointer text-red-600" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button className="bg-black text-white cursor-pointer hover:opacity-85">
        Checkout
      </Button>
    </div>
  );
}

export default CartDetails;
