import React, { ReactElement } from 'react';
const scrollbar = require('smooth-scrollbar-react');
const ScrollBar = scrollbar.default;

interface IItemListProps {
  children: ReactElement[];
}

const ItemList: React.FC<IItemListProps> = ({ children }) => {
  return (
    <ScrollBar damping={0.5} thumbMinSize={20}>
      <ul className="overflow-auto divide-gray-200 divide-y-1 dark:divide-gray-800">
        {children.map((child) => child)}
      </ul>
    </ScrollBar>
  );
};

export { ItemList };
