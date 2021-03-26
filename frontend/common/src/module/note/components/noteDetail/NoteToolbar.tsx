import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import {
  ICON_BGCOLOR,
  ICON_BOLD,
  ICON_DRAW,
  ICON_HEADING1,
  ICON_HEADING2,
  ICON_HEADING3,
  ICON_ITALIC,
  ICON_REDO,
  ICON_STRIKE,
  ICON_TEXTCOLOR,
  ICON_UNDERLINE,
  ICON_UNDO,
} from '@notizen/frontend-common/src/common/components/Icons'; 

interface NoteToolbar {
  editor: object;
}
export const NoteToolbar: React.FC<NoteToolbar> = ({ editor }) => {
  console.log('NoteToolbar');
  
  const ref = useRef<HTMLDivElement | null>();
  const btnCls = `relative inline-flex items-center px-4 py-2
  fill-current-color
  border border-gray-300 dark:border-gray-800
  text-xs text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-200
  focus:z-10 focus:outline-none focus:ring-1
  focus:ring-indigo-500
  focus:ring-2 focus:ring-offset-0 focus:border-indigo-500
  hover:bg-indigo-50 dark:hover:bg-indigo-900
  transition duration-500 ease-in-out
  `;

  const iconCls = `flex w-2 h-2 float-left`;

  return (
    <CSSTransition in={true} timeout={400} classNames="dropdown" unmountOnExit>
      {/* <span ref={ref} className="grid grid-cols-12 justify-items-auto rounded-md mb-4"> */}
      <span ref={ref} className="mb-4">


        
        <button
          type="button"
          data-tip="Heading 1"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleBoldMark(editor);
          // }}
          // className={`${btnCls} rounded-l-md`}
          className={`${btnCls}`}
        >
          <span className={iconCls}>{ICON_HEADING1}</span>
        </button>
        <button
          type="button"
          data-tip="Heading 2"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>{ICON_HEADING2}</span>
        </button>
        <button
          type="button"
          data-tip="Heading 3"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>{ICON_HEADING3}</span>
        </button>
        <button
          type="button"
          data-tip="Bold"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
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
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>{ICON_BGCOLOR}</span>
        </button>
        <button
          type="button"
          data-tip="Undo"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>{ICON_UNDO}</span>
        </button>
        <button
          type="button"
          data-tip="Redo"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>{ICON_REDO}</span>
        </button>

        <button
          type="button"
          data-tip="Bullet list"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>bl</span>
        </button>

        <button
          type="button"
          data-tip="Number list"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>nl</span>
        </button>
        <button
          type="button"
          data-tip="Quote"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}></span>
        </button>

        <button
          type="button"
          data-tip="Todo list"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>tl</span>
        </button>
        <button
          type="button"
          data-tip="Image"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>i</span>
        </button>
        <button
          type="button"
          data-tip="Date"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>d</span>
        </button>
        <button
          type="button"
          data-tip="Divider"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>div</span>
        </button>
        <button
          type="button"
          data-tip="Draw"
          // onMouseDown={(event) => {
          //   event.preventDefault();
          //   Commands.toggleCodeBlock(editor);
          // }}
          // className={`${btnCls} -ml-px rounded-r-md`}
          className={`${btnCls} -ml-px`}
        >
          <span className={iconCls}>{ICON_DRAW}</span>
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
