import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { addTagActionLocal } from '../features/tags/TagsSlice';
import {
  INote,
  NoteAction,
  NoteActionDto,
  Tag,
  TagColor,
  TagEntity,
  TagIcon,
} from '../interfaces/INote.interface';
import { tagIconColorMap, tagIconIconMap } from './TagIcon';
import { mapOfKeyValueToArrayOfMap } from '../app/utils';
import {
  addNoteLocalAction,
  addTagToNoteAction,
  removeTagToNoteAction,
  createTagAndAddToNoteAction,
} from '../features/note/noteListSlice';

// import { addTagToNoteAction } from '../features/noteTagSlice';
import { CSSTransition } from 'react-transition-group';

interface INewTagProps {
  noteId: number;
  tags: TagEntity[];
  noteTags: Tag[];
}
const NewTag: React.FC<INewTagProps> = ({ noteId }) => {
  console.log('NewTag Component', noteId);

  const dispatch = useDispatch();

  const getIsTagInNote = (note: INote, tag: Tag) => {
    const noteTagIds = note.tags.map((tag) => tag.id);
    const isTagInNote = noteTagIds.indexOf(tag.id) !== -1;
    return isTagInNote;
  };

  const sortDropDownTags = (tags) => {
    return tags.sort((tagA, tagB) => {
      const isTagAInNote = getIsTagInNote(note, tagA);
      const isTagBInNote = getIsTagInNote(note, tagB);
      return (isTagBInNote ? 0 : -1) - (isTagAInNote ? 0 : -1);
    });
  };

  // Get notes from root state
  const { notes } = useSelector((state: RootState) => state.notes);
  const selectedNoteId = useSelector(
    (state: RootState) => state.notes.selectedNoteId
  );
  const note: INote = selectedNoteId ? notes[selectedNoteId] : null;

  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  // Here we are taking tags from Redux state
  const tagsFromReduxState = useSelector((state: RootState) => state.tags.tags);

  // Transform the datastructure to a list of Tag
  const tagsArray: Tag[] = mapOfKeyValueToArrayOfMap(tagsFromReduxState);

  // Create a new internal state of tags from redux state tagsArray.
  // This allows to filters internally
  let [tags, setTags] = useState(tagsArray);
  tags = sortDropDownTags(tags);

  const [filterText, setFilterText] = useState(''); // Create also another internal state for the current text filter

  // Here we need to update this new internal state when the redux state has changed.
  // An example case of this, is when the dropdown is open, when we update tags outside (in the tag list component on the left)
  // we need to get internal state of tags synchronized with the tags states from Redux in the tag list cmp.
  // See https://stackoverflow.com/a/59174492/8000017
  useEffect(() => {
    const tagsArray: Tag[] = mapOfKeyValueToArrayOfMap(tagsFromReduxState);
    // The redux state tags has changed, so we update the internal state
    setTags(tagsArray);
    filterList(tagsArray, filterText);
  }, [tagsFromReduxState, filterText]);

  // New tag form fields
  const [formColor, setFormColor] = useState(TagColor.GRAY);
  const [formIcon, setFormIcon] = useState(TagIcon.TAG);
  console.log('##########formColor', formColor);
  
  /**
   * useEffect to manage click outside dropdown to close it
   */
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isDropdownOpen) {
          // Close the dropdown if opened
          setIsDropDownOpen(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, isDropdownOpen]);

  const inputFilterRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isDropdownOpen) {
      inputFilterRef.current.focus();
    }
  }, [isDropdownOpen]);

  const filterList = (tags: Tag[], filterText: string) => {
    const regex = new RegExp(filterText, 'gi');
    const tagsFiltered = tags.filter(({ name }) => {
      return name.match(regex);
    });
    setTags(tagsFiltered);
  };

  const handleOnChange = (e: any) => {
    const filterText = e.target.value;
    setFilterText(filterText);
    filterList(tagsArray, filterText);
  };

  const handleClickItem = (e: any, tag: Tag) => {
    console.log('handleClickItem');
    const isTagInNote = getIsTagInNote(note, tag);
    const addTagInNote = !isTagInNote;
    const nextElementIdToFocus = document.activeElement?.nextElementSibling?.id;

    if (addTagInNote) {
      const noteActionDTO: NoteActionDto = {
        actionType: NoteAction.AddTag,
        noteId: noteId,
        tagId: tag.id,
      };
      dispatch(addTagToNoteAction({ noteActionDTO: noteActionDTO, tag: tag }));
    } else {
      const noteActionDTO: NoteActionDto = {
        actionType: NoteAction.RemoveTag,
        noteId: noteId,
        tagId: tag.id,
      };
      dispatch(
        removeTagToNoteAction({ noteActionDTO: noteActionDTO, tag: tag })
      );
    }
    inputFilterRef.current?.focus();
    if (nextElementIdToFocus) {
      const elToFocus = document.getElementById(nextElementIdToFocus);
      if (elToFocus) {
        document.getElementById(nextElementIdToFocus)?.focus();
      }
    }
  };

  const tagOptionHtml = (
    <div className="p-2 px-4">
      <div className="flex items-center">
        <div className="mr-2">Icon:</div>
        {Object.keys(tagIconIconMap).map((tagIcon) => {
          const isSelected = formIcon === TagIcon[tagIcon];

          return (
            <button
              data-tag-icon={tagIcon}
              className={`flex py-2 mr-2 items-center
              w-6 h-6 rounded-full
              border-1
              hover:border-black dark:hover:border-white
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 
              focus:ring-offset-gray-100 
              ${
                isSelected
                  ? `border-black dark:border-white`
                  : `border-transparent`
              } 
              text-${tagIconIconMap[TagColor.GRAY]}-500 
              transition duration-300 ease-in-out
            `}
              onClick={(e) => {
                const tagIcon = e.currentTarget.getAttribute('data-tag-icon');
                setFormIcon(TagIcon[tagIcon]);
              }}
            >
              <span className="w-4 h-4">{tagIconIconMap[tagIcon]}</span>
            </button>
          );
        })}
      </div>
      <div className="flex items-center">
        <div className="mr-2">Color:</div>
        {Object.keys(tagIconColorMap).map((tagIconColor) => {
          const isSelected = formColor === TagColor[tagIconColor];
          return (
            <button
              data-tag-icon-color={tagIconColor}
              className={`flex w-4 h-4 mr-2
              rounded-full bg-${tagIconColorMap[tagIconColor]}-400
              border-2
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 
              focus:ring-offset-gray-100 
              ${
                isSelected
                  ? `border-black dark:border-white`
                  : `border-transparent`
              } 
              hover:border-black dark:hover:border-white
              transition duration-300 ease-in-out
              `}
              onClick={(e) => {
                const tagColor = e.currentTarget.getAttribute(
                  'data-tag-icon-color'
                );
                setFormColor(TagColor[tagColor]);
              }}
            >
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div key={`NewTag`} className="inline-flex h-full">
      <div className="relative inline-flex h-full">
        <div>
          <button
            data-tip="Add tag"
            type="button"
            className="inline-flex justify-center items-center w-full h-full px-2 py-0.5 rounded-md shadow-sm
            text-sm font-medium focus:outline-none text-gray-700 dark:text-gray-200 
            hover:bg-gray-50 dark:hover:bg-gray-900  
            focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 focus:ring-offset-gray-100 
            border border-indigo-300 dark:border-indigo-800
            transition duration-500 ease-in-out"
            id="options-menu"
            onClick={() => {
              setIsDropDownOpen(!isDropdownOpen);
            }}
          >
            <svg
              className="h-4 w-4 text-indigo-600 dark:text-indigo-400"
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
            <svg
              className="-mr-1 h-5 w-5 text-indigo-600 dark:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <CSSTransition
          in={isDropdownOpen}
          timeout={400}
          classNames="dropdown"
          unmountOnExit
        >
          <div
            className={`absolute origin-top-left top-8 z-10 left-0 w-72 rounded-md shadow-lg 
          bg-white dark:bg-black
          ring-1 ring-black dark:ring-indigo-800
          divide-y divide-gray-100 dark:divide-gray-900  `}
            ref={dropdownRef}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            onBlur={(e: any) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                // Blur outside the dropdown
                setIsDropDownOpen(false);
              }
            }}
          >
            <div className="relative flex align-middle h-full">
              <div
                className={`absolute top-0 left-4 flex h-full z-10 py-2 w-4 mr-2 text-${
                  tagIconColorMap[TagColor.GRAY]
                }-500`}
              >
                {tagIconIconMap.TAG}
              </div>
              <input
                autoFocus
                ref={inputFilterRef}
                value={filterText}
                onChange={handleOnChange}
                className="w-full border-0 bg-transparent pl-10
              text-sm focus:outline-none text-gray-500 font-extralight
              rounded-md
              focus:ring-1 ring-offset-1 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 focus:text-black dark:focus:text-white"
                type="text"
              />
              {tags.length === 0 && (
                <button
                  type="button"
                  className="absolute top-0 right-0 flex h-full py-2 
              items-center px-2 rounded-md rounded-l-none shadow-sm
              text-xs focus:outline-none text-gray-700 dark:text-gray-200 
              hover:bg-gray-50 dark:hover:bg-gray-900  
              focus:ring-1 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 focus:ring-offset-gray-100 
              ring-1 ring-black dark:ring-indigo-800
              "
                  aria-haspopup="true"
                  aria-expanded="true"
                  onClick={() => {
                    console.log('on click');
                    const noteActionDTO: NoteActionDto = {
                      actionType: NoteAction.CreateTagAndAddToNote,
                      noteId: noteId,
                      tagName: filterText,
                      tagColor: formColor,
                      tagIcon: formIcon
                    };
                    const action: any = dispatch(
                      createTagAndAddToNoteAction(noteActionDTO)
                    );
                    action.then((action: any) => {
                      if (!action.error) {
                        const tag: Tag = action.payload.tag;
                        const note: INote = action.payload.note;
                        dispatch(addTagActionLocal(tag));
                        dispatch(addNoteLocalAction(note));
                        inputFilterRef.current?.focus();
                      } else {
                        console.warn('err', action.error);
                        // TODO: Throw user message
                      }
                    });
                  }}
                >
                  Add
                </button>
              )}
            </div>
            <div className="overflow-auto max-h-80">
              {tags.length === 0 && tagOptionHtml}
              {tags.map((tag) => {
                const { name, color, id, icon } = tag;
                const isTagInNote = getIsTagInNote(note, tag);
                return (
                  <button
                    key={`newtag-${tag.id}`}
                    id={`newtag-tag-id-${id}`}
                    className="flex w-full px-4 py-2 items-center text-sm text-gray-700 
                  rounded-md
                  focus:outline-none focus:ring-1
                  focus:ring-indigo-500 dark:focus:ring-offset-indigo-800 focus:text-black dark:focus:text-white"
                    onClick={(e) => {
                      handleClickItem(e, tag);
                    }}
                  >
                    <div
                      className={`flex relative w-4 h-4 mr-2 text-${tagIconColorMap[color]}-500`}
                    >
                      {tagIconIconMap[icon]}
                    </div>
                    <div
                      className={`flex-1 text-left hover:text-black dark:hover:text-white
                        ${
                          isTagInNote
                            ? `text-black dark:text-white`
                            : `text-gray-500`
                        } 
                      `}
                    >
                      {name}
                    </div>
                    {isTagInNote && (
                      <div className="flex flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export { NewTag };
