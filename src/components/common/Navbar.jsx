import { Link, NavLink } from "react-router";
import Logo from "../../assets/Home/Logo.png";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { VscMenu } from "react-icons/vsc";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

function Navbar() {
  const [openAbout, setOpenAbout] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleOpenSearchBar() {
    setIsSearchBarOpen(true);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setIsSearchBarOpen(false);
  }

  return (
    <>
      <nav className=" w-full p-3 flex items-center justify-between relative">
        <Link to="/" className="block">
          <img
            src={Logo}
            alt="Logo"
            className="block w-30 h-10 md:w-50 md:h-20"
          />
        </Link>

        {/* NavLinks and search bar */}
        <div className="flex items-center lg:gap-10 md:gap-20 justify-between">
          {/* NavLinks */}
          {!isSearchBarOpen && (
            <ul className="hidden md:flex gap-6 lg:text-[18px] md:text-[13px]">
              <li className="">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-[#AACB22]" : "text-black"
                  }
                >
                  Home
                </NavLink>
              </li>

              <li className="">
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    isActive ? "text-[#AACB22]" : "text-black"
                  }
                >
                  Blog
                </NavLink>
              </li>

              <li className="">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-[#AACB22]" : "text-black"
                  }
                >
                  Contact
                </NavLink>
              </li>

              {/* About dropdown */}
              <li className="relative" onMouseEnter={() => setOpenAbout(true)}>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#AACB22] flex items-center gap-0.5"
                      : "text-red flex items-center gap-0.5"
                  }
                >
                  <p>About</p>
                  <FaCaretDown />
                </NavLink>

                {/* Drop down */}
                <ul
                  onMouseLeave={() => setOpenAbout(false)}
                  className={`absolute left-0 border border-black w-[130px] text-white md:top-10 bg-[#14462E] shadow-md transition-all duration-200 ${
                    openAbout ? "flex flex-col" : "hidden"
                  }`}
                >
                  <li>
                    <NavLink
                      to="/"
                      className="block px-3 py-1 hover:bg-[#AACB22] transition-all duration-300"
                    >
                      Our Service
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className="block px-3 py-1 hover:bg-[#AACB22] transition-all duration-300"
                    >
                      Our Team
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className="block px-3 py-1 hover:bg-[#AACB22] transition-all duration-300"
                    >
                      Testimonial
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="">
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive ? "text-[#AACB22]" : "text-black"
                  }
                >
                  Shop
                </NavLink>
              </li>
            </ul>
          )}

          {/* Searchbar , profile, cart */}
          <div className="flex items-center gap-5 md:gap-5 justify-between">
            <div
              onClick={handleOpenSearchBar}
              className="hidden md:block text-[#AACB22] text-xl bg-white p-3 rounded-full cursor-pointer hover:bg-[#AACB22] hover:text-white transition-all duration-300"
            >
              <FiSearch />
            </div>
            <div className="text-[#AACB22] text-[18px] md:text-xl bg-white p-1 md:p-3 rounded-full cursor-pointer hover:bg-[#AACB22] hover:text-white transition-all duration-300">
              <FaUser />
            </div>
            <div className="text-[#AACB22] text-xl bg-white p-1 md:p-3 rounded-full cursor-pointer hover:bg-[#AACB22] hover:text-white transition-all duration-300 relative">
              <FaCartShopping />
              <p className="absolute  bg-black text-[10px] rounded-full p-2 w-3 h-3 flex items-center justify-center -top-1 left-6">
                2
              </p>
            </div>

            <div
              className="block md:hidden text-white text-xl p-1 cursor-pointer bg-[#AACB22] hover:text-white transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {!isMobileMenuOpen && <VscMenu />}
              {isMobileMenuOpen && <IoMdClose />}
            </div>
          </div>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearchSubmit}
          action=""
          className={`absolute top-[50%] left-[50%] -translate-y-[50%] ${
            isSearchBarOpen
              ? "-translate-x-[50%] opacity-100 z-10"
              : "-translate-x-[40%] opacity-0 -z-10"
          } transition-all duration-300`}
        >
          <input
            type="text"
            name="search"
            id=""
            placeholder="Search Product"
            className={`w-[700px] bg-white p-2 pl-4 pr-6 rounded-xl focus:outline outline-[#AACB22]`}
          />

          <FaSearch className="absolute left-full top-[50%] text-gray-300 -translate-x-[200%] -translate-y-[50%]" />
        </form>

        {/* Mobile nav */}
        <ul
          className={`flex md:hidden text-[14px] flex-col absolute border border-black w-[200px] right-3 top-13 ${
            !isMobileMenuOpen ? "opacity-0" : "opacity-100"
          } transition-all duration-100`}
        >
          <div className={`${!isMobileMenuOpen ? "hidden" : ""}`}>
            <li
              className=""
              onClick={() => (setOpenAbout(false), setIsMobileMenuOpen(false))}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block bg-[#AACB22] w-full p-2 text-white"
                    : "bg-[#14462E] w-full block p-2 text-white"
                }
              >
                Home
              </NavLink>
            </li>

            <li
              className=""
              onClick={() => (setOpenAbout(false), setIsMobileMenuOpen(false))}
            >
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? "block bg-[#AACB22] w-full p-2 text-white"
                    : "bg-[#14462E] block w-full p-2 text-white"
                }
              >
                Blog
              </NavLink>
            </li>

            <li
              className=""
              onClick={() => (setOpenAbout(false), setIsMobileMenuOpen(false))}
            >
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "block bg-[#AACB22] w-full p-2 text-white"
                    : "bg-[#14462E] w-full block p-2 text-white"
                }
              >
                Contact
              </NavLink>
            </li>

            {/* About dropdown */}
            <li className="relative" onClick={() => setOpenAbout(!openAbout)}>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#AACB22] flex items-center justify-between w-full p-2 text-white"
                    : "text-red bg-[#14462E] flex items-center justify-between gap-0.5 w-full p-2 text-white"
                }
              >
                <p>About</p>
                <FaCaretDown />
              </NavLink>

              {/* Drop down */}
              <ul
                className={`  text-white md:top-10 bg-[#14462E] w-full shadow-md transition-all duration-200 pl-3 ${
                  openAbout ? "flex flex-col" : "hidden"
                }`}
              >
                <li onClick={() => setIsMobileMenuOpen(false)}>
                  <NavLink
                    to="/"
                    className="block px-3 py-1 hover:bg-[#AACB22] transition-all duration-300 w-full"
                  >
                    Our Service
                  </NavLink>
                </li>
                <li onClick={() => setIsMobileMenuOpen(false)}>
                  <NavLink
                    to="/"
                    className="block px-3 py-1 hover:bg-[#AACB22] transition-all duration-300"
                  >
                    Our Team
                  </NavLink>
                </li>
                <li onClick={() => setIsMobileMenuOpen(false)}>
                  <NavLink
                    to="/"
                    className="block px-3 py-1 hover:bg-[#AACB22] transition-all duration-300"
                  >
                    Testimonial
                  </NavLink>
                </li>
              </ul>
            </li>

            <li
              className=""
              onClick={() => (setOpenAbout(false), setIsMobileMenuOpen(false))}
            >
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive
                    ? "block bg-[#AACB22] w-full p-2 text-white"
                    : "bg-[#14462E] w-full block p-2 text-white"
                }
              >
                Shop
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
