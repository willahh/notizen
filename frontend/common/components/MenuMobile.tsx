import React from 'react';
import { Logo } from './Logo';
import { Menu } from './Menu';
import { SidebarClose } from './SidebarClose';
import { UserProfileCardMobile } from './UserProfileCardMobile';

export type IMenuMobileProps = {};

const MenuMobile: React.FC<IMenuMobileProps> = ({}) => {
  return (
    <div className="lg:hidden">
      {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
      <div className="fixed inset-0 flex z-40">
        {/*
      Off-canvas menu overlay, show/hide based on off-canvas menu state.
    
      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    */}
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gray-600 opacity-75" />
        </div>
        {/*
      Off-canvas menu, show/hide based on off-canvas menu state.
    
      Entering: "transition ease-in-out duration-300 transform"
        From: "-translate-x-full"
        To: "translate-x-0"
      Leaving: "transition ease-in-out duration-300 transform"
        From: "translate-x-0"
        To: "-translate-x-full"
    */}
        <div
          tabIndex={0}
          className="relative flex-1 flex flex-col max-w-xs w-full focus:outline-none bg-white dark:bg-black"
        >
          <SidebarClose></SidebarClose>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <Logo></Logo>
            <Menu></Menu>
          </div>
          <UserProfileCardMobile></UserProfileCardMobile>
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </div>
  );
};

export { MenuMobile };
