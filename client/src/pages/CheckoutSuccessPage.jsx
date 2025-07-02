import { clearCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = new URLSearchParams(location.search);
  const sessionIdPresent = params.get("session_id");

  if (sessionIdPresent) {
    dispatch(clearCart());
    navigate("/");
  }

  return (
    <div>
      <h2>Check out successful</h2>
    </div>
  );
}

export default CheckoutSuccessPage;
