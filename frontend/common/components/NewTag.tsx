import React from 'react';
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
import {
  arrayOfMapToMapOfKeyValue,
  mapOfKeyValueToArrayOfMap,
} from '../app/utils';
import { addNoteLocalAction, createTagAndAddToNoteAction } from '../features/note/noteListSlice';

interface INewTagProps {
  // note?: INote;
  noteId: number;
  tags: TagEntity[];
  noteTags: Tag[];
}

interface CreateTagState {
  mode: Mode;
  isDropdownOpen: boolean;
  filterText: string;
}

const tagIconColor = {
  [TagColor.default]: 'gray',
  [TagColor.gray]: 'gray',
  [TagColor.red]: 'red',
  [TagColor.yellow]: 'yellow',
  [TagColor.green]: 'green',
  [TagColor.blue]: 'blue',
  [TagColor.indigo]: 'indigo',
  [TagColor.purple]: 'purple',
  [TagColor.pink]: 'pink',
};

const tagIconicon = {
  [TagIcon.default]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      />
    </svg>
  ),
  [TagIcon.tag]: (
    <svg
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
  ),
  [TagIcon.hashtag]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
      />
    </svg>
  ),
};

const NewTag: React.FC<INewTagProps> = ({ noteId }) => {
  console.log('###NewTag', noteId);

  const state: CreateTagState = {
    mode: Mode.Default,
    isDropdownOpen: true,
    filterText: '',
  };

  const dispatch = useDispatch();

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

  const { mode, isDropdownOpen } = state;
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
  };

  return (
    <div className="inline-flex">
      {/* <button
        title="New tag"
        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-indigo-100 text-indigo-800 dark:bg-gray-800 dark:text-indigo-100"
        onClick={() => {
          createTagAndEditAction(dispatch);
        }}
      >
        aaa
      </button> */}
      <div
        className="relative inline-flex "
        // style={{ display: 'none' }}
      >
        <div>
          <button
            type="button"
            className="inline-flex justify-center items-center w-full  px-2 py-0.5 rounded-md shadow-sm
            text-sm font-medium focus:outline-none text-gray-700 dark:text-gray-200 
            hover:bg-gray-50 dark:hover:bg-gray-900  
            focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 focus:ring-offset-gray-100 
            border border-indigo-300 dark:border-indigo-800"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={() => {
              // createTagAndEditAction(dispatch);
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
          className={`origin-top-left absolute ${
            !isDropdownOpen ? 'hidden' : ''
          } left-0 w-56  rounded-md shadow-lg 
          bg-white dark:bg-black
          ring-1 ring-black dark:ring-indigo-800
          divide-y divide-gray-100 dark:divide-gray-900  `}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <span className="relative flex align-middle h-full">
            <span
              className={`absolute top-0 left-4 flex h-full z-10 py-2 w-4 mr-2 text-${
                tagIconColor[TagColor.default]
              }-500`}
            >
              {tagIconicon.DEFAULT}
            </span>
            <input
              autoFocus
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
                    tagName: filterText
                  };
                  console.log('#noteActionDTO', noteActionDTO);
                  
                  const action:any = dispatch(createTagAndAddToNoteAction(noteActionDTO));
                  action.then((action: any) => {
                    if (!action.error) {
                      const tag: Tag = action.payload.tag;
                      const note: INote = action.payload.note;
                      dispatch(addTagActionLocal(tag));
                      dispatch(addNoteLocalAction(note))
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
          </span>
          <div className="">
            {tags.map((tag) => {
              const { name, color, visibleInFilterDropdown } = tag;

              return (
                <button
                  className="flex w-full px-4 py-2 items-center text-sm text-gray-700 hover:text-black dark:hover:text-white
              rounded-md
              focus:outline-none focus:ring-1
              focus:ring-indigo-500 dark:focus:ring-offset-indigo-800 focus:text-black dark:focus:text-white"
                  onClick={(e) => {
                    handleClickItem(e, tag);
                  }}
                >
                  <span
                    className={`flex relative w-4 h-4 mr-2 text-${tagIconColor[color]}-500`}
                  >
                    {tagIconicon.DEFAULT}
                  </span>
                  <span className="flex-1 text-left">{name}</span>
                  {visibleInFilterDropdown && (
                    <span className="flex flex-shrink-0">
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
                    </span>
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
