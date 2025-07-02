import { Link } from "react-router";
import vegeBg from "../../assets/Home/categories-1.png";
import beverageBg from "../../assets/Home/categories-2.png";
import healthBg from "../../assets/Home/categories-3.png";

function ShopNowComponent({ category, children }) {
  let color;
  let backgroundImg;

  if (category === "vegetable") {
    color = "#92DDD8";
    backgroundImg = vegeBg;
  } else if (category === "beverage") {
    color = "#FA9421";
    backgroundImg = beverageBg;
  } else if (category === "health") {
    color = "#9FCB22";
    backgroundImg = healthBg;
  } else {
    color = "#EDF1F2";
  }

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="w-[380px] h-[270px] overflow-hidden flex group"
    >
      <div className="p-8  text-2xl text-white flex flex-col justify-around">
        <p> {children}</p>

        <Link
          to="shop"
          className="block mt-10 text-nowrap text-sm hover:underline hover:text-black transition-all duration-150"
        >
          SHOP NOW &rarr;
        </Link>
      </div>
      <img
        src={`${backgroundImg}`}
        alt=""
        className="translate-y-1.5 group-hover:opacity-80 group-hover:scale-105 transition-transform duration-200 ease-in-out"
      />
    </div>
  );
}

export default ShopNowComponent;
