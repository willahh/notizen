import React, { useEffect } from 'react';
import { NoteItemThumb } from './NoteItemThumb';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/rootReducer';
import { fetchNotesAction, FetchNotesActionPayload } from '../note.actions';
import { NoteFilter, NoteFilterMemo } from './NoteFilter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  BrowserRouter as Router,
  useRouteMatch,
} from 'react-router-dom';
import MainTemplate from './../../../common/components/MainTemplate';
import { SideToolbar } from './noteDetail/SideToolbar';
import { INote } from './../../../common/interfaces';
import { dispatchQuery } from './../../../common/utils';

const scrollbar = require('smooth-scrollbar-react');
const ScrollBar = scrollbar.default;

interface INoteProps {}

const NoteThumb: React.FC<INoteProps> = () => {
  console.log('NoteThumb');

  const dispatch = useDispatch();
  const { error, isLoading, notes } = useSelector(
    (state: RootState) => state.notes
  );

  // TODO: Put this outside of component, maybe with a Redux Middleware
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, JSON.stringify(notes));
  // }, [notes]);

  const acc: INote[] = [];
  const notesList = Object.keys(notes)
    .reduce((acc, v) => {
      if (notes[v]) {
        acc.push(notes[v]);
      }
      return acc;
    }, acc)
    .sort((a, b) => {
      return Number(b.id) - Number(a.id);
    }); // TODO: refactor sorting;

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
  // let match = useRouteMatch();

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
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 p-4"
        type="ul"
      >
        {notesList.map(({ id, name, content }) => {
          return (
            <CSSTransition key={id} timeout={400} classNames="item">
              <NoteItemThumb
                key={id}
                id={id}
                title={name}
                tags={['Tag 1']}
                text="text"
                isSelected={true}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
  }

  return (
    <MainTemplate>
      <div className="flex w-full flex-col">
        <div>
          {/* <SideToolbar editor={editor} noteId="xxxx" /> */}
          <NoteFilterMemo />
        </div>
        <div className="flex h-full">{noteListHtml}</div>
      </div>
    </MainTemplate>
  );
};

export { NoteThumb };
