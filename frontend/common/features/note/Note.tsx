import React, { useEffect } from 'react';
import { NoteItem } from '../../components/NoteItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { fetchNotes } from './noteListSlice';
import { AreaSecondary } from '../../components/AreaSecondary';
import MainTemplate from '../../components/MainTemplate';
import { NoteThumb } from '@notizen/frontend-common/features/note/NoteThumb';
import { NoteList } from '@notizen/frontend-common/features/note/NoteList';
// import { NoteLit } from '@notizen/frontend-common/features/note/NoteLit';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Toolbar } from '../../components/Toolbar';
import { NoteFilter } from '../../components/NoteFilter';

interface INoteProps {}

const Note: React.FC<INoteProps> = () => {
  return (
    <Switch>
      <Route exact path="/note">
        <NoteList />
      </Route>
      <Route exact path="/note/note-list">
        <NoteList />
      </Route>
      <Route exact path="/note/note-thumb">
        <NoteThumb />
      </Route>
    </Switch>
  );
};

export { Note };
