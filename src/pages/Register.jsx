import { registerUser } from "@/redux/slices/authSlice";
import { mergeProduct } from "@/redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

function Register() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [regError, setRegError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const isProfileRedirect = redirect.includes("profile");
  const isCheckoutRedirect = redirect.includes("checkout");
  // console.log("is checkout redirect", isCheckoutRedirect);
  console.log(isCheckoutRedirect && cart?.products.length > 0);

  const { guestId } = authState;

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
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
  ]);

  function handleUserInfo(e) {
    const { value, name } = e.target;
    setRegError(null);

    setUser((prev) => {
      let newUser = { ...prev, [name]: value };

      setIsDisabled(
        !newUser.password ||
          !newUser.firstname ||
          !newUser.lastname ||
          !newUser.email ||
          newUser.confirm !== newUser.password
      );

      return newUser;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(user.email)) {
      setRegError("email is invalid");
      return;
    }

    if (user.password.length < 6) {
      setRegError("password must be more than 5 characters");
      return;
    }

    const { confirm, ...userData } = user;
    dispatch(registerUser(userData));
    navigate("/profile");
  }

  return (
    <div className="px-[150px] py-[100px]">
      <div className=" flex items-center justify-center">
        <div className="w-[600px] p-2 relative z-[50]">
          <h2 className="text-2xl font-semibold mb-10">Register</h2>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <p
              className={`${
                regError ? "opacity-100 visible" : "opacity-0 invisible"
              } text-red-500 transition-all duration-150 italic text-xs mb-2`}
            >
              {regError}
            </p>
            <div className="flex justify-between gap-2 mb-3">
              <div className=" w-1/2">
                <label htmlFor="firstname" className="block mb-1">
                  Firstname
                </label>
                <input
                  value={user.firstname}
                  onChange={(e) => handleUserInfo(e)}
                  className="border border-main p-2 w-full rounded-md"
                  type="text"
                  id="firstname"
                  name="firstname"
                />
              </div>

              <div className=" w-1/2">
                <label className="block mb-1" htmlFor="lastname">
                  Lastname
                </label>
                <input
                  value={user.lastname}
                  onChange={(e) => handleUserInfo(e)}
                  className="border border-main p-2 w-full rounded-md"
                  type="text"
                  id="lastname"
                  name="lastname"
                />
              </div>
            </div>

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

            <div className="flex justify-between gap-2 mb-3">
              <div className=" w-1/2">
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

              <div className=" w-1/2">
                <label className="block mb-1" htmlFor="confirm">
                  Confirm password
                </label>
                <input
                  value={user.confirm}
                  onChange={(e) => handleUserInfo(e)}
                  className="border border-main p-2 w-full rounded-md"
                  type="password"
                  id="confirm"
                  name="confirm"
                />
              </div>
            </div>

            <button
              disabled={isDisabled}
              className={`mt-3 bg-main py-2 px-8  text-white rounded-md ${
                isDisabled ? "opacity-50" : "opacity-100 cursor-pointer"
              }`}
            >
              Register
            </button>
          </form>
          <div className="mt-3 italic text-sm">
            <p className="inline-block mr-1">Have an account? </p>
            <Link
              to={isCheckoutRedirect ? "/login?redirect=checkout" : "/login"}
              className="text-main hover:text-blue-600 hover:underline"
            >
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
