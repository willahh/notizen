import React, { useEffect, useRef, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { Editor, Range, Transforms, Text } from 'slate';
import { CSSTransition } from 'react-transition-group';
import { Commands } from '../../Commands';

// import {bold} from './../../assets/icons/solid';
const ICON_BOLD = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="#6366f1">
    <path d="M333.49 238a122 122 0 0 0 27-65.21C367.87 96.49 308 32 233.42 32H34a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h31.87v288H34a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h209.32c70.8 0 134.14-51.75 141-122.4 4.74-48.45-16.39-92.06-50.83-119.6zM145.66 112h87.76a48 48 0 0 1 0 96h-87.76zm87.76 288h-87.76V288h87.76a56 56 0 0 1 0 112z" />
  </svg>
);

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: 'all',
  });
  return !!match;
};

const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

export const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>();
  const editor = useSlate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      setIsDropdownOpen(false);
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    if (el) {
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
      el.style.left = `${
        rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
      }px`;
    } else {
      console.warn('!el');
    }

    setIsDropdownOpen(true);
  });

  const btnCls = `relative inline-flex items-center p-2 
  rounded-l-md 
  border border-indigo-300 dark:border-indigo-800
  text-xs dark:text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-200
  focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500
  dark:focus:ring-offset-gray-800`;

  return (
    <CSSTransition
      in={isDropdownOpen}
      timeout={400}
      classNames="dropdown"
      unmountOnExit
    >
      <span
        ref={ref}
        className=" absolute p-8 z-10 opacity-1 bg-white dark:bg-black
        inline-flex shadow-sm
        px-2 py-0.5"
      >
        <button
          type="button"
          data-tip="Bold"
          onMouseDown={(event) => {
            event.preventDefault();
            Commands.toggleBoldMark(editor);
          }}
          className={`${btnCls}`}
        >
          <span className="flex w-3 h-3">{ICON_BOLD}</span>
        </button>
        <button
          type="button"
          data-tip="Italic"
          onMouseDown={(event) => {
            event.preventDefault();
            Commands.toggleCodeBlock(editor);
          }}
          className={`${btnCls}`}
        >
          <span className="flex w-3 h-3">{ICON_BOLD}</span>
        </button>
        <button
          type="button"
          data-tip="Souligné"
          onMouseDown={(event) => {
            event.preventDefault();
            Commands.toggleCodeBlock(editor);
          }}
          className={`${btnCls}`}
        >
          <span className="flex w-3 h-3">{ICON_BOLD}</span>
        </button>
        <button
          type="button"
          data-tip="Barré"
          onMouseDown={(event) => {
            event.preventDefault();
            Commands.toggleCodeBlock(editor);
          }}
          className={`${btnCls}`}
        >
          <span className="flex w-3 h-3">{ICON_BOLD}</span>
        </button>
        <button
          type="button"
          data-tip="Lien"
          onMouseDown={(event) => {
            event.preventDefault();
            Commands.toggleCodeBlock(editor);
          }}
          className={`${btnCls}`}
        >
          <span className="flex w-3 h-3">{ICON_BOLD}</span>
        </button>
      </span>

      {/* <div
        ref={ref}
        className="absolute p-8 z-10 top-0 left-0 opacity-0 bg-white dark:bg-black"
      >
        <FormatButton format="bold" icon="format_bold" />
        <FormatButton format="italic" icon="format_italic" />
        <FormatButton format="underlined" icon="format_underlined" />
      </div> */}
    </CSSTransition>
  );
};
