import { NavLink } from "react-router-dom";
import { LuHouse } from "react-icons/lu";
import { FaBlog } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";

const LeftNavbar = () => {
  return (
    <div className="w-64 h-screen bg-[#171821] text-white p-4 border-r border-[#2C2D33]">
      {/* <h2 className="text-xl font-bold mb-6">My App</h2> */}
      <nav className="flex flex-col gap-4">
        <NavLink to="/propertys" className="hover:text-blue-400 p-3 rounded-md text-gray-200">
          <span className="flex items-center gap-2">
          <LuHouse />
          Propertys
          </span>


        </NavLink>
        <NavLink to="/blogs" className="hover:text-blue-400 p-3 rounded-md text-gray-200">
        <span className="flex items-center gap-2">
          <FaBlog />
          Blogs
          </span>
        </NavLink>
        <NavLink to="/messages" className="hover:text-blue-400 p-3 rounded-md text-gray-200">
          <span className="flex items-center gap-2">
          <FiMessageSquare />
          Messages
          </span>
        </NavLink>
        <NavLink to="/settings" className="hover:text-blue-400 p-3 rounded-md text-gray-200">
          <span className="flex items-center gap-2">
          <CiSettings />
          Settings
          </span>
        </NavLink>
      </nav>
    </div>
  );
};

export default LeftNavbar;