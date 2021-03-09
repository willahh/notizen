const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');
const updater = require('./updater');

let mainWindow;
function createWindow() {
  // Check for app updates after 3 secondes
  setTimeout(updater, 3000);
  
  mainWindow = new BrowserWindow({ width: 900, height: 680, minWidth: 640, minHeight: 380 });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3006'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => (mainWindow = null));
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
