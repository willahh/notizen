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
  ICON_UNDO
} from '../../../../common/components/Icons';
import { HOST_URL } from '../../../../common/constants';
import {
  toggleBold,
} from '../../../editor/service/editor.action.service';
import { toggleBlockQuote } from './../../../editor/plugins/blockquote/blockquote.service';
import { toggleCode } from './../../../editor/plugins/code/code.service';
import { toggleHeadingOne } from './../../../editor/plugins/headingone/headingone.service';
import { toggleHeadingThree } from './../../../editor/plugins/headingthree/headingthree.service';
import { toggleHeadingTwo } from './../../../editor/plugins/headingtwo/headingtwo.service';
import { toggleBulletList } from './../../../editor/plugins/bulletlist/bulletlist.service';
import { toggleNumberedList } from './../../../editor/plugins/numberedlist/numberedlist.service';
import { toggleDivider } from './../../../editor/plugins/divider/divider.service';
import { toggleTodo } from './../../../editor/plugins/todo/todo.service';

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
