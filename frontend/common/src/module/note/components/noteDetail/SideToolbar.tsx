import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';
import { toggleParagraph } from './../../../editor/plugins/paragraph/paragraph.service';
import {
  ICON_BGCOLOR,
  ICON_BOLD,
  ICON_CALENDAR,
  ICON_CHECKBOX,
  ICON_CODE,
  ICON_DIVIDER,
  ICON_DRAW,
  ICON_FONT,
  ICON_INFO,
  ICON_ITALIC,
  ICON_QUOTE,
  ICON_REDO,
  ICON_STRIKE,
  ICON_TEXTCOLOR,
  ICON_UNDERLINE,
  ICON_UNDO,
} from '../../../../common/components/Icons';
import { HOST_URL } from '../../../../common/constants';
import { toggleBlockQuote } from './../../../editor/plugins/blockquote/blockquote.service';
import { toggleCode } from './../../../editor/plugins/code/code.service';
import { toggleHeadingOne } from './../../../editor/plugins/headingone/headingone.service';
import { toggleHeadingThree } from './../../../editor/plugins/headingthree/headingthree.service';
import { toggleHeadingTwo } from './../../../editor/plugins/headingtwo/headingtwo.service';
import { toggleBulletList } from './../../../editor/plugins/bulletlist/bulletlist.service';
import { toggleNumberedList } from './../../../editor/plugins/numberedlist/numberedlist.service';
import { toggleDivider } from './../../../editor/plugins/divider/divider.service';
import { toggleTodo } from './../../../editor/plugins/todo/todo.service';
import { toggleBold } from './../../../editor/plugins/text/bold/bold.service';

interface StyleButton {
  noteId: string;
  editor: Editor & ReactEditor;
}
const StyleButton: React.FC<StyleButton> = ({ editor, noteId }) => {
  console.log('StyleButton', noteId);

  const iconFillCls = `flex w-5 h-5 fill-current-color text-gray-500`;
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        if (isDropDownOpen) {
          // Close the dropdown if opened
          setIsDropDownOpen(false);
        }
      }
    }
    if (isDropDownOpen) {
      dropdownRef.current?.focus();
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, isDropDownOpen]);

  const iconCls = `flex w-2 h-2 float-left`;
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

  return (
    <div className="relative">
      <button
        type="button"
        ref={buttonRef}
        data-type="Font"
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
        onClick={(e) => {
          console.log('click');

          if (!isDropDownOpen) {
            setIsDropDownOpen(true);
          }
        }}
      >
        <span className={iconFillCls}>{ICON_FONT}</span>
      </button>

      <CSSTransition
        in={isDropDownOpen}
        timeout={300}
        classNames="style-dropdown"
        unmountOnExit
      >
        <div
          className="tooltip origin-top-right absolute -top-4 right-14 w-56 z-10
        rounded-md shadow-lg "
          ref={dropdownRef}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          onBlur={(e: any) => {
            console.log('blur');

            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsDropDownOpen(false);
            }
          }}
        >
          <div className="relative">
            <div className="flex flex-col absolute p-8 z-10">
              <div>
                <button
                  type="button"
                  data-tip="Align left"
                  onClick={() => {}}
                  className={`${btnCls} -ml-px`}
                >
                  <span className={iconCls}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" />
                    </svg>
                  </span>
                </button>
                <button
                  type="button"
                  data-tip="Align center"
                  onClick={() => {}}
                  className={`${btnCls} -ml-px`}
                >
                  <span className={iconCls}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM108.1 96h231.81A12.09 12.09 0 0 0 352 83.9V44.09A12.09 12.09 0 0 0 339.91 32H108.1A12.09 12.09 0 0 0 96 44.09V83.9A12.1 12.1 0 0 0 108.1 96zm231.81 256A12.09 12.09 0 0 0 352 339.9v-39.81A12.09 12.09 0 0 0 339.91 288H108.1A12.09 12.09 0 0 0 96 300.09v39.81a12.1 12.1 0 0 0 12.1 12.1z" />
                    </svg>
                  </span>
                </button>
                <button
                  type="button"
                  data-tip="Align right"
                  onClick={() => {}}
                  className={`${btnCls} -ml-px`}
                >
                  <span className={iconCls}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M16 224h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm416 192H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm3.17-384H172.83A12.82 12.82 0 0 0 160 44.83v38.34A12.82 12.82 0 0 0 172.83 96h262.34A12.82 12.82 0 0 0 448 83.17V44.83A12.82 12.82 0 0 0 435.17 32zm0 256H172.83A12.82 12.82 0 0 0 160 300.83v38.34A12.82 12.82 0 0 0 172.83 352h262.34A12.82 12.82 0 0 0 448 339.17v-38.34A12.82 12.82 0 0 0 435.17 288z" />
                    </svg>
                  </span>
                </button>
                <button
                  type="button"
                  data-tip="Justify"
                  onClick={() => {}}
                  className={`${btnCls} -ml-px`}
                >
                  <span className={iconCls}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M432 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                    </svg>
                  </span>
                </button>
                <button
                  type="button"
                  data-tip="New line : CMD+ENTER"
                  onClick={() => {}}
                  className={`${btnCls} -ml-px`}
                >
                  <span className={iconCls}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M272.1 204.2v71.1c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.1 0-2.1-.6-2.6-1.3l-32.6-44v42.2c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2H219c1 0 2.1.5 2.6 1.4l32.6 44v-42.2c0-1.8 1.4-3.2 3.2-3.2h11.4c1.8-.1 3.3 1.4 3.3 3.1zm-82-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 1.8 1.4 3.2 3.2 3.2h11.4c1.8 0 3.2-1.4 3.2-3.2v-71.1c0-1.7-1.4-3.2-3.2-3.2zm-27.5 59.6h-31.1v-56.4c0-1.8-1.4-3.2-3.2-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 .9.3 1.6.9 2.2.6.5 1.3.9 2.2.9h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.7-1.4-3.2-3.1-3.2zM332.1 201h-45.7c-1.7 0-3.2 1.4-3.2 3.2v71.1c0 1.7 1.4 3.2 3.2 3.2h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2V234c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2v-11.4c-.1-1.7-1.5-3.2-3.2-3.2zM448 113.7V399c-.1 44.8-36.8 81.1-81.7 81H81c-44.8-.1-81.1-36.9-81-81.7V113c.1-44.8 36.9-81.1 81.7-81H367c44.8.1 81.1 36.8 81 81.7zm-61.6 122.6c0-73-73.2-132.4-163.1-132.4-89.9 0-163.1 59.4-163.1 132.4 0 65.4 58 120.2 136.4 130.6 19.1 4.1 16.9 11.1 12.6 36.8-.7 4.1-3.3 16.1 14.1 8.8 17.4-7.3 93.9-55.3 128.2-94.7 23.6-26 34.9-52.3 34.9-81.5z" />
                    </svg>
                  </span>
                </button>
                <button
                  type="button"
                  data-tip="Indent"
                  onClick={() => {}}
                  className={`${btnCls} -ml-px`}
                >
                  <span className={iconCls}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M27.31 363.3l96-96a16 16 0 0 0 0-22.62l-96-96C17.27 138.66 0 145.78 0 160v192c0 14.31 17.33 21.3 27.31 11.3zM432 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm3.17-128H204.83A12.82 12.82 0 0 0 192 300.83v38.34A12.82 12.82 0 0 0 204.83 352h230.34A12.82 12.82 0 0 0 448 339.17v-38.34A12.82 12.82 0 0 0 435.17 288zm0-128H204.83A12.82 12.82 0 0 0 192 172.83v38.34A12.82 12.82 0 0 0 204.83 224h230.34A12.82 12.82 0 0 0 448 211.17v-38.34A12.82 12.82 0 0 0 435.17 160zM432 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                    </svg>
                  </span>
                </button>
                <button
                  type="button"
                  data-tip="Outdent"
                  onClick={() => {}}
                  className={`${btnCls} -ml-px`}
                >
                  <span className={iconCls}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M100.69 363.29c10 10 27.31 2.93 27.31-11.31V160c0-14.32-17.33-21.31-27.31-11.31l-96 96a16 16 0 0 0 0 22.62zM432 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm3.17-128H204.83A12.82 12.82 0 0 0 192 300.83v38.34A12.82 12.82 0 0 0 204.83 352h230.34A12.82 12.82 0 0 0 448 339.17v-38.34A12.82 12.82 0 0 0 435.17 288zm0-128H204.83A12.82 12.82 0 0 0 192 172.83v38.34A12.82 12.82 0 0 0 204.83 224h230.34A12.82 12.82 0 0 0 448 211.17v-38.34A12.82 12.82 0 0 0 435.17 160zM432 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                    </svg>
                  </span>
                </button>
                <button
                  type="button"
                  data-tip="Link"
                  onClick={() => {}}
                  className={`${btnCls} -ml-px`}
                >
                  <span className={iconCls}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" />
                    </svg>
                  </span>
                </button>
                <button
                  type="button"
                  data-tip="Clear formating"
                  onClick={() => {}}
                  className={`${btnCls} -ml-px`}
                >
                  <span className={iconCls}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M336 416h-11.17l9.26-27.77L267 336.4 240.49 416H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm297.82 42.1L377 259.59 426.17 112H544v32a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16H176a16 16 0 0 0-16 16v43.9L45.46 3.38A16 16 0 0 0 23 6.19L3.37 31.46a16 16 0 0 0 2.81 22.45l588.36 454.72a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zM309.91 207.76L224 141.36V112h117.83z" />
                    </svg>
                  </span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  data-tip="Bold"
                  onClick={() => {
                    const range = editor.selection;
                    toggleBold(editor, noteId, range, dispatch);
                  }}
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
              </div>
              <div className="flex flex-col">
                <button
                  className="outline-none cursor-default text-xl font-semibold text-left"
                  role="menuitem"
                  onClick={() => {
                    const range = editor.selection;
                    toggleHeadingOne(editor, noteId, range, dispatch);
                  }}
                >
                  Heading 1
                </button>
                <button
                  className="outline-none cursor-default text-lg font-medium text-left"
                  role="menuitem"
                  onClick={() => {
                    const range = editor.selection;
                    toggleHeadingTwo(editor, noteId, range, dispatch);
                  }}
                >
                  Heading 2
                </button>
                <button
                  className="outline-none cursor-default text-base font-medium text-left"
                  role="menuitem"
                  onClick={() => {
                    const range = editor.selection;
                    toggleHeadingThree(editor, noteId, range, dispatch);
                  }}
                >
                  Heading 3
                </button>
                <button
                  className="outline-none cursor-default text-base text-left"
                  role="menuitem"
                  onClick={() => {
                    const range = editor.selection;
                    toggleParagraph(editor, noteId, range, dispatch);
                  }}
                >
                  Text
                </button>
                <button
                  className="outline-none cursor-default text-base text-left"
                  role="menuitem"
                  onClick={() => {
                    const range = editor.selection;
                    toggleBulletList(editor, noteId, range, dispatch);
                  }}
                >
                  Bullet list
                </button>
                <button
                  className="outline-none cursor-default text-base text-left"
                  role="menuitem"
                  onClick={() => {
                    const range = editor.selection;
                    toggleNumberedList(editor, noteId, range, dispatch);
                  }}
                >
                  Number list
                </button>
              </div>
            </div>
            <svg
              className="absolute style-dropdown"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 282.13 297.5"
            >
              <defs>
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      '.cls-1{fill:#f7f7f7;stroke:#c2ccd3;stroke-miterlimit:10;}',
                  }}
                />
              </defs>
              <g id="Calque_2" data-name="Calque 2">
                <g id="Calque_1-2" data-name="Calque 1">
                  <path
                    className="cls-1"
                    d="M281,43.88l-7.29-5.28a1.64,1.64,0,0,1-.67-1.32V14.69A14.19,14.19,0,0,0,258.81.5H14.69A14.19,14.19,0,0,0,.5,14.69V282.81A14.19,14.19,0,0,0,14.69,297H258.81A14.19,14.19,0,0,0,273,282.81V55.17a1.62,1.62,0,0,1,.48-1.15l7.67-7.67A1.63,1.63,0,0,0,281,43.88Z"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
const StyleButtonMemo = React.memo(StyleButton);

export type IToolbarProps = {
  editor: Editor & ReactEditor;
  noteId: string;
};

const SideToolbar: React.FC<IToolbarProps> = ({ editor, noteId }) => {
  const dispatch = useDispatch();
  const iconCls = `flex w-5 h-5 svg-color text-gray-500`;
  const iconFillCls = `flex w-5 h-5 fill-current-color text-gray-500`;

  return (
    <div
      className="sticky top-0 flex flex-col items-start shadow-sm rounded-md h-full justify-items-center p-2"
      style={{ paddingTop: 100 }}
    >
      {/* <!-- TODO: Dropdown font like Notes app --> */}
      <StyleButtonMemo editor={editor} noteId={noteId}></StyleButtonMemo>

      <button
        type="button"
        data-tip="Todo list"
        onClick={() => {
          const range = editor.selection;
          toggleTodo(editor, noteId, range, dispatch);
        }}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_CHECKBOX}</span>
      </button>

      <button
        type="button"
        data-tip="Quote"
        onClick={() => {
          const range = editor.selection;
          toggleBlockQuote(editor, noteId, range, dispatch);
        }}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_QUOTE}</span>
      </button>

      <button
        type="button"
        data-tip="Code"
        onClick={() => {
          const range = editor.selection;
          toggleCode(editor, noteId, range, dispatch);
        }}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_CODE}</span>
      </button>

      <button
        type="button"
        className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconCls}>
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </span>
      </button>

      <button
        type="button"
        data-tip="Date"
        onClick={() => {}}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_CALENDAR}</span>
      </button>

      <button
        type="button"
        data-tip="Divider"
        onClick={() => {
          const range = editor.selection;
          toggleDivider(editor, noteId, range, dispatch);
        }}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_DIVIDER}</span>
      </button>

      <button
        type="button"
        data-tip="Draw"
        onClick={() => {}}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_DRAW}</span>
      </button>

      <button
        type="button"
        data-tip="Undo"
        onClick={() => {}}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_UNDO}</span>
      </button>

      <button
        type="button"
        data-tip="Redo"
        onClick={() => {}}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_REDO}</span>
      </button>

      <br />

      <button
        type="button"
        data-tip="Info"
        onClick={() => {}}
        className="relative flex-initial items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <span className={iconFillCls}>{ICON_INFO}</span>
      </button>

      <button
        type="button"
        className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </button>
      <button
        type="button"
        className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
      >
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
          />
        </svg>
      </button>

      <nav className="flex flex-col items-start">
        <NavLink
          className="-ml-px relative inline-flex items-center px-4 py-2 border-1 border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md bg-white dark:bg-black dark:border-gray-800"
          to={`${HOST_URL}/note/note-list`}
          // to="/note/note-list"
          activeClassName="bg-indigo-200 dark:bg-indigo-700"
        >
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </NavLink>
        <NavLink
          className="-ml-px relative inline-flex items-center px-4 py-2 border-1 border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md bg-white dark:bg-black dark:border-gray-800"
          to={`${HOST_URL}/note/note-thumb`}
          // to="/note/note-thumb"
          activeClassName="bg-indigo-200 dark:bg-indigo-700"
        >
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </NavLink>
      </nav>
    </div>
  );
};

export { SideToolbar };
