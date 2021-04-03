// https://codesandbox.io/s/7zo06w5kr0?file=/src/Database.jsx:0-2306
import {
  addRxPlugin,
  createRxDatabase,
  RxCollection,
  RxDatabase,
  RxDocument,
} from 'rxdb';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBNoValidatePlugin } from 'rxdb/plugins/no-validate';
import { RxDBReplicationPlugin } from 'rxdb/plugins/replication';
import { INote, TagEntity } from '../common/interfaces';
import { noteSchema, tagSchema } from './Schema';

// ------------------- NOTE
interface NoteDocMethods {
  // scream: (v: string) => string;
}

export type NoteDocument = RxDocument<INote, NoteDocMethods>;

type NoteCollectionMethods = {
  // countAllDocuments: () => Promise<number>;
};

type NoteCollection = RxCollection<
  INote,
  NoteDocMethods,
  NoteCollectionMethods
>;

// ------------------- TAG
interface TagDocMethods {
  // scream: (v: string) => string;
}

export type TagDocument = RxDocument<TagEntity, TagDocMethods>;

type TagCollectionMethods = {
  // countAllDocuments: () => Promise<number>;
};

type TagCollection = RxCollection<
  TagEntity,
  TagDocMethods,
  TagCollectionMethods
>;

// ------------------- DB
type MyDatabaseCollections = {
  notes: NoteCollection;
  tags: TagCollection;
};

type MyDatabase = RxDatabase<MyDatabaseCollections>;

addRxPlugin(require('pouchdb-adapter-idb'));
// addRxPlugin(require('pouchdb-adapter-indexeddb')); // New adapter not production ready yet
addRxPlugin(require('pouchdb-adapter-http'));
addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBReplicationPlugin);
addRxPlugin(RxDBNoValidatePlugin);

const collections = {
  notes: {
    schema: noteSchema,
    sync: true,
    // methods: heroDocMethods,
    // statics: heroCollectionMethods
    // pouchSettings: {}, // (optional)
    // statics: {}, // (optional) ORM-functions for this collection
    // methods: {}, // (optional) ORM-functions for documents
    // attachments: {}, // (optional) ORM-functions for attachments
    // options: {}, // (optional) Custom parameters that might be used in plugins
    // migrationStrategies: {}, // (optional)
    // autoMigrate: true, // (optional)
    // cacheReplacementPolicy: function(){}, // (optional) custom cache replacement policy
  },
  tags: {
    schema: tagSchema,
    sync: true,
  },
};

console.log('collections', collections);

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
    name: 'notizen2',
    adapter: 'idb',
    multiInstance: true, // https://www.npmjs.com/package/rxdb-utils#replication
    ignoreDuplicate: false, // https://www.npmjs.com/package/rxdb-utils#replication
    // adapter: 'indexeddb',  // New adapter not production ready yet
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
  console.log('b');
  Object.keys(collections).map((colName) => {
    console.log('filter :', colName);

    try {
      // const remoteUrl = syncURL + 'user' + colName + '/';
      const remoteUrl = syncURL + colName + '/';
      console.log('colName', colName);
      console.log('remoteUrl', remoteUrl);

      return db[colName].sync({
        remote: remoteUrl

        // A key is sent to the server, the server will filter documents
        // Filter documents at the server level by by_userlogin
        // Options is https://pouchdb.com/api.html#replication
        // options: {
        //   filter: 'app/by_userlogin',
        //   query_params: { userlogin: userlogin },
        // },
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
