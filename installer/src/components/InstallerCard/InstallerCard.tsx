import React from 'react';

interface InstallerCardProps {
  children: React.ReactNode;  
}

const InstallerCard = ({children}: InstallerCardProps) => {
  return (
    <div className="w-screen flex place-items-center justify-center p-5">
      <div className="rounded shadow-xl flex flex-col place-items-center justify-center w-1/2 p-5">
        <span className="text-xl mb-4 font-medium text-deploy-blue">{"Welcome to the HLS Flex Installer"}</span>
        {children}
      </div>
    </div>
  );
};

export default InstallerCard;
