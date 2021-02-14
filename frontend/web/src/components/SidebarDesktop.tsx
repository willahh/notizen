import React from 'react';
import { UserProfileCard } from './UserProfileCard';
import logo from './../assets/notizen.svg';

export type ISidebarDesktopProps = {};

const SidebarDesktop: React.FC<ISidebarDesktopProps> = ({}) => {
  const links = [
    { label: 'Clojure for the Brave and True', selected: true },
    { label: 'Personal notes', selected: false },
    { label: 'Family', selected: false },
    { label: 'Actuality', selected: false },
  ];
  return (
    <div className="hidden lg:flex lg:flex-shrink-0 border-r-1 dark:border-gray-600">
      <div className="flex flex-col w-44">
        <div className="flex flex-col h-0 flex-1 bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-800">
          <div className="flex-1 h-16 flex flex-col pb-4 overflow-y-auto">
            <div className="flex items-center h-16 justify-center">
              <img src={logo} className="h-10 w-auto" alt="logo" />
            </div>
            <nav className="mt-2 flex-1" aria-label="Sidebar">
              <div className="px-2 space-y-1">
                {links.map(({ label, selected }) => (
                  <a
                    href="#"
                    className={
                      'text-gray-900 group flex items-center px-2 py-2 text-sm font-normal rounded-md' +
                      (selected ? ' bg-gray-200 dark:bg-gray-900 dark:text-gray-200' : ' dark:text-gray-500')
                    }
                  >
                    <svg
                      className="text-gray-500 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {' '}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />{' '}
                    </svg>
                    <span className="truncate w-full">{label}</span>
                  </a>
                ))}
              </div>
            </nav>
          </div>
          <UserProfileCard></UserProfileCard>
        </div>
      </div>
    </div>
  );
};

export { SidebarDesktop };
