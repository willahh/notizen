import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchNotesAction,
  FetchNotesActionPayload,
} from '../../module/note/note.actions';
import { dispatchQuery } from '../utils';
import { Tags } from './../../module/tags/components/Tags';
import { UserProfileCard } from './UserProfileCard';

export type ISidebarDesktopProps = {};

const SidebarDesktop: React.FC<ISidebarDesktopProps> = ({}) => {
  const dispatch = useDispatch();
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
    ? require('./../../../assets/notizen-dark.svg').default
    : require('./../../../assets/notizen.svg').default;

  const cls =
    'text-gray-900 group flex items-center px-1 py-2 text-xs font-normal rounded-md' +
    (false
      ? ' bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
      : ' dark:text-gray-500');

  const headingCls = 'text-xs font-semibold';

  return (
    <div className="transition-all duration-300 ease-out delay-700 w-0 lg:w-44 flex flex-shrink-0 border-r-1">
      <div className="flex flex-col w-44">
        <div
          className="flex flex-col h-0 flex-1 pt-6
        bg-white bg-gradient-to-l from-gray-100
        border-r-1 border-black dark:border-black
        dark:bg-black dark:from-gray-900"
        >
          <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
            <div className="flex items-center mb-4 justify-center app-region-drag">
              <img src={logoSrc} alt="logo" style={{ width: 120 }} />
            </div>
            <nav className="mt-2 flex-1" aria-label="Sidebar">
              <div className="px-4 space-y-4">
                <div>
                  <h2 className={headingCls}>Notes</h2>
                  <a
                    href="#"
                    className={cls}
                    onClick={(e) => {
                      const payload: FetchNotesActionPayload = {};
                      dispatchQuery({
                        name: fetchNotesAction.typePrefix,
                        payload: payload,
                        action: fetchNotesAction(payload),
                        dispatch: dispatch,
                      });
                    }}
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="truncate w-full">All</div>
                  </a>
                  <a href="#" className={cls}>
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="truncate w-full">Recent</div>
                  </a>
                  <a href="#" className={cls}>
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
                    <div className="truncate w-full">Todo</div>
                  </a>{' '}
                  <a
                    href="#"
                    className={cls}
                    onClick={(e) => {
                      const payload: FetchNotesActionPayload = {
                        isFav: true,
                      };
                      dispatchQuery({
                        name: fetchNotesAction.typePrefix,
                        payload: payload,
                        action: fetchNotesAction(payload),
                        dispatch: dispatch,
                      });
                    }}
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
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    <div className="truncate w-full">Fav</div>
                  </a>
                  <a
                    href="#"
                    className={cls}
                    onClick={(e) => {
                      const payload: FetchNotesActionPayload = {
                        isDeleted: true,
                      };
                      dispatchQuery({
                        name: fetchNotesAction.typePrefix,
                        payload: payload,
                        action: fetchNotesAction(payload),
                        dispatch: dispatch,
                      });
                    }}
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
                    <div className="w-full">
                      <div className="relative">
                        Trash
                        <div className="absolute -top-1 -right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400"></div>
                      </div>
                    </div>
                  </a>
                </div>
                <div>
                  <h2 className={headingCls}>Folders</h2>
                  {links.map(({ label, selected }) => (
                    <a
                      key={label}
                      href="#"
                      className={
                        'text-gray-900 group flex items-center px-2 py-2 text-xs font-normal rounded-md' +
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
                      <div className="truncate w-full">{label}</div>
                    </a>
                  ))}
                </div>
                <div>
                  <h2 className={headingCls}>Tags</h2>
                  <Tags />
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
