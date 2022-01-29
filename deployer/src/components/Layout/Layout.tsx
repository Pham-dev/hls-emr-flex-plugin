import React, { ReactElement } from 'react';
import NavBar from '../NavBar/NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <>
      <NavBar/>
      <div className="grid grid-cols-10 gap-px">
        {children}
      </div>
    </>
  );
};

export default Layout;
