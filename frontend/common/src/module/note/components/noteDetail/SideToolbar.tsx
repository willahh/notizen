import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { useDispatch } from 'react-redux';
import { dispatchCommand } from '../../../../utils';
import { NavLink } from 'react-router-dom';
import { HOST_URL } from '../../../../constants';
import { createNoteAction, CreateNoteActionPayload } from '../../note.actions';
import { CreateNoteDTO } from '../../../../interfaces';
import {
  ICON_CALENDAR,
  ICON_CHECKBOX,
  ICON_CODE,
  ICON_DIVIDER,
  ICON_DRAW,
  ICON_FONT,
  ICON_INFO,
  ICON_QUOTE,
} from '../../../../components/Icons';

export type IToolbarProps = {};

const SideToolbar: React.FC<IToolbarProps> = ({}) => {
  const dispatch = useDispatch();
  const iconCls = `flex w-5 h-5 svg-color text-gray-500`;
  const iconFillCls = `flex w-5 h-5 fill-current-color text-gray-500`;

  return (
    <div
      className="flex flex-col items-start shadow-sm rounded-md h-full justify-items-center p-2"
      style={{ paddingTop: 100 }}
    >
      {/* <!-- TODO: Dropdown font like Notes app --> */}
      <button
        type="button"
        data-type="Font"
        onClick={() => {}}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_FONT}</span>
      </button>

      <button
        type="button"
        data-tip="Todo list"
        onClick={() => {}}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_CHECKBOX}</span>
      </button>

      <button
        type="button"
        data-tip="Quote"
        onClick={() => {}}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_QUOTE}</span>
      </button>

      <button
        type="button"
        data-tip="Code"
        onClick={() => {}}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_CODE}</span>
      </button>

      <button
        type="button"
        className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconCls}>
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </span>
      </button>

      <button
        type="button"
        data-tip="Date"
        onClick={() => {}}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_CALENDAR}</span>
      </button>

      <button
        type="button"
        data-tip="Divider"
        onClick={() => {}}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_DIVIDER}</span>
      </button>

      <button
        type="button"
        data-tip="Draw"
        onClick={() => {}}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_DRAW}</span>
      </button>

      <br />

      <button
        type="button"
        data-tip="Info"
        onClick={() => {}}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_INFO}</span>
      </button>

      <button
        type="button"
        className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </button>
      <button
        type="button"
        className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
          />
        </svg>
      </button>

      <nav className="flex flex-col items-start">
        <NavLink
          className="-ml-px relative inline-flex items-center px-4 py-2 border-1 border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md bg-white dark:bg-black dark:border-gray-800"
          to={`${HOST_URL}/note/note-list`}
          // to="/note/note-list"
          activeClassName="bg-indigo-200 dark:bg-indigo-700"
        >
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </NavLink>
        <NavLink
          className="-ml-px relative inline-flex items-center px-4 py-2 border-1 border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md bg-white dark:bg-black dark:border-gray-800"
          to={`${HOST_URL}/note/note-thumb`}
          // to="/note/note-thumb"
          activeClassName="bg-indigo-200 dark:bg-indigo-700"
        >
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </NavLink>
      </nav>
    </div>
  );
};

export { SideToolbar };
