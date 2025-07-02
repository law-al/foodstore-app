import { MdRestaurantMenu } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { BsBox } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";

function AdminCard() {
  return (
    <>
      {/* Card 1 */}
      <div className="w-[300px] h-[150px] border-2 rounded-md bg-white shadow-sm flex items-center p-4 ">
        <div className="flex items-center gap-4">
          <div className="p-3 border-2 border-[#79967A] rounded-full bg-[#E9EEE9]">
            <MdRestaurantMenu className="text-5xl text-[#79967A]" />
          </div>

          <div className="">
            <p className="text-3xl font-semibold">47</p>
            <span className="text-sm">Total Menus</span>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="w-[300px] h-[150px] border-2 rounded-md bg-white shadow-sm  flex items-center p-4 ">
        <div className="flex items-center gap-4 ">
          <div className="p-3 border-2 border-[#00abd1] rounded-full bg-[#E1F8FD]">
            <BiDollar className="text-5xl text-[#00abd1]" />
          </div>

          <div className="">
            <p className="text-3xl font-semibold">12k</p>
            <span className="text-sm">Total Revenue</span>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="w-[300px] h-[150px] border-2 rounded-md bg-white shadow-sm  flex items-center p-4">
        <div className="flex items-center gap-4">
          <div className="p-3 border-2 border-[#e8b007] rounded-full bg-[#FFF7E0]">
            <BsBox className="text-5xl text-[#e8b007]" />
          </div>

          <div className="">
            <p className="text-3xl font-semibold">20</p>
            <span className="text-sm">Total Orders</span>
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="w-[300px] h-[150px] border-2 rounded-md bg-white shadow-sm  flex items-center p-4">
        <div className="flex items-center gap-4">
          <div className="p-3 border-2 border-[#08e098] rounded-full bg-[#DFF7EF]">
            <LuUsers className="text-5xl text-[#08e098]" />
          </div>

          <div className="">
            <p className="text-3xl font-semibold">47</p>
            <span className="text-sm">Total Users</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCard;
