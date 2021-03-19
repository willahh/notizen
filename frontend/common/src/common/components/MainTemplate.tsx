import React from 'react';
import { SidebarDesktop } from './SidebarDesktop';
import { MenuMobile } from './MenuMobile';
import { Sync } from './Sync';

interface IMainTemplateProps {
  children: React.ReactElement | React.ReactElement[];
}

const MainTemplate: React.FC<IMainTemplateProps> = ({ children }) => {
  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-black">
      <MenuMobile></MenuMobile>
      <SidebarDesktop></SidebarDesktop>
      <Sync />
      {children}
    </div>
  );
};

export default MainTemplate;
