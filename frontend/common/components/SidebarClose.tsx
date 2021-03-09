import React from 'react';

export type ISidebarCloseProps = {};

const SidebarClose: React.FC<ISidebarCloseProps> = ({}) => {
  return (
    <div className="absolute top-0 right-0 -mr-12 pt-2">
      <button
        type="button"
        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      >
        <div className="sr-only">Close sidebar</div>
        {/* Heroicon name: outline/x */}
        <svg
          className="h-6 w-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export { SidebarClose };
