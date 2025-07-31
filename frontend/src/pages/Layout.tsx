import { Outlet } from 'react-router-dom';
import LeftNavbar from '../components/LeftNavbar';

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftNavbar />
      <div className="flex-1 p-4  overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;