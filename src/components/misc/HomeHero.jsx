import Navbar from "../common/Navbar";
import LeftOverlayBg from "../../assets/Home/Overly-img-home.png";
import UtilsButton from "./UtilsButton";
import ReadMoreBtn from "./ReadMoreBtn";
import { useState } from "react";
import CartSection from "./CartSection";

function HomeHero() {
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);

  function handleCartMenu() {
    setIsCartMenuOpen(!isCartMenuOpen);
  }

  return (
    <>
      <div className="relative bg-[var(--bg-hero)] md:bg-[url('/assets/Home-right-img.jpg.jpeg')] bg-cover bg-center bg-no-repeat md:py-[50px] md:px-[150px] w-full min-h-[400px]">
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
        <div className="relative z-[10] mx-auto mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
          <div className="px-10 py-10 text-center md:text-left flex flex-col justify-center ">
            <h3 className="mb-5 md:mb-8 mt-6 md:mt-0 font-bold sm:text-sm md:text-2xl text-[#AACB22]">
              Welcome To Our Grocery Store
            </h3>
            <h1 className="text-[24px] md:text-5xl font-extrabold leading-tight md:leading-snug text-[#14462E] mb-5 md:mb-8">
              Shop Online For Fresh Groceries
            </h1>
            <p className="text-[#14462E] text-sm md:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem officia dolores tenetur cumque id et enim vero
              dolorum hic. Ab?
            </p>

            <div className="flex gap-4 mt-8 justify-center md:justify-start">
              <UtilsButton action={"shop"}>Shop now</UtilsButton>
              <ReadMoreBtn>Read more</ReadMoreBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeHero;
