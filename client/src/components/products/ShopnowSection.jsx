import ShopNowComponent from "../misc/ShopNowComponent";

function ShopnowSection() {
  return (
    <div>
      <div className="mx-auto py-[50px] px-[100px] md:py-[100px] md:px-[150px] flex flex-col md:flex-row items-center justify-around gap-5 md:gap-0">
        <ShopNowComponent category={"vegetable"}>
          Get Every Vegetable You Need
        </ShopNowComponent>
        <ShopNowComponent category={"beverage"}>
          We Have The Best Beverages Collection
        </ShopNowComponent>
        <ShopNowComponent category={"health"}>
          Beauty And Health Products
        </ShopNowComponent>
      </div>
    </div>
  );
}

export default ShopnowSection;
