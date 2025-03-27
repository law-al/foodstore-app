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

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<UserProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
