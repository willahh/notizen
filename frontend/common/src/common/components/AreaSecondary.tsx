import React, { ReactElement, useEffect, useState } from 'react';
import { CSSTransition, Transition } from 'react-transition-group';

interface IAreaSecondaryProps {
  children: ReactElement | ReactElement[];
}

const AreaSecondary: React.FC<IAreaSecondaryProps> = ({ children }) => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, [inProp]);

  return (
    <CSSTransition in={inProp} timeout={500} classNames="areaSecondary">
      <aside className="transition-all duration-300 ease-out delay-700 w-20 sm:w-56 pt-2
      relative flex flex-col flex-shrink-0
      border-r-1 border-black dark:border-black shadow-md z-10
      bg-gray-50 dark:bg-gray-900">
        {children}
      </aside>
    </CSSTransition>
  );
};

export { AreaSecondary };
