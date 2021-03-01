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

import { NoteThumb } from '@notizen/frontend-common/features/note/NoteThumb';
import { NoteLit } from '@notizen/frontend-common/features/note/NoteLit';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

const scrollbar = require('smooth-scrollbar-react');
const ScrollBar = scrollbar.default;

interface INoteProps {}

const Note: React.FC<INoteProps> = () => {
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
        className="overflow-auto divide-y-1 divide-gray-200 dark:divide-gray-800"
        type="ul"
      >
        {notesList.map(({ id, name, content }) => {
          return (
            <CSSTransition key={id} timeout={400} classNames="item">
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

  const routes = [
    { path: '/note', name: 'Note', Component: Note },
    { path: '/note-thumb', name: 'Note-thumb', Component: NoteThumb },
    { path: '/note-lit', name: 'Note-lit', Component: NoteLit },
  ];

  return (
    <MainTemplate>
      

      <AreaSecondary>
        <NoteFilter />
        {/* <ul>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul> */}
        {noteListHtml}

        
      </AreaSecondary>
      <MainArea>
        <Toolbar />
        <Switch>
          {/* <Route path={`${match.path}/:noteId`}> */}
          <NoteDetailEdit />
          {/* </Route> */}
          {/* <Route path={match.path}> */}
          {/* <h3 className="text-white">Please select a note.</h3> */}
          {/* <NoteDetailEdit /> */}
          {/* </Route> */}
        </Switch>
      </MainArea>
    </MainTemplate>
  );
};

export { Note };
