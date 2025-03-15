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
      <WhatWeOfferSection />
      <BestSellerSection />
      <Testimonial />
    </div>
  );
}

export default Home;
