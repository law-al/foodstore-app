import ProductGrid from "./ProductGrid";

function BestSellerSection() {
  const products = [
    {
      id: 1,
      name: "Orange Beverage",
      onSale: true,
      price: 15,
      discountPrice: 12,
      image: "https://picsum.photos/100/100?random=1",
    },
    {
      id: 2,
      name: "Body Lotion",
      onSale: true,
      price: 45,
      discountPrice: 12,
      image: "https://picsum.photos/100/100?random=2",
    },
    {
      id: 3,
      name: "Dozen Eggs",
      onSale: true,
      price: 20,
      discountPrice: 12,
      image: "https://picsum.photos/100/100?random=3",
    },
    {
      id: 4,
      name: "Cooking Oil",
      onSale: true,
      price: 5,
      discountPrice: 2.5,
      image: "https://picsum.photos/100/100?random=4",
    },
    {
      id: 5,
      name: "SmooRed Pepper",
      onSale: true,
      price: 25,
      discountPrice: 22,
      image: "https://picsum.photos/100/100?random=5",
    },
    {
      id: 6,
      name: "Fresh Bread",
      onSale: true,
      price: 11,
      discountPrice: 10,
      image: "https://picsum.photos/100/100?random=6",
    },
  ];

  return (
    <section className="mx-auto py-[50px] px-[150px]">
      <p className="text-center text-2xl font-semibold mb-6 text-[var(--color-main)]">
        Most Poupular
      </p>
      <h1 className="text-center mb-10 text-4xl font-semibold  text-[var(--color-sec)]">
        Trending Products
      </h1>

      <ProductGrid products={products} />
    </section>
  );
}

export default BestSellerSection;
