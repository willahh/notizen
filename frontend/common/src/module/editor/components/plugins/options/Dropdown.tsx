import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Commands } from '../../Commands';

export const Dropdown = ({ editor, isDropdownOpen }) => {
  return (
    <CSSTransition
      in={isDropdownOpen}
      timeout={400}
      classNames="dropdown"
      unmountOnExit
    >
      <div
        className={`absolute origin-top-left top-8 z-10 left-2 w-72 rounded-md shadow-lg 
          bg-white dark:bg-black
          ring-1 ring-black dark:ring-indigo-800
          divide-y divide-gray-100 dark:divide-gray-900  `}
        // ref={dropdownRef}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
        onBlur={(e: any) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            // Blur outside the dropdown
            // setIsDropDownOpen(false);
          }
        }}
      >
        <div className="relative flex align-middle h-full">
          <div>
            <button
              onMouseDown={(event) => {
                event.preventDefault();
                Commands.toggleBoldMark(editor);
              }}
            >
              Bold
            </button>
            <div
              onClick={(event) => {
                event.preventDefault();
                Commands.toggleHeading1Block(editor);
              }}
            >
              Heading 1
            </div>
            <div
              onClick={(event) => {
                event.preventDefault();
                Commands.toggleCodeBlock(editor);
              }}
            >
              Code block
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
