import { Link } from "react-router";
import Logo from "../../assets/Home/Logo.png";

function AdminNav() {
  return (
    <div>
      <div className="h-[10vh] flex items-center justify-between p-4 border-b border-b-gray-400">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>

        <div className="flex items-center gap-4">
          <p>USA</p>
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://picsum.photos/200/300?random=27"
              alt="Profile image"
              className="w-7 h-7 rounded-full"
            />
            <p className="text-sm">Admin name</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
