import React from 'react';

export type IButtonProps = {
  label: string;
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<IButtonProps> = ({ label, clickHandler }) => {
  return <button onClick={clickHandler} className="py-2 px-4 font-semibold rounded-lg shadow-md;">{label}</button>;
};

export { Button };
