import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <>
      <section className="mx-auto px-[150px] py-[50px]">
        <div className="relative">
          <div className="grid grid-cols-[40%_60%] mb-20">
            <div className=""></div>
            <div className="flex items-center justify-between">
              <img
                src="/assets/Brand-logo-1.png"
                alt="Brand Logo 1"
                className=""
              />
              <img
                src="/assets/Brand-logo-2.png"
                alt="Brand Logo 1"
                className=""
              />
              <img
                src="/assets/Brand-logo-3.png"
                alt="Brand Logo 1"
                className=""
              />
              <img
                src="/assets/Brand-logo-4.png"
                alt="Brand Logo 1"
                className=""
              />
            </div>
          </div>

          <div className="absolute w-full -translate-y-[20%]">
            <div className="static">
              <div className="absolute -top-[100%] left-0 -translate-y-[25%] -translate-x-[15%]">
                <img src="/assets/Footer-Img.png" alt="" className="" />
              </div>
              <div className="bg-[#9FCB22] w-full min-h-[100px]  p-6 grid grid-cols-[40%_60%]">
                <div className=""></div>
                <div className="p-2">
                  <h2 className="text-white text-4xl font-semibold mb-4">
                    Subscribe To Newsletter
                  </h2>
                  <form action="" className="flex items-center">
                    <input
                      type="email"
                      name="newsletter"
                      id=""
                      placeholder="Enter Your Email"
                      className="text-xl w-[70%] p-4 bg-white focus:outline-0"
                    />
                    <button
                      type="submit"
                      className="font-semibold w-[30%] bg-[var(--color-sec)] text-white uppercase p-4 border border-[var(--color-sec)]"
                    >
                      Subscribe now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="bg-[var(--color-sec)] w-full min-h-2.5 pt-[200px] pb-[50px] px-[150px] border-b border-gray-400">
          <div className="grid grid-cols-4 gap-20">
            <div className="">
              <h2 className="text-white text-xl mb-4 font-semibold">
                Store Location
              </h2>
              <p>
                <span className="text-gray-400 mb-2 block ">Address:</span>
                <span className="text-gray-400 mb-3 block">
                  121 King Street Melbourne,3000, Australia
                </span>
              </p>
              <p>
                <span className="text-gray-400 mb-2 block ">Email:</span>
                <span className="text-gray-400 mb-3 block">
                  info@groxistore.com
                </span>
              </p>
              <p>
                <span className="text-gray-400 mb-2 block ">Phone:</span>
                <span className="text-gray-400 mb-3 block">+1 234 5678</span>
              </p>
            </div>

            <div className="">
              <h2 className="text-white text-xl mb-4 font-semibold">
                Useful Links
              </h2>

              <div className="flex flex-col">
                <Link
                  to="/about"
                  className=" text-gray-400 mb-3 block hover:text-[var(--color-main)] transition-all duration-200"
                >
                  About us
                </Link>
                <Link
                  to="blog"
                  className=" text-gray-400 mb-3 block hover:text-[var(--color-main)] transition-all duration-200"
                >
                  Blog
                </Link>
                <Link
                  to="/checkout"
                  className=" text-gray-400 mb-3 block hover:text-[var(--color-main)] transition-all duration-200"
                >
                  Checkout
                </Link>
                <Link
                  to="/contact"
                  className=" text-gray-400 mb-3 block hover:text-[var(--color-main)] transition-all duration-200"
                >
                  Contact
                </Link>
                <Link
                  to="/service"
                  className=" text-gray-400 mb-3 block hover:text-[var(--color-main)] transition-all duration-200"
                >
                  Service
                </Link>
                <Link
                  to="/shop"
                  className=" text-gray-400 mb-3 block hover:text-[var(--color-main)] transition-all duration-200"
                >
                  Shop
                </Link>
              </div>
            </div>
            <div className="">
              <h2 className="text-white text-xl mb-4 font-semibold">
                Categories
              </h2>

              <div className="flex flex-col">
                <Link
                  to="/category"
                  className=" text-gray-400 mb-3 block hover:text-[var(--color-main)] transition-all duration-200"
                >
                  Fruits & Vegetables
                </Link>
                <Link
                  to="/category"
                  className=" text-gray-400 mb-3 block hover:text-[var(--color-main)] transition-all duration-200"
                >
                  Dairy Products
                </Link>
                <Link
                  to="/category"
                  className=" text-gray-400 mb-3 block hover:text-[var(--color-main)] transition-all duration-200"
                >
                  Package Foods
                </Link>
                <Link
                  to="/category"
                  className=" text-gray-400 mb-3 block hover:text-[var(--color-main)] transition-all duration-200"
                >
                  Beverages
                </Link>
                <Link
                  to="/category"
                  className=" text-gray-400 mb-3 block hover:text-[var(--color-main)] transition-all duration-200"
                >
                  Health & Wellness
                </Link>
                <Link
                  to="/category"
                  className=" text-gray-400 mb-3 block hover:text-[var(--color-main)] transition-all duration-200"
                >
                  Meat Varieties
                </Link>
              </div>
            </div>

            <div className="">
              <h2 className="text-white text-xl mb-4 font-semibold">
                Opening Hours
              </h2>

              <div className="">
                <span className="block text-gray-400 mb-3">
                  Monday – Saturday
                </span>
                <span className="block text-gray-400 mb-3">12.00 – 14.45</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-gray-400 bg-[var(--color-sec)] px-[150px] py-5 flex items-center justify-between">
          <p>Copyright 2021, Groxi Store. All Rights Reserved</p>
          <div className="flex">
            <span>Follow Us:</span>
            <div className="ml-2.5  flex gap-5 items-center justify-between">
              <Link className="hover:text-[var(--color-main)] transition-all duration-200">
                <FaFacebookF />
              </Link>

              <Link className="hover:text-[var(--color-main)] transition-all duration-200">
                <FaTwitter />
              </Link>

              <Link className="hover:text-[var(--color-main)] transition-all duration-200">
                <FaLinkedin />
              </Link>

              <Link className="hover:text-[var(--color-main)] transition-all duration-200">
                <FaPinterest />
              </Link>

              <Link className="hover:text-[var(--color-main)] transition-all duration-200">
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
