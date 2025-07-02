import HomeHero from "../components/misc/HomeHero";
import Testimonial from "../components/misc/Testimonial";
import UtilsButton from "../components/misc/UtilsButton";
import BestSellerSection from "../components/products/BestSellerSection";
import MostPopularSection from "../components/products/MostPopularSection";
import ShopnowSection from "../components/products/ShopnowSection";
import WhatWeOfferSection from "../components/products/WhatWeOfferSection";

function Home() {
  return (
    <>
      {/* Cart Drawer Section */}
      <HomeHero />
      <ShopnowSection />
      <MostPopularSection />
      {/* About us */}
      <section className="">
        <div className="relative mx-auto px-[100px] w-full min-h-[800px]  bg-[url('/assets/left-img.jpg.jpeg')] bg-no-repeat bg-contain bg-left-bottom">
          <div className="absolute right-0 bottom-2.5 h-[600px] w-[380px] bg-[url('/assets/left-overly.png')] bg-no-repeat bg-cover -z-[10] opacity-50"></div>
          <div className="grid grid-cols-2 h-full ">
            <div className=""></div>
            <div className="pt-[200px]">
              <div className=" bg-white py-[100px] px-[50px] flex flex-col items-start shadow">
                <h2 className="text-[var(--color-main)] text-xl font-bold mb-3">
                  About Us
                </h2>
                <h1 className="text-5xl font-semibold text-gray-800 mb-8">
                  We provide the best experience
                </h1>
                <p className="mb-3 text-justify">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Dicta, error in obcaecati repellendus velit vitae nam tempora
                  iure. Harum fugiat autem earum a deserunt magni quia. Quam
                  ullam qui nemo velit, aliquid nulla modi, soluta maxime
                  deserunt labore non sequi!
                </p>
                <p className="mb-8 text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                  quibusdam nostrum facilis obcaecati alias architecto quia
                  facere inventore officiis fugiat?
                </p>

                <UtilsButton>Read more</UtilsButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatWeOfferSection />
      <BestSellerSection />
      <Testimonial />
    </>
  );
}

export default Home;
