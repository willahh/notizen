import React from 'react';

export type IMainAreaProps = {};

const MainArea: React.FC<IMainAreaProps> = ({ children }) => {
  return (
    <main
      className="flex-1 relative z-0 boverflow-y-auto focus:outline-none g-gray-50 dark:bg-gray-900"
      tabIndex={0}
    >
      {children}
    </main>
  );
};

export { MainArea };
