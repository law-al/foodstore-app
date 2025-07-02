import { addProductToCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "sonner";

function ShopGrid({ products }) {
  const { cart } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  async function handleAddToCartShort(productId) {
    try {
      // Dispatch action with explicit conversion
      const response = await dispatch(
        addProductToCart({
          productId,
          userId: user?._id,
          guestId,
          quantity: 1,
        })
      ).unwrap();
      if (response.success === true) {
        toast.success("Item added to cart", { duration: 1000 });
      }
    } catch (error) {
      // console.error(error);
      const errorMessage = error.message || "System error";
      toast.error(errorMessage, { duration: 1000 });
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {products.map((product) => (
        <div
          key={product._id}
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
            to={`products/${product._id}`}
            className=" flex flex-col justify-between items-center relative gap-3"
          >
            <img
              src={product.images[0]}
              alt={`${product.name} Img`}
              className="w-[200px] h-[200px]"
            />
            <span className="text-[15px] font-semibold text-[var(--color-sec)]">
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
          {product.stocks > 1 ? (
            <button
              className="mt-3 py-0.5 px-2 text-white bg-[var(--color-sec)] font-semibold cursor-pointer"
              onClick={() => handleAddToCartShort(product._id)}
            >
              Add to cart
            </button>
          ) : (
            <p>Out of stock</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ShopGrid;
