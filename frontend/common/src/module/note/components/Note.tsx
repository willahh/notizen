import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NoteThumb } from '@notizen/frontend-common/src/module/note/components/NoteThumb';
import NoteList from '@notizen/frontend-common/src/module/note/components/NoteList';
import { HOST_URL } from '@notizen/frontend-common/src/common/constants';

interface INoteProps {}

const Note: React.FC<INoteProps> = () => {
  console.log('Note');

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
