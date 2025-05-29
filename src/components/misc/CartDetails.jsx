import { Button } from "@/components/ui/button";
import { deleteCartProduct, updateCartProduct } from "@/redux/slices/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import PayButton from "./PayButton";

function CartDetails({ cart }) {
  const { user, guestId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleUpdateCart(productId, delta, quantity) {
    const newQauntity = quantity + delta;
    if (newQauntity >= 1) {
      dispatch(
        updateCartProduct({
          productId,
          userId: user?._id,
          guestId,
          quantity: newQauntity,
        })
      );
    }
  }

  function handleDeleteCartProduct(productId) {
    dispatch(
      deleteCartProduct({
        productId,
        userId: user?._id,
        guestId,
      })
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mt-8 w-fullp-4">
        {cart.products.map((product) => (
          <div
            key={product.productId}
            className="p-2 w-full 
           flex items-center justify-between gap-2"
          >
            <div>
              <img
                src={product.image}
                alt="Product Image"
                className="w-[100px] h-[100px] object-cover"
              />
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
                    onClick={() =>
                      handleUpdateCart(product.productId, -1, product.quantity)
                    }
                    className="cursor-pointer font-extralight"
                  >
                    <AiOutlineMinus />
                  </Button>
                  <p>{product.quantity}</p>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleUpdateCart(product.productId, 1, product.quantity)
                    }
                    className="cursor-pointer font-extralight mt-auto"
                  >
                    <AiOutlinePlus />
                  </Button>
                </div>

                <div
                  onClick={() => handleDeleteCartProduct(product.productId)}
                  className=""
                >
                  <MdDelete className="text-2xl cursor-pointer text-red-600" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PayButton cart={cart} />
    </div>
  );
}

export default CartDetails;
