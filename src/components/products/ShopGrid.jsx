import { Link } from "react-router";

function ShopGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-10 bg-[#F5F9FA] border border-transparent min-h-[500px] flex flex-col items-center gap-3 hover:border-[var(--color-main)] transition-all duration-200"
        >
          <p
            className={`bg-[#D9485B] py-0.5 px-3 text-white  -translate-x-[150%] -translate-y-[100%] ${
              product.onSale ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            Sale!
          </p>
          <Link
            to={`products/${product.id}`}
            className=" flex flex-col justify-between items-center relative gap-3"
          >
            <img
              src={product.image}
              alt={`${product.name} Img`}
              className="w-[200px] h-[200px]"
            />
            <span className="text-2xl font-semibold text-[var(--color-sec)]">
              {product.name}
            </span>
            <div className="flex gap-2 text-[18px]">
              <p
                className={`${
                  product.onSale
                    ? "line-through text-gray-400"
                    : "text-[var(--color-main)] font-semibold"
                }`}
              >
                ${product.price}.00
              </p>
              <p
                className={`text-[var(--color-main)] font-semibold ${
                  product.onSale ? "block" : "hidden"
                }`}
              >
                ${product.discountPrice}.00
              </p>
            </div>
          </Link>
          <button className="mt-3 py-0.5 px-2 text-white bg-[var(--color-sec)] font-semibold cursor-pointer">
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ShopGrid;
