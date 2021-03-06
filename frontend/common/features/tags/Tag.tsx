import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { Tag, Mode, updateTagDto } from '../../interfaces/INote.interface';
import {
  deleteTagAction,
  resetUpdateTag,
  setTagModeAction,
  updateTagAction,
  updateTagLocal,
} from './TagsSlice';

interface TagProps {
  tag: Tag;
  deleteModeActive: boolean;
  mode: Mode;
}

const TagComponent: React.FC<TagProps> = ({ tag, mode, deleteModeActive }) => {
  console.log('TagComponent cmp');

  var { name } = tag;
  const tagMode = tag.mode;
  const dispatch = useDispatch();

  let tagComponent = null;
  switch (tagMode) {
    case Mode.Default:
    default:
      tagComponent = (
        <a
          href="#"
          className={
            'h-full text-gray-900 group flex items-center text-sm font-normal rounded-md select-none' +
            (false
              ? ' bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
              : ' dark:text-gray-500')
          }
          onDoubleClick={() => {
            if (mode === Mode.Edit) {
              dispatch(setTagModeAction(tag, Mode.Edit));
            }
          }}
        >
          <svg
            className="text-gray-500 mr-3 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <div className="truncate w-full">{name}</div>
          {mode === Mode.Edit && (
            <div className="inline-flex">
              <button
                title="Edit"
                className="ml-2"
                onClick={() => {
                  dispatch(setTagModeAction(tag, Mode.Edit));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-3 dark:text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <button
                title="Delete"
                className="ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('click delete button');

                  dispatch(setTagModeAction(tag, Mode.Delete));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-3 dark:text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </a>
      );
      break;
    case Mode.Edit:
      tagComponent = (
        <a
          href="#"
          className={
            'h-full text-gray-900 group flex items-center text-sm font-normal rounded-md select-none' +
            (false
              ? ' bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
              : ' dark:text-gray-500')
          }
        >
          <svg
            className="text-gray-500 mr-3 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <input
            type="text"
            className="mt-1 block w-full rounded-md shadow-sm py-1 px-2 order bg-white dark:bg-black border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            value={name}
            autoFocus
            onChange={(e) => {
              const updatedTag: Tag = { ...tag, name: e.target.value };
              dispatch(updateTagLocal(updatedTag));
            }}
            onBlur={(e) => {
              const tagId = tag.id;
              const updateTagDto: updateTagDto = {
                name: e.target.value,
              };
              dispatch(updateTagAction({ tagId, updateTagDto }));
            }}
            onKeyDown={(e) => {
              if (e.keyCode == 27) {
                // escape
                const tagId = tag.id;
                dispatch(resetUpdateTag(tagId));
              } else if (e.keyCode == 13) {
                // enter
                const tagId = tag.id;
                const updateTagDto: updateTagDto = {
                  name: e.target.value,
                };
                dispatch(updateTagAction({ tagId, updateTagDto }));
              }
            }}
          ></input>
        </a>
      );
      break;
    case Mode.Delete:
      tagComponent = (
        <div
          className={
            'h-full text-gray-900 group flex items-center text-sm font-normal rounded-md select-none' +
            (false
              ? ' bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
              : ' dark:text-gray-500')
          }
        >
          <svg
            className="text-gray-500 mr-3 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <div className="flex align-middle">
            <div className="truncate text-xs w-full flex items-center pr-2">
              Confirm ?
            </div>
            {/* <span className="truncate w-full">{name}</span> */}
            <div>
              <div className="relative z-0 inline-flex shadow-sm rounded-md ">
                <button
                  type="button"
                  className="relative inline-flex items-center px-2 py-1 rounded-l-md text-xs border border-gray-300 bg-white dark:border-gray-600 dark:bg-black text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  onClick={(e) => {
                    dispatch(deleteTagAction(tag.id));
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode == 27) {
                      // escape
                      dispatch(resetUpdateTag(tag.id));
                    } else if (e.keyCode == 13) {
                      // enter
                      dispatch(deleteTagAction(tag.id));
                    }
                  }}
                >
                  Yes
                </button>
                <button
                  autoFocus
                  type="button"
                  className="-ml-px relative inline-flex items-center px-2 py-1 rounded-r-md text-xs border border-gray-300 bg-white dark:border-gray-600 dark:bg-black text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  onClick={() => {
                    dispatch(resetUpdateTag(tag.id));
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode == 27) {
                      // escape
                      dispatch(resetUpdateTag(tag.id));
                    } else if (e.keyCode == 13) {
                      // enter
                      dispatch(resetUpdateTag(tag.id));
                    }
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      );
      break;
  }
  return <li className="relative overflow-hidden h-10 p-2">{tagComponent}</li>;
};

export { TagComponent };
