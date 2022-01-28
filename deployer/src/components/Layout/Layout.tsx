import React, { ReactElement } from 'react';
import NavBar from '../NavBar/NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <>
      <NavBar/>
      {children}
    </>
  );
};

export default Layout;
