import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import {
  addTagActionLocal,
  createTagAction,
  createTagAndEditAction,
  setTagModeAction,
  updateTagVisibilityInFilterDropdownLocal,
} from '../features/tags/TagsSlice';
import {
  createTagDto,
  INote,
  Mode,
  NoteAction,
  NoteActionDto,
  Tag,
  TagColor,
  TagEntity,
  TagIcon,
  UpdateNoteDTO,
} from '../interfaces/INote.interface';
import { tagIconColorMap, tagIconIconMap } from './TagIcon';
import {
  arrayOfMapToMapOfKeyValue,
  mapOfKeyValueToArrayOfMap,
} from '../app/utils';
import {
  addNoteLocalAction,
  addTagToNoteAction,
  removeTagToNoteAction,
  createTagAndAddToNoteAction,
} from '../features/note/noteListSlice';

interface INewTagProps {
  noteId: number;
  tags: TagEntity[];
  noteTags: Tag[];
}
const NewTag: React.FC<INewTagProps> = ({ noteId }) => {
  console.log('NewTag Component', noteId);

  const dispatch = useDispatch();

  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  // Here we are taking tags from Redux state
  const tagsFromReduxState = useSelector((state: RootState) => state.tags.tags);

  // Transform the datastructure to a list of Tag
  const tagsArray: Tag[] = mapOfKeyValueToArrayOfMap(tagsFromReduxState);

  // Create a new internal state of tags from redux state tagsArray.
  // This allows to filters internally
  const [tags, setTags] = useState(tagsArray);
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

  // const { mode } = state;
  // const tags: Tag[] = [
  //   { name: 'Tag 1', icon: TagIcon.default, color: TagColor.default },
  //   { name: 'Tag 2', icon: TagIcon.hashtag, color: TagColor.indigo },
  //   { name: 'Tag 2', icon: TagIcon.hashtag, color: TagColor.blue },
  //   { name: 'Mon superbe tag 3', noteId: '1763', icon: TagIcon.hashtag, color: TagColor.blue },
  //   { name: 'Mon beau tag 4', noteId: '1763', icon: TagIcon.hashtag, color: TagColor.blue },
  // ];

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
    const visibility = !tag.visibleInFilterDropdown;
    dispatch(updateTagVisibilityInFilterDropdownLocal(tag, visibility));
    if (visibility) {
      const noteActionDTO: NoteActionDto = {
        actionType: NoteAction.AddTag,
        noteId: noteId,
        tagId: tag.id,
      };
      dispatch(addTagToNoteAction(noteActionDTO));
    } else {
      const noteActionDTO: NoteActionDto = {
        actionType: NoteAction.RemoveTag,
        noteId: noteId,
        tagId: tag.id,
      };
      dispatch(removeTagToNoteAction(noteActionDTO));
    }
  };

  const tagOptionHtml = (
    <div className="p-2 px-4">
      <div className="flex items-center">
        <div className="mr-2">Icon:</div>
        {Object.keys(tagIconIconMap).map((tagIcon) => (
          <button
            className={`flex h-full py-2 w-4 mr-2 text-${
              tagIconIconMap[TagColor.default]
            }-500
            `}
          >
            {tagIconIconMap[tagIcon]}
          </button>
        ))}
      </div>
      <div className="flex items-center">
        <div className="mr-2">Color:</div>
        {Object.keys(tagIconColorMap).map((tagIconColor) => {
          return (
            <button
              className={`flex w-4 h-4 mr-2
              rounded-full bg-${tagIconColorMap[tagIconColor]}-400
              shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 
              focus:ring-offset-gray-100 
              border border-indigo-300 dark:border-indigo-800
              hover:border-black dark:hover:border-white
              `}
            ></button>
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
            type="button"
            className="inline-flex justify-center items-center w-full h-full px-2 py-0.5 rounded-md shadow-sm
            text-sm font-medium focus:outline-none text-gray-700 dark:text-gray-200 
            hover:bg-gray-50 dark:hover:bg-gray-900  
            focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 focus:ring-offset-gray-100 
            border border-indigo-300 dark:border-indigo-800
            transition duration-500 ease-in-out"
            id="options-menu"
            // aria-haspopup="true"
            // aria-expanded="true"
            onClick={() => {
              setIsDropDownOpen(!isDropdownOpen);
            }}
          >
            <svg
              className="h-4 w-4 text-indigo-400"
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
              className="h-4 w-4 text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <svg
              className="-mr-1 ml-2 h-5 w-5"
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
        <div
          className={`origin-top-left absolute z-10 ${
            !isDropdownOpen ? 'hidden' : ''
          } left-0 w-72 rounded-md shadow-lg 
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
                tagIconColorMap[TagColor.default]
              }-500`}
            >
              {tagIconIconMap.DEFAULT}
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
          <div className="">
            {tags.length === 0 && tagOptionHtml}
            {tags.map((tag) => {
              const { name, color, visibleInFilterDropdown } = tag;

              return (
                <button
                  key={`newtag-${tag.id}`}
                  className="flex w-full px-4 py-2 items-center text-sm text-gray-700 hover:text-black dark:hover:text-white
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
                    {tagIconIconMap.DEFAULT}
                  </div>
                  <div className="flex-1 text-left">{name}</div>
                  {visibleInFilterDropdown && (
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
      </div>
    </div>
  );
};

export { NewTag };
