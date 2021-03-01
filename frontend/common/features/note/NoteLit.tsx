import React, { useEffect } from 'react';
import { NoteItem } from '../../components/NoteItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { fetchNotes } from './noteListSlice';
import { AreaSecondary } from '../../components/AreaSecondary';
import { NoteFilter } from '../../components/NoteFilter';
import { MainArea } from '../../components/MainArea';
import { Toolbar } from '../../components/Toolbar';
// import { NoteDetail } from '../../components/NoteDetail';
import { NoteDetailEdit } from '../../components/NoteDetailEdit';
import MainTemplate from '../../components/MainTemplate';
import { LOCAL_STORAGE_NOTES_KEY } from '../../constants';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import LitTemplate from '../../components/LitTemplate';

const scrollbar = require('smooth-scrollbar-react');
const ScrollBar = scrollbar.default;

interface INoteProps {}

const NoteLit: React.FC<INoteProps> = () => {
  const dispatch = useDispatch();
  const { error, isLoading, notes } = useSelector(
    (state: RootState) => state.notes
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const notesList = Object.keys(notes)
    .reduce((acc, v) => {
      if (notes[v]) {
        acc.push(notes[v]);
      }
      return acc;
    }, [])
    .sort((a, b) => b.id - a.id); // TODO: refactor sorting

  useEffect(() => {
    dispatch(fetchNotes());
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
      <TransitionGroup
        component="ul"
        className="overflow-auto "
        type="ul"
      > 
        {notesList.map(({ id, name, content }) => {
          return (
            <CSSTransition
              key={id}
              timeout={400}
              classNames="item"
            >
              <NoteItem
                key={id}
                id={id}
                title={name}
                tags={['Tag 1']}
                text={content}
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
        <NoteDetailEdit />
      </MainArea>
    </LitTemplate>
  );
};

export { NoteLit };
