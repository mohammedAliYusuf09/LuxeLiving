import { Outlet } from 'react-router-dom';
import LeftNavbar from '../components/LeftNavbar';
import PropertyHeader from '@/components/PropertyHeader';

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftNavbar />
      <div className="flex-1 p-4 overflow-auto">
        <PropertyHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;