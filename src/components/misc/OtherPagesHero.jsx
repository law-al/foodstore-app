import Navbar from "../common/Navbar";
import LeftOverlayBg from "../../assets/Home/Overly-img-home.png";
import UtilsButton from "./UtilsButton";
import ReadMoreBtn from "./ReadMoreBtn";
import { useState } from "react";
import CartSection from "./CartSection";

function OtherPagesHero() {
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);

  function handleCartMenu() {
    setIsCartMenuOpen(!isCartMenuOpen);
  }

  return (
    <>
      <div className="relative bg-[var(--bg-hero)] md:bg-[url('/assets/OtherPageHero.png')] bg-contain bg-right-bottom  bg-no-repeat md:py-[50px] md:px-[150px] w-full min-h-[70vh]">
        {/* Background Overlay */}
        <div
          style={{ backgroundImage: `url(${LeftOverlayBg})` }}
          className="hidden md:block absolute h-[500px] w-[700px] bg-no-repeat border-red-500 top-0 left-0 opacity-20 z-[1]"
        ></div>

        {/* Navbar */}
        <div className="relative mx-auto w-full z-[20]">
          <Navbar handleCartMenu={handleCartMenu} />
        </div>

        {/* Cart Menu Open */}
        <CartSection
          handleCartMenu={handleCartMenu}
          isCartMenuOpen={isCartMenuOpen}
        />

        {/* Hero Section */}
        <div className="relative z-[10] mx-auto mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 h-full"></div>
      </div>
    </>
  );
}

export default OtherPagesHero;
