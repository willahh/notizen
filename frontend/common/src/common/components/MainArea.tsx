import React from 'react';

export type IMainAreaProps = {};

const MainArea: React.FC<IMainAreaProps> = ({ children }) => {
  return (
    <main
      className="flex-1 relative z-0 overflow-y-auto focus:outline-none g-gray-50 dark:bg-gray-800"
      tabIndex={0}
    >
      {children}
    </main>
  );
};

export { MainArea };
