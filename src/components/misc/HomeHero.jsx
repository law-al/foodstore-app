import Navbar from "../common/Navbar";
import HomeBg from "../../assets/Home/Home-right-img.jpg.jpeg";
import LeftOverlayBg from "../../assets/Home/Overly-img-home.png";

function HomeHero() {
  return (
    <div
      style={{ backgroundImage: `url(${HomeBg})` }}
      className="relative bg-cover bg-center bg-no-repeat w-[100%]"
    >
      <div
        style={{ backgroundImage: `url(${LeftOverlayBg})` }}
        className="hidden md:block absolute h-[500px] w-[700px] bg-no-repeat border-red-500 top-0 left-0 opacity-20"
      ></div>
      <div className="relative mx-auto w-full md:h-[800px] md:py-[50px] md:px-[150px] z-40">
        <Navbar />
      </div>
    </div>
  );
}

export default HomeHero;
