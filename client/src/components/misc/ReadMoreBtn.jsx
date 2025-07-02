import { Link } from "react-router";

function ReadMoreBtn({ children }) {
  return (
    <div>
      <Link
        to={`/about`}
        className="block text-xs md:text-base  uppercase py-3 px-6 text-center bg-[#14462E] text-white border border-transparent hover:bg-white hover:border-[#14462E] hover:text-[#14462E] transition-all duration-200"
      >
        {children}
      </Link>
    </div>
  );
}

export default ReadMoreBtn;
