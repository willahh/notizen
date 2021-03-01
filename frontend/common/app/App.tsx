import React from 'react';
import { Note } from '@notizen/frontend-common/features/note/Note';
import { NoteThumb } from '@notizen/frontend-common/features/note/NoteThumb';
import { NoteLit } from '@notizen/frontend-common/features/note/NoteLit';
import { Auth } from '@notizen/frontend-common/features/auth/Auth';
import { Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/note">note</Link>
          </li>
          <li>
            <Link to="/note-thumb">note note-thumb</Link>
          </li>
          <li>
            <Link to="/note-lit">note note-lit</Link>
          </li>
          <li>
            <Link to="/auth">Auth</Link>
          </li>
        </ul>
      </nav> */}
      <Switch>
        {/* <Route path="/">
          <Auth />
        </Route> */}
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/note">
          <Note />
        </Route>
        <Route path="/note-thumb">
          <NoteThumb />
        </Route>
        <Route path="/note-lit">
          <NoteLit />
        </Route>
      </Switch>
    </>
  );
}

export default App;
