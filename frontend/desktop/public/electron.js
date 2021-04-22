const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');
// const Realm = require('realm');
// const updater = require('./updater'); // TODO: Uncomment and debug to enable updater

console.log('electron.js');

let mainWindow;
function createWindow() {
  // Check for app updates after 3 secondes
  // setTimeout(updater, 3000);

  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    minWidth: 640,
    minHeight: 380,
    // frame: false
    titleBarStyle: 'hidden',
    maximizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // to prevent the Sync Connection from ending prematurely, start reading from stdin so we don't exit
  process.stdin.resume();

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3006'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => (mainWindow = null));

  // initRealm();
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// MongoDB Realm
// https://docs.mongodb.com/realm/sdk/node/integrations/electron/

// const initRealm = async () => {
//   console.log('initRealm');

//   const realmApp = new Realm.App({ id: 'notizenrealmapp-lcmoi' }); // create a new instance of the Realm.App
//   async function run() {
//     console.log('run');
//     // login with an anonymous credential
//     await realmApp.logIn(Realm.Credentials.anonymous());
//     console.log('realmApp', realmApp);
//     console.log('realmApp.currentUser', realmApp.currentUser);
//     const NoteSchema = {
//       name: 'Note',
//       properties: {
//         _id: 'objectId',
//         name: 'string',
//       },
//       primaryKey: '_id',
//     };
//     const realm = await Realm.open({
//       schema: [NoteSchema],
//       sync: {
//         user: realmApp.currentUser,
//         partitionValue: '_partition',
//       },
//     });
//     console.log('realm', realm);

//     // The myPartition realm is now synced to the device. You can
//     // access it through the `realm` object returned by `Realm.open()`
//     // write to the realm
//   }
//   run().catch((err) => {
//     console.error('Failed to open realm:', err);
//   });
// };
