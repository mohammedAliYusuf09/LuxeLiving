import { Outlet } from 'react-router-dom';
import LeftNavbar from '../components/LeftNavbar';

const Layout = () => {
  return (
    <div className="flex">
      <LeftNavbar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;