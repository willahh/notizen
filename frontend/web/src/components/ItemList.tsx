import React, { ReactElement } from 'react';

interface IItemListProps {
  children: ReactElement[];
}

const ItemList: React.FC<IItemListProps> = ({ children }) => {
  return (
    <ul className="divide-gray-200 divide-y-1 dark:divide-gray-800">
      {children.map((child) => child)}
    </ul>
  );
};

export { ItemList };
