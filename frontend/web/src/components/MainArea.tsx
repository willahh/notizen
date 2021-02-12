import React from 'react';

export type IMainAreaProps = {};

const MainArea: React.FC<IMainAreaProps> = ({ children }) => {
  return (
    <main
      className="flex-1 relative z-0 bg-gray-100 overflow-y-auto focus:outline-none"
      tabIndex={0}
    >
      {children}
    </main>
  );
};

export { MainArea };
