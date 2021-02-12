import React from 'react';
import logo from './../assets/notizen.svg';

export type ILogoProps = {};

const Logo: React.FC<ILogoProps> = ({}) => {
  return (
    <div className="flex-shrink-0 flex items-center px-4">
      <img className="h-8 w-auto" src={logo} alt="Citizen logo" />
    </div>
  );
};

export { Logo };
