import AdminOrderCard from "./utils/AdminOrderCard";
import AdminOrderSummary from "./utils/AdminOrderSummary";

function AdminOrder() {
  return (
    <section>
      <div className="mb-8">
        <AdminOrderCard />
      </div>

      <div className="">
        <AdminOrderSummary />
      </div>
    </section>
  );
}

export default AdminOrder;
