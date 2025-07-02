import { Link } from "react-router";
import ProductGrid from "./ProductGrid";

function MostPopularSection() {
  const products = [
    {
      id: 1,
      name: "Beef Steak",
      onSale: true,
      price: 15,
      discountPrice: 12,
      image: "https://picsum.photos/100/100?random=1",
    },
    {
      id: 2,
      name: "Beef Steak",
      onSale: false,
      price: 45,
      discountPrice: 12,
      image: "https://picsum.photos/100/100?random=2",
    },
    {
      id: 3,
      name: "Fresh Honey",
      onSale: true,
      price: 20,
      discountPrice: 12,
      image: "https://picsum.photos/100/100?random=3",
    },
    {
      id: 4,
      name: "Milk",
      onSale: false,
      price: 5,
      discountPrice: 2.5,
      image: "https://picsum.photos/100/100?random=4",
    },
    {
      id: 5,
      name: "Smoothie",
      onSale: true,
      price: 25,
      discountPrice: 22,
      image: "https://picsum.photos/100/100?random=5",
    },
    {
      id: 6,
      name: "Straw Berries",
      onSale: false,
      price: 11,
      discountPrice: 10,
      image: "https://picsum.photos/100/100?random=6",
    },
  ];

  return (
    <section className="mx-auto px-[150px] md:py-[100px] pt-0 md:pt-0 md:px-[150px]">
      <div className="">
        <p className="text-center text-2xl font-semibold mb-6 text-[var(--color-main)]">
          Most Poupular
        </p>
        <h1 className="text-center mb-10 text-4xl font-semibold  text-[var(--color-sec)]">
          Trending Products
        </h1>
        <ProductGrid products={products} />

        <div className="relative w-full overflow-hidden min-h-[200px] md:h-[200px] mt-[100px bg-[url('/assets/50-IMg.png')] bg-cover mt-20 bg-center bg-no-repeat] p-3">
          <div className="absolute -z-10 right-0 md:bg-[url('/assets/505-img.jpeg')] bg-cover bg-center bg-no-repeat h-[200px] w-[350px] ]"></div>
          <div className="h-full w-full md:w-[70%] block md:flex flex-col md:flex-row justify-between md:gap-2 p-6">
            <div className="flex items-center justify-around gap-2 md:block md:basis-1/2">
              <p className="text-white text-2xl md:text-6xl mb-2 md:mb-6">
                <strong className="text-[#FFFC01]">50%</strong> OFF
              </p>

              <Link
                to="/shop"
                className="w-[50%] text-xs md:text-base uppercase  text-white hover:underline hover:text-black transition-all duration-300"
              >
                shop now &rarr;
              </Link>
            </div>

            <h2 className="text-center text-[26px] md:text-start md:basis-1/2 text-white md:text-[35px] font-semibold text-wrap">
              Popular And Trending Products
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MostPopularSection;
