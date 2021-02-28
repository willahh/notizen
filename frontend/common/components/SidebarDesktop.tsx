import React, { useEffect, useState } from 'react';
import { UserProfileCard } from './UserProfileCard';

export type ISidebarDesktopProps = {};

const SidebarDesktop: React.FC<ISidebarDesktopProps> = ({}) => {
  const links = [
    { label: 'Clojure for the Brave and True', selected: true },
    { label: 'Personal notes', selected: false },
    { label: 'Family', selected: false },
    { label: 'Actuality', selected: false },
  ];

  const [isColorSchemeDark, setColorSchemeDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const list = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (list: any) => {
      setColorSchemeDark(list.matches);
    };

    handler(list);
    list.addListener(handler);
    return () => {
      list.removeListener(handler);
    };
  }, []);

  const logoSrc = isColorSchemeDark
    ? require('./../assets/notizen-dark.svg').default
    : require('./../assets/notizen.svg').default;

  return (
    <div className="hidden lg:flex lg:flex-shrink-0 border-r-1 dark:border-gray-600">
      <div className="flex flex-col w-44">
        <div className="flex flex-col h-0 flex-1 bg-white border-gray-200 dark:bg-black dark:border-gray-800">
          <div className="flex-1 h-16 flex flex-col pb-4 overflow-y-auto">
            <div className="flex items-center h-16 justify-center">
              <img src={logoSrc} alt="logo" style={{ width: 120 }} />
            </div>
            <nav className="mt-2 flex-1" aria-label="Sidebar">
              <div className="px-2 space-y-1 divide-y divide-y-2 divide-rose-400">
                <div>
                  {links.map(({ label, selected }) => (
                    <a
                      key={label}
                      href="#"
                      className={
                        'text-gray-900 group flex items-center px-2 py-2 text-sm font-normal rounded-md' +
                        (selected
                          ? ' bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
                          : ' dark:text-gray-500')
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

                <div>
                  <a
                    href="#"
                    className={
                      'text-gray-900 group flex items-center px-2 py-2 text-sm font-normal rounded-md' +
                      (false
                        ? ' bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
                        : ' dark:text-gray-500')
                    }
                  >
                    <svg
                      className="text-gray-500 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span className="truncate w-full">Tags</span>
                  </a>
                  <a
                    href="#"
                    className={
                      'text-gray-900 group flex items-center px-2 py-2 text-sm font-normal rounded-md' +
                      (false
                        ? ' bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
                        : ' dark:text-gray-500')
                    }
                  >
                    <svg
                      className="text-gray-500 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span className="truncate w-full">Trash</span>
                  </a>
                  <a
                    href="#"
                    className={
                      'text-gray-900 group flex items-center px-2 py-2 text-sm font-normal rounded-md' +
                      (false
                        ? ' bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
                        : ' dark:text-gray-500')
                    }
                  >
                    <svg
                      className="text-gray-500 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="truncate w-full">Todo</span>
                  </a>
                </div>
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
