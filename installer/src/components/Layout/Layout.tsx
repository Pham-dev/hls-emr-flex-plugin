import React from 'react';
import InstallerCard from '../InstallerCard/InstallerCard';
import NavBar from '../NavBar/NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
      <NavBar/>
      {/* <div className="grid grid-cols-10 gap-px"> */}
      <InstallerCard>
        {children}
      </InstallerCard>
      {/* </div> */}
    </div>
  );
};

export default Layout;
