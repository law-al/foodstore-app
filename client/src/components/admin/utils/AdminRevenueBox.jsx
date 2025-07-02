import { CiStar } from "react-icons/ci";
import { PiBuildingOfficeThin } from "react-icons/pi";

function AdminRevenueBox() {
  return (
    <>
      <div className="grid grid-cols-[2fr_1fr] gap-8">
        <div className="w-full border border-red-600"></div>
        <div className="bg-white rounded-md shadow-md p-6">
          <p className="font-semibold text-xl mb-3">Total Earning</p>

          <div className="flex flex-col items-center justify-evenly gap-6">
            <div className="bg-white rounded-md border border-gray-300 w-full flex flex-col items-center gap-3 p-3">
              <CiStar className="text-3xl" />
              <p>$5880</p>
              <p>Today</p>
            </div>

            <div className="bg-white rounded-md border border-gray-200 w-full flex flex-col items-center gap-3 p-3">
              <PiBuildingOfficeThin className="text-3xl" />
              <p>$3880</p>
              <p>Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRevenueBox;
