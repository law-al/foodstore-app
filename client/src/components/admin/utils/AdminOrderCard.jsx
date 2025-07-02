import { CiDollar, CiWallet } from "react-icons/ci";
import { GrRotateLeft } from "react-icons/gr";

function AdminOrderCard() {
  return (
    <div>
      <div className="flex items-center justify-evenly gap-4">
        <div className="w-[25%] h-[150px] bg-white rounded-md shadow-sm flex flex-col items-center justify-around">
          <div className="p-3 bg-[#ccf5b4] rounded-full">
            <CiDollar className="text-4xl text-[#7e9c6d]" />
          </div>

          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-600">Grocery Delivery</p>
            <span className="text-sm">2356</span>
          </div>
        </div>

        <div className="w-[25%] h-[150px] bg-white rounded-md shadow-sm flex flex-col items-center justify-around">
          <div className="p-3 bg-green-200 rounded-full">
            <CiWallet className="text-4xl text-green-600" />
          </div>

          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-600">Balance</p>
            <span className="text-sm">$4050</span>
          </div>
        </div>

        <div className="w-[25%] h-[150px] bg-white rounded-md shadow-sm flex flex-col items-center justify-around">
          <div className="p-3 bg-green-200 rounded-full">
            <CiDollar className="text-4xl text-green-600" />
          </div>

          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-600">Grocery Delivery</p>
            <span className="text-sm">2356</span>
          </div>
        </div>

        <div className="w-[25%] h-[150px] bg-white rounded-md shadow-sm flex flex-col items-center justify-around">
          <div className="p-3 bg-red-200 rounded-full">
            <GrRotateLeft className="text-4xl text-red-600" />
          </div>

          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-600">Cancelled orders</p>
            <span className="text-sm">12%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderCard;
