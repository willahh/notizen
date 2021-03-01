import React from 'react';
import { Note } from '@notizen/frontend-common/features/note/Note';
import { Auth } from '@notizen/frontend-common/features/auth/Auth';
import { Route, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const routes = [
  { path: '/', name: 'Home', Component: Auth },
  { path: '/auth', name: 'Auth', Component: Auth },
  { path: '/note', name: 'Note', Component: Note },
  // { path: '/note-thumb', name: 'Note-thumb', Component: NoteThumb },
  // { path: '/note-lit', name: 'Note-lit', Component: NoteLit },
];

function App() {
  return (
    <>
      {/* <ul>
        <nav className="mx-auto">
          {routes.map((route) => (
            <Link
              key={route.path}
              // as={NavLink}
              to={route.path}
              // activeClassName="active"
              // exact
            >
              {route.name}
            </Link>
          ))}
        </nav>
      </ul> */}
      <div className="relative">
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
      </div>
    </>

    // <>
    //   <nav>
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/note">note</Link>
    //       </li>
    //       <li>
    //         <Link to="/note-thumb">note note-thumb</Link>
    //       </li>
    //       <li>
    //         <Link to="/note-lit">note note-lit</Link>
    //       </li>
    //       <li>
    //         <Link to="/auth">Auth</Link>
    //       </li>
    //     </ul>
    //   </nav>
    //   <div className="relative">
    //     <Route key="/auth" exact path="/auth">
    //     <CSSTransition
    //               in={match != null}
    //               timeout={300}
    //               classNames="page"
    //               unmountOnExit
    //             >
    //       <Auth />
    //       </CSSTransition>
    //     </Route>
    //     <Route key="/note" exact path="/note">
    //       <Note />
    //     </Route>
    //     <Route key="/note-thumb" exact path="/note-thumb">
    //       <NoteThumb />
    //     </Route>
    //     <Route key="/note-lit" exact path="/note-lit">
    //       <NoteLit />
    //     </Route>
    //   </div>
    //   {/* <Switch>
    //     <Route path="/auth">
    //       <Auth />
    //     </Route>
    //     <Route path="/note">
    //       <Note />
    //     </Route>
    //     <Route path="/note-thumb">
    //       <NoteThumb />
    //     </Route>
    //     <Route path="/note-lit">
    //       <NoteLit />
    //     </Route>
    //   </Switch> */}
    // </>
  );
}

export default App;
