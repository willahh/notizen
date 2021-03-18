import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import {
  ICON_BGCOLOR,
  ICON_BOLD,
  ICON_ITALIC,
  ICON_STRIKE,
  ICON_TEXTCOLOR,
  ICON_UNDERLINE,
} from '@notizen/frontend-common/src/components/Icons';

interface NoteToolbarInline {
  editor: object;
}
export const NoteToolbarInline: React.FC<NoteToolbarInline> = ({ editor }) => {
  const ref = useRef<HTMLDivElement | null>();
  const btnCls = `relative inline-flex items-center px-4 py-2
  fill-current-color
  border border-indigo-300 dark:border-indigo-800
  text-xs text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-200
  focus:z-10 focus:outline-none focus:ring-1
  focus:ring-indigo-500
  focus:ring-2 focus:ring-offset-0 focus:border-indigo-500
  hover:bg-indigo-50 dark:hover:bg-indigo-900
  transition duration-500 ease-in-out
  `;

  const iconCls = `flex w-5 h-5`;


  return (
    <CSSTransition in={true} timeout={400} classNames="dropdown" unmountOnExit>
      <span ref={ref} className="inline-flex shadow-sm rounded-md">
        <button
          type="button"
          data-tip="Bold"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} rounded-l-md`}
        >
          <span className={iconCls}>{ICON_BOLD}</span>
        </button>
        <button
          type="button"
          data-tip="Italic"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>{ICON_ITALIC}</span>
        </button>
        <button
          type="button"
          data-tip="Strike"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>{ICON_STRIKE}</span>
        </button>
        <button
          type="button"
          data-tip="Understrike"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>{ICON_UNDERLINE}</span>
        </button>
        <button
          type="button"
          data-tip="Text color"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>{ICON_TEXTCOLOR}</span>
        </button>
        <button
          type="button"
          data-tip="Background color"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px rounded-r-md`}
        >
          <span className={iconCls}>{ICON_BGCOLOR}</span>
        </button>
      </span>
    </CSSTransition>
  );
};
