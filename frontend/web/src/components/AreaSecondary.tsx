import React, { ReactElement } from 'react';

interface IAreaSecondaryProps {
  children: ReactElement[];
}

const AreaSecondary: React.FC<IAreaSecondaryProps> = ({ children }) => {
  return (
    <aside className="relative flex flex-col flex-shrink-0 w-72 border-r border-gray-200">
        {children.map((child) => child)}
    </aside>
  );
};

export { AreaSecondary };
