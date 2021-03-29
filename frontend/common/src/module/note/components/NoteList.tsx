import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NoteItem from '@notizen/frontend-common/src/module/note/components/NoteItem';
import { RootState } from '@notizen/frontend-common/src/common/rootReducer';
import { AreaSecondary } from '@notizen/frontend-common/src/common/components/AreaSecondary';
import { NoteFilter, NoteFilterMemo } from './NoteFilter';
import { MainArea } from '@notizen/frontend-common/src/common/components/MainArea';
// import { Toolbar } from './noteDetail/Toolbar';
import MainTemplate from '@notizen/frontend-common/src/common/components/MainTemplate';
import { INote } from '@notizen/frontend-common/src/common/interfaces';
import {
  dispatchQuery,
  mapOfKeyValueToArrayOfMap,
} from '@notizen/frontend-common/src/common/utils';
import { fetchNotesAction, FetchNotesActionPayload } from './../note.actions';
import NoteDetailEditNew from './noteDetail/NoteDetailEditNew';

interface INoteProps {}

const NoteList: React.FC<INoteProps> = () => {
  console.log('NoteList');
  const dispatch = useDispatch();
  const { error, isLoading, notes } = useSelector(
    (state: RootState) => state.notes
  );

  // TODO: Put inside useSomething ?
  const notesList: INote[] = mapOfKeyValueToArrayOfMap(notes).sort(
    (a: INote, b: INote) => {
      let aa = new Date(a.updateDate).getTime();
      let bb = new Date(b.updateDate).getTime();
      return bb - aa;
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
      <div className="flex h-full relative overflow-auto">
        <div className="pointer-events-none absolute h-8 left-6 inset-x-0 z-10 bg-gradient-to-b from-gray-50 dark:from-gray-900"></div>
        <div className="pointer-events-none absolute h-16 left-6 bottom-0 inset-x-0 z-10 bg-gradient-to-t from-gray-50 dark:from-gray-900"></div>
        <div className="overflow-auto">
          <TransitionGroup component="ul" className="divide-y-1 divide-gray-200 dark:divide-black " type="ul">
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
        </div>
      </div>
    );
  }
  //TODO: Transition horizontal between note + note route

  return (
    <MainTemplate>
      <div className="flex w-full flex-col">
        <div className="flex h-full">
          <AreaSecondary>
            <NoteFilterMemo />
            {noteListHtml}
          </AreaSecondary>
          <MainArea>
            <NoteDetailEditNew />
          </MainArea>
        </div>
      </div>
    </MainTemplate>
  );
};

export default React.memo(NoteList);
