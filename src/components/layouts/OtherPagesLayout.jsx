import { Outlet } from "react-router";
import OtherPagesHero from "../misc/OtherPagesHero";
import Footer from "../common/Footer";

function OtherPagesLayout() {
  return (
    <div>
      <OtherPagesHero />
      <Outlet />
      <Footer />
    </div>
  );
}

export default OtherPagesLayout;
