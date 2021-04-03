import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/rootReducer';
import {
  dispatchCommand,
  dispatchQuery,
  mapOfKeyValueToArrayOfMap,
} from '../../../common/utils';
import {
  CreateTagDTO,
  Mode,
  Tag,
  TagColor,
  TagIcon,
} from '../../../common/interfaces';
import {
  fetchTagsAction,
  FetchTagsActionPayload,
  setModeAction,
  SetModeActionPayload,
  createTagAndEdit,
} from '../tags.actions';
import { TagComponentMemoized } from './Tag';
interface ITagsProps {}

const Tags: React.FC<ITagsProps> = ({}) => {
  console.log('Tags');
  
  const dispatch = useDispatch();
  const { error, isLoading, tags } = useSelector(
    (state: RootState) => state.tags
  );
  const deleteModeActive = useSelector(
    (state: RootState) => state.tags.deleteModeActive
  );
  const mode = useSelector((state: RootState) => state.tags.mode);
  const tagsList: Tag[] = mapOfKeyValueToArrayOfMap(tags);

  useEffect(() => {
    const payload: FetchTagsActionPayload = {};
    dispatchQuery({
      name: fetchTagsAction.typePrefix,
      action: fetchTagsAction(payload),
      payload,
      dispatch,
    });
  }, [dispatch]);

  return (
    <>
      <div className="flex items-center p-2 h-10">
        <div className="flex w-full items-center text-sm text-gray-700 dark:text-gray-500 font-normal">
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
          <div className="truncate w-full">Tags</div>
        </div>
        <button
          className="text-black dark:text-white ml-2"
          title="Create"
          onClick={() => {
            const tagId = uuidv4();
            const tagDTO: CreateTagDTO = {
              id: tagId,
              name: 'New tag',
              createDate: new Date().toISOString(),
              updateDate: new Date().toISOString(),
              isDeleted: false,
              icon: TagIcon.TAG,
              color: TagColor.GRAY,
            };
            createTagAndEdit(tagDTO, dispatch);
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
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        {mode === Mode.Default && (
          <button
            className="text-blac dark:text-white ml-2"
            title="Edit"
            onClick={() => {
              const payload: SetModeActionPayload = {
                mode: Mode.Edit,
              };
              dispatchCommand({
                name: setModeAction.name,
                action: setModeAction(payload),
                payload,
                dispatch,
              });
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        )}
        {mode === Mode.Edit && (
          <button
            className="text-blac dark:text-white ml-2"
            title="Terminer"
            onClick={() => {
              const payload: SetModeActionPayload = {
                mode: Mode.Default,
              };
              dispatchCommand({
                name: setModeAction.name,
                action: setModeAction(payload),
                payload,
                dispatch,
              });
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="flex h-full overflow-auto">
        <TransitionGroup component="ul" className="overflow-auto " type="ul">
          {tagsList.map((tag) => (
            <CSSTransition key={tag.id} timeout={400} classNames="tag-item">
              <TagComponentMemoized
                tag={tag}
                mode={mode}
                deleteModeActive={deleteModeActive}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </>
  );
};

export { Tags };
