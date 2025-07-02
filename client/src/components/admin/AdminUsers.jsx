import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { FaPencil } from "react-icons/fa6";
import { IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

function AdminUsers() {
  const navigate = useNavigate();
  const users = [
    {
      name: "Alice Johnson",
      image: "https://picsum.photos/seed/alice/40",
      phone: "+1 (555) 123-4567",
      email: "alice.johnson@example.com",
      orders: 12,
      total: "$1,240.00",
      customerSince: "2021-05-12",
      status: "Active",
    },
    {
      name: "Brian Kim",
      image: "https://picsum.photos/seed/brian/40",
      phone: "+1 (555) 987-6543",
      email: "brian.kim@example.com",
      orders: 8,
      total: "$760.00",
      customerSince: "2022-01-18",
      status: "Inactive",
    },
    {
      name: "Chloe Martinez",
      image: "https://picsum.photos/seed/chloe/40",
      phone: "+1 (555) 333-8899",
      email: "chloe.martinez@example.com",
      orders: 5,
      total: "$410.00",
      customerSince: "2020-09-03",
      status: "Active",
    },
    {
      name: "David Wu",
      image: "https://picsum.photos/seed/david/40",
      phone: "+1 (555) 444-2211",
      email: "david.wu@example.com",
      orders: 20,
      total: "$2,150.00",
      customerSince: "2019-11-23",
      status: "Banned",
    },
    {
      name: "Ella Singh",
      image: "https://picsum.photos/seed/ella/40",
      phone: "+1 (555) 777-3333",
      email: "ella.singh@example.com",
      orders: 3,
      total: "$190.00",
      customerSince: "2023-04-11",
      status: "Active",
    },
    {
      name: "Felix Anders",
      image: "https://picsum.photos/seed/felix/40",
      phone: "+1 (555) 888-1122",
      email: "felix.anders@example.com",
      orders: 14,
      total: "$1,320.00",
      customerSince: "2021-08-07",
      status: "Banned",
    },
  ];

  function handleEditPage() {
    navigate("edit");
  }

  function handleDetailPage() {
    navigate("customer/detail");
  }

  return (
    <div>
      <div className="mb-4">
        <p>User List</p>
        <div className=""></div>
      </div>

      <div className="bg-white p-4">
        <div className="mb-5 flex items-center justify-between">
          <form action="">
            <div className="relative">
              <CiSearch className="text-2xl absolute top-2 left-2 text-gray-400" />

              <input
                type="text"
                placeholder="Search"
                className="border-2 border-gray-400 pl-10 py-2 pr-2 rounded-sm"
              />
            </div>
          </form>

          <div className="cursor-pointer bg-main text-white rounded-sm border-2 border-main">
            <div className=" p-2 flex items-center gap-2">
              <GoPlus className="text-2xl" />
              <span>Add New Customers</span>
            </div>
          </div>
        </div>

        <div className="w-[1200px] overflow-x-scroll">
          <table className="w-[1400px]">
            <thead className="">
              <tr className="text-left">
                <th className="font-medium p-2 text-left">Customer name</th>
                <th className="font-medium p-2 text-left">Phone</th>
                <th className="font-medium p-2 text-left">Email</th>
                <th className="font-medium p-2 text-left">Orders</th>
                <th className="font-medium p-2 text-left">Total Orders</th>
                <th className="font-medium p-2 text-left">Customer since</th>
                <th className="font-medium p-2 text-left">Status</th>
                <th className="font-medium p-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {users?.length > 0 ? (
                users.map((user, id) => (
                  <tr key={id}>
                    <th className="flex items-center gap-2 font-light p-2">
                      <img
                        src={user.image}
                        alt="user profile image"
                        className="rounded-full object-cover"
                      />
                      <span>{user.name}</span>
                    </th>
                    <th className="text-left font-light">{user.phone}</th>
                    <th className="text-left font-light">{user.email}</th>
                    <th className="text-left font-light">{user.orders}</th>
                    <th className="text-left font-light">{user.total}</th>
                    <th className="text-left font-light">
                      {new Date(user.customerSince).toLocaleDateString()}
                    </th>
                    <th className="">
                      <p
                        className={`text-center font-light rounded-md ${
                          user.status.toLowerCase() === "active"
                            ? "bg-green-100"
                            : user.status.toLowerCase() === "inactive"
                            ? "bg-blue-200"
                            : user.status.toLowerCase() === "banned"
                            ? "bg-red-100"
                            : "bg-transparent"
                        }`}
                      >
                        {user.status.toLowerCase()}
                      </p>
                    </th>
                    <th className="text-left gap-3">
                      <FaPencil
                        onClick={handleEditPage}
                        className="inline ml-5 mr-2 cursor-pointer"
                      />
                      <IoEyeOffOutline
                        onClick={handleDetailPage}
                        className="inline cursor-pointer"
                      />
                    </th>
                  </tr>
                ))
              ) : (
                <tr>No user found</tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
