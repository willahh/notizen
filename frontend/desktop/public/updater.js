const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

// Config log debugging
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

// Disable auto download of updates
autoUpdater.autoDownload = false;

// Single export to check for and apply any available updates
module.exports = () => {
  // Check for update (GH releases)
  autoUpdater.checkForUpdates();
};

autoUpdater.on("update-available", () => {
  // Prompt user to start download
  dialog
    .showMessageBox({
      type: "info",
      title: "Update available",
      message:
        "A new version of Readit is available. Do you want to update now?",
      buttons: ["Update", "No"],
    })
    .then((result) => {
      let buttonIndex = result.response;
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();
      }
    });
});

// Listen for update downloaded
autoUpdater.on("update-downloaded", () => {
  dialog
    .showMessageBox({
      type: "info",
      title: "Update ready",
      message: "Install and restart now",
      buttons: ["Yes", "Later"],
    })
    .then((result) => {
      let buttonIndex = result.response;
      if (buttonIndex === 0) {
        autoUpdater.quitAndInstall(false, true);
      }
    });
});
