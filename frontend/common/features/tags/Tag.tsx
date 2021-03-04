import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { Tag, Mode, updateTagDto } from '../../interfaces/INote.interface';
import {
  deleteTagAction,
  resetUpdateTag,
  setMode,
  updateTagAction,
  updateTagLocal,
} from './TagsSlice';

interface TagProps {
  tag: Tag;
  deleteModeActive: boolean;
}

const TagComponent: React.FC<TagProps> = ({ tag, deleteModeActive }) => {
  console.log('TagComponent cmp', deleteModeActive);

  var { mode, name } = tag;
  const dispatch = useDispatch();

  let tagComponent = null;
  switch (mode) {
    case Mode.Edit:
      tagComponent = (
        <a
          href="#"
          className={
            'text-gray-900 group flex items-center px-2 py-2 text-sm font-normal rounded-md' +
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
            'text-gray-900 group flex items-center px-2 py-2 text-sm font-normal rounded-md' +
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
          <span>
            <span className="truncate w-full">Confirm ? {name}</span>
            <div>
              <span className="relative z-0 inline-flex shadow-sm rounded-md">
                <button
                  type="button"
                  className="relative inline-flex items-center px-1 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="-ml-px relative inline-flex items-center px-1 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  onClick={() => {
                    dispatch(resetUpdateTag(tag.id));
                  }}
                  onKeyDown={() => {
                    dispatch(resetUpdateTag(tag.id));
                  }}
                >
                  No
                </button>
              </span>
            </div>
          </span>
        </div>
      );
      break;
    case Mode.Default:
    default:
      tagComponent = (
        <a
          href="#"
          className={
            'text-gray-900 group flex items-center px-2 py-2 text-sm font-normal rounded-md' +
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
          <span className="truncate w-full">{name}</span>
          <button
            onClick={() => {
              dispatch(setMode(tag, Mode.Edit));
            }}
          >
            [r]
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('click delete button');

              dispatch(setMode(tag, Mode.Delete));
            }}
          >
            [x]
          </button>
        </a>
      );
      break;
  }
  return tagComponent;
};

export { TagComponent };
