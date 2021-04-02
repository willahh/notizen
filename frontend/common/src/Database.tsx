// https://codesandbox.io/s/7zo06w5kr0?file=/src/Database.jsx:0-2306
import {
  addRxPlugin,
  createRxDatabase,
  RxCollection,
  RxDatabase,
  RxDocument
} from 'rxdb';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBNoValidatePlugin } from 'rxdb/plugins/no-validate';
import { RxDBReplicationPlugin } from 'rxdb/plugins/replication';
import { Node } from 'slate';
import { NoteColor, TagEntity } from './common/interfaces';
import { noteSchema } from './Schema';

interface NoteDocMethods {
  // scream: (v: string) => string;
}

export type NoteDocType = {
  id: string;
  name?: string;
  // content?: Array<Object>;
  content?: Node[];
  createDate?: string;
  updateDate?: string;
  tags?: TagEntity[];
  color?: NoteColor;
  isFav?: boolean;
  isDeleted?: boolean;
};

export type NoteDocument = RxDocument<NoteDocType, NoteDocMethods>;

type NoteCollectionMethods = {
  // countAllDocuments: () => Promise<number>;
};

type NoteCollection = RxCollection<
  NoteDocType,
  NoteDocMethods,
  NoteCollectionMethods
>;

type MyDatabaseCollections = {
  notes: NoteCollection;
};

type MyDatabase = RxDatabase<MyDatabaseCollections>;

addRxPlugin(require('pouchdb-adapter-idb'));
addRxPlugin(require('pouchdb-adapter-http'));
addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBReplicationPlugin);
addRxPlugin(RxDBNoValidatePlugin);

const collections = {
  notes: {
    schema: noteSchema,
    // methods: heroDocMethods,
    // statics: heroCollectionMethods
    sync: true,
    // pouchSettings: {}, // (optional)
    // statics: {}, // (optional) ORM-functions for this collection
    // methods: {}, // (optional) ORM-functions for documents
    // attachments: {}, // (optional) ORM-functions for attachments
    // options: {}, // (optional) Custom parameters that might be used in plugins
    // migrationStrategies: {}, // (optional)
    // autoMigrate: true, // (optional)
    // cacheReplacementPolicy: function(){}, // (optional) custom cache replacement policy
  },
};

// TODO: Debug
declare global {
  interface Window {
    db: MyDatabase;
  }
}

const syncURL = 'http://' + window.location.hostname + ':10102/';
console.log('host: ', syncURL);
let dbPromise: Promise<RxDatabase<MyDatabaseCollections>> | null = null;

const _create = async () => {
  console.log('DatabaseService: creating database...');
  const db: MyDatabase = await createRxDatabase<MyDatabaseCollections>({
    name: 'notizen',
    adapter: 'idb',
  });
  console.log('DatabaseService: created database');
  window['db'] = db; // INFO: Debug

  // Show leadership in title
  db.waitForLeadership().then(() => {
    console.log('isLeader now');
    document.title = '♛ ' + document.title;
  });

  // Create collections
  console.log('DatabaseService: create collections');
  // await Promise.all(collections.map(colData => db.addCollections(colData)));
  await db.addCollections(collections);

  // Hooks
  // try {
  //   db.collections.notes.preInsert((docObj) => {
  //     console.log('preInsert', docObj);

  //     const { id } = docObj;
  //     return db.collections.notes
  //       .findOne({
  //         selector: { id },
  //       })
  //       .exec()
  //       .then((has) => {
  //         if (has != null) {
  //           alert('another note already has the id ' + id);
  //           throw new Error('id already there');
  //         }
  //         return db;
  //       });
  //   }, true);
  // } catch (err) {
  //   console.error(err);
  // }

  // Sync
  console.log('DatabaseService: sync');
  // collections
  //   .filter((col) => col.sync)
  //   .map((col) => col.name)
  //   .map((colName) => {
  //     try {
  //       return db[colName].sync({
  //         remote: syncURL + colName + '/',
  //       });
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   });
  // TODO: Filter by sync: true
  Object.keys(collections).map((colName) => {
    try {
      return db[colName].sync({
        remote: syncURL + colName + '/',
      });
    } catch (err) {
      console.error(err);
    }
  });

  return db;
};

export const get = () => {
  if (!dbPromise) dbPromise = _create();
  return dbPromise;
};

// TODO: Debug
(window as any).getDB = get;

// // RXDB test
// import {
//   RxDatabase,
//   /* ... */
// } from 'rxdb';

// import { createRxDatabase, addRxPlugin } from 'rxdb';
// /**
//  *
//  *
//  *
//  *
//  * TODO : Implement https://blog.logrocket.com/building-an-offline-first-app-with-react-and-rxdb-e97a1fa64356/
//  *
//  *
//  *
//  *
//  */

// console.log('[x] >>> a1');

// (async () => {
//   console.log('[x] >>> a2');
//   // const db = await createRxDatabase({
//   //   name: 'heroesdb', // <- name
//   //   adapter: 'idb', // <- storage-adapter
//   //   password: 'myPassword', // <- password (optional)
//   //   multiInstance: true, // <- multiInstance (optional, default: true)
//   //   eventReduce: false, // <- eventReduce (optional, default: true)
//   // });

//   // this adapter stores the data in indexeddb
//   addRxPlugin(require('pouchdb-adapter-idb'));

//   addRxPlugin(require('pouchdb-adapter-http'));

//   const db = await createRxDatabase({
//     name: 'mydatabase',
//     adapter: 'idb' // name of the adapter
//   });
//   console.log('[x] >>> a3');

//   console.dir(db);
// })();
