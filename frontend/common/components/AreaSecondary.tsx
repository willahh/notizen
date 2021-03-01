import React, { ReactElement, useEffect, useState } from 'react';
import { CSSTransition, Transition } from 'react-transition-group';

interface IAreaSecondaryProps {
  children: ReactElement[];
}

const AreaSecondary: React.FC<IAreaSecondaryProps> = ({ children }) => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, [inProp]);

  return (
    <CSSTransition in={inProp} timeout={500} classNames="areaSecondary">
      <aside className="relative flex flex-col flex-shrink-0 w-72 border-r-1 border-gray-200 dark:border-gray-800">
        {children.map((child) => child)}
      </aside>
    </CSSTransition>
  );
};

export { AreaSecondary };
