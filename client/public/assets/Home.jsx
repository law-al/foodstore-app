import HomeHero from "../components/misc/HomeHero";
import Testimonial from "../components/misc/Testimonial";
import BestSellerSection from "../components/products/BestSellerSection";
import MostPopularSection from "../components/products/MostPopularSection";
import ShopnowSection from "../components/products/ShopnowSection";
import WhatWeOfferSection from "../components/products/WhatWeOfferSection";

function Home() {
  return (
    <div>
      <HomeHero />
      <ShopnowSection />
      <MostPopularSection />
      {/* About us */}
      <section className="">
        <div className="mx-auto px-[100px] w-full h-[800px] border border-black bg-[url('/assets/50-IMg.png')]">
          About
        </div>
      </section>

      <WhatWeOfferSection />
      <BestSellerSection />
      <Testimonial />
    </div>
  );
}

export default Home;
