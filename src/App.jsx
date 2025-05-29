import { Route, Routes } from "react-router";
import HomePageLayout from "./components/layouts/HomePageLayout";
import OtherPagesLayout from "./components/layouts/OtherPagesLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import UserProfilePage from "./pages/UserProfilePage";
import ProductDetails from "./components/products/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";
import OrderDetail from "./pages/OrderDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import PrivateRoute from "./pages/PrivateRoute";
import Shop from "./pages/Shop";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminOrder from "./components/admin/AdminOrder";
import AdminUsers from "./components/admin/AdminUsers";
import AdminWallet from "./components/admin/AdminWallet";
import AdminSettings from "./components/admin/AdminSettings";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminOrderDetails from "./components/admin/AdminOrderDetails";
import AdminUpdateUser from "./components/admin/AdminUpdateUser";
import CustomerDetails from "./components/admin/CustomerDetails";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePageLayout />} />

        <Route path="/" element={<OtherPagesLayout />}>
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="shop/products/:productId" element={<ProductDetails />} />
          <Route path="blog" element={<Blog />} />
          <Route path="order/:orderId" element={<OrderDetail />} />
          <Route path="shop" element={<Shop />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="checkout-success" element={<CheckoutSuccessPage />} />
          <Route path="profile" element={<UserProfilePage />} />

          {/* Protected Routes */}
          {/* <Route element={<PrivateRoute />}>
          </Route> */}
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="order" element={<AdminOrder />} />
          <Route path="order/:orderId" element={<AdminOrderDetails />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/edit" element={<AdminUpdateUser />} />
          <Route path="users/customer/detail" element={<CustomerDetails />} />
          <Route path="wallet" element={<AdminWallet />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
