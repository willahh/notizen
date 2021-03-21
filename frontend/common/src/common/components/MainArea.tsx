import React from 'react';

export type IMainAreaProps = {};

const MainArea: React.FC<IMainAreaProps> = ({ children }) => {
  return (
    <main
      className="flex-1 relative z-0 z-10 overflow-y-auto focus:outline-none bg-gray-50 dark:bg-gray-900 app-region-drag"
      tabIndex={0}
    >
      {children}
    </main>
  );
};

export { MainArea };
