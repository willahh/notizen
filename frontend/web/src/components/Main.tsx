import React from 'react';
import { AreaSecondary } from './AreaSecondary';
import { MainArea } from './MainArea';
import { SidebarOpen } from './SidebarOpen';

interface IMainProps {
  children: React.ReactElement[];
}

const Main: React.FC<IMainProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <SidebarOpen></SidebarOpen>
        <div className="flex-1 relative z-0 flex overflow-hidden">
          {children.map((child: React.ReactElement) => {
            return child;
          })}
        </div>
      </div>
    </>
  );
};

export { Main };
