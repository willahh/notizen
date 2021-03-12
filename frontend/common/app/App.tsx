import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Note } from '@notizen/frontend-common/features/note/Note';
import { Sync } from '@notizen/frontend-common/features/sync/Sync';
import { Auth } from '@notizen/frontend-common/features/auth/Auth';
import { CSSTransition } from 'react-transition-group';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HOST_URL } from './utils';

const routes = [
  { path: `${HOST_URL}/`, name: 'Home', Component: Auth },
  { path: `${HOST_URL}/auth`, name: 'Auth', Component: Auth },
  { path: `${HOST_URL}/note`, name: 'Note', Component: Note },
  { path: `${HOST_URL}/sync`, name: 'Sync', Component: Sync },
];

function App() {
  return (
    <>
      <div className="relative">
        <Router>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
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
      <ReactTooltip
        effect="float"
        type="dark"
        border={true}
        backgroundColor="#0f172b"
        borderColor="#3730a3"
        textColor="#5d67b8"
        delayShow={500}
      />
    </>
  );
}

export default App;
