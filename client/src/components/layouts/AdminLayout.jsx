import AdminMain from "../admin/AdminMain";
import AdminNav from "../admin/AdminNav";

function AdminLayout() {
  return (
    <div>
      <AdminNav />
      <AdminMain />
    </div>
  );
}

export default AdminLayout;
