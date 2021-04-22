import ReactTooltip from 'react-tooltip';
import { CSSTransition } from 'react-transition-group';
import { Note } from '@notizen/frontend-common/src/module/note/components/Note';
import { Sync } from '@notizen/frontend-common/src/module/sync/Sync';
import { Auth } from '@notizen/frontend-common/src/module/auth/Auth';
import { EditorTestPage } from '@notizen/frontend-common/src/module/editor/components/EditorTestPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HOST_URL } from './common/constants';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { dispatchQuery } from './common/utils';
import {
  fetchNotesAction,
  FetchNotesActionPayload,
} from './module/note/note.actions';
import { REALM_APP_ID } from './database/database';
// import { app } from './database/database';

const routes = [
  { path: `${HOST_URL}/`, name: 'Home', Component: Auth },
  { path: `${HOST_URL}/auth`, name: 'Auth', Component: Auth },
  { path: `${HOST_URL}/note`, name: 'Note', Component: Note },
  { path: `${HOST_URL}/sync`, name: 'Sync', Component: Sync },
  { path: `${HOST_URL}/editor`, name: 'Editor', Component: EditorTestPage },
];

function App() {
  const dispatch = useDispatch();

  // Initial calls
  useEffect(() => {
    const payload: FetchNotesActionPayload = {};
    dispatchQuery({
      name: fetchNotesAction.typePrefix,
      payload: payload,
      action: fetchNotesAction(payload),
      dispatch: dispatch,
    });
  }, [dispatch]);

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










// // ------------------------------
// import * as Realm from 'realm-web';
// // import Realm from "realm";


// const app: Realm.App = new Realm.App({ id: REALM_APP_ID });
// console.log('app', app);

// // import Realm from 'realm-web';
// const login = async () => {
//   console.log('login');

//   // Create an anonymous credential
//   const credentials = Realm.Credentials.anonymous();
//   try {
//     // Authenticate the user
//     const user: Realm.User = await app.logIn(credentials);
//     console.log('user', user);

//     // `App.currentUser` updates to match the logged in user
//     // assert(user.id === app.currentUser.id);
//     return user;
//   } catch (err) {
//     console.error('Failed to log in', err);
//   }
// };

// // Debug
// declare global {
//   interface Window {
//     mongodb: any;
//   }
// }

// (async () => {
//   console.log('init Realm');

//   const user = await login();
//   console.log('user', user);
//   console.log('app.currentUser', app.currentUser);

//   // const realm = await Realm.open({
//   //   schema: [DogSchema],
//   //   sync: {
//   //     user: app.currentUser,
//   //     partitionValue: "myPartition",
//   //   },
//   // });
  

//   // Realm sync
//   // const NoteSchema = {
//   //   name: 'Note',
//   //   properties: {
//   //     name: 'string',
//   //   },
//   // };
//   // const config = {
//   //   schema: [NoteSchema],
//   //   sync: {
//   //     user: app.currentUser,
//   //     partitionValue: '_partition',
//   //   },
//   // };
//   // const realm = await Realm.open(config);
//   // console.log('realm', realm);
  

//   // const summed: number = await user.functions.sum(2, 3);
//   // console.log('summed', summed);

//   const mongodb = app.currentUser.mongoClient('notizen-realm-service-name');
//   window.mongodb = mongodb;
//   console.log('mongodb', mongodb);

//   const notes = mongodb.db('NotizenProductionDb').collection('note');
//   // const notes = mongodb.db("NotizenProductionDb").collection<INote>("note"); // TODO: Add type

//   console.log('notes', notes);

//   // FIND
//   const notesResult = await notes.find();
//   console.log('notesResult');

//   // TODO: Types
//   // type InsertOneResult = Realm.Services
//   // const result = await notes.insertOne({
//   //   name: "lily of the valley",
//   //   color: "white",
//   //   _partition: "Store 47",
//   // });
//   // console.log(result);
// })();
