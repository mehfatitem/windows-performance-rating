const {
  app,
  BrowserWindow,
  ipcMain
} = require("electron");
const path = require("path");
const fs = require("fs");
const winsat = require("./Helper/WinsatFormalExecutor.js");
const systemRatingReader = require("./Helper/SystemRatingReader.js");
const dateTimeHelper = require("./Helper/DateTimeHelper.js");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {

  const iconPath = path.join(__dirname, 'src', 'views', 'images', 'rating.png');

  // Create the browser window.
  win = new BrowserWindow({
    width: 850,
    height: 600,
    resizable : true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      /*nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote*/
      icon: iconPath,
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  // Load app
  win.loadFile(path.join(__dirname, "Views/index.html"));
  win.webContents.openDevTools();
  // rest of code..
}

ipcMain.on("calculate-click" , function() {
  winsat.executeWinsatFormal(win);
});

ipcMain.on("dev-tools" , function() {
   win.webContents.openDevTools();
});

ipcMain.on("kill-process" , function() {
   winsat.killWinsatFormal();
});

console.log(dateTimeHelper.nowToString());


app.on("ready", createWindow);

/*ipcMain.on("toMain", (event, args) => {
  fs.readFile("path/to/file", (error, data) => {
    // Do something with file contents

    // Send result back to renderer process
    win.webContents.send("fromMain", responseObj);
  });
});*/