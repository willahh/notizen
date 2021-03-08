import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import {
  deleteNoteThunk,
  setSelectedNoteId,
} from '../features/note/noteListSlice';
import { INote } from '../interfaces/INote.interface';
// import TransitionGroup from 'react-transition-group/TransitionGroup';
// import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';

interface INoteProps extends INote {
  isSelected: boolean;
}

function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

const NoteItem: React.FC<INoteProps> = ({ id, content, name, tags }) => {
  const dispatch = useDispatch();
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );
  const isSelected = id === selectedNoteId;
  console.log('tags', tags);

  let itemCls =
    'relative overflow-hidden select-none border-l-4 duration-300 ease-in-out';
  let itemInnerCls =
    'relative py-5 px-4 bg-white dark:bg-black duration-300 ease-in-out transition-all';
  if (isSelected) {
    itemCls += ' border-indigo-700';
    itemInnerCls += ' transform left-2';
  } else {
    itemCls += ' border-white dark:border-black';
    itemInnerCls += ' left-0';
  }
  const btnClassName =
    'relative inline-flex items-center p-2 border-1 border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white dark:bg-black dark:border-gray-800';

  return (
    <li
      className="relative overflow-hidden"
      style={{ zIndex: Number(id) }}
      note-id={id}
      onClick={() => {
        dispatch(setSelectedNoteId(id));
      }}
    >
      <div className={itemCls}>
        <div className={itemInnerCls}>
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <a href="#" className="block focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-200">
                  {name}
                </p>
                <p className="text-sm truncate text-gray-500 dark:text-gray-300">
                  Tag 1, Tag 2
                  {/* TODO: Need to retrieve tags within Notes (new backend service notesDetailed required*/}
                  {/* {tags && tags.map(({mode}) => <span>{name}</span>)} */}
                </p>
              </a>
            </div>
            <time
              dateTime="2021-01-27T16:35"
              className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
            >
              1d ago
            </time>
            <button
              className={btnClassName}
              onClick={(e) => {
                console.log('onClick', id);
                e.stopPropagation();
                dispatch(deleteNoteThunk(id));
              }}
            >
              <svg
                className="w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
          <div className="mt-1 max-h-10 overflow-hidden">
            <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-500">
              {content ? truncateString(content, 64) : 'Ma nouvelle note'}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export { NoteItem };
