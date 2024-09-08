const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "main.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);

  ipcMain.on("key:inputValue", (err, data) => {
    console.log(data);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

const mainMenuTemplate = [
  {
    label: "Dosya",
    submenu: [
      {
        label: "Add New TODO",
      },
      {
        label: "Clear All",
      },
      {
        label: "Exit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        role: "quit",
      },
    ],
  },
];

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Dev Tools",
    submenu: [
      {
        label: "Open Developer Window",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
        accelerator:
          process.platform === "darwin" ? "Command+Shift+I" : "Ctrl+Shift+I",
      },
      {
        label: "Refresh",
        role: "reload",
      },
    ],
  });
}
