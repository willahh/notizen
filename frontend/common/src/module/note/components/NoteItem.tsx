import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { RootState } from '../../../common/rootReducer';
import { dispatchCommand, dispatchQuery } from '../../../common/utils';
import {
  deleteNoteAction,
  DeleteNoteActionPayload,
  setSelectedNoteIdAction,
  SetSelectedNoteIdActionPayload,
} from '../note.actions';
import { INote } from '../../../common/interfaces';
import {
  tagIconColorMap,
  tagIconIconMap,
} from './../../../common/components/TagIcon';
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

const NoteItem: React.FC<INoteProps> = ({ id, content, name, tags, color }) => {
  console.log('NoteItem');

  const dispatch = useDispatch();
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );
  const isSelected = id === selectedNoteId;

  // TODO: Warning: is performance ok ?
  const textPreview: string = content
    .reduce((acc, v) => {
      return acc.concat(v.children[0].text);
    }, '')
    .slice(0, 100);

  let itemCls =
    'relative overflow-hidden select-none border-l-4 duration-300 ease-in-out';
  let itemInnerCls =
    'relative py-5 px-4 h-24 duration-300 ease-in-out transition-all';
  if (isSelected) {
    itemCls += ` border-${color.toLowerCase()}-700`;
    itemInnerCls += ' transform left-2';
  } else {
    itemCls += ' border-transparent';
    itemInnerCls += ' left-0';
  }
  const btnClassName = `relative inline-flex items-center p-2 
    border-1 border-gray-300 dark:border-gray-800
    
    text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 focus:z-10 
    focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-md `;

  useEffect(() => {
    ReactTooltip.rebuild();
  });
  ReactTooltip.rebuild();

  return (
    <li
      key={`NoteItem-${id}`}
      className="relative overflow-hidden"
      style={{ zIndex: 'auto' }}
      note-id={id}
      onMouseDown={() => {
        console.log('click');

        const payload: SetSelectedNoteIdActionPayload = {
          noteId: id,
        };
        dispatchQuery({
          name: setSelectedNoteIdAction.type,
          payload: payload,
          action: setSelectedNoteIdAction(payload),
          dispatch: dispatch,
        });
      }}
    >
      <div className={itemCls}>
        <div className={itemInnerCls}>
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <a href="#" className="block focus:outline-none">
                <p className="text-sm font-normal truncate text-gray-600 dark:text-gray-300">
                  {name}
                </p>
                <div className="text-sm font-thin truncate text-gray-600 dark:text-gray-300">{textPreview}</div>
                <div>
                  {tags.map((tag) => {
                    if (tag) {
                      const { color, icon, name, id } = tag;
                      return (
                        <span
                          key={`tag-${id}`}
                          // title={name}
                          data-tip={name}
                          data-delay-show={10}
                          data-effect="solid"
                          className="inline-flex items-center rounded-full pr-1 lowercase
                        text-xs dark:text-indigo-100
                        hover:bg-indigo-200 dark:hover:bg-indigo-700
                        transition duration-200 ease-in-out
                        "
                        >
                          <span
                            className={`h-3 w-3 text-${tagIconColorMap[color]}-500`}
                          >
                            {tagIconIconMap[icon]}
                          </span>
                        </span>
                      );
                    } else {
                      console.error('tag is undefined');
                      return <></>;
                    }
                  })}
                </div>
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
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={(e) => {
                console.log('onClick', id);
                e.stopPropagation();
                const payload: DeleteNoteActionPayload = {
                  noteId: id,
                };
                dispatchCommand({
                  name: deleteNoteAction.typePrefix,
                  payload: payload,
                  action: deleteNoteAction(payload),
                  dispatch: dispatch,
                });
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
          {/* <div className="mt-1 max-h-10 overflow-hidden">
            <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-500">
              {content ? truncateString(content, 64) : 'Ma nouvelle note'}
            </p>
          </div> */}
        </div>
      </div>
    </li>
  );
};

export default React.memo(NoteItem);
