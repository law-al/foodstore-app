import { MdOutlineClose } from "react-icons/md";
import CartDetails from "./CartDetails";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";
import { getCart } from "@/redux/slices/cartSlice";

function CartSection({ isCartMenuOpen, handleCartMenuClose }) {
  const { cart } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);

  const cartMenu = useRef(null);

  const handleClickOutside = useCallback(
    (e) => {
      if (
        cartMenu.current &&
        !cartMenu.current.contains(e.target) &&
        !e.target.closest("#cart-icon")
      ) {
        handleCartMenuClose();
      }
    },
    [cartMenu, handleCartMenuClose]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div
      ref={cartMenu}
      className={`fixed top-0 bottom-0 right-0 left-[60%] bg-white h-[100vh] overflow-y-auto z-[100] p-10 ${
        isCartMenuOpen ? "translate-x-0" : "translate-x-full"
      } transition-all ease-initial duration-200`}
    >
      <MdOutlineClose
        className="text-2xl absolute right-0 top-0 translate-y-[50%] -translate-x-[50%] cursor-pointer"
        onClick={handleCartMenuClose}
      />
      {cart.products.length === 0 ? (
        <p>Empty cart</p>
      ) : (
        <CartDetails cart={cart} />
      )}
    </div>
  );
}

export default CartSection;
