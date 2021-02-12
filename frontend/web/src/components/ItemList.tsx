import React, { ReactElement } from 'react';

interface IItemListProps {
  children: ReactElement[];
}

const ItemList: React.FC<IItemListProps> = ({ children }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {children.map((child) => child)}
    </ul>
  );
};

export { ItemList };
