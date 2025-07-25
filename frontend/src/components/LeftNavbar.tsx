import { NavLink } from "react-router-dom";

const LeftNavbar = () => {
  return (
    <div className="w-64 h-screen bg-[#171821] text-white p-4 border-r border-[#2C2D33]">
      {/* <h2 className="text-xl font-bold mb-6">My App</h2> */}
      <nav className="flex flex-col gap-4">
        <NavLink to="/propertys" className="hover:text-blue-400 p-3 rounded-md">Propertys</NavLink>
        <NavLink to="/blogs" className="hover:text-blue-400 p-3 rounded-md">Blogs</NavLink>
        <NavLink to="/messages" className="hover:text-blue-400 p-3 rounded-md">Messages</NavLink>
        <NavLink to="/settings" className="hover:text-blue-400 p-3 rounded-md">Settings</NavLink>
      </nav>
    </div>
  );
};

export default LeftNavbar;