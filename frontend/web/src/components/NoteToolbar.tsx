import React from 'react';

export type INoteToolbarProps = {};

const NoteToolbar: React.FC<INoteToolbarProps> = ({}) => {
  return (
    <div>
      <span className="relative z-0 inline-flex shadow-sm rounded-md">
        <button
          type="button"
          className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          List
        </button>
        <button
          type="button"
          className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          Thumb
        </button>
      </span>
      <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">
        Sorted by date
      </div>
    </div>
  );
};

export { NoteToolbar };
