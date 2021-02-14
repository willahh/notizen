import React from 'react';

export type INoteFilterProps = {};

const NoteFilter: React.FC<INoteFilterProps> = ({}) => {
  return (
    <div className="flex-shrink-0 h-16 border-b-1 border-gray-200 bg-white dark:bg-black dark:border-gray-800">
      <div className="h-16 flex flex-col justify-center">
        <div className="max-w-2xl relative text-gray-400 focus-within:text-gray-500">
          <label htmlFor="search" className="sr-only">
            Search in notes
          </label>
          <input
            id="search"
            type="search"
            placeholder="Search in notes"
            className="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0 dark:bg-black"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
            <svg
              className="h-5 w-5"
              x-description="Heroicon name: solid/search"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NoteFilter };
