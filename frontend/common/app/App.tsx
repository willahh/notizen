import React from 'react';
import { Note } from '@notizen/frontend-common/features/note/Note';
import { Auth } from '@notizen/frontend-common/features/auth/Auth';
import { CSSTransition } from 'react-transition-group';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HOST_URL } from './utils';

console.log('HOST_URL', HOST_URL);

const routes = [
  { path: `${HOST_URL}/`, name: 'Home', Component: Auth },
  // { path: "/", name: 'Home', Component: Auth },
  { path: `${HOST_URL}/auth`,  name: 'Auth', Component: Auth },
  // { path: "/auth",  name: 'Auth', Component: Auth },
  { path: `${HOST_URL}/note`,  name: 'Note', Component: Note },
  // { path: "/note",  name: 'Note', Component: Note },
];

function App() {
  return (
    <>
      <div className="relative">
        <Router>
          {routes.map(({ path, Component }) => (
            // <Route key={path} exact path={path}>

            <Route key={path} path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={400}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </Router>
      </div>
    </>

  );
}

export default App;
