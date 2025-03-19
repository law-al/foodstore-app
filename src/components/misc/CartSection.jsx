import { MdOutlineClose } from "react-icons/md";
import CartDetails from "./CartDetails";

function CartSection({ isCartMenuOpen, handleCartMenu }) {
  return (
    <div
      className={`fixed top-0 bottom-0 right-0 left-[60%] bg-white h-[100vh] overflow-y-auto z-[100] p-10 ${
        isCartMenuOpen ? "translate-x-0" : "translate-x-full"
      } transition-all ease-initial duration-200`}
    >
      <MdOutlineClose
        className="text-2xl absolute right-0 top-0 translate-y-[50%] -translate-x-[50%] cursor-pointer"
        onClick={handleCartMenu}
      />

      <CartDetails />
    </div>
  );
}

export default CartSection;
