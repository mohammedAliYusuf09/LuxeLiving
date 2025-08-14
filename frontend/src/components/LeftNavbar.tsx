import { NavLink } from "react-router-dom";
import { LuHouse } from "react-icons/lu";
import { FaBlog } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const LeftNavbar = () => {
  return (
    <>
    <div className="hidden md:flex w-64 lg:w-70 xl:w-86 overflow-hidden bg-[#171717] text-white p-4 border-r border-[#2C2D33]">
      {/* <h2 className="text-xl font-bold mb-6">My App</h2> */}
      <nav className="flex flex-col gap-4 w-full">
        <NavLink to="/propertys" 
        className="hover:bg-[#262626] p-3 rounded-md text-gray-200">
          <span className="flex items-center gap-2">
          <LuHouse />
          Propertys
          </span>
        </NavLink>
        <NavLink to="/blogs" 
        className="hover:bg-[#262626] p-3 rounded-md text-gray-200">
        <span className="flex items-center gap-2">
          <FaBlog />
          Blogs
          </span>
        </NavLink>
        <NavLink to="/clients" 
        className="hover:bg-[#262626] p-3 rounded-md text-gray-200">
          <span className="flex items-center gap-2">
          <MdPerson />
          Clients
          </span>
        </NavLink>
        <NavLink to="/settings" 
        className="hover:bg-[#262626] p-3 rounded-md text-gray-200">
          <span className="flex items-center gap-2">
          <IoSettingsOutline />
          Settings
          </span>
        </NavLink>
      </nav>
    </div>
    </>
    
  );
};

export default LeftNavbar;