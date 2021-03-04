import React from 'react';
import { useDispatch } from 'react-redux';
import { createTagAction, setMode } from '../features/tags/TagsSlice';
import { createTagDto, Mode } from '../interfaces/INote.interface';

export type INewTagProps = {};

const NewTag: React.FC<INewTagProps> = ({}) => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        title="New tag"
        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-indigo-100 text-indigo-800 dark:bg-gray-800 dark:text-indigo-100"
        onClick={() => {
          const createTagDto: createTagDto = {
            name: 'New tag',
          };
          // TODO: Use of any type because we need to set a special dispatch Type to this action, this is not trivial.
          // @see https://github.com/reduxjs/redux-toolkit/issues/849
          // https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
          const actionThunk: any = dispatch(createTagAction(createTagDto));
          actionThunk.then((action) => {
            console.log('THEN', action);
            const tag = action.payload.tag;
            dispatch(setMode(tag, Mode.Edit));
          });
        }}
      >
        <svg
          className="h-2 w-2 text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>

      <div
        className="relative inline-block text-left"
        style={{ display: 'none' }}
      >
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 
            border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-offset-gray-100 focus:ring-indigo-500
            dark:border-gray-600 dark:bg-black dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:ring-offset-gray-800
            "
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Options
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:bg-black dark:ring-white dark:divide-gray-800"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Edit
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Duplicate
            </a>
          </div>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Archive
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Move
            </a>
          </div>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Share
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Add to favorites
            </a>
          </div>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NewTag };
