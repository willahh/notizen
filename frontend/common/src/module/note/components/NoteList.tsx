import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { NoteItem } from '@notizen/frontend-common/src/components/NoteItem';
import { RootState } from '@notizen/frontend-common/src/rootReducer';
import { AreaSecondary } from '@notizen/frontend-common/src/components/AreaSecondary';
import { NoteFilter } from '@notizen/frontend-common/src/components/NoteFilter';
import { MainArea } from '@notizen/frontend-common/src/components/MainArea';
import { Toolbar } from '@notizen/frontend-common/src/components/Toolbar';
import { NoteDetailEdit } from '@notizen/frontend-common/src/components/NoteDetailEdit';
import { LOCAL_STORAGE_NOTES_KEY } from '@notizen/frontend-common/src/constants';
import MainTemplate from '@notizen/frontend-common/src/components/MainTemplate';
import { INote } from '@notizen/frontend-common/src/interfaces';
import {
  dispatchQuery,
  mapOfKeyValueToArrayOfMap,
} from '@notizen/frontend-common/src/utils';
import { fetchNotesAction, FetchNotesActionPayload } from './../note.actions';

interface INoteProps {}

const NoteList: React.FC<INoteProps> = () => {
  const dispatch = useDispatch();
  const { error, isLoading, notes } = useSelector(
    (state: RootState) => state.notes
  );

  const notesList: INote[] = mapOfKeyValueToArrayOfMap(notes).sort(
    (a: INote, b: INote) => {
      return Number(b.id) - Number(a.id);
    }
  ); // TODO: refactor sorting

  // TODO: Put this outside of component, maybe with a Redux Middleware
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, JSON.stringify(notes));
  // }, [notes]);

  useEffect(() => {
    const payload: FetchNotesActionPayload = {};
    dispatchQuery({
      name: fetchNotesAction.typePrefix,
      payload: payload,
      action: fetchNotesAction(payload),
      dispatch: dispatch,
    });
  }, [dispatch]);

  let noteListHtml = null;

  if (error) {
    noteListHtml = (
      <p className="error text" style={{ color: '#fff' }}>
        {error}
      </p>
    );
  }

  if (isLoading) {
    noteListHtml = (
      <p className="error text" style={{ color: '#fff' }}>
        Loading
      </p>
    );
  } else {
    noteListHtml = (
      /* <ScrollBar damping={0.5} thumbMinSize={20}> */
      <TransitionGroup
        component="ul"
        className="overflow-auto divide-y-1 divide-gray-200 dark:divide-gray-800"
        type="ul"
      >
        {notesList.map(
          ({
            id,
            name,
            content,
            createDate,
            updateDate,
            tags,
            color,
            isFav,
          }) => {
            return (
              <CSSTransition key={id} timeout={400} classNames="item">
                <NoteItem
                  key={id}
                  id={id}
                  createDate={createDate}
                  updateDate={updateDate}
                  name={name}
                  tags={tags}
                  content={content}
                  isSelected={true}
                  color={color}
                  isFav={isFav}
                ></NoteItem>
              </CSSTransition>
            );
          }
        )}
      </TransitionGroup>
    );
  }
  //TODO: Transition horizontal between note + note route

  return (
    <MainTemplate>
      <div className="flex w-full flex-col">
        <div>
          <Toolbar />
        </div>
        <div className="flex h-full">
          <AreaSecondary>
            <NoteFilter />
            {noteListHtml}
          </AreaSecondary>
          <MainArea>
            <NoteDetailEdit />
          </MainArea>
        </div>
      </div>
    </MainTemplate>
  );
};

export { NoteList };
