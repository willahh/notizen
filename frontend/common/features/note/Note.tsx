import React, { useEffect } from 'react';
import { NoteThumb } from '@notizen/frontend-common/features/note/NoteThumb';
import { NoteList } from '@notizen/frontend-common/features/note/NoteList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HOST_URL } from '../../app/utils';

interface INoteProps {}

const Note: React.FC<INoteProps> = () => {
  return (
    <Switch>
      <Route exact path={`${HOST_URL}/note`}>
        <NoteList />
      </Route>
      <Route exact path={`${HOST_URL}/note/note-list`}>
        <NoteList />
      </Route>
      <Route exact path={`${HOST_URL}/note/note-thumb`}>
        <NoteThumb />
      </Route>
    </Switch>
  );
};

export { Note };
