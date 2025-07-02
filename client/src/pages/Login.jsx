import { loginUser } from "@/redux/slices/authSlice";
import { mergeProduct } from "@/redux/slices/cartSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  // const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  const authState = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const [isDisabled, setIsDisabled] = useState(true);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const isProfileRedirect = redirect.includes("profile");
  const isCheckoutRedirect = redirect.includes("checkout");
  // console.log("is checkout redirect", isCheckoutRedirect);
  console.log(isCheckoutRedirect);

  const { guestId } = authState;

  /*useEffect(() => {
    if (authState.isAuthenticated) {
      if (isProfileRedirect) {
        navigate("/profile");
      } else if (isCheckoutRedirect && cart?.products.length > 0) {
        dispatch(mergeProduct({ guestId })).then(() => {
          navigate("/checkout");
        });
      } else {
        navigate("/");
      }
    }
  }, [
    authState.isAuthenticated,
    guestId,
    navigate,
    dispatch,
    cart,
    isProfileRedirect,
    isCheckoutRedirect,
  ]);*/

  useEffect(() => {
    const redirectFunc = async () => {
      if (authState.isAuthenticated) {
        if (isProfileRedirect) {
          navigate("/profile");
        } else if (isCheckoutRedirect && cart && cart.products.length > 0) {
          dispatch(mergeProduct({ guestId }));

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
            console.error("Stripe checkout error:", error);
          }
        } else {
          navigate("/");
        }
      }
    };

    redirectFunc();
  }, [
    authState.isAuthenticated,
    guestId,
    navigate,
    dispatch,
    cart,
    isProfileRedirect,
    isCheckoutRedirect,
  ]);

  function handleUserInfo(e) {
    setLoginError(null);
    const { value, name } = e.target;

    setUser((prev) => {
      let newUser = { ...prev, [name]: value };
      setIsDisabled(!newUser.password || !newUser.email);
      return newUser;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(loginUser(user));
  }

  if (authState.error) {
    console.log(authState.error);
    setLoginError(authState.error);
  }

  return (
    <div className="px-[150px] py-[100px]">
      <div className=" flex items-center justify-center">
        <div className="w-[600px] p-2">
          <h2 className="text-2xl font-semibold mb-10">Login</h2>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            {loginError ? (
              <p className="text-red-600 text-sm italic mb-2">
                {authState.error}
              </p>
            ) : (
              ""
            )}
            <div className="mb-3">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                value={user.email}
                onChange={(e) => handleUserInfo(e)}
                className="border border-main p-2 w-full rounded-md"
                type="email"
                name="email"
                id="email"
              />
            </div>

            <div className=" w-full">
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                value={user.password}
                onChange={(e) => handleUserInfo(e)}
                className="border border-main p-2 w-full rounded-md"
                type="password"
                id="password"
                name="password"
              />
            </div>

            <button
              disabled={isDisabled}
              className={`mt-3 bg-main py-2 px-8  text-white rounded-md ${
                isDisabled ? "opacity-50" : "opacity-100 cursor-pointer"
              }`}
            >
              Login
            </button>
          </form>
          <div className="mt-3 italic text-sm">
            <p className="inline-block mr-1">Don't have an account? </p>
            <Link
              to={
                isCheckoutRedirect ? "/register?redirect=checkout" : "/register"
              }
              className="text-main hover:text-blue-600 hover:underline"
            >
              register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
