import { MdOutlineSpaceDashboard } from "react-icons/md";
import { VscListOrdered } from "react-icons/vsc";
import { TbUsers } from "react-icons/tb";
import { PiWallet } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { NavLink, Outlet } from "react-router";

function AdminMain() {
  return (
    <section>
      <div className="grid grid-cols-[1fr_5fr] h-[90vh]">
        <div className=" ">
          <ul className="flex flex-col">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `p-3 w-full flex gap-2 items-centertext-[18px] cursor-pointer transition-all duration-100 ${
                  isActive
                    ? "border-r-4 border-main text-black"
                    : "border-r-transparent text-black"
                }`
              }
            >
              <MdOutlineSpaceDashboard className="text-[22px]" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="order"
              className={({ isActive }) =>
                `p-3 w-full flex gap-2 items-centertext-[18px] cursor-pointer transition-all duration-100 ${
                  isActive
                    ? "border-r-4 border-main text-black"
                    : "border-r-transparent text-black"
                }`
              }
            >
              <VscListOrdered className="text-[22px]" />
              <span>Order</span>
            </NavLink>
            <NavLink
              to="users"
              className={({ isActive }) =>
                `p-3 w-full flex gap-2 items-centertext-[18px] cursor-pointer transition-all duration-100 ${
                  isActive
                    ? "border-r-4 border-main text-black"
                    : "border-r-transparent text-black"
                }`
              }
            >
              <TbUsers className="text-[22px]" />
              <span>Users</span>
            </NavLink>
            <NavLink
              to="wallet"
              className={({ isActive }) =>
                `p-3 w-full flex gap-2 items-centertext-[18px] cursor-pointer transition-all duration-100 ${
                  isActive
                    ? "border-r-4 border-main text-black"
                    : "border-r-transparent text-black"
                }`
              }
            >
              <PiWallet className="text-[22px]" />
              <span>Wallet</span>
            </NavLink>
            <NavLink
              to="settings"
              className={({ isActive }) =>
                `p-3 w-full flex gap-2 items-centertext-[18px] cursor-pointer transition-all duration-100 ${
                  isActive
                    ? "border-r-4 border-main text-black"
                    : "border-r-transparent text-black"
                }`
              }
            >
              <CiSettings className="text-[22px]" />
              <span>Settings</span>
            </NavLink>
          </ul>
        </div>
        <div className="p-4 bg-[#F5F5F5]">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default AdminMain;
