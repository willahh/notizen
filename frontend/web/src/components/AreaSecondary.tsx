import React, { ReactElement } from 'react';

interface IAreaSecondaryProps {
  children: ReactElement[];
}

const AreaSecondary: React.FC<IAreaSecondaryProps> = ({ children }) => {
  return (
    <aside className="relative flex flex-col flex-shrink-0 w-96 border-r border-gray-200">
      <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
        <div className="h-full border-2 border-gray-200 border-dashed rounded-lg">
          {children.map((child) => child)}
        </div>
      </div>
    </aside>
  );
};

export { AreaSecondary };
