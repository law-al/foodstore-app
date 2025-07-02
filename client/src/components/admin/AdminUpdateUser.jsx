import { RxCross2 } from "react-icons/rx";
import { IoSaveOutline } from "react-icons/io5";

function AdminUpdateUser() {
  return (
    <div>
      <div className="mb-5">
        <p>Edit customer</p>
        <div className=""></div>
      </div>

      <div className="w-full bg-white shadow-xs rounded-md p-4">
        <form action="" className="w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <label htmlFor="firstname" className="text-sm">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                placeholder="Enter your firstname"
                className="p-2 w-full border border-gray-300 mt-1 rounded-sm"
              />
            </div>

            <div className="">
              <label htmlFor="lastname" className="text-sm">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="Enter your lastname"
                className="p-2 w-full border border-gray-300 mt-1 rounded-sm"
              />
            </div>

            <div className="">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="p-2 w-full border border-gray-300 mt-1 rounded-sm"
              />
            </div>

            <div className="">
              <label htmlFor="phone" className="text-sm">
                Phone Number
              </label>
              <input
                type="phone"
                id="phone"
                placeholder="Enter your phone"
                className="p-2 w-full border border-gray-300 mt-1 rounded-sm"
              />
            </div>

            <div className="">
              <label htmlFor="address" className="text-sm">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter your Address"
                className="p-2 w-full border border-gray-300 mt-1 rounded-sm"
              />
            </div>

            <div className="">
              <label htmlFor="country" className="text-sm">
                Country
              </label>
              <input
                type="text"
                id="country"
                placeholder="Enter your country"
                className="p-2 w-full border border-gray-300 mt-1 rounded-sm"
              />
            </div>

            <div className="">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="status"
                name="status"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-sm"
              >
                <option value="">Select status</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="country" className="text-sm">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Description"
              className="p-2 w-full h-32 resize-y border border-gray-300 mt-1 rounded-sm"
            />
          </div>

          <div className="mt-5">
            <div className="flex gap-3">
              <button className="flex items-center gap-1 border p-2 rounded-sm cursor-pointer bg-gray-400 text-white">
                <RxCross2 />
                <span>Close</span>
              </button>
              <button className="flex items-center gap-1 border p-2 rounded-sm cursor-pointer bg-main text-white">
                <IoSaveOutline />
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminUpdateUser;
