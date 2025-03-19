import { Route, Routes } from "react-router";
import HomePageLayout from "./components/layouts/HomePageLayout";
import OtherPagesLayout from "./components/layouts/OtherPagesLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Shop from "./pages/Shop";
import Profile from "./pages/Profile";
import ProductDetails from "./components/products/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePageLayout />} />
      <Route path="/" element={<OtherPagesLayout />}>
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="shop/products/:productId" element={<ProductDetails />} />
        <Route path="blog" element={<Blog />} />
        <Route path="shop" element={<Shop />} />
        <Route path="profile" element={<Profile />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
