import { NavLink } from "react-router-dom";

const LeftNavbar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">My App</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/" className="hover:text-blue-400">Home</NavLink>
        <NavLink to="/dashboard" className="hover:text-blue-400">Dashboard</NavLink>
        <NavLink to="/settings" className="hover:text-blue-400">Settings</NavLink>
      </nav>
    </div>
  );
};

export default LeftNavbar;