import React from 'react';
import { useState } from 'react';
import { DropdownMemo } from './Dropdown';

const Options = ({ editor }) => {

  // TODO: Do something this SLOW DOWN REALLY BAD
  return <span></span>
  console.log('Options');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <div
        className="icon absolute -left-8 -top-0 flex rounded-full hover:bg-indigo-500 p-1 opacity-0 transition-all duration-500"
        style={{ userSelect: 'none' }}
        contentEditable={false}
        onMouseDown={(e) => {
          console.log('mousedown');
          e.preventDefault();

          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="dark:text-white w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </div>
      <DropdownMemo isDropdownOpen={isDropdownOpen} editor={editor}></DropdownMemo>
    </>
  );
};

export const OptionsMemo = React.memo(Options);
export default Options;