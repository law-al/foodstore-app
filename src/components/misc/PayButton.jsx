import { Button } from "@/components/ui/button";
import { mergeProduct } from "@/redux/slices/cartSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

function PayButton({ cart }) {
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);

  async function handleCheckout() {
    if (!user) return;

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/stripe/create-checkout-session`,
        { cart }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <Button
        onClick={() => handleCheckout()}
        className="bg-black text-white cursor-pointer hover:opacity-85 mt-auto"
      >
        {!user ? (
          <Link to="/register?redirect=checkout" className="w-full">
            Checkout
          </Link>
        ) : (
          <p className="w-full">Checkout</p>
        )}
      </Button>
    </>
  );
}

export default PayButton;
