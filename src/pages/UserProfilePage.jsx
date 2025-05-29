import { CiUser, CiShop } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";

import UserProfile from "@/components/misc/UserProfile";
import UserOrder from "./UserOrder";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router";
import { clearCart } from "@/redux/slices/cartSlice";

function UserProfilePage() {
  const [tabActive, setTabActive] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  }

  return (
    <section className="px-[150px] py-[100px] relative z-[50]">
      <div className="w-full p-3 mb-10 grid grid-cols-[1fr_3fr] gap-[50px]">
        <div className="p-2 min-h-[300px]">
          <h1 className="font-semibold text-xl mb-10">User Profile</h1>
          <div className="flex flex-col justify-between ">
            <div className="flex flex-col gap-4 mb-10">
              <div
                onClick={() => setTabActive(1)}
                className={`flex items-center gap-3 text-[16px] cursor-pointer border-r-4 ${
                  tabActive === 1
                    ? "border-r-[var(--color-main)]"
                    : "border-r-transparent"
                } transition-all duration-200`}
              >
                <CiUser />
                <p>User Info</p>
              </div>

              <div
                onClick={() => setTabActive(2)}
                className={`flex items-center gap-3 text-[16px] cursor-pointer border-r-4 ${
                  tabActive === 2
                    ? "border-r-[var(--color-main)]"
                    : "border-r-transparent"
                } transition-all duration-200`}
              >
                <CiShop />
                <p>User Order</p>
              </div>
            </div>

            <div
              onClick={handleLogout}
              className="flex items-center gap-3 text-[16px] cursor-pointer text-red-500 font-semibold"
            >
              <IoMdLogOut />
              <p>Logout</p>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="p-2">
          {/* User Profile */}
          {tabActive === 1 && <UserProfile />}
          {/* User order */}
          {tabActive === 2 && <UserOrder />}
        </div>
      </div>
    </section>
  );
}

export default UserProfilePage;
