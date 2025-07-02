import AdminCard from "./utils/AdminCard";
import AdminOrderSummary from "./utils/AdminOrderSummary";
import AdminRevenueBox from "./utils/AdminRevenueBox";

function AdminDashboard() {
  return (
    <section className="">
      <div className="mb-5">
        <p className="text-3xl font-semibold">Dashboard</p>
      </div>

      <div className="flex items-center justify-between mb-5">
        <AdminCard />
      </div>

      <div className="mb-5">
        <AdminRevenueBox />
      </div>

      <div className="">
        <AdminOrderSummary />
      </div>
    </section>
  );
}

export default AdminDashboard;
