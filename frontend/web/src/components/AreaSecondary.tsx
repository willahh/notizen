import React, { ReactElement } from 'react';

interface IAreaSecondaryProps {
  children: ReactElement[];
}

const AreaSecondary: React.FC<IAreaSecondaryProps> = ({ children }) => {
  return (
    <aside className="relative flex flex-col flex-shrink-0 w-72 border-r-1 border-gray-200 dark:border-gray-800">
        {children.map((child) => child)}
    </aside>
  );
};

export { AreaSecondary };
