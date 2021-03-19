import React from 'react';
import { SidebarOpen } from './SidebarOpen';

interface IMainProps {
  children: React.ReactElement | React.ReactElement[];
}

const Main: React.FC<IMainProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <SidebarOpen></SidebarOpen>
        <div className="flex-1 relative z-0 flex overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
};

export { Main };
