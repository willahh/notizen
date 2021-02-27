import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import {
  // dispatchDeleteNote,
  setSelectedNoteId,
} from '../features/note/noteDetailSlice';
import { deleteNoteThunk } from '../features/note/noteListSlice';

interface INoteItemProps {
  id: number;
  title: string | undefined;
  text: string | undefined;
  tags: string[];
  isSelected: boolean;
}
function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

const NoteItem: React.FC<INoteItemProps> = ({ id, text, title, tags }) => {
  console.log('NoteItem', id);

  const dispatch = useDispatch();
  const selectedNoteId = useSelector(
    (state: RootState) => state.noteDetail.selectedNoteId
  );
  const isSelected = id === selectedNoteId;

  let transitionItem =
    'transition ease-out duration-200 transform hover:-translate-x-1 hover:-translate-x-100 motion-reduce:transition-none motion-reduce:transform-none';
  let className =
    ' relative py-5 px-4 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-600 bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-800';
  if (isSelected) {
    className += ' border-l-4 border-indigo-700';
  } else {
    className += ' border-white dark:border-black';
  }

  return (
    <li
      key={id}
      className={className}
      onClick={() => {
        dispatch(setSelectedNoteId(id));
      }}
    >
      <button
        className="dark:text-white dark:bg-gray-700 p-2 rounded-sm"
        onClick={(e) => {
          console.log('onClick', id);
          e.stopPropagation();
          dispatch(deleteNoteThunk(id));
        }}
      >
        [x]
      </button>
      <div className={transitionItem}>
        <div className="flex justify-between space-x-3">
          <div className="min-w-0 flex-1">
            <a href="#" className="block focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-200">
                {title}
              </p>
              <p className="text-sm truncate text-gray-500 dark:text-gray-300">
                {tags}
              </p>
            </a>
          </div>
          <time
            dateTime="2021-01-27T16:35"
            className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
          >
            1d ago
          </time>
        </div>
        <div className="mt-1 max-h-10 overflow-hidden">
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-500">
            {text ? truncateString(text, 64) : 'Ma nouvelle note'}
          </p>
        </div>
      </div>
    </li>
  );
};

export { NoteItem };
