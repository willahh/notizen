import React, { useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { BrowserRouter as Router, useRouteMatch } from 'react-router-dom';
import { NoteItem } from '@notizen/frontend-common/src/components/NoteItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@notizen/frontend-common/src/rootReducer';
import { AreaSecondary } from '@notizen/frontend-common/src/components/AreaSecondary';
import { NoteFilter } from '@notizen/frontend-common/src/components/NoteFilter';
import { MainArea } from '@notizen/frontend-common/src/components/MainArea';
import { Toolbar } from '@notizen/frontend-common/src/components/Toolbar';
import { NoteDetailEditNew } from '@notizen/frontend-common/src/components/NoteDetailEditNew';
import LitTemplate from '@notizen/frontend-common/src/components/LitTemplate';
import { dispatchQuery } from '@notizen/frontend-common/src/utils';
import { NoteColor } from '@notizen/frontend-common/src/interfaces';
import { fetchNotesAction, FetchNotesActionPayload } from '../note.actions';

// const scrollbar = require('smooth-scrollbar-react');
// const ScrollBar = scrollbar.default;

interface INoteProps {}

const NoteLit: React.FC<INoteProps> = () => {
  const dispatch = useDispatch();
  const { error, isLoading, notes } = useSelector(
    (state: RootState) => state.notes
  );

  // TODO: Put this outside of component, maybe with a Redux Middleware
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, JSON.stringify(notes));
  // }, [notes]);

  const notesList = Object.keys(notes).reduce((acc, v) => {
    if (notes[v]) {
      acc.push(notes[v]);
    }
    return acc;
  }, []);

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
  let match = useRouteMatch();

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
      <TransitionGroup component="ul" className="overflow-auto " type="ul">
        {notesList.map(({ id, name, content, tags }) => {
          return (
            <CSSTransition key={id} timeout={400} classNames="item">
              <NoteItem
                key={id}
                id={id}
                name={name}
                createDate={new Date().toISOString()}
                updateDate={new Date().toISOString()}
                color={NoteColor.GRAY}
                isFav={false}
                tags={tags}
                content={content}
                isSelected={true}
              ></NoteItem>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
  }

  return (
    <LitTemplate>
      <AreaSecondary>
        <NoteFilter />
        {noteListHtml}
      </AreaSecondary>
      <MainArea>
        <Toolbar />
        <NoteDetailEditNew />
      </MainArea>
    </LitTemplate>
  );
};

export { NoteLit };
