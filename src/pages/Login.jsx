import { loginUser } from "@/redux/slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  function handleUserInfo(e) {
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

  return (
    <div className="px-[150px] py-[100px]">
      <div className=" flex items-center justify-center">
        <div className="w-[600px] p-2">
          <h2 className="text-2xl font-semibold mb-10">Login</h2>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
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
              to="/register"
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
