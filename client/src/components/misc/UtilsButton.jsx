import { Link } from "react-router";

function UtilsButton({ children, action }) {
  return (
    <div>
      <Link
        to={`/${action}`}
        className="block text-xs md:text-base uppercase py-3 px-6 text-center bg-[#AACB22] text-white border border-transparent hover:bg-[#14462E] transition-all duration-200"
      >
        {children}
      </Link>
    </div>
  );
}

export default UtilsButton;
