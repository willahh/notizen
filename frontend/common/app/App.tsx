import React from 'react';
import { Note } from '@notizen/frontend-common/features/note/Note';
import { NoteThumb } from '@notizen/frontend-common/features/note/NoteThumb';
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
            <Link to="/login">login</Link>
          </li>
        </ul>
      </nav> */}
      <Switch>
        <Route path="/note">
          <Note />
        </Route>
        <Route path="/login">
          <div>LOGIN</div>
        </Route>
        <Route path="/">
          <NoteThumb />
        </Route>
      </Switch>
    </>
  );
}

export default App;
