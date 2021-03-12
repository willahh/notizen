import React from 'react';
// import { useSpring, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import {
  deleteNoteAction,
  // setSelectedNoteIdAction,
} from '../module/note/note.actions';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { JsxElement } from 'typescript';
// import TransitionGroup from 'react-transition-group/TransitionGroup';
// import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';

// TODO: Share with INote (and with back Note)
interface INoteItemProps {
  id: string;
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

const NoteItemThumb: React.FC<INoteItemProps> = ({ id, text, title, tags }) => {
  console.log('NoteItemThumb', id);

  const dispatch = useDispatch();
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );
  const isSelected = id === selectedNoteId;

  let className = 'relative py-5 px-4 bg-white dark:bg-black';
  if (isSelected) {
    className += ' border-l-4 border-indigo-700';
  } else {
    className += ' border-white dark:border-black';
  }
  const btnClassName =
    'relative inline-flex items-center p-2 border-1 border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white dark:bg-black dark:border-gray-800';

  const tagType = Math.round(Math.random() * 5);
  let tagColorClassName = ' text-green-800 bg-green-100';
  switch (tagType) {
    case 0:
      tagColorClassName = ' text-red-800 bg-red-100';
      break;
    case 1:
      tagColorClassName = ' text-yellow-800 bg-yellow-100';
      break;
    case 2:
      tagColorClassName = ' text-blue-800 bg-blue-100';
      break;
    case 3:
      tagColorClassName = ' text-indigo-800 bg-indigo-100';
      break;
    case 4:
      tagColorClassName = ' text-purple-800 bg-purple-100';
      break;
  }
  return (
    <li className="w-52 h-52 overflow-hidden border border-gray-200 dark:border-gray-700 rounded-md p-4">
      <div className="flex flex-col h-full">
        <div className="relative">
          <div className="absolute right-2 top-2 flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full">
            Pin
          </div>

          <h3
            className="text-gray-900 dark:text-gray-50"
            style={{ fontSize: 'xx-small' }}
          >
            {title}
          </h3>
          <div
            className="text-gray-300 dark:text-gray-700"
            style={{ fontSize: 'xx-small' }}
          >
            {text}
          </div>
        </div>
        <div className="h-10">
          <div
            className={
              'flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full' +
              tagColorClassName
            }
          >
            {tags}
          </div>
        </div>
      </div>
    </li>
  );
};

export { NoteItemThumb };
