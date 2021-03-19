import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import ReactTooltip from 'react-tooltip';
import { RootState } from '../../../../common/rootReducer';
import { dispatchCommand, mapOfKeyValueToArrayOfMap } from '../../../../common/utils';
import {
  updateNoteActionAction,
  UpdateNoteActionPayload,
} from '../../note.actions';
import { INote, NoteColor, TagEntity, UpdateNoteDTO } from '../../../../common/interfaces';
import { NewTag } from './NewTag';
import { tagIconColorMap, tagIconIconMap, noteIconColorMap } from '../../../../common/components/TagIcon';

interface INoteTagsProps {}

const NoteTags: React.FC<INoteTagsProps> = ({}) => {
  console.log('NoteTags');
  const dispatch = useDispatch();
  const { notes } = useSelector((state: RootState) => state.notes);
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );
  const tags = useSelector((state: RootState) => state.tags.tags);
  const note: INote | null = selectedNoteId ? notes[selectedNoteId] : null;
  const tagsList: TagEntity[] = mapOfKeyValueToArrayOfMap(tags);
  const noteTags = note?.tags;
  const noteId = note?.id;
  const [isColorDropDownOpen, setIsColorDropDownOpen] = useState(false);
  const dropdownColorRef = useRef(null);
  const firstDropDownColorItemRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        dropdownColorRef.current &&
        !dropdownColorRef.current.contains(event.target)
      ) {
        if (isColorDropDownOpen) {
          // Close the dropdown if opened
          setIsColorDropDownOpen(false);
        }
      }
    }
    if (isColorDropDownOpen) {
      firstDropDownColorItemRef.current?.focus();
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownColorRef, isColorDropDownOpen]);
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  // Note: This is required to manage border-left / border-right / radius left / radius right, because of the use
  // of Utility css....
  // In standard CSS, it will be managed with :firsts-child and :last-child
  const getTagClassName = (tags: TagEntity[], name: string, index: number) => {
    let noteClassName =
      'flex items-center px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-800 text-xs font-medium dark:text-indigo-100';

    if (tags.length === 0) {
    } else if (tags.length === 1) {
      noteClassName += '';
    } else if (tags.length > 0 && index === 0) {
      noteClassName += ' border-r-0 rounded-r-none';
    } else if (tags.length > 0 && index > 0 && index < tags.length - 1) {
      noteClassName += ' border-r-0 rounded-r-none rounded-l-none';
    } else if (tags.length > 0 && index === tags.length - 1) {
      noteClassName += ' rounded-l-none';
    }

    return noteClassName;
  };

  const handleFavClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log('handleFavClick');
    if (note) {
      const noteId = note.id;
      const isFav = note.isFav;
      const updateNoteDTO: UpdateNoteDTO = {
        id: noteId,
        isFav: !isFav,
      };

      const payload: UpdateNoteActionPayload = {
        updateNoteDTO: updateNoteDTO,
      };
      dispatchCommand({
        name: updateNoteActionAction.typePrefix,
        action: updateNoteActionAction(payload),
        payload,
        dispatch,
      });
    }
  };

  const noteColor = note?.color;
  let noteColorCSS = 'GRAY';
  if (noteColor) {
    noteColorCSS = noteIconColorMap[noteColor];
  }

  return (
    <div key={`NoteTags`} className="flex justify-end p-2">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row select-none">
        <div className="inline-flex mr-2">
          <div className="relative inline-flex items-center">
            <button
              data-tip="Color"
              className="flex h-full items-center px-2 py-0.5 first-child:border-r-0 rounded rounded-r-none
              text-xs font-medium dark:text-indigo-100
              shadow-sm 
              focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 
              focus:ring-offset-gray-100 
              border border-indigo-300 dark:border-indigo-800
              hover:bg-indigo-50 dark:hover:bg-indigo-900
              transition duration-500 ease-in-out"
              onClick={(e) => {
                setIsColorDropDownOpen(!isColorDropDownOpen);
              }}
            >
              <div
                className={`w-3 h-3 rounded-full bg-${noteColorCSS}-500 transition duration-500 ease-in-out`}
              ></div>
            </button>
            <CSSTransition
              in={isColorDropDownOpen}
              timeout={400}
              classNames="dropdown"
              unmountOnExit
            >
              <div
                className={`absolute top-8 z-10 left-0 
                p-4 bg-white rounded-md dark:bg-black border border-indigo-700 shadow-md`}
                ref={dropdownColorRef}
                onBlur={(e: any) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsColorDropDownOpen(false);
                  }
                }}
              >
                <div className="flex">
                  {Object.keys(tagIconColorMap).map((tagIconColor, index) => {
                    let el = null;
                    if (index === 0) {
                      el = (
                        <button
                          ref={firstDropDownColorItemRef}
                          className={`flex w-4 h-4 mr-2
              rounded-full bg-${tagIconColorMap[tagIconColor]}-400
              shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 
              focus:ring-offset-gray-100 
              border border-indigo-300 dark:border-indigo-800
              hover:bg-indigo-50 dark:hover:bg-indigo-900
              `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="text-gray-700"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                        </button>
                      );
                    } else {
                      el = (
                        <button
                          className={`flex w-4 h-4 mr-2
              rounded-full bg-${tagIconColorMap[tagIconColor]}-400
              shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 
              focus:ring-offset-gray-100 
              border border-indigo-300 dark:border-indigo-800
              hover:border-black dark:hover:border-white
              `}
                          icon-color={tagIconColor}
                          onClick={(e: React.MouseEvent<HTMLElement>) => {
                            console.log('e', e);
                            const iconColor = e.currentTarget.getAttribute(
                              'icon-color'
                            );
                            if (iconColor) {
                              const noteId = note?.id;
                              if (noteId) {
                                const updateNoteDTO: UpdateNoteDTO = {
                                  id: noteId,
                                  color: NoteColor[iconColor],
                                };
                                const payload: UpdateNoteActionPayload = {
                                  updateNoteDTO: updateNoteDTO,
                                };
                                dispatchCommand({
                                  name: updateNoteActionAction.typePrefix,
                                  action: updateNoteActionAction(payload),
                                  payload,
                                  dispatch,
                                });
                              } else {
                                console.error(`noteId: ${noteId} is undefined`);
                              }
                            } else {
                              console.warn('!iconColor');
                            }
                          }}
                        ></button>
                      );
                    }
                    return el;
                  })}
                </div>
              </div>
            </CSSTransition>
          </div>

          <button
            data-tip="Fav"
            className="inline-flex items-center px-2 py-0.5 first-child:border-r-0 rounded rounded-l-none
            text-xs font-medium dark:text-indigo-100
            shadow-sm 
            focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 
            focus:ring-offset-gray-100 
            border border-l-0 border-indigo-300 dark:border-indigo-800
            hover:bg-indigo-50 dark:hover:bg-indigo-900
            transition duration-500 ease-in-out"
            onClick={handleFavClick}
          >
            <CSSTransition in={note?.isFav} timeout={400} classNames="fav">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-indigo-400"
                fill={`${note?.isFav ? '#6366f1' : 'none'}`}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </CSSTransition>
          </button>
        </div>
        {noteTags && noteId && (
          <NewTag noteId={noteId} tags={tagsList} noteTags={noteTags} />
        )}
        <div className="inline-flex ml-2">
          {/* <TransitionGroup className="inline-flex"> */}
          {noteTags &&
            noteTags.map(({ id, name, color, icon }, index) => {
              console.log('icon', color, icon);

              // <CSSTransition key={id} timeout={400} classNames="note-tag-tiny">
              return (
                <div
                  key={`notetag-${id}`}
                  className={getTagClassName(noteTags, name, index)}
                >
                  <div
                    className={`mr-1.5 h-4 w-4 text-${tagIconColorMap[color]}-500`}
                  >
                    {tagIconIconMap[icon]}
                  </div>
                  {name}
                </div>
              );
              // </CSSTransition>
            })}
          {/* </TransitionGroup> */}
        </div>
      </div>
    </div>
  );
};

export { NoteTags };
