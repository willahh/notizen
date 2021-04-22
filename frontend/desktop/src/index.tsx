import React from 'react';
import ReactDOM from 'react-dom';
import { store } from '@notizen/frontend-common/src/common/store';
import { Provider } from 'react-redux';
// import * as serviceWorker from './serviceWorker.js';
import '@notizen/frontend-common/index.css';
import App from '@notizen/frontend-common/src/App';

import * as Realm from 'realm';
// import Realm from 'realm';
// console.log('Realm', Realm);


window.store = store || {};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();

// const Realm = require('realm');

// async function run() {
//   const NoteSchema = {
//     name: 'Note',
//     properties: {
//       _id: 'objectId',
//       name: 'string',
//     },
//     primaryKey: '_id',
//   };

//   const config: Realm.Configuration = {
//     path: 'my.realm',
//     schema: [NoteSchema],
//     /*
//        enable sync history, using "sync:true" (this allows changes to "my.realm" file
//        to be synced by the realm opened in the main process)
//     */
//     // sync: {}
//   };

//   console.log('config', config);

//   // const realm = new Realm(config);
//   const realm = new Realm();
//   console.log('realm', realm);

//   // const notes = realm.objects('note');
//   // console.log(`Renderer: Number of Note objects: ${notes.length}`);

//   // realm.write(() => {
//   //   realm.create('Dog', {
//   //     _id: 1,
//   //     name: 'Spot',
//   //     age: 2,
//   //   });
//   // });
// }
// run().catch((err) => {
//   console.error('Failed to open realm:', err);
// });





// Setup test 2 from https://docs.mongodb.com/realm/sdk/node/integrations/electron/ guide
// const Realm = require("realm");
const app = new Realm.App({ id: "notizenrealmapp-lcmoi'" });
